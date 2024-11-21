package com.example.carpinteria.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Mensajes {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idMensaje;

    private String correoContacto;
    private String asuntoMensaje;
    private String textoMensaje;
    private String correoUsuario;
    
    public int getIdMensaje() {
        return idMensaje;
    }

    public void setIdMensaje(int idMensaje) {
        this.idMensaje = idMensaje;
    }

    public String getCorreoContacto() {
        return correoContacto;
    }

    public void setCorreoContacto(String correoContacto) {
        this.correoContacto = correoContacto;
    }

    public String getAsuntoMensaje() {
        return asuntoMensaje;
    }

    public void setAsuntoMensaje(String asuntoMensaje) {
        this.asuntoMensaje = asuntoMensaje;
    }

    public String getTextoMensaje() {
        return textoMensaje;
    }

    public void setTextoMensaje(String textoMensaje) {
        this.textoMensaje = textoMensaje;
    }

    public String getCorreoUsuario() {
        return correoUsuario;
    }

    public void setCorreoUsuario(String correoUsuario) {
        this.correoUsuario = correoUsuario;
    }
}