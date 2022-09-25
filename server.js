const inquirer = require("inquirer");
const mysql = require('mysql2');
const fs = require("fs");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );