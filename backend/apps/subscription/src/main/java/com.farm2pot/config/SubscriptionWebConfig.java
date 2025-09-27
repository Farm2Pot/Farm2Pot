package com.farm2pot.config;

/**
 * packageName    : config
 * fileName       : CorsConfig
 * author         : Administrator
 * date           : 2025-09-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-09-20        Administrator       최초 생성
 */
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SubscriptionWebConfig implements WebMvcConfigurer {
    @Value("${frontend.user-url}")
    private String frontend_user_url;

    @Value("${frontend.admin-url}")
    private String frontend_admin_url;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(frontend_admin_url, frontend_user_url)
                .allowedMethods("*")
                .allowCredentials(true); // 필요 시 true
    }
}
