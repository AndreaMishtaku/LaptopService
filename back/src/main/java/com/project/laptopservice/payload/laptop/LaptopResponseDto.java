package com.project.laptopservice.payload.laptop;

import com.project.laptopservice.model.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class LaptopResponseDto {
    private Long id;
    private String type;
    private String model;
    private String producedAt;
    private String createdAt;
    private String updatedAt;
    private String user;


    public void setUser(User user){
        this.user=user!=null?user.getFirstName()+" "+user.getLastName():null;
    }
}
