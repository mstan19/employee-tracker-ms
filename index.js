const inquirer = require("inquirer");
const mysql = require("mysql2");
const fs = require("fs");
const Department = require("./lib/department");
const Employees = require("./lib/employees");
const Roles = require("./lib/roles");
const cTable = require("console.table");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Maze@1997',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

let mainQuestions = [
  {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View All Employees", "Add an Employee", "Delete an Employee", "Update an Employee Role", "View All Roles", "Add Role", "Delete Role", "View All Departments", "Add a Department", "Delete a Department", "Quit"
      ]
  }
];

let addDepartmentQuestion = [
  {
      type: 'input',
      name: 'Dname',
      message: "What is the name of the department?"
  }
]

function mainMenu() {
  inquirer.prompt(mainQuestions)
  .then((answersMain) => {
    // console.log(answersMain)
      if (answersMain.action === "View All Employees"){
          // console.log(answersMain)
        viewAllEmployees();
      } else if (answersMain.action === "Add an Employee"){
        AddEmployee();
      } else if (answersMain.action === "Delete an Employee"){
        DeleteEmployee();
      } else if (answersMain.action === "Update an Employee Role"){
        UpdateRole();
      } else if (answersMain.action === "View All Roles"){
        viewAllRoles();
      } else if (answersMain.action === "Add Role"){
        AddRole();
      } else if (answersMain.action === "Delete Role"){
        DeleteRole();
      } else if (answersMain.action === "View All Departments"){
        viewAllDepartments();
      } else if (answersMain.action === "Add a Department"){
        AddDepartment();
      } else if (answersMain.action === "Delete a Department"){
        deleteDepartment();
      } else {
        db.end();
      }
  });
}

function viewAllDepartments() {
  // console.log("hiiii");
  db.query('SELECT * FROM department', function (err, results) {
    console.log("\n")
    console.table(results);
  });
  mainMenu();
}

function viewAllEmployees() {
  db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.department_name AS department, roles.salary FROM employees LEFT JOIN roles ON employees.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id;', function (err, results) {
    console.log("\n")
    console.table(results);
  });
  mainMenu();
}

function viewAllRoles() {
  db.query('SELECT roles.id, roles.title, department.department_name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id;', function (err, results) {
    console.log("\n")
    console.table(results);
  });
  mainMenu();
}

function AddDepartment() {
  inquirer.prompt(addDepartmentQuestion)
    .then((answersAD) => {
      // console.log(answersAD);
      let departmentName = answersAD.Dname;
      db.query(`insert into department (department_name) values ("${departmentName}");`, function (err, results) {
        // console.log(err)
        // console.log("\n")
        // console.table(results);
    });
    mainMenu();
    });
  }
  async function getAllDepartments() {
    let dbDepartment = 'SELECT * FROM department'
    let [results, err] = await db.promise().query(dbDepartment);
    // results.map(department => department.department_name);
    return results;
   }
  
async function AddRole() {
  let listDepartment = await getAllDepartments()
  let arrayDepartment = listDepartment.map(department => department.department_name) 
  inquirer.prompt([
    {
        type: 'input',
        name: 'AddRolename',
        message: "What is the name of the role?"
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the salary of the role?"
    },
    {
      type: 'list',
      name: 'belongDepartment',
      message: "Which department does the role belong to?",
      choices: arrayDepartment
    }
  ])
    .then((answersAR) => {
      // console.log(answersAR);
      let addRoleName = answersAR.AddRolename;
      let addRoleSalary = answersAR.salary;
      // let AddRoleDepartmentID = answersAR.belongDepartment;
      let userChoice = answersAR.belongDepartment;
      let departID = listDepartment.find(department => department.department_name === userChoice).id
      
      db.query(`insert into roles (title,salary,department_id) values ("${addRoleName}", ${addRoleSalary}, "${departID}");`, function (err, results) {
        if (err) throw (err)
        // console.log("\n")
        // console.table(results);
    });
    mainMenu();
    });
  }

async function DeleteRole() {
  let listRoles = await getAllRoles()
  let arrayRoles = listRoles.map(role => role.title) 
  inquirer.prompt([
    {
      type: 'list',
      name: 'dRole',
      message: "Which role do you want to delete?",
      choices: arrayRoles
    }
  ])
    .then((answersDR) => {
     
      let userChoice = answersDR.dRole;
      let roleID = listRoles.find(role => role.title === userChoice).id
      
      db.query(`delete from roles where id = ${roleID};`, function (err, results) {
        if (err) throw (err)
        // console.log("\n")
        // console.table(results);
    });
    mainMenu();
    });
  }
  

