package com.skilldistillery.studylog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.studylog.entities.Session;
import com.skilldistillery.studylog.repositories.SessionRepository;

@Service
public class SessionServiceImpl implements SessionService {

	@Autowired
	private SessionRepository seshRepo;
	
	@Override
	public List<Session> getAllSessions() {
		// TODO Auto-generated method stub
		return seshRepo.findAll();
	}

	@Override
	public Session retrieve() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Session create(Session session) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Session update(int sessionId, Session updatingSession) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int sessionId) {
		// TODO Auto-generated method stub
		return false;
	}

}
