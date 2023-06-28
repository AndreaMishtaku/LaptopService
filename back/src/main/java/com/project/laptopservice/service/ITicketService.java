package com.project.laptopservice.service;

import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.pagination.PaginationRequest;
import com.project.laptopservice.payload.pagination.PaginationResponse;
import com.project.laptopservice.payload.ticket.TicketRequestDto;
import com.project.laptopservice.payload.ticket.TicketResponseDto;

import java.util.List;

public interface ITicketService {

    ActionSuccessful create(TicketRequestDto ticketRequestDto);

    ActionSuccessful updateStatus(Long id);

    List<TicketResponseDto> getAll();

    TicketResponseDto getById(Long id);

    ActionSuccessful delete(Long id);

    PaginationResponse<TicketResponseDto> getAllWithPagination(PaginationRequest paginationRequest);
}
