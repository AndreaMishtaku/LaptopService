package com.project.laptopservice.payload.user;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserRegisterDto {
    private String firstName;
    private String lastName;
    private String address;
    private String education;
    private LocalDate birthday;
    private String email;
    private String password;
}
