package com.project.laptopservice.service.impl;

import com.project.laptopservice.exception.ForbiddenException;
import com.project.laptopservice.exception.ResourceNotFoundException;
import com.project.laptopservice.mapper.LaptopPartMapper;
import com.project.laptopservice.model.LaptopPart;
import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.laptop_part.LaptopPartDto;
import com.project.laptopservice.payload.laptop_part.StockDto;
import com.project.laptopservice.payload.pagination.Column;
import com.project.laptopservice.payload.pagination.DataType;
import com.project.laptopservice.payload.pagination.PaginationRequest;
import com.project.laptopservice.payload.pagination.PaginationResponse;
import com.project.laptopservice.repository.LaptopPartRepository;
import com.project.laptopservice.service.ILaptopPartService;
import com.project.laptopservice.tools.SearchSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class LaptopPartService implements ILaptopPartService {

    private final LaptopPartRepository laptopPartRepository;
    private final LaptopPartMapper mapper;


    @Override
    public ActionSuccessful create(LaptopPartDto laptopPartDto) {
        LaptopPart laptopPart=mapper.map(laptopPartDto);
        laptopPartRepository.save(laptopPart);
        return new ActionSuccessful(true,"Laptop part created successfully");
    }

    @Override
    public ActionSuccessful update(Long id, LaptopPartDto laptopPartDto) {
        LaptopPart laptopPart=laptopPartRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Laptop Part","id",id));
        mapper.update(laptopPartDto,laptopPart);
        laptopPartRepository.save(laptopPart);

        return new ActionSuccessful(true,"Laptop part updated successfully");
    }

    @Override
    public List<LaptopPartDto> getAll() {
        List<LaptopPart> laptopPartList=laptopPartRepository.findAll();
        return mapper.map(laptopPartList);
    }

    @Override
    public LaptopPartDto getById(Long id) {
        LaptopPart laptopPart=laptopPartRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Laptop Part","id",id));
        return mapper.map(laptopPart);
    }

    @Override
    public ActionSuccessful delete(Long id) {
        LaptopPart laptopPart=laptopPartRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Laptop Part","id",id));
        if(laptopPart.getStock()>0){
            throw new ForbiddenException("This part has stock remained!!!");
        }
        laptopPartRepository.delete(laptopPart);
        return new ActionSuccessful(true,"Laptop part deleted successfully");
    }

    @Override
    public ActionSuccessful addStock(Long id, StockDto stockDto) {
        LaptopPart laptopPart=laptopPartRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Laptop Part","id",id));
        laptopPart.setStock(laptopPart.getStock()+stockDto.getStock());
        return new ActionSuccessful(true,"Stock updated successfully");
    }

    @Override
    public PaginationResponse<LaptopPartDto> getAllWithPagination(PaginationRequest paginationRequest) {
        List<Column> columns=getColumns();
        SearchSpecification<LaptopPart> specification = new SearchSpecification<>(paginationRequest.getFilters(),paginationRequest.getSearch(),columns);
        Pageable pageable = PageRequest.of(Objects.requireNonNullElse(paginationRequest.getPageNumber(), 0), Objects.requireNonNullElse(paginationRequest.getPageSize(), 10));
        Page<LaptopPart> laptopParts=laptopPartRepository.findAll(specification, pageable);

        return new PaginationResponse<>(columns,mapper.map(laptopParts.getContent()),laptopParts.getNumber(),laptopParts.getSize(),laptopParts.getTotalElements(),laptopParts.hasNext(),laptopParts.hasPrevious());
    }

    private List<Column> getColumns() {
        List<Column> columns=new ArrayList<>();
        columns.add( new Column("Id","id", DataType.NUMBER,"id",true,true) );
        columns.add( new Column("Name","name", DataType.STRING,"name",true,false));
        columns.add( new Column("Description","description", DataType.STRING,"description",true,false) );
        columns.add( new Column("Price","price", DataType.NUMBER,"price",true,false));
        columns.add( new Column("Stock","stock", DataType.NUMBER,"stock",true,false));
        columns.add( new Column("Created At","createdAt", DataType.DATE,"createdAt",true,false));
        columns.add( new Column("Updated At","updatedAt", DataType.DATE,"updatedAt",true,false));
        return columns;
    }

}
