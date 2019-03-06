-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS my_better_app;
-- Creates the "blogger" database --
CREATE DATABASE my_better_app;

CREATE TABLE user_info (
id INTEGER NOT NULL AUTO_INCREMENT,
workout VARCHAR(50),
reps INTEGER(3),
sets INTEGER(3)
);
