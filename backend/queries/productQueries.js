
const createProduct = 'INSERT INTO products(name) VALUES($1) RETURNING *'

const createProductSupplier = 'INSERT INTO product_suppliers(prod_id, sup_id, price, stock) VALUES($1, $2, $3, $4)'

const getProducts = 'SELECT * from products'

const updateStock = 'UPDATE product_suppliers SET stock = $1 WHERE prod_id = $2 AND sup_id = $3'

const searchProductID = 'SELECT products.name, products.prod_id, product_suppliers.sup_id, product_suppliers.price, product_suppliers.stock FROM products JOIN product_suppliers ON products.prod_id = product_suppliers.prod_id WHERE products.prod_id = $1'

const searchProductName = 'SELECT products.name, products.prod_id, product_suppliers.sup_id, product_suppliers.price, product_suppliers.stock FROM products JOIN product_suppliers ON products.prod_id = product_suppliers.prod_id WHERE products.name = $1'

const searchProductSup = 'SELECT products.name, products.prod_id, product_suppliers.sup_id, product_suppliers.price, product_suppliers.stock FROM products JOIN product_suppliers ON products.prod_id = product_suppliers.prod_id WHERE product_suppliers.sup_id = $1'

module.exports = { createProduct, createProductSupplier, getProducts, searchProductID, searchProductName, searchProductSup }