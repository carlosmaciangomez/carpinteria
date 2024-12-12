package com.example.carpinteria.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.carpinteria.entity.Productos;
import com.example.carpinteria.service.ProductosService;

@RestController
@RequestMapping("/api/productos")
public class ProductosController {

    @Autowired
    private ProductosService productosService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // Obtener todos los productos
    @GetMapping
    public ResponseEntity<List<Productos>> obtenerTodosLosProductos() {
        return ResponseEntity.ok(productosService.obtenerTodosLosProductos());
    }

    // Crear un producto con fotos
    @PostMapping
    public ResponseEntity<?> crearProducto(
            @RequestParam String nombreProducto,
            @RequestParam String descProducto,
            @RequestParam String categoriaProducto,
            @RequestParam("fotosProducto") List<MultipartFile> fotosProducto) {
        try {
            String uploadDir = "uploads";

            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

            List<String> fotosGuardadas = new ArrayList<>();
            for (MultipartFile foto : fotosProducto) {
                String fileName = foto.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + File.separator + fileName);

                Files.copy(foto.getInputStream(), filePath);

                fotosGuardadas.add(fileName);
            }

            Productos nuevoProducto = new Productos();
            nuevoProducto.setNombreProducto(nombreProducto);
            nuevoProducto.setDescProducto(descProducto);
            nuevoProducto.setCategoriaProducto(categoriaProducto);
            nuevoProducto.setFotosProducto(fotosGuardadas);

            productosService.guardarProducto(nuevoProducto);

            return ResponseEntity.ok(Map.of("mensaje", "Producto creado con éxito"));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Error al guardar las fotos: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{idProducto}")
    public ResponseEntity<?> eliminarProducto(@PathVariable int idProducto) {
        boolean eliminado = productosService.eliminarProductoPorId(idProducto);
        if (eliminado) {
            return ResponseEntity.ok(Map.of("mensaje", "Producto eliminado con éxito"));
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "Producto no encontrado"));
        }
    }
}