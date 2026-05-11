const login = async () =>  {
    console.log('login anropad');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    console.log(email, password);

    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
    console.log("1")
    const user = await response.json();
    console.log(user +"1");
    console.log(user.success + "2");

    if (user.success){        
        console.log("2")
        console.log(user.f_name);
        if (user.is_admin){
            console.log("3")
            window.location.href = "/admin_page";
        } else {
            console.log("4")
            window.location.href = "/customer_page"
        }
        
    } else {
        console.log("5")
        console.log("Server error");
        alert("Wrong email or password")
        return;
    }
}

const signUp = async () => {
    const f_name = document.getElementById('f_name').value;
    const l_name = document.getElementById('l_name').value;
    const tel = document.getElementById('tel').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const password = document.getElementById('password').value;

    console.log(f_name, l_name, tel, email, address, city, password);

    const response = await fetch('http://localhost:8080/signUp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({f_name, l_name, tel, email, address, city, password})
    });
    console.log("Status: ",response.status);

    
    const data = await response.json();
    console.log("Data: ", data);

    if (!response.ok) {
        console.log("Server error");
        alert("Error")
        return;
    } 
    else {
        alert("Account created!");
        window.location.href = "/customer_page";
    }
}

const loadProducts = async (params) => {
    const response = await fetch('http://localhost:8080/', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })

    const data = await response.json();
    console.log("data: ", data);

    data.forEach(element => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${product.name}</td> <td>${product.price}</td> <td>${product.stock}</td>`;
        tableBody.appendChild(row);
    });
}