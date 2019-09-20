DROP DATABASE IF EXISTS freshair_db;
CREATE DATABASE freshair_db;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

CREATE TABLE destinations (
id int NOT NULL AUTO_INCREMENT,
city varchar(65) NOT NULL,
country varchar(65) NOT NULL,
rating varchar(20),
PRIMARY KEY (id)
);

CREATE TABLE users (
id int NOT NULL AUTO_INCREMENT,
user_name varchar(255) NOT NULL,
email_address varchar(255),
PRIMARY KEY (id)
);