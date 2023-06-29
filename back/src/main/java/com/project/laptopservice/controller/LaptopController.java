package com.project.laptopservice.controller;


import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.laptop.LaptopRequestDto;
import com.project.laptopservice.payload.laptop.LaptopResponseDto;
import com.project.laptopservice.payload.pagination.PaginationRequest;
import com.project.laptopservice.payload.pagination.PaginationResponse;
import com.project.laptopservice.service.ILaptopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/laptop")
@RequiredArgsConstructor
public class LaptopController {

    private final ILaptopService laptopService;

    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<ActionSuccessful> addLaptop(@RequestBody LaptopRequestDto laptopRequestDto){
        return ResponseEntity.ok(laptopService.create(laptopRequestDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<ActionSuccessful> updateLaptop(@PathVariable(name="id") Long id,@RequestBody LaptopRequestDto laptopRequestDto){
        return ResponseEntity.ok(laptopService.update(id,laptopRequestDto));
    }

    @GetMapping("/list")
    public ResponseEntity<List<LaptopResponseDto>> getAll(){
        return ResponseEntity.ok(laptopService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LaptopResponseDto> getLaptopById(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(laptopService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ActionSuccessful> deleteLaptop(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(laptopService.delete(id));
    }

    @PostMapping("/get-all")
    public ResponseEntity<PaginationResponse<LaptopResponseDto>> getAllWithPagination(@RequestBody PaginationRequest paginationRequest){
        return ResponseEntity.ok(laptopService.getAllWithPagination(paginationRequest));
    }
}
