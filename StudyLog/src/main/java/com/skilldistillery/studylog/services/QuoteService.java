package com.skilldistillery.studylog.services;

import java.util.List;

import com.skilldistillery.studylog.entities.Quote;


public interface QuoteService {
	
	List<Quote> getAllQuotes();
	Quote retrieve(int quoteId);
	Quote create(Quote quote);
	Quote update(int quoteId, Quote quoteValue);
	boolean delete(int quoteId);
	
}
