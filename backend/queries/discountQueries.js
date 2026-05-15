const createDiscount = 'INSERT INTO discount(name, discount_percent) VALUES($1, $2) RETURNING dis_id'

const createDuration = 'INSERT INTO duration(dis_id, s_date, e_date) VALUES($1, $2) RETURNING*'

const createDiscountProduct = 'INSERT INTO discount_products(dur_id, prod_id) VALUES($1, $2) RETURNING*'

module.exports = {createDiscount, createDuration}