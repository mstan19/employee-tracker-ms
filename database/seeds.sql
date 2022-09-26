INSERT INTO department (department_name)
VALUES ("HR"),
       ("IT"),
       ("finance"),
       ("marketing");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("front office coordinator", 60000.03, 1),
       ("web developer", 90000.99, 2),
       ("accountant", 67000.78, 3),
       ("marketing assistant", 54000.56, 4);

INSERT INTO employees (first_name, last_name, roles_id)
VALUES ("Maze", "Stan", 1),
       ("Jack", "Lee", 2),
       ("Rose", "Wood", 3),
       ("Gabriel", "Garcia", 4);