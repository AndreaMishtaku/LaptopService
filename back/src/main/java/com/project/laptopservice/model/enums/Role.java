package com.project.laptopservice.model.enums;



public enum Role {
    ADMIN("ROLE_ADMIN"),
    CLIENT("ROLE_CLIENT");

    private final String name;

    Role(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
