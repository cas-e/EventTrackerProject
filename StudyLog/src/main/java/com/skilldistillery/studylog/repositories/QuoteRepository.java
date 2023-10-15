package com.skilldistillery.studylog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.studylog.entities.Quote;

public interface QuoteRepository extends JpaRepository<Quote, Integer> {
	Quote findById(int quoteId);
}
