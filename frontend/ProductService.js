const Product = require("/Product.js")

class ProductService {
    products = [];
    constructor() {
        
    }

async loadProducts() {
    const tableBody = document.getElementById('tableBody')

    const response = await fetch('http://localhost:8080/loadProducts', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
    
    products = await response.json();
    console.log("data: ", products);
}


}