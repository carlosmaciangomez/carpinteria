package com.example.carpinteria.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "Productos")
public class Productos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProducto;

    private String nombreProducto;
    private String descProducto;
    private String categoriaProducto;

    @ElementCollection
    @CollectionTable(
        name = "productos_fotosproducto",
        joinColumns = @JoinColumn(name = "producto_id")
    )
    @Column(name = "foto")
    private List<String> fotosProducto = new ArrayList<>();


    
    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getDescProducto() {
        return descProducto;
    }

    public void setDescProducto(String descProducto) {
        this.descProducto = descProducto;
    }

    public String getCategoriaProducto() {
        return categoriaProducto;
    }

    public void setCategoriaProducto(String categoriaProducto) {
        this.categoriaProducto = categoriaProducto;
    }

    public List<String> getFotosProducto() {
        return fotosProducto;
    }

    public void setFotosProducto(List<String> fotosProducto) {
        this.fotosProducto = fotosProducto;
    }

    public void addFoto(String foto) {
        this.fotosProducto.add(foto);
    }
}