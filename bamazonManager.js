var mysql = require ("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "z",
    database: "bamazon"
});

connection.connect(function(error){
    if (error) throw error;
// console.log("connected!);
});

inquirer
.prompt([
    {
        type: "list",
        name: "options",
        message: "Pick an option",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]        
    }
])
.then(answers => {
    switch(answers.options) {
        case "View Products for Sale":
        console.log("Check out PRODUCTS");
        productListing();
        break;
        case "View Low Inventory":
        console.log("View LOW INVENTORY");
        lowInventory();
        break;
        case "Add to Inventory":
        console.log("ADD to INVENTORY");
        addMore();
        break;
        case "Add New Product":
        console.log("ADD NEW PRODUCT");
        newProduct();
        break;
    }
  });

function productListing () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("");
        productListing = res;
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'Stock'],
            colWidths: [10, 30, 30, 30, 30]
        });
        for (var i in res) {
            let item = res[i];
            table.push([item.item_id, item.product_name, item.department_name, item.price, item.stock_quantity]);
        }
        console.log(table.toString());
    })
}


function lowInventory () {
    var lowInv = "SELECT * FROM products WHERE stock_quantity <= 50";
    connection.query(lowInv, function(err, res) {
        // console.log(res);
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'Stock'],
            colWidths: [10, 30, 30, 30, 30]
        });
        for (var i in res) {
            let item = res[i];
            table.push([item.item_id, item.product_name, item.department_name, item.price, item.stock_quantity]);
        
        }
        console.log(table.toString());
        // console.log(res);

    })

}

function addMore () {
    inquirer
    .prompt([
        {
            type: "input",
            name: "addProduct",
            message: "Add more of any current item:"       
        }

    ])
    .then(answers => {
        console.log(answers.input);
        // to do - determine user input via inquirer and then add more of quantity_stock to an item that is low


    })
}

function newProduct() {
    // Create a mysql query to add an entire new item.
}





