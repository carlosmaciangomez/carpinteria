package com.example.carpinteria.config;

import java.io.File;

public class RutaAbsolutaTest {
    public static void main(String[] args) {
        System.out.println("Ruta absoluta: " + new File("carpinteria/uploads").getAbsolutePath());
    }
}