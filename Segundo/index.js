const {ProductManager} = require ("./productManager");

const path = "./products.json";

const prodManager = new ProductManager(path);
console.log("prodManager", prodManager);