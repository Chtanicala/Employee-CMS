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

let viewDepartments = () => {
  db.query(`SELECT * FROM departments`,  (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    console.log(fields);
  });
}



let addDepartment = () => {
    inquirer
        .prompt(
            {
                type: 'input',
                message: "What is the name of the department?",
                name: "addDepartment",
            }
        )
        .then((answers) => {
            console.log(answers);

            db.query(`INSERT INTO departments (name) VALUES (${addDepartment.answers});`,  (err, result) => {
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