package com.project.laptopservice.payload.ticket;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TicketRequestDto {
    private String description;
    private Long laptopId;
    private Long laptopPartId;
}
