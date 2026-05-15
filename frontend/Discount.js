class Dicount {
    products = [];
    constructor(id, name, percent, s_date, e_date, prod_id) {
        this.id = id;
        this.name = name;
        this.percent = percent;
        this.s_date = s_date;
        this.e_date = e_date;
        this.prod_id = prod_id;
    }
    
    addProduct = (prod) => {
        products.append(prod);
    }
}