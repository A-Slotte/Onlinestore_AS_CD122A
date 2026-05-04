const createProduct = 'INSERT INTO products(name) VALUES($1) RETURNING *'

const createProductSupplier = 'INSERT INTO product_suppliers(prod_id, sup_id, price, stock) VALUES($1, $2, $3, $4)'

const getSuppliers = 'SELECT * from suppliers'

const getProducts = ' SELECT name FROM products JOIN on'