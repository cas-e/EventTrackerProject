-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema studylogdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `studylogdb` ;

-- -----------------------------------------------------
-- Schema studylogdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `studylogdb` DEFAULT CHARACTER SET utf8 ;
USE `studylogdb` ;

-- -----------------------------------------------------
-- Table `quote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `quote` ;

CREATE TABLE IF NOT EXISTS `quote` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `author` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS learner;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'learner' IDENTIFIED BY 'learner';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'learner';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `quote`
-- -----------------------------------------------------
START TRANSACTION;
USE `studylogdb`;
INSERT INTO `quote` (`id`, `content`, `author`) VALUES (1, 'A learning experience is one of those things that says, \'You know that thing you just did? Don\'t do that.\'', 'Douglas Adams');
INSERT INTO `quote` (`id`, `content`, `author`) VALUES (2, 'There are two ways to write error-free programs; only the third one works.', 'Alan J. Perlis');
INSERT INTO `quote` (`id`, `content`, `author`) VALUES (3, 'Knowledge and communication are inseparable.', 'Alexandra Elbakyan');

COMMIT;

