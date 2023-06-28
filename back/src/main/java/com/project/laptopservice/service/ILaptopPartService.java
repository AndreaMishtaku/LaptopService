package com.project.laptopservice.service;

import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.laptop_part.LaptopPartDto;
import com.project.laptopservice.payload.laptop_part.StockDto;
import com.project.laptopservice.payload.pagination.PaginationRequest;
import com.project.laptopservice.payload.pagination.PaginationResponse;
import java.util.List;

public interface ILaptopPartService {

    ActionSuccessful create(LaptopPartDto laptopPartDto);

    ActionSuccessful update(Long id,LaptopPartDto laptopPartDto);

    List<LaptopPartDto> getAll();

    LaptopPartDto getById(Long id);

    ActionSuccessful delete(Long id);

    ActionSuccessful addStock(Long id, StockDto stockDto);

    PaginationResponse<LaptopPartDto> getAllWithPagination(PaginationRequest paginationRequest);

}
