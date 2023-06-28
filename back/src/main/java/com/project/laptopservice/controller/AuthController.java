package com.project.laptopservice.controller;

import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.user.LoginRequest;
import com.project.laptopservice.payload.user.LoginResponse;
import com.project.laptopservice.payload.user.UserRegisterDto;
import com.project.laptopservice.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;

    @PostMapping("/login")
    public LoginResponse login( @RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    public ActionSuccessful register( @RequestBody UserRegisterDto registerData) {
        return authService.register(registerData);
    }
}