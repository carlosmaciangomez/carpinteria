package com.example.carpinteria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.carpinteria.entity.Mensajes;
import com.example.carpinteria.service.MensajesService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/mensajes")
public class MensajesController {

    private final MensajesService mensajesService;

    @Autowired
    public MensajesController(MensajesService mensajesService) {
        this.mensajesService = mensajesService;
    }

    @PostMapping("/send_message")
    public ResponseEntity<Map<String, String>> enviarMensaje(@RequestBody Mensajes mensaje) {
        mensajesService.guardarMensaje(mensaje);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Mensaje enviado con éxito");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Mensajes>> getAllMensajes() {
        List<Mensajes> mensajes = mensajesService.getAllMensajes();
        return ResponseEntity.ok(mensajes);
    }
}