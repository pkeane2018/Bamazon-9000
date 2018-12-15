var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "tito6543",

    database: "bamazon"

});

connection.connect(function(error){

    if (error) throw error;

    homepage();

});

function homepage() {

    inquirer.prompt([

        {
            type: "list",
            name: "options",
            message: "Please choose what you would like to do from the following list.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

        }

    ]).then(function(response){

        if (response.options === "View Products for Sale") {

            viewprod();
            
        }

        else if (response.options === "View Low Inventory") {
            
            viewLow();

        }

        else if (response.options === "Add to Inventory") {

            addToInv();

        }

        else if (response.options === "Add New Product") {

            addNewProd();

        }

    });

};

function viewprod() {

    connection.query("SELECT * FROM products", function(error, results, fields){

        if (error) throw error;

        console.log("Here are the items we have in stock: ");
        for (i = 0; i < results.length; i++) {
            console.log("\nproduct id: " + results[i].id + " " + " name: " + results[i].product_name + " " + " price: $" + results[i].price + " " + " quantity: " + results[i].stock_quantity);
            console.log("\n-------");
        };

        askUser();
        
    }); 

};

function viewLow() {

    connection.query("SELECT * FROM products", function(error, results, fields){

        var full = true;

        if (error) throw error;

        console.log("Here are the items in our inventory that we have a low quantity of: ");

        for (i = 0; i < results.length; i++) {

            if (results[i].stock_quantity < 5) {

            full = false;

            console.log("\nproduct id: " + results[i].id + " " + " name: " + results[i].product_name + " " + " price: $" + results[i].price + " " + " quantity: " + results[i].stock_quantity);
            console.log("\n-------");

            }
            
        };

        if ( full === true) {

            console.log("None of the items have a low quantity.")

        };


        askUser();
        
    }); 
};

function addToInv() {

    inquirer.prompt([

        {
            name: "id",
            message: "Please enter the id of the product you would like to add more of."
        },

        {
            name: "quantity",
            message: "Please enter to quantity you would like to add."
        }

    ]).then(function(response){

        var currentQuantity = 0;
        var newQuantity = 0;

        response.id = response.id.toString();

        connection.query('SELECT * FROM products WHERE id = ?', [response.id], function(error, results, fields){

            if (error) throw error;

            currentQuantity = results[0].stock_quantity;
            response.quantity = parseInt(response.quantity);
            newQuantity = currentQuantity + response.quantity;
            response.id = response.id.toString();

            connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [newQuantity, response.id], function(error, results, fields){

                if (error) throw error;
    
                console.log("Quantity updated");
                console.log("The new quantity is " + newQuantity);

                askUser();
    
            })

        });

    })

};

function addNewProd() {

    inquirer.prompt([

        {
            name: "name",
            message: "Product name: "

        },

        {
            type: "list",
            name: "dept",
            message: "Department: ",
            choices: ["Food and Beverage", "Kitchen and Dining", "Home and Garden", "Toys", "Electronics", "Sporting and Outdoor Goods"]

        },

        {
            name: "price",
            message: "Price($): "
        },

        {
            name: "quantity",
            message: "Quantity: "
        },

    ]).then(function(response){

        connection.query('INSERT INTO products SET product_name = ?, department_name = ?, price = ?, stock_quantity = ?', [response.name, response.dept, response.price, response.quantity], function(error, results, fields){

            if (error) throw error;

            console.log("Product successfully added");

            askUser();
        });

    });

};

function askUser() {

    inquirer.prompt([

        {
            type: "list",
            name: "options",
            message: "Would like to return to the home screen or end your session?",
            choices: ["Return to home screen", "End session"]

        }

    ]).then(function(response){

        if (response.options === "Return to home screen") {

            homepage();
        }

        else {

            endsession();
        }

    });

};

function endsession() {

    console.log("Goodbye!");
    connection.end();

}