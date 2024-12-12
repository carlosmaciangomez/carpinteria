package com.example.carpinteria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.carpinteria.entity.Productos;
import com.example.carpinteria.repository.ProductosRepository;

@Service
public class ProductosService {

    @Autowired
    private ProductosRepository productosRepository;

    public List<Productos> obtenerTodosLosProductos() {
        return productosRepository.findAll();
    }

    public Productos guardarProducto(Productos producto) {
        return productosRepository.save(producto);
    }

    public boolean eliminarProductoPorId(int idProducto) {
        if (productosRepository.existsById(idProducto)) {
            productosRepository.deleteById(idProducto);
            return true;
        }
        return false;
    }
}