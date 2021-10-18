const inquirer = require('inquirer');
const mysql = require('mysql2');

// What would you like to do?
// - View Departments, Roles, Employees
// - Add Department, Role, Employee
// - Update Department, Role, Employee



const navOptions = [
    {
        type: 'list',
        message: "What would you like to do?",
        name: "navOptions",
        choices: ["View ALL Departments", "View ALL Roles", "View ALL Employees",
                    "Add Department", "Add Role", "Add Employee",
                    "Update Department", "Update Role", "Update Employee", "Quit"]
    },
]

inquirer
        .prompt(
            navOptions
        )
        .then((answers) => {
            console.log(answers);
            if (answers.navOptions === "View ALL Departments" ) {
                viewDepartments()
            } else if (answers.navOptions === "View ALL Roles") {
                viewRoles()
            } else if (answers.navOptions === "View ALL Employees") {
                viewEmployees()
            } else {
                return
            }
        })
