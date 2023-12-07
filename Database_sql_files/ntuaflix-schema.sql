-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `ntuaflix` ;

CREATE SCHEMA IF NOT EXISTS `ntuaflix` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `ntuaflix` ;

-- ----------------------------------
-- TABLES
-- ----------------------------------


-- Principal
CREATE TABLE IF NOT EXISTS `principal` (
  `principal_id` VARCHAR(45) NOT NULL,
  `principal_name` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`principal_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- Movie Principle
CREATE TABLE IF NOT EXISTS `movie_principal` (
	`title_title_id` VARCHAR(60) NOT NULL,
	`principal_principal_id` VARCHAR(45),
	PRIMARY KEY (`title_title_id`,`principal_principal_id`),
    CONSTRAINT `mp_principal_principal`
		FOREIGN KEY (`principal_principal_id`) REFERENCES `principal`(`principal_id`)
        ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT `mp_title_title1`
		FOREIGN KEY (`title_title_id`) REFERENCES `title`(`title_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- Title
CREATE TABLE IF NOT EXISTS `title` (
  `title_id` VARCHAR(60) NOT NULL,
  `title_type` VARCHAR(60) NOT NULL,
  `title_originalTitle` VARCHAR(60) NOT NULL,
  `title_poster` VARCHAR(45) NOT NULL,
  `title_startYear` VARCHAR(45) NOT NULL,
  `title_endYear` VARCHAR(45),
  `genre_genre_id` VARCHAR(45) NOT NULL,
  `AKAs_title_AKAs` VARCHAR(45) NOT NULL,
  `principal_principal_id` VARCHAR(45) NOT NULL,
  `title_rateing` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`title_id`),
  CONSTRAINT `fk_title_principal1`
    FOREIGN KEY (`principal_principal_id`) REFERENCES `principal` (`principal_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_title_AKAs`
    FOREIGN KEY (`AKAs_title_AKAs`) REFERENCES `AKAs` (`AKA_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- Genre
CREATE TABLE IF NOT EXISTS `genre` (
  `genre_id` VARCHAR(45) NOT NULL,
  `genre_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`genre_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4

