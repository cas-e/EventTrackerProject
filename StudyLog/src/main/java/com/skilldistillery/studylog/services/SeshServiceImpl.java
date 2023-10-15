package com.skilldistillery.studylog.services;

import java.util.List;
import java.util.Optional;

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
	public Sesh retrieve(int seshId) {
		return seshRepo.findById(seshId);
	}

	@Override
	public Sesh create(Sesh sesh) {
		return seshRepo.saveAndFlush(sesh);
	}

	@Override
	public Sesh update(int seshId, Sesh sVal) {
		Sesh update = seshRepo.findById(seshId);
		if (update == null) {
			return null;
		}
		update.setDate(sVal.getDate());
		update.setMinutes(sVal.getMinutes());
		update.setTopic(sVal.getTopic());
		update.setTag(sVal.getTag());
		update.setImage(sVal.getImage());
		return seshRepo.saveAndFlush(update);
	}

	@Override
	public boolean delete(int seshId) {
		if (seshRepo.findById(seshId) == null) {
			return false;
		}
		seshRepo.deleteById(seshId);
		return true;
	}

}
