SELECT employees.first_name, employees.last_name,roles.id, roles.department_id, roles.title, roles.salary
FROM employees
JOIN roles ON employees.roles_id = roles.id;

SELECT roles.id, roles.title, department.department_name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id;