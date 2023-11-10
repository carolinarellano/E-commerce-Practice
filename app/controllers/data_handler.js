const fs = require('fs');
const path = require('path');
const Product = require('../controllers/product.js');

const productFilePath = path.join(__dirname, '../data/products.json');

// Read data from the JSON file
function readProducts() {
    try {
        const data = fs.readFileSync(productFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading product data:', error);
        return [];
    }
}

// Write data to the JSON file
function writeProducts(products) {
    try {
        fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Error writing product data:', error);
    }
}

function getProducts() {
    return readProducts();
}

function getProductsById(uuid) {
    const products = readProducts();
    return products.find((product) => product._uuid === uuid) || null;
}

function createProduct(product) {
    const products = readProducts();
    const newItem = new Product(product._title, product._description, product._imageURL, product._unit, product._stock, product._pricePerUnit, product._category);
    products.push(newItem);
    writeProducts(products);
}

function updateProduct(uuid, updatedProduct) {
    const products = readProducts();
    const index = products.findIndex((product) => product._uuid === uuid);

    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        writeProducts(products);
        return true;
    }

    return false;
}

function deleteProduct(uuid) {
    const products = readProducts();
    const index = products.findIndex((product) => product._uuid === uuid);

    if (index !== -1) {
        products.splice(index, 1);
        writeProducts(products);
        return true;
    }

    return false;
}

function searchProducts(searchKey, searchType) {
    const products = readProducts();
    let foundProducts;

    if (searchType === 'name') {
        foundProducts = products.filter((product) =>
            product._title.toLowerCase().includes(searchKey.toLowerCase())
        );
    } else if (searchType === 'category') {
        foundProducts = products.filter((product) =>
            product._category.toLowerCase() === searchKey.toLowerCase()
        );
    } else {
        console.error('Invalid search type. Use "name" or "category".');
        return false;
    }

    if (foundProducts.length === 0) {
        console.error(`No products found with the ${searchType} "${searchKey}" :(`);
        return false;
    } else {
        console.log(`Products found with the ${searchType} "${searchKey}":`);
        console.table(foundProducts);
        return JSON.stringify(foundProducts);
    }
}

exports.getProducts = getProducts;
exports.getProductsById = getProductsById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.searchProducts = searchProducts;
