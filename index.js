const inquirer = require("inquirer");
const mysql = require("mysql2");
const fs = require("fs");
const Department = require("./lib/department");
const Employees = require("./lib/employees");
const Roles = require("./lib/roles");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });