package com.project.laptopservice.payload.pagination;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaginationRequest {
    private Integer pageNumber;
    private Integer pageSize;
    private List<Filter> filters;
    private Order order;
    private String search;
}
