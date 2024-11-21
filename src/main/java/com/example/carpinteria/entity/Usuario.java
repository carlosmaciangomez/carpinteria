package com.example.carpinteria.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUsuario") // Nombre de la columna en la base de datos
    private int idUsuario;

    @Column(name = "nombreUsuario")
    private String nombreUsuario;

    @Column(name = "apellidosUsuario")
    private String apellidosUsuario;

    @Column(name = "correoUsuario")
    private String correoUsuario;

    @Column(name = "contrasenaUsuario")
    private String contrasenaUsuario;

    @Column(name = "telefonoUsuario")
    private int telefonoUsuario;

    @Column(name = "estadoUsuario", nullable = false)
    private String estadoUsuario = "A";

    @Column(name = "rolUsuario", nullable = false)
    private String rolUsuario = "C";

    public Usuario() {
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getApellidosUsuario() {
        return apellidosUsuario;
    }

    public void setApellidosUsuario(String apellidosUsuario) {
        this.apellidosUsuario = apellidosUsuario;
    }

    public String getCorreoUsuario() {
        return correoUsuario;
    }

    public void setCorreoUsuario(String correoUsuario) {
        this.correoUsuario = correoUsuario;
    }

    public String getContrasenaUsuario() {
        return contrasenaUsuario;
    }

    public void setContrasenaUsuario(String contrasenaUsuario) {
        this.contrasenaUsuario = contrasenaUsuario;
    }

    public int getTelefonoUsuario() {
        return telefonoUsuario;
    }

    public void setTelefonoUsuario(int telefonoUsuario) {
        this.telefonoUsuario = telefonoUsuario;
    }

    public String getEstadoUsuario() {
        return estadoUsuario;
    }

    public void setEstadoUsuario(String estadoUsuario) {
        this.estadoUsuario = estadoUsuario;
    }

    public String getRolUsuario() {
        return rolUsuario;
    }

    public void setRolUsuario(String rolUsuario) {
        this.rolUsuario = rolUsuario;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id_Usuario=" + idUsuario +
                ", nombreUsuario='" + nombreUsuario + '\'' +
                ", apellidosUsuario='" + apellidosUsuario + '\'' +
                ", correoUsuario='" + correoUsuario + '\'' +
                ", telefonoUsuario=" + telefonoUsuario +
                ", estadoUsuario='" + estadoUsuario + '\'' +
                ", rolUsuario='" + rolUsuario + '\'' +
                '}';
    }
}