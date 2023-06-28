package com.project.laptopservice.mapper;

import com.project.laptopservice.model.LaptopPart;
import com.project.laptopservice.payload.laptop_part.LaptopPartDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LaptopPartMapper {
    @Mapping(target = "createdAt",ignore = true)
    @Mapping(target = "updatedAt",ignore = true)
    LaptopPart map(LaptopPartDto laptopPartDto);
    LaptopPartDto map(LaptopPart laptopPart);
    List<LaptopPartDto> map(List<LaptopPart> laptopPartList);
    @Mapping(target = "id",ignore = true)
    void update(LaptopPartDto laptopPartDto, @MappingTarget LaptopPart laptopPart);
}
