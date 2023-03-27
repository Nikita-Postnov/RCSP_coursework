package com.example.backend.Service;

import com.example.backend.Entity.Order;
import com.example.backend.Entity.Product;
import com.example.backend.Entity.User;
import com.example.backend.Repository.ProductRepository;
import com.example.backend.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    OrderService orderService;

    public Product addProduct(Product product) {
        if (product.getBrand().equals("") || product.getPrice() == null
                || product.getBody().equals("")
                || product.getModel().equals("") || product.getRelease_year() == null
                || product.getColor().equals("") || product.getEngine().equals("")
                || product.getDrive().equals("") || product.getWheel().equals("")
                || product.getCategory().equals("") || product.getPicture().equals("")
                || (product.getCategory().equals("SUP") &&
                (product.getMileage() == null || product.getNumber_of_owners() == null))) {

            return null;
        }
        else{
            Product new_product = new Product(
                    product.getMileage(),
                    product.getNumber_of_owners(),
                    product.getCategory(),
                    product.getBrand(),
                    product.getModel(),
                    product.getRelease_year(),
                    product.getBody(),
                    product.getColor(),
                    product.getEngine(),
                    product.getDrive(),
                    product.getWheel(),
                    product.getPrice(),
                    product.getPicture());
            return productRepository.save(new_product);
        }
    }

    public List<Product> findAll() {
        List <Product> product = productRepository.findAll();
        product.sort(Comparator.comparingLong(Product::getId));
        return product;
    }

    public Product updateProduct(Long id, Product product){
        Product updatedProduct = findConcreteProduct(id);
        if (updatedProduct != null){
            if (!product.getBrand().equals("")) updatedProduct.setBrand(product.getBrand());
            if (!product.getModel().equals("")) updatedProduct.setModel(product.getModel());
            if (product.getPrice()!=null) updatedProduct.setPrice(product.getPrice());
            if (product.getRelease_year()!=null) updatedProduct.setRelease_year(product.getRelease_year());
            if (product.getMileage()!=null) updatedProduct.setMileage(product.getMileage());
            if (product.getNumber_of_owners()!=null) updatedProduct.setNumber_of_owners(product.getNumber_of_owners());
            if (!product.getColor().equals("")) updatedProduct.setColor(product.getColor());
            if (!product.getBody().equals("")) updatedProduct.setBody(product.getBody());
            if (!product.getEngine().equals("")) updatedProduct.setEngine(product.getEngine());
            if (!product.getDrive().equals("")) updatedProduct.setDrive(product.getDrive());
            if (!product.getWheel().equals("")) updatedProduct.setWheel(product.getWheel());
            if (!product.getCategory().equals("")) updatedProduct.setCategory(product.getCategory());
            if (!product.getPicture().equals("")) updatedProduct.setPicture(product.getPicture());
            save(updatedProduct);
            return updatedProduct;
        }
        else return null;
    }

    public String bookProduct(Long id){
        User user = userRepository.findByUsername(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        String email = user.getUsername();

        Product debugProduct = productRepository.findById(id).orElse(null);

        if (debugProduct.getOrder_id() == null){
            Order order = new Order();
            Product product = productRepository.findById(id).orElse(null);
            order.setProduct_id(id);
            String carInfoBrand = product.getBrand();
            String carInfoModel = product.getModel();
            order.setCarInfo(carInfoBrand + " " + carInfoModel);
            order.setUserId(user.getId());
            order.setStatus("Резерв");

            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Date date = new Date();
            order.setCreation_date(dateFormat.format(date));

            orderService.addOrder(order);

            product.setOrder_id(order.getId());
            productRepository.save(product);

            return "redirect:/api/user/account";
        }
        else {
            return "redirect:/api/products";
        }
    }

    public void save(Product product) {
        product.setPicture(parse(product.getPicture()));
        productRepository.save(product);
    }

    public Product findConcreteProduct(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product deleteProduct(Long id){
        Product product = productRepository.findById(id).orElse(null);
        if (product!=null){
            if (product.getOrder_id() != null){
                orderService.deleteOrder(product.getOrder_id());
            }
            productRepository.deleteById(id);
            return product;
        }
        else return null;
    }

    public String parse(String url){
        if(url.charAt(("https://drive.google.com/").length()) == 'u') return url;
        return "https://drive.google.com/uc?export=view&id="+url.substring(("https://drive.google.com/file/d/").length(),url.length()-"/view?usp=sharing".length());
    }
}
