package com.skilldistillery.studylog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.studylog.entities.Quote;
import com.skilldistillery.studylog.repositories.QuoteRepository;

@Service
public class QuoteServiceImpl implements QuoteService {

	@Autowired
	private QuoteRepository quoteRepo;
	
	@Override
	public List<Quote> getAllQuotes() {
		return quoteRepo.findAll();
	}

	@Override
	public Quote retrieve(int quoteId) {
		return quoteRepo.findById(quoteId);
	}

	@Override
	public Quote create(Quote quote) {
		return quoteRepo.saveAndFlush(quote);
	}

	@Override
	public Quote update(int quoteId, Quote quoteValue) {
		Quote update = quoteRepo.findById(quoteId);
		if (update == null) {
			return null;
		}
		update.setContent(quoteValue.getContent());
		update.setAuthor(quoteValue.getAuthor());
		return quoteRepo.saveAndFlush(update);
	}

	@Override
	public boolean delete(int quoteId) {
		if (quoteRepo.findById(quoteId) == null) {
			return false;
		}
		quoteRepo.deleteById(quoteId);
		return true;
	}

}
