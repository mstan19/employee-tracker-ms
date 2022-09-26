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

async function getAllDepartments() {

  let dbDepartment = 'SELECT * FROM department'
  let [results, err] = await db.promise().query(dbDepartment);
  // results.map(department => department.department_name);
  return results;
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

  // async function getAllRole() {

  //   let dbRoles = 'UPDATE * FROM roles'
  //   let [results, err] = await db.promise().query(dbRoles);
    
  //   return results.map(role => role.roles_id);
  //  }
  

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

async function AddEmployee() {
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
      choices: await getAllDepartments()
    }
  ])
    .then((answersAE) => {
      // console.log(answersAR);
      let addFirstName = answersAE.addFirstName;
      let addLastName = answersAE.addLastName;
     
      // let AddRoleDepartmentID = answersAR.belongDepartment;
      let AEbelongDepartment = answersAE.belongDepartment;
      // db.query('SELECT * FROM department', function (err, results) {
      // });
      db.query(`insert into employees (title,salary,department_id) values ("${addFirstName}", ${addLastName}, "${AEbelongDepartment}");`, function (err, results) {
        // console.log(err)
        console.log("\n")
        console.table(results);
    });
    mainMenu();
    });
  }




mainMenu();