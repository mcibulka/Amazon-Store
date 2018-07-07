var mysql = require("mysql");
var cTable = require("console.table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "root",
    database : "bamazon"
});
 
connection.connect();

console.log(`\n\t\t\tWelcome to BAMazon`);
console.log(`\t\t\t==================\n`);

function getUserInput() {
    inquirer.prompt([
        {
            type: "list",
            name: "menuChoice",
            message: "Select one of the following:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(answers => {
        console.log(answers.menuChoice);
    });
}

setTimeout(getUserInput, 500);

 
// connection.end();