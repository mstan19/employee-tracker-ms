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

// //update employees role
// let updateRole = "";
// db.query(`SELECT * FROM roles WHERE title = ?`, updateRole, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

let mainQuestions = [
  {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View All Employees", "Add an Employee", "Update an Employee Role", "View All Roles", "Add Role", "View All Departments", "Add a Department", "Quit"
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

let addRoleQuestion = [
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
    choices: getAllDepartments()
  }
]


async function getAllDepartments(){
  const result = await db.query( 'SELECT * FROM department');
  return result;

}


function allDepartments() {
  // // return ["A", "B", "C"];
  // db.query( 'SELECT * FROM department').then( err, results => {
  //   console.log(results.map(department => department.department_name));

  // }); 
  // const result = await db.query( 'SELECT * FROM department')
  // db.query('SELECT * FROM department', function () {
  //   // console.log(results.map(companyDepartment => companyDepartment.department_name))
  //   console.log(results.map(department => department.department_name));
  // });
  // return ["A", "B", "C"];

}

function mainMenu() {
  inquirer.prompt(mainQuestions)
  .then((answersMain) => {
    // console.log(answersMain)
      if (answersMain.action === "View All Employees"){
          // console.log(answersMain)
        viewAllEmployees();
      } else if (answersMain.action === "Add an Employee"){
        AddEmployee();
      } else if (answersMain.action === "Update an Employee Role"){
        UpdateRole();
      }  else if (answersMain.action === "View All Roles"){
        viewAllRoles();
      }  else if (answersMain.action === "Add Role"){
        AddRole();
      }  else if (answersMain.action === "View All Departments"){
        viewAllDepartments();
      } else if (answersMain.action === "Add a Department"){
        AddDepartment();
      } else {
          writeFile();
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
  db.query('SELECT * FROM employees', function (err, results) {
    console.log("\n")
    console.table(results);
  });
  mainMenu();
}

function viewAllRoles() {
  db.query('SELECT * FROM roles', function (err, results) {
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

  function AddRole() {
    inquirer.prompt(addRoleQuestion)
      .then((answersAR) => {
        // console.log(answersAR);
        let addRoleName = answersAR.AddRolename;
        let addRoleSalary = answersAR.salary;
        // let AddRoleDepartmentID = answersAR.belongDepartment;
        let ARbelongDepartment = answersAR.belongDepartment;
        // db.query('SELECT * FROM department', function (err, results) {
        // });
        db.query(`insert into roles (title,salary,department_id) values ("${addRoleName}", ${addRoleSalary}, "${ARbelongDepartment}");`, function (err, results) {
          // console.log(err)
          console.log("\n")
          console.table(results);
      });
      mainMenu();
      });
    }

// function AddEmployee() {
//   lfirstName
//   db.query('insert into employees (first_name, last_name, roles_id) values ("bob", "smith", 4);', function (err, results) {
//     console.log("\n")
//     console.table(results);
//   });
//   mainMenu();
// }




mainMenu();