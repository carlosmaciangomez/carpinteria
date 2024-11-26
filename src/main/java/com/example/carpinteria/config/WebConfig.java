package com.example.carpinteria.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configura la carpeta 'uploads' como un recurso estático
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:carpinteria/uploads/");
    }
}