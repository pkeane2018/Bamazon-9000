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