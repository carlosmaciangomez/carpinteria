package com.example.carpinteria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carpinteria.entity.Mensajes;

public interface MensajesRepository extends JpaRepository<Mensajes, Integer> {
}