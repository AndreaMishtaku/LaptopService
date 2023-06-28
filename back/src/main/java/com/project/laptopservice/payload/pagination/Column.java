package com.project.laptopservice.payload.pagination;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Column {
    private String name;
    private String field;
    private DataType type;
    private String filterProperty;
    private Boolean orderable;
    private Boolean hidden;
}
