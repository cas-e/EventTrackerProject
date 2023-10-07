package com.skilldistillery.studylog.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.studylog.entities.Sesh;

import com.skilldistillery.studylog.repositories.SeshRepository;


@Service
public class SeshServiceImpl implements SeshService {
	
	
	@Autowired
	private SeshRepository seshRepo;
	

	@Override
	public List<Sesh> getAllSeshes() {
		return seshRepo.findAll();
	}

	@Override
	public Sesh retrieve() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Sesh create(Sesh sesh) {
		return seshRepo.saveAndFlush(sesh);
	}

	@Override
	public Sesh update(int seshId, Sesh updatingSesh) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int seshId) {
		// TODO Auto-generated method stub
		return false;
	}

}
