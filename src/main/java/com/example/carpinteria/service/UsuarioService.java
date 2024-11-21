package com.example.carpinteria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.carpinteria.entity.Usuario;
import com.example.carpinteria.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Optional<Usuario> findById(Integer idUsuario) {
        return usuarioRepository.findById(idUsuario);
    }
    
    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario); 
    }

    public void deleteUsuario(Integer idUsuario) {
        usuarioRepository.deleteById(idUsuario);
    }

    public Usuario findByCorreo(String correo) {
        return usuarioRepository.findByCorreoUsuario(correo);
    }    

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }
}