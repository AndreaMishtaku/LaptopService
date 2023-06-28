package com.project.laptopservice.payload.pagination;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Filter {
    private String key;
    private Operation operation;
    private Object value;

}
