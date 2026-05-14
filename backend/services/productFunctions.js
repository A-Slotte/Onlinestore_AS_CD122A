const prodQuerie = require("../queries/productQueries");
const supQuerie = require("../queries/supplierQueries");
require('dotenv').config();
const pool = require("../config/db")
const getProductList = async(req, resp, searchParams, error) => {
    try {
        const prodList = await pool.query(prodQuerie.getProducts);
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.end(JSON.stringify(prodList.rows));
    } catch (err){
        console.error("Error: ", err);
    }
}



module.exports = {getProductList};