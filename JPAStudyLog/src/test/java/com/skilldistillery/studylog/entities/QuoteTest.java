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

class QuoteTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Quote quote;
	
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
		quote = em.find(Quote.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		quote = null;
	}

	@Test
	void test() {
		assertNotNull(quote);
		assertEquals("Douglas Adams", quote.getAuthor());
	}

}