package com.test.security.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Applies this rule to all endpoints in your application.
                .allowedOrigins("http://localhost:3000") // The "origin" of your front-end application.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Which HTTP methods are allowed.
                .allowedHeaders("*") // Which headers are allowed.
                .allowCredentials(true); // Allows cookies and authorization headers.
    }
}
