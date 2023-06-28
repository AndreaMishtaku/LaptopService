package com.project.laptopservice.payload.ticket;

import com.project.laptopservice.model.Laptop;
import com.project.laptopservice.model.LaptopPart;
import com.project.laptopservice.model.enums.TicketStatus;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TicketResponseDto {
    private Long id;
    private String description;
    private TicketStatus status;
    private String laptop;
    private String laptopPart;
    private String createdAt;
    private String closedAt;
    private Long userId;


    public void setLaptop(Laptop laptop){
        this.laptop= laptop!=null?laptop.getType()+" "+laptop.getModel():null;

    }
    public void setLaptopPart(LaptopPart laptopPart){
        this.laptopPart= laptopPart!=null?laptopPart.getName():null;
    }

    public void setUserId(Laptop laptop){
        this.userId=laptop!=null?laptop.getUser().getId():null;
    }
}
