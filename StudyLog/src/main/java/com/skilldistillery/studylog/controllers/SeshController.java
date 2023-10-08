package com.skilldistillery.studylog.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.studylog.entities.Sesh;
import com.skilldistillery.studylog.services.SeshService;

@RestController
@RequestMapping("api")
public class SeshController {

	@Autowired
	private SeshService seshService;
	
	
	@GetMapping("sessions")
	public List<Sesh> getAll() {
		return seshService.getAllSeshes();
	}
	
	@GetMapping("sessions/{sId}")
	public Sesh retrieve(@PathVariable int sId, HttpServletResponse res) {
		Sesh sesh = seshService.retrieve(sId);
		if (sesh == null) {
			res.setStatus(404);
		}
		return sesh;
	}
	
	
	@PostMapping("sessions")
	public Sesh post(@RequestBody Sesh sesh, HttpServletResponse res) {
		Sesh made = seshService.create(sesh);
		if (made == null) {
			res.setStatus(400);
		}
		return seshService.create(sesh);
	}
	
	@PutMapping("sessions/{sId}")
	public Sesh update(@PathVariable int sId, @RequestBody Sesh sVal, HttpServletResponse res) {
		Sesh updated = null;
		try {
			updated = seshService.update(sId, sVal);
			if (updated == null) {
				res.setStatus(404);
			}
		} catch(Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		
		return updated;
	}
	
	@DeleteMapping("sessions/{sId}")
	public void delete(@PathVariable int sId, HttpServletResponse res) {	
		try {
			if (seshService.delete(sId)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch(Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
	}
	
	// exists to see what the date format looks like in json_
	/*
	@GetMapping("sessions/today")
	public Sesh mockDate() {
		Sesh sesh = new Sesh();
		sesh.setDate(LocalDate.now());
		return sesh;
	}
	*/
}

