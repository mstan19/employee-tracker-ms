SELECT employees.first_name, employees.last_name,roles.id, roles.department_id, roles.title, roles.salary
FROM employees
JOIN roles ON employees.roles_id = roles.id;


SELECT roles.id, department.department_name AS department, roles.salary FROM roles JOIN department ON roles.department_id = department.id JOIN employees, employees.manager_id AS manager, ON employees.manager_id = employees.id;



select employeeList.id,employeeList.first_name, employeeList.last_name, roles.title, department.department_name as department, roles.salary, concat(managerList.first_name, " ", managerList.last_name) as manager from employees as employeeList join roles on employeeList.roles_id = roles.id join department on roles.department_id = department.id left join employees as managerList on employeeList.id = managerList.manager_id order by employeeList.id;