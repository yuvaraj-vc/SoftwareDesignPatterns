package com.security.template.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import com.security.template.config.JwtService;
import com.security.template.repo.TokenRepo;

@Component
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {

    private final TokenRepo tokenRepo;
    private final JwtService jwtService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;

        System.out.println("Logout Functionality Called");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        jwt = authHeader.substring(7);
        String username = jwtService.extractUserName(jwt);

        if (username != null) {
            var token = tokenRepo.findByToken(jwt).orElse(null);
            if (token != null) {
                token.setExpired(true);
                token.setRevoked(true);
                tokenRepo.save(token);
            }
        }
    }
}
