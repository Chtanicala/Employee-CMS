
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

    db.connect(function(err){
        if (err) {
          console.log(err)
        }
        console.log('Connected to MySQL.');
    })

const navOptions = [
    {
        type: 'list',
        message: "What would you like to do?",
        name: "navOptions",
        choices: ["View ALL Departments", "View ALL Roles", "View ALL Employees",
                    "Add Departments", "Add Roles", "Add Employees",
                    "Update Departments", "Update Roles", "Update Employees", "Quit"]
    }
]

let findAllDepartments = () => {
  return db.promise().query(`SELECT name, department_id FROM departments`) 
  
}

let findAllRoles = () => {
  return db.promise().query(`SELECT * FROM roles`) 
}

let findAllEmployees = () => {
  return db.promise().query(`SELECT * FROM employees`) 
}


// View All Functions
let viewDepartments = () => {
    db.query(`SELECT * FROM departments`,  (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
      navMenu()
    });
  }

let viewRoles = () => {
    db.query(`SELECT * FROM roles`,  (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
      navMenu()
    });
  }

let viewEmployees = () => {
    db.query(`SELECT * FROM employees`,  (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
      navMenu()
    });
  }

// Add Questions
let addDepartmentQuestions = [
            {
                type: 'input',
                message: "What is the name of the department?",
                name: "addDepartmentName",
            }
]

// Update Questions
let updateDepartmentQuestions =
            [
                {
                    type: 'list',
                    message: "Select the department to update",
                    name: "updateDepartmentList",
                    // choices: departmentArray
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
                    // choices: roleArray
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
                    // choices: employeeArray
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
                    // choices: roleArray 
                },
                {
                    type: 'input',
                    message: "Enter the employee's new manager",
                    name: "updateEmployeeManager",
                    // choices: managerArray 
                },
            ]

// Add Functions

let addDepartments = () => {
  inquirer
    .prompt(
      addDepartmentQuestions
    )
    .then((answers) => {
      db.query(`INSERT INTO departments (name) VALUES ("${answers.addDepartmentName}")`, (err, results) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Successefully added to the database!");
          navMenu()
        }
      })
    })
};

let addRoles = () => {
  findAllDepartments().then(([rows]) => {
    let departments = rows;
      const departmentChoices = departments.map(({ department_id, name }) => ({
        name: name,
        value: department_id
      }));

  inquirer
    .prompt(
      [
        {
            type: 'input',
            message: "Enter role title",
            name: "title",
        },
        {
            type: 'input',
            message: "Enter role salary",
            name: "salary",
        },
        {
            type: 'list',
            message: "Enter role department",
            name: "department_id",
            choices: departmentChoices,
        }
    ]
    )
    .then((answers) => {
      console.log(answers)
      db.query(`INSERT INTO roles SET ?`, answers, (err, results) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Successefully added to the database!");
          navMenu()
        }
      })
    })
  })
}

let addEmployees = () => {
  findAllRoles().then(([rows]) => {
    let roles = rows;
      const roleChoices = roles.map(({ role_id, title }) => ({
        name: title,
        value: role_id
      }));

  inquirer
    .prompt(
      [
        {
            type: 'input',
            message: "Enter employee's first name",
            name: "first_name",
        },
        {
            type: 'input',
            message: "Enter employee's last name",
            name: "last_name",
        },
        {
            type: 'list',
            message: "Enter employee role",
            name: "role_id",
            choices: roleChoices
        },
    ]
    )
    .then((answers) => {
      console.log(answers)
      db.query(`INSERT INTO employees SET ?`, answers, (err, results) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Successefully added to the database!");
          navMenu()
        }
      })
    })
  })
}

// Update Functions
// Update Departments
let updateDepartments = () => {
  findAllDepartments().then(([rows]) => {
    let departments = rows;
      const departmentChoices = departments.map(({ department_id, name }) => ({
        name: name,
        value: department_id
      }));

  inquirer
    .prompt(
      [
        {
            type: 'list',
            message: "Select the department to update",
            name: "department_id",
            choices: departmentChoices
        },
        {
            type: 'input',
            message: "Enter the department's new name",
            name: "name", 
        }
    ]
    )
    .then((answers) => {
      console.log(answers)
      db.query(`UPDATE departments SET ? WHERE department_id = ${answers.department_id}`, answers, (err, results) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Successefully Updated");
          navMenu()
        }
      })
    })
  })
}

// Update Roles
// Update Employees



let navMenu = () => {
    inquirer
        .prompt(
            navOptions
        )
        .then((answers) => {
            console.log(answers);
            if (answers.navOptions === "View ALL Departments" ) {
                viewDepartments()

            } else if (answers.navOptions === "Add Departments") {
                addDepartments()
                
            } else if (answers.navOptions === "Update Departments") {
                updateDepartments()
                
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
                updateEmployees()
                
            } else if (answers.navOptions === "Quit") {
              process.exit()
            }
        })
}

// createConnection();

navMenu();

