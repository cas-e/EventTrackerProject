package com.skilldistillery.studylog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.studylog.entities.Session;

public interface SessionRepository extends JpaRepository<Session, Integer> {

}
