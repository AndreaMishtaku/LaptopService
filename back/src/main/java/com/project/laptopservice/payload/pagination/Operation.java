package com.project.laptopservice.payload.pagination;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.NUMBER)
public enum Operation {
    EQUAL,
    LIKE ,
    GREATER_THAN ,
    LESS_THAN
}

