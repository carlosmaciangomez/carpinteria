package com.example.carpinteria.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.carpinteria.entity.Productos;

@Repository
public interface ProductosRepository extends JpaRepository<Productos, Integer> {
}