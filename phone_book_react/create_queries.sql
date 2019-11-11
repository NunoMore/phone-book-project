/* CREATE SCHEMA */
CREATE DATABASE `phonebook` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

/* CREATE TABLES */
CREATE TABLE `phonebook`.`names` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `phonebook`.`phonenumbers` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name_id` varchar(45) NOT NULL,
  `number` varchar(45) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx` (`id`),
  KEY `name_idx` (`name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/* INSERT TESTING DATA  */
INSERT INTO names (first_name, last_name)
VALUES ('Nuno', 'Moreira');
INSERT INTO names (first_name, last_name)
VALUES ('Miguel', 'Fernandes');

INSERT INTO phonenumbers (name_id, number)
VALUES ((	select id from names where first_name = 'Nuno'	), '+351 96 7595497');
INSERT INTO phonenumbers (name_id, number)
VALUES ((	select id from names where first_name = 'Miguel'	), '+351 96 7595497');

/* SELECTS
select * from names;
select * from phonenumbers;
*/

/* DROPS
drop table names;
drop table phonenumbers;
*/

/* 
UPDATE names
SET first_name='firstName', last_name='lastName'
WHERE id = id;

UPDATE phonenumbers
SET number=number
WHERE name_id = id;
*/