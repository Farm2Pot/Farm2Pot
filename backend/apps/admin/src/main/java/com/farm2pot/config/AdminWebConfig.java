package com.farm2pot.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AdminWebConfig implements WebMvcConfigurer {
    @Value("${frontend.host}")
    private String frontendHost;

    @Value("${frontend.port}")
    private String frontendPort;

    @Value("${frontend.protocol}")
    private String protocol;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(protocol + "://" + frontendHost + ":" + frontendPort)
                .allowedMethods("*")
                .allowCredentials(true); // 필요 시 true
    }
}