async function getAllRoles() {
  let dbRoles = 'SELECT * FROM roles'
  let [results, err] = await db.promise().query(dbRoles);
  // results.map(department => department.department_name);
  // console.log(results);

  return results;
  // console.log(test);
  }

async function AddEmployee() {
  let listRoles = await getAllRoles()
  let arrayRoles = listRoles.map(role => role.title)
  // console.log(arrayRoles)
  inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?"
    },
    {
      type: 'list',
      name: 'employeeTitle',
      message: "What is the employee's role?",
      choices: arrayRoles
    }
  ])
    .then((answersAE) => {
      // console.log(answersAR);
      let firstName = answersAE.firstName;
      let lastName = answersAE.lastName;
      // let AddRoleDepartmentID = answersAR.belongDepartment;
      let userChoice = answersAE.employeeTitle;
      let roleID = listRoles.find(role => role.title === userChoice).id
      // let departID = listDepartment.find(department => department.department_name === userChoice).id

      
      db.query(`insert into employees (first_name, last_name, roles_id) values ("${firstName}", "${lastName}", "${roleID}");`, function (err, results) {
        if (err) throw (err)
        // console.log("\n")
        // console.table(results);
    });
    mainMenu();
    });
  }

async function DeleteEmployee() {
  let listEmployees = await getAllEmployees();
  let arrayEmployees = listEmployees.map(employee => `${employee.first_name} ${employee.last_name}`);
 
  inquirer.prompt([
    {
        type: 'list',
        name: 'employeeName',
        message: "Which employee do you want to delete?",
        choices: arrayEmployees
    }
  ])
  .then((answersDE) => {
    // console.log(answersAR);
    let removeEmployee = answersDE.employeeName;
    let employeeID = listEmployees.find(user => `${user.first_name} ${user.last_name}` ===  removeEmployee).id
    
    db.query(`delete from employees where id ="${employeeID}";`, (err, result) => {
      if (err) {
        throw (err)
      }
      // console.table(results);
  });
  mainMenu();
  });
}

async function getAllEmployees() {
    let dbEmployees = 'SELECT * FROM employees'
    let [results, err] = await db.promise().query(dbEmployees);
    // results.map(department => department.department_name);
    console.log(results);
  
    return results;
    // console.log(test);
    }
//update employees role
async function UpdateRole(){
  let listRoles = await getAllRoles()
  let arrayRoles = listRoles.map(role => role.title)
  let listEmployees = await getAllEmployees();
  let arrayEmployees = listEmployees.map(employee => `${employee.first_name} ${employee.last_name}`);
  console.log(listRoles)
  
  console.log(arrayEmployees)
  console.log(arrayRoles)

  inquirer.prompt([
    {
        type: 'list',
        name: 'employeeName',
        message: "Which employee's role do you want to update?",
        choices: arrayEmployees
    },
    {
      type: 'list',
      name: 'updateRole',
      message: "Which role do you want to assign the selected employee?",
      choices: arrayRoles
  }
  ])
  .then((answersUE) => {
    // console.log(answersAR);
    let employseeSelected = answersUE.employeeName;
    let employeeID = listEmployees.find(user => `${user.first_name} ${user.last_name}` ===  employseeSelected).id
    // let AddRoleDepartmentID = answersAR.belongDepartment;
    // let employeeSelected = answersUE.employeeTitle;

    let userChoice = answersUE.updateRole;
    let roleID = listRoles.find(role => role.title === userChoice).id

    // let departID = listDepartment.find(department => department.department_name === userChoice).id


    db.query(`UPDATE employees SET roles_id = "${roleID}" WHERE id = "${employeeID}";`, (err, result) => {
      if (err) {
        throw (err)
      }
      // console.log("Employee has been updated!");
      // console.log("\n")
      // console.table(results);
  });
  mainMenu();
  }); 
}

async function deleteDepartment() {
  let listDepartment = await getAllDepartments()
  let arrayDepartment = listDepartment.map(department => department.department_name)
  inquirer.prompt([
    {
        type: 'list',
        name: 'departmentName',
        message: "Which department do you want to delete?",
        choices: arrayDepartment
    }
  ])
  .then((answersDD) => {
    let selectedDepartment = answersDD.departmentName;

    db.query(`delete from department where department_name = "${selectedDepartment}";`, (err, result) => {
      if (err) {
        throw (err)
      }
  });
  mainMenu();
  }); 
}



mainMenu();