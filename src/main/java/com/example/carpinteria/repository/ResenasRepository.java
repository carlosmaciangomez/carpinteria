package com.example.carpinteria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.carpinteria.entity.Resenas;

@Repository
public interface ResenasRepository extends JpaRepository<Resenas, Integer> {
    List<Resenas> findByEstadoResena(String estadoResena);
}