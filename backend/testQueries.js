require('dotenv').config();
const pool = require('./config/db');
const supplierQueries = require('./queries/supplierQueries');
const userQueries = require('./queries/userQueries.js')

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Hjälpfunktion med promise så du kan använda await
const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

async function testQueriesInput(){
    const name = await question('Name: ')
    const tel = await question('TEL: ')
    const address= await question('Address: ')
    const city = await question('CITY: ')

    const result = await pool.query(supplierQueries.createSupplier, [name, tel, address, city]);
    console.log(result.rows[0]);
}

async function addUser() {
    const f_name = await question('f_name: ');
    const l_name = await question('l_name: ');
    const tel = await question('tel: ');
    const email = await question('email: ');
    const address = await question('address: ');
    const city = await question('city: ');
    const password = await question('password');

    const result = await pool.query(userQueries.addUser, 
        [
        f_name,
        l_name, 
        tel,
        email,
        address,
        city,
        password
        ]);
    
    console.log(result.rows[0]);
}

async function setAdmin(){
    const userId = await question('Ange användar ID: ');
    const result = await pool.query(userQueries.promoteUser, [userId]);
    console.log(result.rows[0]);
}

async function testQueries() {
    try {
        const result = await pool.query(supplierQueries.getSuppliers)
        console.log(result);
    }
    catch (err) {
        console.error("DB error:", err);    

    }finally{
        await pool.end();
    }
}

//addUser();
setAdmin();

//testQueriesInput();
//testQueries();