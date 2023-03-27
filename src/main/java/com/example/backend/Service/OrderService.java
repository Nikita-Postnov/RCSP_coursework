package com.example.backend.Service;

import com.example.backend.Entity.Order;
import com.example.backend.Entity.Product;
import com.example.backend.Repository.OrderRepository;
import com.example.backend.Repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order addOrder(Order order){
        return orderRepository.save(order);
    }

    public List<Order> allOrders() {
        List <Order> order = orderRepository.findAll();
        order.sort(Comparator.comparingInt(Order::getId));
        return order;
    }

    public Order updateOrder(Integer id, Order order){
        Order updatedOrder = findConcreteOrder(id);
        if (updatedOrder != null){
            if (!order.getStatus().equals("")) updatedOrder.setStatus(order.getStatus());
            return orderRepository.save(updatedOrder);
        }
        else return null;
    }

    public Order findOrder(Integer id){
        return orderRepository.findOrderById(id);
    }

    public Order deleteOrder(Integer id){
        Order order = orderRepository.findById(id).orElse(null);
        if (order!=null){
            Product product = productRepository.findById(order.getProduct_id()).orElse(null);
            product.setOrder_id(null);
            productRepository.save(product);
            orderRepository.deleteById(id);
            return order;
        }
        else return null;
    }

    public Order findConcreteOrder(Integer id) {
        return orderRepository.findOrderById(id);
    }
}

