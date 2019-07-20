var mysql = require ("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
    // runInventory();
});

// function runInventory () {
    function afterConnection() {
        connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
          console.log(res);
          connection.end();
        });
      }

    // var query = "SELECT item_id, product_name, price FROM bamazon.products having count(*) > 0";
    // connection.query(query, function(err, res) {
    //     if (err) throw err;
    //     console.log(res);
    //     connection.end();
    //     for (var i = 0, i < res.length; i++) {
    //         console.log(res[i].item_id + " " + res[i].product_name + " " res[i].price)
    //     }
    // })

//Running the app will first display all of the items available for sale.
//Include the ids, names, and prices of products for sale.


//The app will then prompt users with two messages
//The first should ask them the ID of the product they would like to buy
//The secone message will ask how many units of the product they would like to buy.
