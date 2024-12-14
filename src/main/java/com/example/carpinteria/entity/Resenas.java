package com.example.carpinteria.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Resenas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idResena;

    private String tituloResena;
    private String descripcionResena;
    private Date fechaResena;
    private int valoracionResena;
    private String estadoResena;
    private int idUsuario;

    @Lob
    private List<String> fotosResena;

    private String comentarioAdmin;

    public int getIdResena() {
        return idResena;
    }

    public void setIdResena(int idResena) {
        this.idResena = idResena;
    }

    public String getTituloResena() {
        return tituloResena;
    }

    public void setTituloResena(String tituloResena) {
        this.tituloResena = tituloResena;
    }

    public String getDescripcionResena() {
        return descripcionResena;
    }

    public void setDescripcionResena(String descripcionResena) {
        this.descripcionResena = descripcionResena;
    }

    public Date getFechaResena() {
        return fechaResena;
    }

    public void setFechaResena(Date fechaResena) {
        this.fechaResena = fechaResena;
    }

    public int getValoracionResena() {
        return valoracionResena;
    }

    public void setValoracionResena(int valoracionResena) {
        this.valoracionResena = valoracionResena;
    }

    public String getEstadoResena() {
        return estadoResena;
    }

    public void setEstadoResena(String estadoResena) {
        this.estadoResena = estadoResena;
    }

    public List<String> getFotosResena() {
        return fotosResena;
    }

    public void setFotosResena(List<String> fotosResena) {
        this.fotosResena = fotosResena;
    }

    public String getComentarioAdmin() {
        return comentarioAdmin;
    }

    public void setComentarioAdmin(String comentarioAdmin) {
        this.comentarioAdmin = comentarioAdmin;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }
}