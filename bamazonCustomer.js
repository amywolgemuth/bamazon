var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  // runInventory();
});

// function runInventory () {
function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // console.log(res);
    inventoryList();
    connection.end();
  });
}

//Running the app will first display all of the items available for sale.
//Included are the ids, names, and prices of products for sale.

function inventoryList() {
  var query = "SELECT item_id, product_name, price FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("-----Start: all products for sale------");
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " +
        res[i].item_id +
        " || Product: " +
        res[i].product_name +
        " || Price: " +
        res[i].price
      );
    }
    console.log("-----End: all products for sale------");
    inquirer
      .prompt([
        {
          name: "whatToBuy",
          type: "input",
          message: "Enter the item ID of the product you would like to purchase: "
        },
        {
          name: "howMany",
          type: "input",
          message: "How many of these do you wish to purchase? "
        },
      ])
  });
}

//The app will then prompt users with two messages
//The first should ask them the ID of the product they would like to buy
//The secone message will ask how many units of the product they would like to buy.