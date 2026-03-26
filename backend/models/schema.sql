CREATE DATABASE codeignite;
USE codeignite;

CREATE TABLE auth_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password TEXT NOT NULL
);

CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    university_name VARCHAR(100),
    gender VARCHAR(10),
    year_joined INT,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);