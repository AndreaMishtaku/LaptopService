package com.project.laptopservice.security;

import com.project.laptopservice.exception.AppException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration-milliseconds}")
    private int jwtExpirationInMs;

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expiredDate = new Date(currentDate.getTime() + this.jwtExpirationInMs);

        CustomUserDetails userDetails= (CustomUserDetails)authentication.getPrincipal();


        String accessToken = Jwts.builder()
                .setSubject(username)
                .claim("id",userDetails.getId())
                .claim("first_name",userDetails.getFirstName())
                .claim("last_name",userDetails.getLastName())
                .claim("email",userDetails.getEmail())
                .claim("role",userDetails.getRole().getName())
                .setIssuedAt(currentDate)
                .setExpiration(expiredDate)
                .signWith(SignatureAlgorithm.HS256, this.jwtSecret)
                .compact();

        return accessToken;
    }

    public String getEmailFromToken(String token)
    {
        Claims claims = Jwts.parser()
                .setSigningKey(this.jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token)
    {
        try {
            Jwts.parser().setSigningKey(this.jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException signatureException) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Invalid JWT signature");
        } catch (MalformedJwtException malformedJwtException) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Invalid JWT token");
        } catch (ExpiredJwtException expiredJwtException) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Expired JWT token");
        } catch (UnsupportedJwtException unsupportedJwtException) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Unsupported JWT token");
        } catch (IllegalArgumentException illegalArgumentException) {
            throw new AppException(HttpStatus.BAD_REQUEST, "JWT claims string is empty");
        }
    }
}
