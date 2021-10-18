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

let viewRoles = () => {
    db.query(`SELECT * FROM roles`,  (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      console.log(fields);
    });
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
            // {
            //     type: 'input',
            //     message: "Enter role department",
            //     name: "addRolesDepartment",
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
                    name: "updateDepartmentName", 
                },
                {
                    type: 'input',
                    message: "Enter the role's new salary",
                    name: "updateDepartmentSalary", 
                }
            ]
        )
}