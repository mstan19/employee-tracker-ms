SELECT employees.first_name, employees.last_name,roles.id, roles.department_id, roles.title, roles.salary
FROM employees
JOIN roles ON employees.roles_id = roles.id;
