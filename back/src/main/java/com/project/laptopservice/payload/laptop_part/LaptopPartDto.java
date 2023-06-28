package com.project.laptopservice.payload.laptop_part;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LaptopPartDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String createdAt;
    private String updatedAt;
}
