// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { message } = require('statuses');

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Orioles1983',
    database: 'employee_tracker_db'
  }
  
);
connection.connect(function(err){
    if(err) throw err;
    console.log(`Connected to the eployee_tracker_db database.`)
    // init()
})


function viewDepartments(){
    connection.query('SELECT * FROM department;', function(err, results){
        if (err){
            console.log(err);
            throw err;
        }
        console.table(results);
        displayMenu()
    })
}
// viewDepartments()

function viewRoles(){
    connection.query('SELECT title, salary, name FROM role JOIN department ON role.department_id = department.id;', function(err, results){
        if (err){
            console.log(err)
            throw err;
        }
        console.table(results);
        displayMenu()
    })
}

function viewAllEmployees(){
    connection.query('SELECT * FROM employee;', function(err, results){
        if (err){
            console.log(err)
            throw err;
        }
        console.table(results)
        displayMenu()
    })
}


function addNewDepartment(){
    inquirer.prompt([
        {
            name: 'departmentName',
            message: 'What is the name of the department?',
            type: 'input'
        }
    ]).then(answers => {
        connection.query('INSERT INTO department (name) VALUES(?);', [[answers.departmentName]], function(err, results){
            if (err){
                console.log(err)
                throw err;
            }
            console.log('The department has been added.');
            displayMenu()
        })
    })
}
// addNewDepartment()

function addNewRole(){
    let departments = []
    connection.query('SELECT * FROM department;', function(err, results){
        if (err){
            console.log(err)
            throw err;
        }
        for(let i = 0; i < results.length; i++){
            departments.push({
                value: results[i].id,
                name: results[i].name
            })
        }
        inquirer.prompt([
            {
                name: 'roleName',
                message: 'What is the role title?',
                type: 'input'
            },
            {
                name: 'salary',
                message: 'What is the salary for this role?',
                type: 'input'
            },
            {
                name: 'department_id',
                message: 'What department does this role belong to?',
                type: 'list',
                choices: departments
            }
        ])
        .then(function(answers){
            connection.query('INSERT INTO role (title, salary, department_id) values(?);', [[answers.roleName, answers.salary, answers.department_id]], function(err, results){
                if (err){
                    console.log(err)
                    throw err;
                }
                console.log('Role added!');
                displayMenu()
            } )
        })
    })
    
}
// addNewRole()

function addEmployee(){
    let employees = []
    connection.query('SELECT * FROM employee;', function(err, results){
        if (err){
            console.log(err)
            throw err;
        }
        employees.push({
            value: -1,
            name: 'none'
        })
        for(let i = 0; i < results.length; i++){
            employees.push({
                value: results[i].id,
                name: results[i].first_name + ' ' + results[i].last_name
            })
        }
        let roles = []
        connection.query('SELECT * FROM role;', function(err, results){
            if (err){
                console.log(err)
                throw err;
            }
            for(let i = 0; i < results.length; i++){
                roles.push({
                    value: results[i].id,
                    name: results[i].title
                })
            }
            inquirer.prompt([
                {
                    name: 'first_name',
                    message: 'What is your first name?',
                    type: 'input'
                },
                {
                    name: 'last_name',
                    message: 'What is your last name?',
                    type: 'input'
                },
                {
                    name: 'role_id',
                    message: 'What is your role?',
                    type: 'list',
                    choices: roles
                },
                {
                    name: 'manager_id',
                    message: 'Who is your manager?',
                    type: 'list',
                    choices: employees
                }
            ])
            .then(function(answers){
                let sql = 'insert into employee(first_name, last_name, role_id';
                let values = [answers.first_name, answers.last_name, answers.role_id]
                if (answers.manager_id !== -1){
                    sql += ', manager_id'
                    values.push(answers.manager_id)
                }
                sql += ') values (?);'
                connection.query(sql, [values], function(err, results){
                    if (err){
                        console.log(err)
                        throw err;
                    }
                    console.log('Employee added!');
                    displayMenu()
                })
            })
        })
    });
}
// addEmployee()

function displayMenu(){
    let menuOptions = [
        'View all employees', 'Add employee', 'View all roles', 'Add role', 'View all departments', 'Add department', 'View department budgets'
    ]
    inquirer.prompt([
        {
            name: 'menu_option',
            message: 'What would you like to do?',
            type: 'list',
            choices: menuOptions
        }
    ])
    .then(function(answers){
        if (answers.menu_option == 'View all employees'){
            viewAllEmployees()
        }
        else if (answers.menu_option == 'Add employee'){
            addEmployee()
        }
        else if (answers.menu_option == 'View all roles'){
            viewRoles()
        }
        else if (answers.menu_option == 'Add role'){
            addNewRole()
        }
        else if (answers.menu_option == 'View all departments'){
            viewDepartments()
        }
        else if (answers.menu_option == 'Add department'){
            addNewDepartment()
        }
        else if (answers.menu_option == 'View department budgets'){
            displayBudget()
        }
    })
    
}
displayMenu()

function displayBudget(){
    let departments = []
    connection.query('SELECT * FROM department;', function(err, results){
        if (err){
            console.log(err)
            throw err;
        }
        for(let i = 0; i < results.length; i++){
            departments.push({
                value: results[i].id,
                name: results[i].name
            })
        }
        inquirer.prompt([
            {
                name: 'department_id',
                message: "Select a department to view it's budget",
                type: 'list',
                choices: departments
            }
        ])
        .then(function(answers){
            connection.query('SELECT SUM(salary) as budget FROM employee JOIN role ON role.id = employee.role_id WHERE department_id = ? ;',[answers.department_id], function(err, results){
                if (err){
                    console.log(err)
                    throw err;
                }
                if (results.length > 0 && results[0]['budget']){
                    console.log('$' + results[0]['budget']);
                }
                else 
                console.log('$0');
                displayMenu()
            } )
        })
    })
}