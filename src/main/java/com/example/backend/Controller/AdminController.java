package com.example.backend.Controller;

import com.example.backend.Entity.Order;
import com.example.backend.Entity.Product;
import com.example.backend.Entity.User;
import com.example.backend.Repository.OrderRepository;
import com.example.backend.Service.OrderService;
import com.example.backend.Service.ProductService;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/users")
    public List<User> allUsers(){
        return userService.allUsers();
    }

    @PutMapping("/users/{id}")
    void editUser(@PathVariable Long id, @RequestBody User user){
        userService.updateUser(id, user);
    }

    @DeleteMapping("/users/{id}")
    public User deleteUser(@PathVariable Long id){
        return userService.deleteUser(id);
    }

    @GetMapping("/users/{id}")
    public User showConcreteUser(@PathVariable Long id){
        return userService.findConcreteUser(id);
    }

    @GetMapping("/products")
    public List<Product> allProducts() {
        return productService.findAll();
    }

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping("/products/{id}")
    public Product showConcreteProduct(@PathVariable Long id){
        return productService.findConcreteProduct(id);
    }

    @PutMapping("/products/{id}")
    public void updateProductInfo(@PathVariable Long id, @RequestBody Product product) {
        productService.updateProduct(id, product);
    }

    @DeleteMapping("/products/{id}")
    public Product deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }

    @GetMapping("/orders")
    public List<Order> allOrders(){
        return orderService.allOrders();
    }

    @DeleteMapping("/orders/{id}")
    public Order deleteOrder(@PathVariable Integer id){
        return orderService.deleteOrder(id);
    }

    @PutMapping("/orders/{id}")
    public void updateOrderInfo(@PathVariable Integer id, @RequestBody Order order) {
        orderService.updateOrder(id, order);
    }

    @GetMapping("/orders/{id}")
    public Order showConcreteOrder(@PathVariable Integer id){
        return orderService.findConcreteOrder(id);
    }
}
