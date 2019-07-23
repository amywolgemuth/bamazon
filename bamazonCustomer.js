var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
});

// function runInventory () {
function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // console.log(res);
    inventoryList();
    // connection.end();
  });
}

//Running the app will first display all of the items available for sale.
//Included are the ids, names, and prices of products for sale.
function inventoryList() {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("-----Start: all products for sale------");
    // instantiate
    var table = new Table({
      head: ['ID', 'Product Name', 'Department', 'Price', 'Stock quantity']
    });
    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    for (var i = 0; i < res.length; i++) {
      var temp = [];
      for (var key in res[i]) {
        temp.push(res[i][key]);
      }
      table.push(
        temp
      );
    }
    console.log(table.toString());
    buyStuff();
  })
}

//The app will then prompt users with two messages
//The first should ask them the ID of the product they would like to buy
//The second message will ask how many units of the product they would like to buy.
function buyStuff() {
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
    .then(function (answer) {
      connection.query("SELECT stock_quantity,price FROM products WHERE item_id = ?", [parseInt(answer.whatToBuy)], function (err, res) {
        // console.log("Res"+JSON.stringify(res));
        //this is doing he math, reducing inventory and calculating total cost
        if (err) throw err;
        if (res[0].stock_quantity >= parseInt(answer.howMany)) {
          var q = res[0].stock_quantity - parseInt(answer.howMany);

          connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: q }, { item_id: parseInt(answer.whatToBuy) }], function (err, q_data) {
            if (err) {
              return console.log(err);
            }
            var p = res[0].price * parseInt(answer.howMany);
            console.log("Total Price: " + p);
          })
        }
        else {
          console.log("Insufficient quantity!");
        }
        connection.end();
      })
    }
    )
}


