const Product = require('./product');
const dataHandler = require('../data/products.json');

class ProductProxy {
    constructor(uuid, amount) {
        this._uuid = uuid
        this._amount = parseFloat(amount.toFixed(2))
    }
}

class ShoppingCartException {
    constructor(errorMessage) {
        this._errorMessage = errorMessage;
    }
    ShoppingCartErrorMessage() {
        console.log(this._errorMessage);
    }
}

class ShoppingCart {
    constructor() {
        this._proxies = []
        this._cartProducts = dataHandler;
    }

    get proxies() {
        return this._proxies
    };


    //Read?
    get cartProducts() {
        return this._cartProducts
    };


    //Create
    addItem(uuid, amount, callback) {
        console.log("Adding products to the shopping cart...")
        let existingProxy = this._proxies.find((proxy) => proxy._uuid === uuid);
        if (existingProxy) {
            existingProxy._amount += parseFloat(amount.toFixed(2));
        } else {
            const newProxy = new ProductProxy(uuid, amount);
            this._proxies.push(newProxy);
        }

        if (typeof callback === 'function') {
            callback();
        }
    }


    //Update
    updateItem(uuid, amount) {
        if (amount < 0) {
            const error = new ShoppingCartException("Amount can't be less than zero");
            error.ShoppingCartErrorMessage();
            return;
        }
        for (let i = 0; i < this._proxies.length; i++) {
            if (uuid == this._proxies[i]._uuid) {
                this._proxies[i]._amount += parseFloat(amount.toFixed(2));
                if (this._proxies[i]._amount < 0) {
                    this._proxies.splice(i, 1);
                }
            }
        }
    }


    //Delete
    removeItem(uuid) {
        const index = this._proxies.findIndex((proxy) => proxy._uuid === uuid);

        if (index !== -1) {
            this._proxies.splice(index, 1);
        } else {
            throw new ShoppingCartException(`Product with UUID ${uuid} not found in the cart.`);
        }
    }


    calculateTotal() {
        let sum = 0;
        for (const proxy of this._proxies) {
            const product = this._cartProducts.find((p) => p._uuid === proxy._uuid);
            if (product) {
                sum += product._pricePerUnit * proxy._amount;
            }
        }
        return parseFloat(sum.toFixed(2));

    }

    getAllItems() {
        return this._cartProducts;
    }


}

module.exports = ShoppingCart; 