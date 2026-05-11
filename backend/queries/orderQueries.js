const createOrder = 'INSERT INTO orders(u_id, order_date) VALUES($1, CURRENT_DATE)'

const createProductOrder = 'INSERT INTO product_orders(prod_id, order_id, price_bought ) VALUES($1, $2, $3)'


module.exports = {createOrder, createProductOrder}