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
    
    const products = await response.json();
    console.log("data: ", products);
     

    products.forEach(products => {
        const row = document.createElement('tr');
        if(products.discounted_price != null){
            row.innerHTML = `<td><a href="/product?prod_id=${products.prod_id}">${products.product_name}</td> 
            <td style="color: red;">${products.discounted_price} <s style="color: grey;">${products.price}</s></td>
            <td>${products.stock}</td><td>${products.sup_name}</td>`
        }
        else {
            row.innerHTML = `<td><a href="/product?prod_id=${products.prod_id}">${products.product_name}</td>
            <td> ${products.price}</td><td>${products.stock}</td>
            <td>${products.sup_name}</td>`
        };
        tableBody.appendChild(row);
    });
}


}