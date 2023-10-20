package com.skilldistillery.studylog.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.studylog.entities.Quote;
import com.skilldistillery.studylog.services.QuoteService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class QuoteController {

	@Autowired
	private QuoteService quoteService;
	
	@GetMapping("quotes")
	public List<Quote> getAll() {
		return quoteService.getAllQuotes();
	}
	
	@GetMapping("quotes/{quoteId}")
	public Quote retrieve(@PathVariable int quoteId, HttpServletResponse res) {
		Quote quote = quoteService.retrieve(quoteId);
		if (quote == null) {
			res.setStatus(404);
		}
		return quote;
	}
	
	
	@PostMapping("quotes")
	public Quote post(@RequestBody Quote quote, HttpServletResponse res) {
		Quote made = quoteService.create(quote);
		if (made == null) {
			res.setStatus(400);
		}
		return made;
	}
	
	@PutMapping("quotes/{quoteId}")
	public Quote update(@PathVariable int quoteId, @RequestBody Quote quoteValue, HttpServletResponse res) {
		Quote updated = null;
		try {
			updated = quoteService.update(quoteId, quoteValue);
			if (updated == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		return updated;
	}
	
	@DeleteMapping("quotes/{quoteId}")
	public void delete(@PathVariable int quoteId, HttpServletResponse res) {
		try {
			if (quoteService.delete(quoteId)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
	}
}
