package com.example.backend.Service;

import com.example.backend.Config.JWTUtil;
import com.example.backend.Entity.Order;
import com.example.backend.Entity.Product;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Model.LoginInput;
import com.example.backend.Model.ProfileResponse;
import com.example.backend.Repository.OrderRepository;
import com.example.backend.Repository.ProductRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderService orderService;
    @Autowired
    ProductService productService;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    JWTUtil jwtUtil;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public String saveUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Этот логин занят";
        }
        else if (user.getUsername() == null || user.getPassword() == null){
            return "Одно из поле не заполнено";
        }
        else {
            user.setRoles(List.of(new Role(1L, "ROLE_USER")));
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return "Пользователь создан";
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) throw new UsernameNotFoundException("Пользователь не найден");
        return user;
    }

    public ProfileResponse getProfile(){
        User user = findByUsername(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        List<Order> orders = orderRepository.findByUserId(user.getId());
        return new ProfileResponse(user,orders);
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public User deleteUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user!=null){
            userRepository.deleteById(id);
            List<Order> orders = orderRepository.findByUserId(id);
            for (Order order : orders){
                orderService.deleteOrder(order.getId());
            }
            return user;
        }
        else return null;
    }

    public boolean updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return false;
        List<Role> roles = user.getRoles();
        boolean alreadyExistRoleUser = false;
        boolean alreadyExistRoleAdmin = false;
        for (Role role:user.getRoles()){
            if (role.getName().equals("ROLE_USER")) alreadyExistRoleUser = true;
            if (role.getName().equals("ROLE_ADMIN")) alreadyExistRoleAdmin = true;
        }
        boolean requestedRoleUser = false;
        boolean requestedRoleAdmin = false;
        for (Role role:updatedUser.getRoles()){
            if(role.getName().equals("ROLE_USER")) requestedRoleUser =true;
            if(role.getName().equals("ROLE_ADMIN")) requestedRoleAdmin =true;
        }
        if(requestedRoleUser){
            if(!alreadyExistRoleUser) roles.add(roleRepository.getById(1L));
        }
        else{
            if(alreadyExistRoleUser) roles.remove(roleRepository.getById(1L));
        }
        if(requestedRoleAdmin){
            if(!alreadyExistRoleAdmin) roles.add(roleRepository.getById(2L));
        }
        else{
            if(alreadyExistRoleAdmin) roles.remove(roleRepository.getById(2L));
        }
        user.setRoles(roles);
        userRepository.save(user);
        return true;
    }

    public User findConcreteUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public ResponseEntity<String> login (LoginInput loginInput){
        if(userRepository.findByUsername(loginInput.getEmail()) !=null){
            User user = userRepository.findByUsername(loginInput.getEmail());
            if (bCryptPasswordEncoder.matches(loginInput.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user);
                return new ResponseEntity(token, HttpStatus.OK);
            }
            return new ResponseEntity("Wrong Data", HttpStatus.UNAUTHORIZED);
        }
        else{
            return new ResponseEntity("", HttpStatus.NOT_FOUND);
        }
    }

}