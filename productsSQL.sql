DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity DECIMAL(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values
(1, "Make-up Brush set", "make-up", 16.00, 18),
(2, "Maybelline Waterproof Mascara", 7.50, 33),
(3, "Marc Jacobs Daisy perfume 1.7 oz", "fine fragrances", 95.00, 10),
(4, "La vie est belle by Lancome 1.0 oz perfume", "fine fragrances", 48.00, 18),
(5, "Neutrogena facial moisturizer", "skin care", 18.00, 30),
(6, "Olay Regenerist anti-wrikle cream", "skin care", 23.75, 40),
(7, "Covergirl dual finish powder", "make-up", 11.00, 22),
(8, "Pet water fountain", "pets", 25.00, 5),
(9, "Dr Elseys 20 lbs Touch of Outdoors cat litter", "pets", 14.00, 35),
(10, "Purina Fancy Feast canned cat food case", "pets", 20.00, 5),
(11, "l'Oreal New York eyeshadow pallette", "Make-up", 9.00, 9),
(12, "cat toys set-of-5 favorites", "pets", 12.00, 15)