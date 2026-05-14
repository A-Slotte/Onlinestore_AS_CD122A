const webserver = require("./webserver.js");

const prodFunc = require("./services/productFunctions.js")

const userFunc = require("./services/userFunctions.js")

const server = webserver("Mitt test", 8080);

// HTML
server.registerFile("/home", "../frontend/home_page.html");
server.registerFile("/signUp_page", "../frontend/signUp_page.html");
server.registerFile("/login_page", "../frontend/login_page.html");
server.registerFile("/customer_page", "../frontend/customer_page.html");
server.registerFile("/admin_page", "../frontend/admin_page.html")
server.registerFile("/script.js", "../frontend/script.js");
server.registerFile("/customerScript.js", "../frontend/customerScript.js");
server.registerFile("/product", "../frontend/product.html");
server.registerFile("/productScript.js", "../frontend/productScript.js");
server.registerFile("/cart", "../frontend/cart_page.html");
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