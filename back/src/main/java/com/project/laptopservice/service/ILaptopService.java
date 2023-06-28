package com.project.laptopservice.service;

import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.laptop.LaptopRequestDto;
import com.project.laptopservice.payload.laptop.LaptopResponseDto;
import com.project.laptopservice.payload.pagination.PaginationRequest;
import com.project.laptopservice.payload.pagination.PaginationResponse;
import java.util.List;

public interface ILaptopService {
    ActionSuccessful create(LaptopRequestDto laptopRequestDto);

    ActionSuccessful update(Long id,LaptopRequestDto laptopRequestDto);

    List<LaptopResponseDto> getAll();

    LaptopResponseDto getById(Long id);

    ActionSuccessful delete(Long id);

    PaginationResponse<LaptopResponseDto> getAllWithPagination(PaginationRequest paginationRequest);
}
