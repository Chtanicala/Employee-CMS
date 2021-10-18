const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  )


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
            // {
            //     type: 'input',
            //     message: "Enter employee role",
            //     name: "addEmployeeRole",
            // }
            // {
            //     type: 'input',
            //     message: "Enter manger",
            //     name: "addEmployeeManager",
            // }
        ]
            
        )
        .then((answers) => {
            console.log(answers);

        //     db.query(`INSERT INTO roles (name) VALUES (${addDepartment.answers});`,  (err, result) => {
        //         if (err) {
        //           console.log(err);
        //         }
        //         console.log(result);
        //       });

        //     db.query(`SELECT * FROM roles`,  (err, result) => {
        //         if (err) {
        //           console.log(err);
        //         }
        //         console.log(result);
        //       });
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
}