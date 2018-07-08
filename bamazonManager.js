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
        switch (answers.menuChoice) {
            case "View Products for Sale":
                console.log("View Products");
                break;
            case "View Low Inventory":
                console.log("Low Inventory");
                break;
            case "Add to Inventory":
                console.log("Add Inventory");
                break;
            case "Add New Product":
                console.log("Add Product");
                break;
        }
    });
}

getUserInput();

 
// connection.end();