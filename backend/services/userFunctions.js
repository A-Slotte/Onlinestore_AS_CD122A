require('dotenv').config();
const bcrypt = require('bcryptjs')

const uQueries = require("../queries/userQueries")
const pool = require("../config/db")

const createUser = async(req, resp, searchParams, error) => {
    console.log("createUser anropad");  
    console.log(req.method);

    try {
            const body = await new Promise((resolve) => {
            let data = '';
            req.on('data', chunk => data += chunk);
            req.on('end', () => resolve(JSON.parse(data)));
        });

        const {f_name, l_name, tel, email, address, city, password} = body;
        console.log(f_name, l_name, tel, email, address, city, password);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(uQueries.addUser, 
        [f_name, l_name, tel, email, address, city, hashedPassword]);

        console.log("User created!");
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.end(JSON.stringify({ success: true }));
        
    } catch (err) {
        console.log('Fel')
        console.error("Error:", err);
        error(resp, 500, "Error creating user");
    }
        
}




const userLogin = async(req, resp, searchParams, errorReply) => {
    
    console.log("UserLogin used!")

    const body = await new Promise((resolve) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => resolve(JSON.parse(data)));
    });

    const {email, password} = body;
    
    try{
        let user = await pool.query(uQueries.getUser, [email])

        if (user.rows.length === 0){
            throw new Error('No user found')
        }
        const auth = await bcrypt.compare(password, user.rows[0].password)
        if(auth) {
            console.log("Login succes")
            resp.writeHead(200, { "Content-Type": "application/json" });
            resp.end(JSON.stringify({
            success: true,
            u_id: user.rows[0].u_id,
            f_name: user.rows[0].f_name,
            email: user.rows[0].email,
            is_admin: user.rows[0].is_admin,
            }));
        } else {
            throw new Error("Incorrect password")
            
        }
        

    } catch (error) {
        resp.end(JSON.stringify({ success: false}))
        console.error('Login failed', error)
    }
}
console.log(__filename);  // i userFunctions.js



module.exports = {userLogin, createUser}