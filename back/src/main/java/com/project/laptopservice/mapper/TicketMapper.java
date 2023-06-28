package com.project.laptopservice.mapper;


import com.project.laptopservice.model.Laptop;
import com.project.laptopservice.model.LaptopPart;
import com.project.laptopservice.model.Ticket;
import com.project.laptopservice.payload.ticket.TicketRequestDto;
import com.project.laptopservice.payload.ticket.TicketResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TicketMapper {
    Ticket map(TicketRequestDto ticketRequestDto);

    @Mapping(target = "userId", source = "laptop")
    TicketResponseDto map(Ticket ticket);

    List<TicketResponseDto> map(List<Ticket> ticketList);

    @Mapping(target = "id",ignore = true)
    void update(TicketRequestDto ticketRequestDto, @MappingTarget Ticket ticket);

    default String mapLaptopToString(Laptop laptop) {
        return laptop != null ? laptop.getType()+" "+laptop.getModel() : null;
    }

    default String mapLaptopPartToString(LaptopPart laptopPart) {
        return laptopPart != null ? laptopPart.getName() : null;
    }
}
