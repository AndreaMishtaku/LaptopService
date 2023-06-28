package com.project.laptopservice.service.impl;

import com.project.laptopservice.exception.AppException;
import com.project.laptopservice.exception.ResourceNotFoundException;
import com.project.laptopservice.model.User;
import com.project.laptopservice.model.enums.Role;
import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.user.LoginRequest;
import com.project.laptopservice.payload.user.LoginResponse;
import com.project.laptopservice.payload.user.UserRegisterDto;
import com.project.laptopservice.repository.UserRepository;
import com.project.laptopservice.security.JwtTokenProvider;
import com.project.laptopservice.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    private final PasswordEncoder passwordEncoder;
    @Override
    public LoginResponse login(LoginRequest login) {
        Authentication authentication= this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwtToken= this.jwtTokenProvider.generateToken(authentication);

        return new LoginResponse(jwtToken);
    }

    @Override
    public ActionSuccessful register(UserRegisterDto registerData) {
        Optional<User> existingUser = userRepository.findByEmail(registerData.getEmail());
        if (existingUser.isPresent()) {
            throw new AppException(HttpStatus.FORBIDDEN,"Sorry this email is registered");
        }

        User user=new User();
        user.setFirstName(registerData.getFirstName());
        user.setLastName(registerData.getLastName());
        user.setEmail(registerData.getEmail());
        user.setBirthday(registerData.getBirthday());
        user.setAddress(registerData.getAddress());
        user.setEducation(registerData.getEducation());
        user.setRole(Role.CLIENT);
        user.setPassword(passwordEncoder.encode(registerData.getPassword()));

        userRepository.save(user);

        return new ActionSuccessful(true,"User registered successfully");
    }
}
