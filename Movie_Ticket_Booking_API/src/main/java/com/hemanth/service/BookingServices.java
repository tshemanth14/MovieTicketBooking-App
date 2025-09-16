package com.hemanth.service;


import org.springframework.stereotype.Service;

import com.hemanth.entity.Ticket;
import com.hemanth.user.UserDetails;

public interface BookingServices {
	
	public Ticket bookTicket(UserDetails user);
	
	public Ticket getTicket(Integer ticketId);
}
