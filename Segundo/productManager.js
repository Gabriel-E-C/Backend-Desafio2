const fs = require ("fs");

class ProductManager {
    constructor (path) {
        this.path = path;
    };

    addProduct (title, descritpion, price, thumbnail,code, stock){
        let newID;
        
        const newProduct = {
            id: 0,
            title,
            descritpion,
            price,
            thumbnail,
            code,
            stock
        };

        if (fs.existsSync (this.path)){
            const contenido = fs.readFileSync (this.path, "utf-8");
            const contenidoArreglo = JSON.parse(contenido);
            newID = contenidoArreglo[contenidoArreglo.length - 1].id + 1;
            newProduct.id = newID;
            contenidoArreglo.push (newProduct);
            console.log("El nuevo contenido es", contenidoArreglo);
            fs.writeFileSync (this.path,JSON.stringify(contenidoArreglo,null,"/t"));
        } else {
            const primerProducto = [];
            newProduct.id = 1;
            primerProducto.push (newProduct);
            fs.writeFileSync (this.path, JSON.stringify(primerProducto,null,"/t"));
        } 
    };

    getProduct (){
        if (fs.existsSync (this.path)){
            const contenido = fs.readFileSync (this.path, "utf-8");
            const contenidoArreglo = JSON.parse(contenido);
            return contenidoArreglo;
        } else {
            return console.log ("No se puede getProduct porque el archivo no existe.");
        }
    };

    getProductByID (productID) {
        let productExist; 
        
        if (fs.existsSync (this.path)){
            const contenido = fs.readFileSync (this.path, "utf-8");
            const contenidoArreglo = JSON.parse(contenido);
            productExist = contenidoArreglo.find((product)=> product.id === productID);
            if (!productExist){
                return ("Not Found");
            } else {
                return productExist;
            }; 
        } else {
            return console.log ("No se puede getProductByID porque el archivo no existe.");
        }
    };

    updateProduct (productID, campoActualizar, valorActualizar){
        let productoActualizar;

        if (fs.existsSync (this.path)){
            const contenido = fs.readFileSync (this.path, "utf-8");
            const contenidoArreglo = JSON.parse(contenido);
            productExist = contenidoArreglo.indexOf((product)=> product.id === productID);
                if (!productExist){
                    return ("Not Found");
                } else {
                    productoActualizar = contenidoArreglo [productExist];
                };
            //productoActualizar = this.getProductByID (productID);
            productoActualizar.campoActualizar = valorActualizar;
            contenidoArreglo [productExist] = productoActualizar;
            fs.writeFileSync(this.path, JSON.stringify(contenidoArreglo,null,"/t"));
        } else {
            return console.log ("No se puede updateProduct porque el archivo no existe.");
        }
    };

    deleteProduct (productID){
        if (fs.existsSync (this.path)){
            const contenido = fs.readFileSync (this.path, "utf-8");
            const contenidoArreglo = JSON.parse(contenido);
            productExist = contenidoArreglo.indexOf((product)=> product.id === productID);
                if (!productExist){
                    return ("Not Found");
                } else {
                    contenidoArreglo.splice(productExist,1);
                    fs.writeFileSync(this.path, JSON.stringify(contenidoArreglo,null,"/t"));        
                };
        } else {
            return console.log ("No se puede updateProduct porque el archivo no existe.");
        }
    };

}

module.exports = { ProductManager }