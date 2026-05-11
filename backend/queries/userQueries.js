const addUser = 'INSERT INTO users(f_name, l_name, tel, email, address, city, password) values($1, $2, $3, $4, $5, $6, $7) RETURNING *'

const promoteUser = 'UPDATE users SET is_admin = true WHERE u_id = $1 RETURNING *'

const getUser = 'SELECT * from users WHERE email = $1'

module.exports = {addUser, promoteUser, getUser}