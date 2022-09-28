INSERT INTO department (department_name)
VALUES ("HR"),
       ("IT"),
       ("finance"),
       ("marketing");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("front office coordinator", 60000.03, 1),
       ("web developer", 90000.99, 2),
       ("web developer manager", 100000.99, 2),
       ("accountant", 67000.78, 3),
       ("accountant manager", 86000.78, 3),
       ("marketing assistant", 54000.56, 4),
       ("Sales leader", 100200.86, 4);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Maze", "Stan", 1, NULL),
       ("Kate", "Armstrong", 3, NULL),
       ("Jack", "Lee", 2, 2),
       ("Thomas", "Won", 5, NULL),
       ("Rose", "Wood", 4, 4),
       ("Gabriel", "Garcia", 4, 4),
       ("Robert", "Song", 5, NULL),
       ("Chris", "Bailey", 7, NULL),
       ("Daniel", "Nurt", 6, 8);