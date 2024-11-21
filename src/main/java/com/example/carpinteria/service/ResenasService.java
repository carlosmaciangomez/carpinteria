package com.example.carpinteria.service;

import com.example.carpinteria.entity.Resenas;
import com.example.carpinteria.repository.ResenasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class ResenasService {

    private final ResenasRepository resenasRepository;

    @Autowired
    public ResenasService(ResenasRepository resenasRepository) {
        this.resenasRepository = resenasRepository;
    }

    public Resenas saveResena(Resenas resena) {
        if (resena.getFechaResena() == null) {
            resena.setFechaResena(Date.valueOf(LocalDate.now()));
        }
        return resenasRepository.save(resena);
    }

    public List<Resenas> findByEstado(String estado) {
        return resenasRepository.findByEstadoResena(estado);
    }
    
    public Resenas findById(int id) {
        return resenasRepository.findById(id).orElse(null);
    }
}
