package com.skilldistillery.studylog.services;

import java.util.List;

import com.skilldistillery.studylog.entities.Session;

public interface SessionService {
	
	
	// expectations
	// these are the minimum c.r.u.d operations to support.
	
	List<Session> getAllSessions();
	Session retrieve();
	Session create(Session session);
	Session update(int sessionId, Session updatingSession);
	boolean delete(int sessionId);
	
	
}
