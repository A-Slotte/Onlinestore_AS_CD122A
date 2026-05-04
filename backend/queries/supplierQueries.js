const createSupplier = 'INSERT INTO supplier (name, tel, address, city) VALUES ($1, $2, $3, $4) RETURNING * ';

const getSuppliers = 'SELECT * from supplier'

module.exports = {createSupplier, getSuppliers}