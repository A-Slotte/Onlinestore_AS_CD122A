const createDiscount = 'INSERT INTO discount(name, discount_percent) VALUES($1, $2) RETURNING*'

const createDuration = 'INSERT INTO duration(dis_id, s_date, e_date) VALUES($1, $2) RETURNING*'

module.exports = {createDiscount, createDuration}