package com.skilldistillery.studylog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.studylog.entities.Sesh;

public interface SeshRepository extends JpaRepository<Sesh, Integer> {
	Sesh findById(int seshId);
}
