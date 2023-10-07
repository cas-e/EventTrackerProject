package com.skilldistillery.studylog.services;

import java.util.List;

import com.skilldistillery.studylog.entities.Sesh;

public interface SeshService {
	
	// expectations
	// these are the minimum c.r.u.d operations to support.
	List<Sesh> getAllSeshes();
	Sesh retrieve();
	Sesh create(Sesh sesh);
	Sesh update(int seshId, Sesh updatingSesh);
	boolean delete(int seshId);
	
}
