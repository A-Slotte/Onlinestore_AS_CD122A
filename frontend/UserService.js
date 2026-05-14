class userService {

    _user;    

    async signUp() {
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
            this._user = new User(data.u_id, f_name, l_name, tel, email, address, city)
            sessionStorage.setItem('user', JSON.stringify(this._user));
            window.location.href = "/customer_page";
        }
    }

    async logout () {
        this._user = null; 
        sessionStorage.removeItem('user');
        window.location.href = "/home";
    }

    // Login
    // - Anropar userLogin.
    // - Succes skickar användaren till customer_page/admin_page
    async login () {
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
            this._user = new User(user.u_id, user.f_name, user.l_name, user.tel, user.email, user.address, user.city, user.is_admin)
            sessionStorage.setItem('user', JSON.stringify(this.user));
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
}