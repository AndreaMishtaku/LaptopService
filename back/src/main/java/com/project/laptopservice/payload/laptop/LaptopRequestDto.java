package com.project.laptopservice.payload.laptop;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class LaptopRequestDto {
    private String type;
    private String model;
    private LocalDate producedAt;
}
