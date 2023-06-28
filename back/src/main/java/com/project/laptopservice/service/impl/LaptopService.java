package com.project.laptopservice.service.impl;

import com.project.laptopservice.exception.ForbiddenException;
import com.project.laptopservice.exception.ResourceNotFoundException;
import com.project.laptopservice.mapper.LaptopMapper;
import com.project.laptopservice.model.Laptop;
import com.project.laptopservice.model.User;
import com.project.laptopservice.model.enums.Role;
import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.laptop.LaptopRequestDto;
import com.project.laptopservice.payload.laptop.LaptopResponseDto;
import com.project.laptopservice.payload.pagination.*;
import com.project.laptopservice.repository.LaptopRepository;
import com.project.laptopservice.repository.UserRepository;
import com.project.laptopservice.service.ILaptopService;
import com.project.laptopservice.tools.SearchSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LaptopService implements ILaptopService {

    private final LaptopRepository laptopRepository;
    private final UserRepository userRepository;
    private final LaptopMapper mapper;

    @Override
    public ActionSuccessful create(LaptopRequestDto laptopRequestDto) {
        Principal principal=  SecurityContextHolder.getContext().getAuthentication();
        User user=userRepository.getUserByEmail(principal.getName());

        Laptop laptop=mapper.map(laptopRequestDto);
        laptop.setUser(user);
        laptopRepository.save(laptop);

        return new ActionSuccessful(true,"Laptop added successfully");
    }

    @Override
    public ActionSuccessful update(Long id, LaptopRequestDto laptopRequestDto) {
        Laptop laptop=laptopRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Laptop","id",id));
        mapper.update(laptopRequestDto,laptop);
        laptopRepository.save(laptop);

        return new ActionSuccessful(true,"Laptop updated Successfully");
    }

    @Override
    public List<LaptopResponseDto> getAll() {
        Principal principal=  SecurityContextHolder.getContext().getAuthentication();
        Optional<User> user=userRepository.findByEmail(principal.getName());

        List<Laptop> laptopList=new ArrayList<>();
        if(user.isPresent()&&user.get().getRole().equals(Role.CLIENT)){
            laptopList=laptopRepository.findByUserId(user.get().getId());
        }else{
            laptopList=laptopRepository.findAll();
        }

        return mapper.map(laptopList);
    }

    @Override
    public LaptopResponseDto getById(Long id) {
        Laptop laptop=laptopRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Laptop","id",id));
        return mapper.map(laptop);
    }

    @Override
    public ActionSuccessful delete(Long id) {
        Laptop laptop=laptopRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Laptop","id",id));

        if(laptop.getTickets().stream().count()>0){
            throw new ForbiddenException("Cannot delete laptop because has tickets available");
        }
        laptopRepository.delete(laptop);

        return new ActionSuccessful(true,"Laptop deleted successfully");
    }

    @Override
    public PaginationResponse<LaptopResponseDto> getAllWithPagination(PaginationRequest paginationRequest) {
        Principal principal=  SecurityContextHolder.getContext().getAuthentication();
        Optional<User> user=userRepository.findByEmail(principal.getName());

        List<Filter> internalFilters=new ArrayList<>();
        if(user.isPresent()&&user.get().getRole().equals(Role.CLIENT)){
            internalFilters.add(new Filter("user.id",Operation.EQUAL,user.get().getId()));
        }


        List<Column> columns=getColumns();
        SearchSpecification<Laptop> specification = new SearchSpecification<>(paginationRequest.getFilters(),paginationRequest.getSearch(),columns,internalFilters);
        Pageable pageable = PageRequest.of(Objects.requireNonNullElse(paginationRequest.getPageNumber(), 0), Objects.requireNonNullElse(paginationRequest.getPageSize(), 10));
        Page<Laptop> laptops=laptopRepository.findAll(specification, pageable);

        return new PaginationResponse<>(columns,mapper.map(laptops.getContent()),laptops.getNumber(),laptops.getSize(),laptops.getTotalElements(),laptops.hasNext(),laptops.hasPrevious());
    }

    private List<Column> getColumns() {
        List<Column> columns=new ArrayList<>();
        columns.add( new Column("Id","id", DataType.NUMBER,"id",true,true) );
        columns.add( new Column("Type","type", DataType.STRING,"type",true,false));
        columns.add( new Column("Model","model", DataType.STRING,"model",true,false) );
        columns.add( new Column("Produced At","producedAt", DataType.DATE,"producedAt",true,false));
        columns.add( new Column("Created At","createdAt", DataType.DATE,"createdAt",true,false));
        columns.add( new Column("Updated At","updatedAt", DataType.DATE,"updatedAt",true,false));
        columns.add( new Column("User","user", DataType.STRING,"user.firstName",true,false));
        return columns;
    }
}
