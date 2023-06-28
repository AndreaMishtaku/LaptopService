package com.project.laptopservice.model.enums;


import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.NUMBER)
public enum TicketStatus {
    OPEN,
    CLOSED
}
