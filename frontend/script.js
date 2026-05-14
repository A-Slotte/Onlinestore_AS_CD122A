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
        discoutns = disService.loadDiscounts();


    }
}
