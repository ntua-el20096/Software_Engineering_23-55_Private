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


-- Movie
CREATE TABLE IF NOT EXISTS `director` (
  `director_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `director_first_name` VARCHAR(45) NOT NULL,
  `director_last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`director_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- Movie
CREATE TABLE IF NOT EXISTS `movie` (
  `movie_id` INT NOT NULL AUTO_INCREMENT,
  `movie_title` VARCHAR(60) NOT NULL,
  `director_director_id` INT UNSIGNED NOT NULL,
  `img_link` VARCHAR(45) NOT NULL DEFAULT 'https://picsum.photos/200/300',
  `description` VARCHAR(500) NOT NULL DEFAULT 'A book description',
  PRIMARY KEY (`movie_id`),
  CONSTRAINT `fk_movie_director1`
    FOREIGN KEY (`director_director_id`)
    REFERENCES `director` (`director_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- Genre
CREATE TABLE IF NOT EXISTS `genre` (
  `genre_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `genre_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`genre_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4

