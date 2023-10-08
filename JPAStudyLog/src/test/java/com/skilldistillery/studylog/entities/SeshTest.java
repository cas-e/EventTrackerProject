package com.skilldistillery.studylog.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SeshTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Sesh sesh;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAStudyLog");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		sesh = em.find(Sesh.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		sesh = null;
	}

	@Test
	void test() {
		assertNotNull(sesh);
		assertEquals(sesh.getTopic(), "Java Full Stack");
	}

}