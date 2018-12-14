ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tito6543';

CREATE database bamazon;

USE bamazon;

CREATE table products (

	id INTEGER AUTO_INCREMENT NOT NULL,
    
    product_name VARCHAR(100) NOT NULL,
    
    department_name VARCHAR(100),
    
    price DECIMAL(10,2) NOT NULL,
    
    stock_quantity DECIMAL(10,0) NOT NULL,
    
    PRIMARY KEY (id)
    
    )
    
    SELECT * FROM products;
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Ovaltine", "Food and Beverage", 5.996, 342.5);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("George Foreman Grill", "Kitchen and Dining", 47.756, 400.3);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("John Deere riding lawnmower", "Home and Garden", 35.47, 214.4); 
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("frying pan", "Kitchen and Dining", 20.956, 322);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Tickle me Elmo", "Toys", 9.95, 437);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Poptarts", "Food and Beverag", 4.956, 564.5);
    
    UPDATE products set department_name = "Food and Beverage" where id = 6;
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("wheelbarrow", "Home and Garden", 29.957, 567);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("iPod nano", "Electronics", 175.996, 300);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Eggo Waffles", "Food and Beverage", 9.756, 627.5);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("fishing rod", "sporting and outdoors", 70.876, 534); 
    
    UPDATE products set department_name = "Sporting and Outdoor Goods" where id = 10; 
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("basketball", "Sporting and Outdoor Goods", 25.857, 536);
    
    DESCRIBE products;
    
    UPDATE products SET stock_quantity = 6 WHERE id = 2;
    