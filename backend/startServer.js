const webserver = require("./webserver.js");

const prodFunc = require("./services/productFunctions.js")

const userFunc = require("./services/userFunctions.js")

const server = webserver("Mitt test", 8080);

// HTML
server.registerFile("/home", "../frontend/pages/home_page.html");
server.registerFile("/signUp_page", "../frontend/pages/signUp_page.html");
server.registerFile("/customer_page", "../frontend/pages/customer_page.html");
server.registerFile("/login_page", "../frontend/pages/login_page.html");
server.registerFile("/customer_page", "../frontend/pages/customer_page.html");
server.registerFile("/admin_page", "../frontend/pages/admin_page.html")
server.registerFile("/script.js", "../frontend/script.js");
server.registerFile("/customerScript.js", "../frontend/customerScript.js");
server.registerFile("/product", "../frontend/pages/product.html");
server.registerFile("/productScript.js", "../frontend/productScript.js");
server.registerFile("/cart", "../frontend/pages/cart_page.html");
server.registerFile("/cartScript.js", "../frontend/cartScript.js")

server.registerFile("/UserService", "../frontend/userService.js")
server.registerFile("/User", "../frontend/User.js")
// SERVICES
console.log(userFunc)
server.registerService("/loadProducts", prodFunc.getProductList);
server.registerService("/login", userFunc.userLogin)
server.registerService("/signUp", userFunc.createUser)
console.log("signup registered")

server.start();

console.log("Server startat på http://localhost:8080")