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

console.log(`\n\t\t\tBAMazon - Manager`);
console.log(`\t\t\t=================\n`);

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


    function addInventory() {
        inquirer.prompt([
            {
                type: "input",
                name: "itemID",
                message: "Please enter the item ID you would like to add inventory for:"
            },
            {
                type: "input",
                name: "addQty",
                message: "How many units would you like to add?"
            }
        ]).then(answers => {
            var query = `SELECT stock_quantity FROM products
                         WHERE item_id = ?`;

            var oldQty = -1;
            var newQty = 0;

            connection.query(query, [answers.itemID], function (error, results, fields) {
                if (error) throw error;

                oldQty = results[0]["stock_quantity"];
            });

            setTimeout(updateQty, 100);     // allow oldQty to be set before making query to update table
            
            function updateQty() {
                newQty = oldQty + parseInt(answers.addQty);

                var updateQuery = `UPDATE products
                                   SET stock_quantity = ?
                                   WHERE item_id = ?;`

                connection.query(updateQuery, [newQty, answers.itemID], function (error, results, fields) {
                    if (error) throw error;

                    console.log(`\nItem #${answers.itemID}'s quantity updated to ${newQty}.\n`);
                });
            }
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
                listItems();
                setTimeout(addInventory, 500);  // display all items before getting inputs for add inventory
                break;
            case "Add New Product":
                console.log("Add Product");
                break;
        }
    });
}

getUserInput();

 
// connection.end();