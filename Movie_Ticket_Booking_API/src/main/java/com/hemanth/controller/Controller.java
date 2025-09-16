package com.hemanth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hemanth.entity.Ticket;
import com.hemanth.service.BookingServiceImpl;
import com.hemanth.user.UserDetails;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {
	
	@Autowired
	private BookingServiceImpl service;
	
	@PostMapping("/bookticket")
	public ResponseEntity<Ticket> bookTicket(@RequestBody UserDetails user){
		Ticket ticket = service.bookTicket(user);
		return new ResponseEntity<Ticket>(ticket, HttpStatus.CREATED);
	}

	@GetMapping("/getticket/{ticketId}")
	public ResponseEntity<Ticket> getTicket(@PathVariable Integer ticketId){
		Ticket ticket = service.getTicket(ticketId);
		return new ResponseEntity<Ticket>(ticket, HttpStatus.OK);
	}
}
