package com.hemanth.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hemanth.entity.Ticket;
import com.hemanth.repo.TicketRepository;
import com.hemanth.user.UserDetails;

@Service
public class BookingServiceImpl implements BookingServices {

	@Autowired
	private TicketRepository repo;

	
	public Ticket bookTicket(UserDetails user) {
		Ticket t=new Ticket();
		BeanUtils.copyProperties(user, t);
		t.setPrice(user.getQuantity()*150.0);
		t.setStatus("CONFIRMED");
		repo.save(t);
		return t;
	}

	public Ticket getTicket(Integer ticketId) {
		// TODO Auto-generated method stub
		if(repo.existsById(ticketId))
		{
			Optional<Ticket> byId = repo.findById(ticketId);
			Ticket ticket = byId.get();
			return ticket;
		}
		return null;
	}



}
