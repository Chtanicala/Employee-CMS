const inquirer = require('inquirer');
const mysql = require('mysql2');

// const departments = require('./classes/Department')

// What would you like to do?
// - View Departments, Roles, Employees
// - Add Department, Role, Employee
// - Update Department, Role, Employee

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: '123root',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  )

const navOptions = [
    {
        type: 'list',
        message: "What would you like to do?",
        name: "navOptions",
        choices: ["View ALL Departments", "View ALL Roles", "View ALL Employees",
                    "Add Department", "Add Role", "Add Employee",
                    "Update Department", "Update Role", "Update Employee", "Quit"]
    }
]

// View All Functions
let viewDepartments = () => {
    db.query(`SELECT * FROM departments`,  (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  }

let viewRoles = () => {
    db.query(`SELECT * FROM roles`,  (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  }

let viewEmployees = () => {
    db.query(`SELECT * FROM employees`,  (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  }


let navMenu = () => {


inquirer
        .prompt(
            navOptions
        )
        .then((answers) => {
            console.log(answers);
            if (answers.navOptions === "View ALL Departments" ) {
                viewDepartments()
                navMenu()

            } else if (answers.navOptions === "Add Department") {
                addDepartment()
            } else if (answers.navOptions === "View ALL Roles") {
                viewRoles()
                navMenu()
            } else if (answers.navOptions === "View ALL Employees") {
                viewEmployees()
                navMenu()
            } 
        })
}

navMenu()