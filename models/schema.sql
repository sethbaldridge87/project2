-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS my_better_app;
-- Creates the "blogger" database --
CREATE DATABASE my_better_app;

CREATE TABLE user_info (
id INTEGER NOT NULL AUTO_INCREMENT,
name VARCHAR(50),
age INTEGER(2),
weight INTEGER(3),
height INTEGER(7),
gender VARCHAR(5),
PRIMARY KEY (id)
);
