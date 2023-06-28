package com.project.laptopservice.mapper;

import com.project.laptopservice.model.Laptop;
import com.project.laptopservice.payload.laptop.LaptopRequestDto;
import com.project.laptopservice.payload.laptop.LaptopResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LaptopMapper {
    Laptop map(LaptopRequestDto laptopRequestDto);
    LaptopResponseDto map(Laptop laptop);
    List<LaptopResponseDto> map(List<Laptop> laptopList);
    void update(LaptopRequestDto laptopRequestDto, @MappingTarget Laptop laptop);
}
