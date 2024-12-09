package com.example.carpinteria.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadsDir = "file:/ruta/absoluta/a/carpinteria/uploads/";

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("C:/Users/Carlos/Desktop/carpinteria/carpinteria/uploads");
    }
}