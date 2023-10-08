package com.skilldistillery.studylog.services;

import java.util.List;

import com.skilldistillery.studylog.entities.Sesh;

public interface SeshService {
	
	// expectations
	// these are the minimum c.r.u.d operations to support.
	List<Sesh> getAllSeshes();                   // y
	Sesh retrieve(int seshId);                   // y
	Sesh create(Sesh sesh);                      // y
	Sesh update(int seshId, Sesh sVal);
	boolean delete(int seshId);
	
}
