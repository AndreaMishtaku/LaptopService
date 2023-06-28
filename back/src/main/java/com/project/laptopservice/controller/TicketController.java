package com.project.laptopservice.controller;


import com.project.laptopservice.payload.ActionSuccessful;
import com.project.laptopservice.payload.pagination.PaginationRequest;
import com.project.laptopservice.payload.pagination.PaginationResponse;
import com.project.laptopservice.payload.ticket.TicketRequestDto;
import com.project.laptopservice.payload.ticket.TicketResponseDto;
import com.project.laptopservice.service.ITicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/ticket")
@RequiredArgsConstructor
public class TicketController {

    private final ITicketService ticketService;


    @PostMapping
    //@PreAuthorize("hasRole('Client')")
    public ResponseEntity<ActionSuccessful> createTicket(@RequestBody TicketRequestDto ticketRequestDto){
        return ResponseEntity.ok(ticketService.create(ticketRequestDto));
    }

    @PutMapping("/{id}/update-status")
    //@PreAuthorize("hasRole('Admin')")
    public ResponseEntity<ActionSuccessful> updateTicketStatus(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(ticketService.updateStatus(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<TicketResponseDto>> getAll(){
        return ResponseEntity.ok(ticketService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDto> getTicketById(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(ticketService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ActionSuccessful> deleteTicket(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(ticketService.delete(id));
    }

    @PostMapping("/get-all")
    public ResponseEntity<PaginationResponse<TicketResponseDto>> getAllWithPagination(@RequestBody PaginationRequest paginationRequest){
        return ResponseEntity.ok(ticketService.getAllWithPagination(paginationRequest));
    }
}
