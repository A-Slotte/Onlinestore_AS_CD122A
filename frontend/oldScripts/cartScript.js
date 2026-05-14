window.onload = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartBody = document.getElementById('cartBody');
    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price} kr</td>
            <td>${item.quantity}</td>
            <td>${itemTotal} kr</td>
            <td><button onclick="removeFromCart(${index})">Ta bort</button></td>
        `;
        cartBody.appendChild(row);
    });

    document.getElementById('totalPrice').textContent = total;
}

const removeFromCart = (index) => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

const placeOrder = async () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const user = JSON.parse(sessionStorage.getItem('user'));

    const response = await fetch('http://localhost:8080/placeOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ u_id: user.u_id, cart })
    });

    const data = await response.json();
    if (data.success) {
        sessionStorage.removeItem('cart');
        alert('Order lagd!');
        window.location.href = '/customer';
    }
}



const addToCart = (prod_id, name, price) => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) 
    if (cart = null) {cart = []}
    const existing = cart.find(item => item.prod_id === prod_id);

    if(existing) {
        existing.quantity++;
    } else {
        cart.push({prod_id, name, price, quantity: 1});
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
} 