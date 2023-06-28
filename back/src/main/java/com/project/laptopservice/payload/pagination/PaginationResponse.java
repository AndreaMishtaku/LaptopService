package com.project.laptopservice.payload.pagination;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class PaginationResponse <T>{
    private List<Column> columns;
    private List<T> rows;
    private int pageNumber;
    private int pageSize;
    private Long rowCount;
    private boolean hasNext;
    private boolean hasPrevious;
}
