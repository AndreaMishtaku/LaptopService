package com.project.laptopservice.controller;

import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.laptop_part.LaptopPartDto;
import com.project.laptopservice.payload.laptop_part.StockDto;
import com.project.laptopservice.payload.pagination.PaginationRequest;
import com.project.laptopservice.payload.pagination.PaginationResponse;
import com.project.laptopservice.service.ILaptopPartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/laptop-part")
@RequiredArgsConstructor
public class LaptopPartController {

    private final ILaptopPartService laptopPartService;

    @PostMapping
    //@PreAuthorize("hasRole('Admin')")
    public ResponseEntity<ActionSuccessful> addLaptopPart(@RequestBody LaptopPartDto laptopPartDto){
        return ResponseEntity.ok(laptopPartService.create(laptopPartDto));
    }

    @PutMapping("/{id}")
    //@PreAuthorize("hasRole('Admin')")
    public ResponseEntity<ActionSuccessful> updateLaptopPart(@PathVariable(name="id") Long id,@RequestBody LaptopPartDto laptopPartDto){
        return ResponseEntity.ok(laptopPartService.update(id,laptopPartDto));
    }

    @GetMapping("/list")
    public ResponseEntity<List<LaptopPartDto>> getAll(){
        return ResponseEntity.ok(laptopPartService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LaptopPartDto> getLaptopPartById(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(laptopPartService.getById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<ActionSuccessful> deleteLaptopPart(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(laptopPartService.delete(id));
    }

    @PutMapping("/{id}/update-stock")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<ActionSuccessful> updateStock(@PathVariable(name="id") Long id, @RequestBody StockDto stockDto){
        return ResponseEntity.ok(laptopPartService.addStock(id,stockDto));
    }

    @PostMapping("/get-all")
    //@PreAuthorize("hasRole('Admin')")
    public ResponseEntity<PaginationResponse<LaptopPartDto>> getAllWithPagination(@RequestBody PaginationRequest paginationRequest){
        return ResponseEntity.ok(laptopPartService.getAllWithPagination(paginationRequest));
    }

}