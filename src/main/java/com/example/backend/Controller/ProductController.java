package com.example.backend.Controller;

import com.example.backend.Entity.Order;
import com.example.backend.Entity.Product;
import com.example.backend.Entity.User;
import com.example.backend.Model.ProfileResponse;
import com.example.backend.Service.ProductService;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/api/products")
    public List<Product> getAllProducts(){
        return productService.findAll();
    }

    @GetMapping("/api/products/{id}")
    public Product showConcreteProduct(@PathVariable Long id){
        return productService.findConcreteProduct(id);
    }
}



