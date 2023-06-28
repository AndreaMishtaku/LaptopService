package com.project.laptopservice.service;

import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.user.LoginRequest;
import com.project.laptopservice.payload.user.LoginResponse;
import com.project.laptopservice.payload.user.UserRegisterDto;

public interface IAuthService {
    LoginResponse login(LoginRequest login);

    ActionSuccessful register(UserRegisterDto registerData);
}
