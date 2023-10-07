package com.skilldistillery.studylog.controllers;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	
	@PostMapping("sessions")
	public Sesh post(@RequestBody Sesh sesh) {
		return seshService.create(sesh);
	}
	
	
	// exists to see what the date format looks like in json_
	@GetMapping("sessions/today")
	public Sesh mockDate() {
		Sesh sesh = new Sesh();
		sesh.setDate(LocalDate.now());
		return sesh;
	}
}

