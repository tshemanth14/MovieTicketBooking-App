package com.hemanth.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hemanth.entity.Ticket;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

}
