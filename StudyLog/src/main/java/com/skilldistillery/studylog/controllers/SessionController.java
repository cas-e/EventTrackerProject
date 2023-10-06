package com.skilldistillery.studylog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.studylog.entities.Session;
import com.skilldistillery.studylog.services.SessionService;

@RestController
@RequestMapping("api")
public class SessionController {

	@Autowired
	private SessionService seshService;
	
	@GetMapping("sessions")
	public List<Session> listSessions() {
		return seshService.getAllSessions();
	}
}
