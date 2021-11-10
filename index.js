const { restoreDefaultPrompts } = require('inquirer');
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

  function createConnection(){
    db.connect(function(err){
        if (err) throw err;
        console.log('Connected to MySQL.')
        createArr();
        init();
    })
}

let departmentArray =[];
let roleArray =[];
let managerArray =[];
let employeeArray =[];

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

let createArray = () => {
  db.query(`SELECT name FROM department`), (err, results) => {
    if (err) {
      console.log(err)
    } else if (results.length > 0) {
      for (let index = 0; index < results.length; index++) {
        departmentArray.push(results[index].name)
        
      }
    }
  };
  db.query(`SELECT title FROM roles`), (err, results) => {
    if (err) {
      console.log(err)
    } else if (results.length > 0) {
      for (let index = 0; index < results.length; index++) {
        roleArray.push(results[index].name)
        
      }
    }
  };
  db.query(`SELECT title FROM roles`), (err, results) => {
    if (err) {
      console.log(err)
    } else if (results.length > 0) {
      for (let index = 0; index < results.length; index++) {
        roleArray.push(results[index].name)
        
      }
    }
  };
}


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

// Add Functions
let addDepartmentQuestions = [
            {
                type: 'input',
                message: "What is the name of the department?",
                name: "addDepartmentName",
            }
]


let addRoleQuestions = [
            {
                type: 'input',
                message: "Enter role title",
                name: "addRolesTitle",
            },
            {
                type: 'input',
                message: "Enter role salary",
                name: "addRolesSalary",
            },
            {
                type: 'list',
                message: "Enter role department",
                name: "addRolesDepartment",
                choices: departmentArray,
            }
        ]

let addEmployeeQuestions = [
            {
                type: 'input',
                message: "Enter employee's first name",
                name: "addEmployeeFirst",
            },
            {
                type: 'input',
                message: "Enter employee's last name",
                name: "addEmployeeLast",
            },
            {
                type: 'input',
                message: "Enter employee role",
                name: "addEmployeeRole",
            },

            {
                type: 'list',
                message: "Select manager",
                name: "addEmployeeManager",
                choices: managerArray,
            }
        ]

// Update Functions
let updateDepartmentQuestions =
            [
                {
                    type: 'list',
                    message: "Select the department to update",
                    name: "updateDepartmentList",
                    choices: departmentArray
                },
                {
                    type: 'input',
                    message: "Enter the department's new name",
                    name: "updateDepartmentName", 
                }
            ]

let updateRolesQuestions = 
            [
                {
                    type: 'list',
                    message: "Select the role to update",
                    name: "updateRoleList",
                    choices: roleArray
                },
                {
                    type: 'input',
                    message: "Enter the role's new name",
                    name: "updateRoleName", 
                },
                {
                    type: 'input',
                    message: "Enter the role's new salary",
                    name: "updateRoleSalary", 
                }
            ]

let updateEmployeeQuestions =
            [
                {
                    type: 'list',
                    message: "Enter the id of the employee you want to update",
                    name: "updateEmployeeList",
                    choices: employeeArray
                },
                {
                    type: 'input',
                    message: "Enter the employee's new first name",
                    name: "updateEmployeeFirst", 
                },
                {
                    type: 'input',
                    message: "Enter the employee's new last name",
                    name: "updateEmployeeLast", 
                },
                {
                    type: 'list',
                    message: "Enter the employee's new role",
                    name: "updateEmployeeRole",
                    choices: roleArray 
                },
                {
                    type: 'input',
                    message: "Enter the employee's new manager",
                    name: "updateEmployeeManager",
                    choices: managerArray 
                },
            ]


let navMenu = () => {


inquirer
        .prompt(
            navOptions
        )
        .then((answers) => {
            console.log(answers);
            if (answers.navOptions === "View ALL Departments" ) {
                viewDepartments()

            } else if (answers.navOptions === "Add Department") {
                addDepartment()
                
            } else if (answers.navOptions === "Update Department") {
                updateDepartment()
                
            } else if (answers.navOptions === "View ALL Roles") {
                viewRoles()
                
            } else if (answers.navOptions === "Add Roles") {
                addRoles()
                
            } else if (answers.navOptions === "Update Roles") {
                updateRoles()
                
            } else if (answers.navOptions === "View ALL Employees") {
                viewEmployees()
                
            } else if (answers.navOptions === "Add Employees") {
                addEmployees()
                
            } else if (answers.navOptions === "Update Employees") {
                updateEmployee()
                
            }
        })
}
createConnection();
navMenu();
