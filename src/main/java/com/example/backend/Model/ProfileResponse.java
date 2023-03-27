package com.example.backend.Model;

import com.example.backend.Entity.Order;
import com.example.backend.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProfileResponse {
    User user;
    List<Order> orders;
}
