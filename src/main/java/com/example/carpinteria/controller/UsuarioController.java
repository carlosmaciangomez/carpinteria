package com.example.carpinteria.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.example.carpinteria.entity.Usuario;
import com.example.carpinteria.service.UsuarioService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Integer idUsuario) {
        Optional<Usuario> usuarioOpt = usuarioService.findById(idUsuario);

        if (usuarioOpt.isPresent()) {
            return ResponseEntity.ok(usuarioOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/usuario")
    public void createUsuario(
            @RequestParam("nombre") String nombre,
            @RequestParam("apellidos") String apellidos,
            @RequestParam("correo") String correo,
            @RequestParam("contrasena") String contrasena,
            @RequestParam("telefono") String telefono,
            HttpServletResponse response) throws IOException {

        try {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(contrasena);

            Usuario nuevoUsuario = new Usuario();
            nuevoUsuario.setNombreUsuario(nombre);
            nuevoUsuario.setApellidosUsuario(apellidos);
            nuevoUsuario.setCorreoUsuario(correo);
            nuevoUsuario.setContrasenaUsuario(hashedPassword);
            nuevoUsuario.setTelefonoUsuario(Integer.parseInt(telefono));
            nuevoUsuario.setEstadoUsuario("A");
            nuevoUsuario.setRolUsuario("C");

            usuarioService.saveUsuario(nuevoUsuario);
            response.sendRedirect("/login.html");
        } catch (MaxUploadSizeExceededException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "El tamaño del archivo excede el límite permitido.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUsuario(
            @RequestParam("correo") String correo,
            @RequestParam("contrasena") String contrasena) {

        Usuario usuario = usuarioService.findByCorreo(correo);

        if (usuario != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(contrasena, usuario.getContrasenaUsuario())) {
                Map<String, String> response = new HashMap<>();
                response.put("rolUsuario", usuario.getRolUsuario());
                response.put("nombreUsuario", usuario.getNombreUsuario());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/{idUsuario}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Integer idUsuario,
            @RequestBody Usuario usuarioActualizado) {
        Optional<Usuario> usuarioExistenteOpt = usuarioService.findById(idUsuario);
        if (usuarioExistenteOpt.isPresent()) {
            Usuario usuarioExistente = usuarioExistenteOpt.get();

            usuarioExistente.setNombreUsuario(usuarioActualizado.getNombreUsuario());
            usuarioExistente.setApellidosUsuario(usuarioActualizado.getApellidosUsuario());
            usuarioExistente.setCorreoUsuario(usuarioActualizado.getCorreoUsuario());
            usuarioExistente.setContrasenaUsuario(usuarioActualizado.getContrasenaUsuario());
            usuarioExistente.setTelefonoUsuario(usuarioActualizado.getTelefonoUsuario());
            usuarioExistente.setEstadoUsuario(usuarioActualizado.getEstadoUsuario());
            usuarioExistente.setRolUsuario(usuarioActualizado.getRolUsuario());

            usuarioService.saveUsuario(usuarioExistente);
            return ResponseEntity.ok(usuarioExistente);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @DeleteMapping("/eliminarUsuario/{idUsuario}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Integer idUsuario) {
        Optional<Usuario> usuarioOpt = usuarioService.findById(idUsuario);
        if (usuarioOpt.isPresent()) {
            usuarioService.deleteUsuario(idUsuario);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
