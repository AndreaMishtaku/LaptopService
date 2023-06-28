package com.project.laptopservice.model.enums;



public enum Role {
    ADMIN("Admin"),
    CLIENT("Client");

    private final String name;

    Role(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
