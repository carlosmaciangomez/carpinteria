/*package com.example.carpinteria.config;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashExample {
    public static String hashString(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes());

            // Convertir bytes a hexadecimal
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al hashear el string", e);
        }
    }

    public static void main(String[] args) {
        String original = "hola";
        System.out.println("Original: " + original);
        System.out.println("Hash: " + hashString(original));
    }
}*/