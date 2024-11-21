package com.example.carpinteria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.carpinteria.entity.Usuario;
import com.example.carpinteria.service.UsuarioService;

@RestController
@RequestMapping("/submit_registration")
public class RegistroController {

    private final UsuarioService usuarioService;

    public RegistroController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<String> registrarUsuario(
            @RequestParam("nombre") String nombre,
            @RequestParam("apellidos") String apellidos,
            @RequestParam("correo") String correo,
            @RequestParam("contrasena") String contrasena,
            @RequestParam("telefono") String telefono,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen) {

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombreUsuario(nombre);
        nuevoUsuario.setApellidosUsuario(apellidos);
        nuevoUsuario.setCorreoUsuario(correo);
        nuevoUsuario.setContrasenaUsuario(contrasena);
        nuevoUsuario.setTelefonoUsuario(Integer.parseInt(telefono));


        if (imagen != null && !imagen.isEmpty()) {
            System.out.println("Imagen subida: " + imagen.getOriginalFilename());
        }

        usuarioService.saveUsuario(nuevoUsuario);

        return ResponseEntity.ok("Usuario registrado con éxito");
    }
}
