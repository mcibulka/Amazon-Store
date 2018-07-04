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
console.log(`The following items are for sale:\n`);

/*  Get all products and display to user */
connection.query("SELECT item_id, product_name, price FROM products", function (error, results, fields) {
    if (error) throw error;

    console.table(results);
    console.log("\n");
});


function getUserInput() {
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "Enter the Item ID of the product you would like to buy:"
        },
        {
            type: "input",
            name: "units",
            message: "How many units of the item?"
        }
    ]).then(answers => {
        var availStockQuery = `SELECT item_id, price, stock_quantity FROM products
                               WHERE item_id = "${answers.item_id}";`;

                               
        connection.query(availStockQuery, function (error, results, fields) {
            var unitPrice = results[0].price;

            if (error) throw error;

            if (answers.units <= results[0].stock_quantity) {
                var newQuantity = results[0].stock_quantity - answers.units;

                var purchaseQuery = `UPDATE products
                                     SET stock_quantity = "${newQuantity}"
                                     WHERE item_id = "${answers.item_id}";`


                connection.query(purchaseQuery, function (error, results, fields) {
                    if (error) throw error;

                    var totalCost = unitPrice * answers.units;
                    
                    console.log(`\nTransaction SUCCESSFUL: You owe \$${totalCost}\n`);
                });
            }
            else {
                console.log("\nTransaction FAILED: Insufficient stock available.\n");
            }
        });
    });
}

setTimeout(getUserInput, 500);

 
// connection.end();