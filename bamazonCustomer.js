//setup dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

//establish connection with the MySQL DB
var connection = mysql.createConnection({host: "localhost", port: 3306, user: "root", password: "z", database: "bamazon"});

connection.connect(function (error) {
    if (error) 
        throw error;
    
    // console.log("connected!);
    productListing();
});
var selectAll = 'SELECT * FROM products';

function prompt(purchaseItem) {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID number of the product you would like to buy?",
            name: "ID",
            validate: function (value) {
                if (isNaN(value) === false && value >= 1 && value <= purchaseItem.length) {
                    return true;
                }
                return false;
            }
        }, {
            type: "input",
            message: "How many units would you like to buy?",
            name: "units",
            validate: function (value) {
                if (isNaN(value) === false && value >= 1 && value <= purchaseItem.length) {
                    return true;
                }
                return false;
            }
        }
        ])
        .then(function (answer) {
            var productID = answer.ID;
            var productNum = answer.units;

            connection.query("SELECT * FROM products WHERE ?", [
                {
                    ID: productID
                }
            ], function (err, data) {
                if (err) 
                    throw err;
                
                if (data.length === 0) {
                    console.log("Error please pick a valid product");
                } else {
                    var productData = data[0];

                    if (stock_quantity <= productNum) {
                        console.log("We have enough in stock. One moment please and we will place your order.");
                        var updateQuery = ("UPDATE products SET stock_quantity = " + productData.stock_quantity - productNum) + "WHERE item_id = " + productID;
                        connection.query(updateQuery, function (err, data) {
                            if (err) 
                                throw err;
                            console.log('Your oder has been placed! Your total is $' + productData.price * productNum);
                        })

                    }

                }

            });

            function productListing() {
                connection
                    .query("SELECT * FROM products", function (err, res) {
                        if (err) 
                            throw err;
                        console.log("");
                        productListing = res;
                        var table = new Table({
                            head: [
                                'ID', 'Product', 'Department', 'Price', 'Stock'
                            ],
                            colWidths: [10, 30, 30, 30, 30]
                        });
                        for (var i in res) {
                            let item = res[i];
                            table.push([item.item_id, item.product_name, item.department_name, item.price, item.stock_quantity]);
                        }
                        console.log(table.toString());
                        prompt(res);
                    })
            }

            function createTable() {

                var table = new Table({
                    head: [
                        'ID', 'Product', 'Department', 'Price', 'Stock'
                    ],
                    colWidths: [10, 30, 30, 30, 30]
                });
                for (var i in res) {
                    productListing = res;
                    let item = res[i];
                    table.push([item.item_id, item.product_name, item.department_name, item.price, item.stock_quantity]);
                }
                console.log(table.toString());

            }
        
