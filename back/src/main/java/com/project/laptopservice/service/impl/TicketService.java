package com.project.laptopservice.service.impl;

import com.project.laptopservice.exception.ForbiddenException;
import com.project.laptopservice.exception.ResourceNotFoundException;
import com.project.laptopservice.mapper.TicketMapper;
import com.project.laptopservice.model.Laptop;
import com.project.laptopservice.model.LaptopPart;
import com.project.laptopservice.model.Ticket;
import com.project.laptopservice.model.User;
import com.project.laptopservice.model.enums.Role;
import com.project.laptopservice.model.enums.TicketStatus;
import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.pagination.*;
import com.project.laptopservice.payload.ticket.TicketRequestDto;
import com.project.laptopservice.payload.ticket.TicketResponseDto;
import com.project.laptopservice.repository.LaptopPartRepository;
import com.project.laptopservice.repository.LaptopRepository;
import com.project.laptopservice.repository.TicketRepository;
import com.project.laptopservice.repository.UserRepository;
import com.project.laptopservice.service.ITicketService;
import com.project.laptopservice.tools.SearchSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TicketService implements ITicketService {

    private final TicketRepository ticketRepository;
    private final LaptopPartRepository laptopPartRepository;
    private final LaptopRepository laptopRepository;

    private final UserRepository userRepository;
    private final TicketMapper mapper;

    @Override
    public ActionSuccessful create(TicketRequestDto ticketRequestDto) {
        Principal principal=  SecurityContextHolder.getContext().getAuthentication();
        User user=userRepository.getUserByEmail(principal.getName());

        Laptop laptop=laptopRepository.findById(ticketRequestDto.getLaptopId()).orElseThrow(()->new ResourceNotFoundException("Laptop","id",ticketRequestDto.getLaptopId()));
        LaptopPart laptopPart=laptopPartRepository.findById(ticketRequestDto.getLaptopPartId()).orElseThrow(()->new ResourceNotFoundException("Laptop Part","id",ticketRequestDto.getLaptopPartId()));

        if(laptop.getUser().getId()!=user.getId()){
            throw new ForbiddenException("Cannot create a ticket for that laptop");
        }

        if(laptopPart.getStock()==0){
            throw new ForbiddenException("This part is not available");
        }
        Ticket ticket=mapper.map(ticketRequestDto);
        ticket.setLaptop(laptop);
        ticket.setLaptopPart(laptopPart);
        ticket.setStatus(TicketStatus.OPEN);

        laptopPart.setStock(laptopPart.getStock()-1);
        laptopPartRepository.save(laptopPart);
        ticketRepository.save(ticket);

        return new ActionSuccessful(true,"Ticket created successfully");
    }

    @Override
    public ActionSuccessful updateStatus(Long id) {
        Ticket ticket=ticketRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Ticket","id",id));
        ticket.setStatus(TicketStatus.CLOSED);
        ticket.setClosedAt(LocalDateTime.now());
        ticketRepository.save(ticket);
        return new ActionSuccessful(true,"Status of ticket changed successfully");
    }

    @Override
    public List<TicketResponseDto> getAll() {
        List<Ticket> ticketList=ticketRepository.findAll();
        return mapper.map(ticketList);
    }

    @Override
    public TicketResponseDto getById(Long id) {
        Ticket ticket=ticketRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Ticket","id",id));
        return mapper.map(ticket);
    }

    @Override
    public ActionSuccessful delete(Long id) {
        Ticket ticket=ticketRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Ticket","id",id));
        ticketRepository.delete(ticket);

        return new ActionSuccessful(true,"Ticket deleted successfully");
    }

    @Override
    public PaginationResponse<TicketResponseDto> getAllWithPagination(PaginationRequest paginationRequest) {
        Principal principal=  SecurityContextHolder.getContext().getAuthentication();
        Optional<User> user=userRepository.findByEmail(principal.getName());

        List<Filter> internalFilters=new ArrayList<>();
        if(user.isPresent()&&user.get().getRole().equals(Role.CLIENT)){
            internalFilters.add(new Filter("laptop.user.id",Operation.EQUAL,user.get().getId()));
        }

        List<Column> columns=getColumns();
        SearchSpecification<Ticket> specification = new SearchSpecification<>(paginationRequest.getFilters(),paginationRequest.getSearch(),columns,internalFilters);
        Pageable pageable = PageRequest.of(Objects.requireNonNullElse(paginationRequest.getPageNumber(), 0), Objects.requireNonNullElse(paginationRequest.getPageSize(), 10));
        Page<Ticket> tickets=ticketRepository.findAll(specification, pageable);

        return new PaginationResponse<>(columns,mapper.map(tickets.getContent()),tickets.getNumber(),tickets.getSize(),tickets.getTotalElements(),tickets.hasNext(),tickets.hasPrevious());
    }

    private List<Column> getColumns() {
        List<Column> columns=new ArrayList<>();
        columns.add( new Column("Id","id", DataType.NUMBER,"id",true,true) );
        columns.add( new Column("Description","description", DataType.STRING,"description",true,false));
        columns.add( new Column("Status","status", DataType.NUMBER,"status",true,false) );
        columns.add( new Column("Laptop","laptop", DataType.STRING,"laptop.type",true,false));
        columns.add( new Column("Laptop part","laptopPart", DataType.STRING,"laptopPart.name",true,false));
        columns.add( new Column("Created At","createdAt", DataType.DATE,"createdAt",true,false));
        columns.add( new Column("Closed At","closedAt", DataType.DATE,"closedAt",true,false));
        columns.add( new Column("User id","userId", DataType.DATE,"laptop.user.id",true,true));
        return columns;
    }
}
