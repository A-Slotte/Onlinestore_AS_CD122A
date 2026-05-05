require('dotenv').config();
const pool = require('./config/db');
const supplierQueries = require('./queries/supplierQueries');
const userQueries = require('./queries/userQueries.js')
const productQueries = require('./queries/productQueries.js')
const discountQueries = require('./queries/discountQueries.js')

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

async function createDiscount() {
    const name = await question('Name: ')
    const percent = await question('Percent: ')
    const s_date = await question('Start Date: ')
    const e_date = await question('End date: ')

    const dis_di = await pool.query(discountQueries.createDiscount, [name, percent])
    const result = await pool.query(discountQueries.createDuration, [dis_di.rows[0].dis_di, s_date, e_date])
    console.log(result.rows[0].dis_di)
    
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
    const name = await question('Search PROD ID: ')
    console.log(name)
    console.log(productQueries.searchProductID)

    try {
        const result = await pool.query(productQueries.searchProductID, [name])
        console.log(result.rows[0]);
    }
    catch (err) {
        console.error("DB error:", err);    

    }finally{
        pool.end();
    }
}

//addUser();
//setAdmin();

//testQueriesInput();
//testQueries();
createDiscount();
 