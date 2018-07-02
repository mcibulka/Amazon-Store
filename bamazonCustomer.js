var mysql = require("mysql");
var cTable = require("console.table");

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
 
connection.end();