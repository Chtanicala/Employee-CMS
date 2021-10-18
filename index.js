const inquirer = require('inquirer');
const db = require('mysql2');

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

let addDepartment = () => {
    inquirer
        .prompt(
            {
                type: 'input',
                message: "What is the name of the department?",
                name: "addDepartment",
            }
        ) 
}

let updateDepartment = () => {
    inquirer
        .prompt(
            [
                {
                    type: 'input',
                    message: "Enter the id of the department you want to update",
                    name: "updateDepartmentId",
                },
                {
                    type: 'input',
                    message: "Enter the department's new name",
                    name: "updateDepartmentName", 
                }
            ]
        )
}

inquirer
        .prompt(
            navOptions
        )
        .then((answers) => {
            console.log(answers);
            if (answers.navOptions === "Add Department" ) {
                addDepartment()
            } else if (answers.navOptions === "Update Department") {
                updateDepartment()
            }
        })