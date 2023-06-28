package com.project.laptopservice.payload;

import lombok.Getter;


@Getter
public class ActionFailed {

    private String message;
    private String details;

    public ActionFailed(String message, String details) {

        this.message = message;
        this.details = details;
    }
}
