package com.portfolio.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Configuration
@EnableWebSecurity
@Primary
public class WebSecurityConfig {

    @Value("${cors.allowed-origins:}")
    private String allowedOrigins;

    @Value("${cors.allowed-origin-patterns:}")
    private String allowedOriginPatterns;

    @Bean
    @Primary
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/contact/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().permitAll()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());
        
        return http.build();
    }

    @Bean
    @Primary
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        List<String> origins = normalizeOrigins(allowedOrigins);
        List<String> patterns = normalizeOrigins(allowedOriginPatterns);
        if (!origins.isEmpty()) {
            configuration.setAllowedOrigins(origins);
        }
        if (!patterns.isEmpty()) {
            configuration.setAllowedOriginPatterns(patterns);
        }
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }

    private List<String> normalizeOrigins(String rawOrigins) {
        if (rawOrigins == null || rawOrigins.trim().isEmpty()) {
            return List.of();
        }

        String[] parts = rawOrigins.split(",");
        Set<String> normalized = new LinkedHashSet<>();
        for (String part : parts) {
            String origin = part.trim();
            if (origin.isEmpty()) {
                continue;
            }
            if ((origin.startsWith("\"") && origin.endsWith("\"")) || (origin.startsWith("'") && origin.endsWith("'"))) {
                origin = origin.substring(1, origin.length() - 1).trim();
            }
            if (origin.endsWith("/") && origin.length() > 1) {
                origin = origin.substring(0, origin.length() - 1);
            }
            if (!origin.isEmpty()) {
                normalized.add(origin);
            }
        }

        return new ArrayList<>(normalized);
    }

    @Bean
    @Primary
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Primary
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
} 
