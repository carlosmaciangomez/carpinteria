package com.example.carpinteria;

//import java.nio.file.Paths;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
/*
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
*/

@SpringBootApplication
public class CarpinteriaApplication {
    public static void main(String[] args) {
        SpringApplication.run(CarpinteriaApplication.class, args);
    }

        /*
    @Bean
        public WebMvcConfigurer configurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addResourceHandlers(ResourceHandlerRegistry registry) {
                    registry.addResourceHandler("/uploads/**")
                            .addResourceLocations("classpath:/static/uploads/");
                }
            };
        }
    */
}

/*
@RestController
class FileController {

    @GetMapping("/uploads/{filename}")
    public Path getFile(@PathVariable String filename) {
        return Paths.get("classpath:/static/uploads/" + filename);
    }
}
*/