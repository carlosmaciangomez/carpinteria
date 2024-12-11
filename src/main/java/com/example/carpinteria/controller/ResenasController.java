package com.example.carpinteria.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.carpinteria.entity.Resenas;
import com.example.carpinteria.service.ResenasService;

@RestController
@RequestMapping("/api/resenas")
public class ResenasController {

    private final ResenasService resenasService;

    @Autowired
    public ResenasController(ResenasService resenasService) {
        this.resenasService = resenasService;
    }

    @PostMapping("/crear")
    public ResponseEntity<Map<String, String>> crearResena(@RequestBody Resenas resena) {
        if (resena.getFechaResena() == null) {
            resena.setFechaResena(Date.valueOf(LocalDate.now()));
        }
        resena.setEstadoResena("W");

        resenasService.saveResena(resena);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Reseña creada con éxito");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public List<Resenas> obtenerResenas(@RequestParam(value = "estado", defaultValue = "A") String estado) {
        return resenasService.findByEstado(estado);
    }

    @GetMapping("/todas")
    public List<Resenas> obtenerTodasLasResenas() {
        return resenasService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resenas> obtenerResena(@PathVariable int id) {
        Resenas resena = resenasService.findById(id);
        if (resena == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resena);
    }

}