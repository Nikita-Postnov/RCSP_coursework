package com.example.backend.Controller;

import com.example.backend.Entity.User;
import com.example.backend.Model.LoginInput;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    public String addUser(@RequestBody User userForm) {
        userService.saveUser(userForm);
        return "redirect:/login";
    }

    @PostMapping("/login")
    ResponseEntity<String> auth(@RequestBody LoginInput loginInput) {
        return userService.login(loginInput);
    }
}