-- Employees Database Creation

USE employees_db;

DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

-- Department Table
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

-- Roles Table
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Employees Table
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    employee_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    manager_id INT
);
