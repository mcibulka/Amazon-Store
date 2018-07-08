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
    
    function listItems() {
        var query = `SELECT item_id, product_name, price, stock_quantity FROM products`;

        connection.query(query, function (error, results, fields) {
            if (error) throw error;

            console.log("\n");
            console.table(results);
            console.log("\n");
        });
    }


    function lowInventory() {
        var query = `SELECT item_id, product_name, stock_quantity FROM products
                     WHERE stock_quantity < 100`;

        connection.query(query, function (error, results, fields) {
            if (error) throw error;

            console.log("\n");
            console.table(results);
            console.log("\n");
        }); 
    }


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
                listItems();
                break;
            case "View Low Inventory":
                lowInventory();
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