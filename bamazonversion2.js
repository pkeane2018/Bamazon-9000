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

    console.log("connected as ID " + connection.threadId);

    search();

});

function search() {

    connection.query("SELECT * FROM products", function(error, results, fields){

        if (error) throw error;

        console.log("Welcome to Bamazon. Here are the items we have in stock: ");
        for (i = 0; i < results.length; i++) {
            console.log("\nproduct id: " + results[i].id + " " + " name: " + results[i].product_name + " " + " price: $" + results[i].price);
            console.log("\n-------");
        };
        
        searchtype();

    });

}

function searchtype() {

    inquirer.prompt([

        {
            type: "list",
            name: "search_choice",
            message: "Would you like to choose a product by id or search by department?",
            choices : ["choose product by id", "search by department"]
        }
    ]).then(function(inquirerResponse){

        if ((inquirerResponse.search_choice) === "choose product by id") {
           
            choosebyid();

        }

        else {

            searchbydep();
           
        }

    })

};

function choosebyid() {

    inquirer.prompt([

        {
            name: "product_choice",
            message: "Please input the id of the product you would like to purchase."
        },

        {
        name: "quantity",
        message: "How many would you like to purchase?"}

    ]).then(function(inquirerResponse){

        var CurrentQuantity;
        var RequestedQuantity;
        var OrderCost;
        var price;

        connection.query("SELECT * FROM products WHERE id=" + "'" + inquirerResponse.product_choice + "'", function(error, results, fields) {

            if (error) throw error;

            var product_id = inquirerResponse.product_choice;
            console.log(results);
            CurrentQuantity = parseInt(results[0].stock_quantity);
            RequestedQuantity = parseInt(inquirerResponse.quantity);

            console.log("You have chosen " + results[0].product_name);
            console.log("The current quantity of this product is " + CurrentQuantity);
            console.log("The requested quantity is " + RequestedQuantity);

            price = parseFloat(results[0].price).toFixed(2);
            OrderCost = (RequestedQuantity * price);

            if (RequestedQuantity > CurrentQuantity) {

                console.log("Insufficient Quantity! Request failed.");
            }

            else {

                
                console.log("The price for this item is $" + price);
                console.log("Your total comes to $" + OrderCost);

                CurrentQuantity = CurrentQuantity - RequestedQuantity;
                console.log("The new quantity of this item is " + CurrentQuantity);

                connection.query('UPDATE products SET stock_quantity = ? WHERE id = ?', [CurrentQuantity, product_id], function(error, results, fields){

                    if (error) throw error;
                })

            };

            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Would you like to purchase another item?",
                    name: "confirm"
            }

            ]).then(function(inquirerResponse){

                if (inquirerResponse.confirm) {

                    search();
                }

                else {

                    console.log("Thank you for your purchase. Have a great day!");
                    connection.end();
                }
            })

        })

    })
};

function searchbydep() {

    inquirer.prompt([

        {
            type: "list",
            name: "dep_choice",
            message: "Choose a department from the list.",
            choices: ["Food and Beverage", "Kitchen and Dining", "Home and Garden", "Toys", "Electronics", "Sporting and Outdoor Goods"]

        }

    ]).then(function(inquirerResponse){

        connection.query('SELECT * FROM products WHERE department_name=' + "'" + inquirerResponse.dep_choice + "'", function(error, results, fields) {

            if (error) throw error;

            for (i = 0; i < results.length; i++) {
                console.log("\nproduct id: " + results[i].id + " " + " name: " + results[i].product_name + " " + " price: $" + results[i].price);
                console.log("\n-------------")
            };

            inquirer.prompt([

            {
               type: "list",
               name: "choice",
               message: "Would you like to choose from these products or start over?",
               choices: ["choose a product", "start over"] 
            }

            ]).then(function(inquirerResponse){

                if ((inquirerResponse.choice) === ("choose a product")) {

                    choosebyid();

                }

                else if ((inquirerResponse.choice) === ("start over")) { 

                    search();
                }
            })

        });

});

};

   

