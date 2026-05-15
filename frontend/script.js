const ProductService = require(".ProductService.js")


let products = [];
let suppliers = [];
let discounts = [];

window.onload = async () => {
    
    if(!sessionStorage.getItem('products')) {
        let prodService = new ProductService();
        let supService = new SupplierService();
        let disService = new DiscountService();
        
        products = prodService.loadProducts();
        suppliers = supService.loadSuppliers();
        discounts = disService.loadDiscounts();
    }
}

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