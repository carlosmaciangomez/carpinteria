package com.example.carpinteria.service;

import com.example.carpinteria.entity.Mensajes;
import com.example.carpinteria.repository.MensajesRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MensajesService {

    private final MensajesRepository mensajesRepository;

    @Autowired
    public MensajesService(MensajesRepository mensajesRepository) {
        this.mensajesRepository = mensajesRepository;
    }

    public void guardarMensaje(Mensajes mensaje) {
        mensajesRepository.save(mensaje);
    }

    public List<Mensajes> getAllMensajes() {
        return mensajesRepository.findAll();
    }
}