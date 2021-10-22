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

// Add Functions
let addDepartment = () => {
    inquirer
        .prompt(
            {
                type: 'input',
                message: "What is the name of the department?",
                name: "addDepartmentName",
            }
        )
        .then((answers) => {
            console.log(answers);

            db.query(`INSERT INTO departments (name) VALUES (${addDepartment.answers})`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });

            db.query(`SELECT * FROM departments`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
    
        })
  }

let addRoles = () => {
    inquirer
        .prompt([
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
                type: 'input',
                message: "Enter role department",
                name: "addRolesDepartment",
            }
        ]
            
        )
        .then((answers) => {
            console.log(answers);

            db.query(`INSERT INTO roles (title) VALUES (${addRolesTitle.answers});`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
            
            db.query(`INSERT INTO roles (salary) VALUES (${addRolesSalary.answers});`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });

            db.query(`SELECT * FROM roles`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
        })
}

let addEmployees = () => {
    inquirer
        .prompt([
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
                type: 'input',
                message: "Enter manger",
                name: "addEmployeeManager",
            }
        ]
            
        )
        .then((answers) => {
            console.log(answers);

            db.query(`INSERT INTO employees (first_name) VALUES (${addEmployeeFirst.answers});`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
            
            db.query(`INSERT INTO employees (last_name) VALUES (${addEmployeeLast.answers});`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });

            db.query(`SELECT * FROM employees`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
        })
}

// Update Functions
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
        then((answers) => {
            console.log(answers);

            db.query(`UPDATE departments SET (first_name) = (${updateDepartmentName.answers}) WHERE department_id = (${updateDepartmentId.answers});`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });

            db.query(`SELECT * FROM departments`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
        })
}

let updateRoles = () => {
    inquirer
        .prompt(
            [
                {
                    type: 'input',
                    message: "Enter the id of the role you want to update",
                    name: "updateRoleId",
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
        )
        then((answers) => {
            console.log(answers);

            db.query(`UPDATE roles SET (title) = (${updateRoleName.answers}) WHERE role_id = (${updateRoleId.answers});`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });

            db.query(`UPDATE roles SET (salary) = (${updateRoleSalary.answers}) WHERE role_id = (${updateRoleId.answers});`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });

            db.query(`SELECT * FROM roles`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
        })
}

let updateEmployee = () => {
    inquirer
        .prompt(
            [
                {
                    type: 'input',
                    message: "Enter the id of the employee you want to update",
                    name: "updateEmployeeId",
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
                    type: 'input',
                    message: "Enter the employee's new role",
                    name: "updateEmployeeRole", 
                },
                {
                    type: 'input',
                    message: "Enter the employee's new manager",
                    name: "updateEmployeeManager", 
                },
            ]
        )
        then((answers) => {
            console.log(answers);

            db.query(`UPDATE employees SET (first_name) = (${updateEmployeeFirst}) WHERE employee_id = (${updateEmployeeId.answers});`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });

            db.query(`UPDATE employees SET (last_name) = (${updateEmployeeLast}) WHERE employee_id = (${updateEmployeeId.answers});`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });

            db.query(`SELECT * FROM roles`,  (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              });
        })
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

navMenu()