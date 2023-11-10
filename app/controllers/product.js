const utils = require('./utils')

class ProductException {
    constructor(errorMessage) {
        this._errorMessage = errorMessage
    }

    sendErrorMessage() {
        console.log(this._errorMessage);
    }
}

class Product {
    constructor(title, description, imageURL, unit, stock, pricePerUnit, category) {
        this._uuid = utils.generateUUID();
        this._title = title;
        this._description = description;
        this._imageURL = imageURL;
        this._unit = unit;
        this._stock = stock;
        this._pricePerUnit = pricePerUnit;
        this._category = category;
    }

    set title(title) {
        if (title == "" || title == undefined) {
            const error = new ProductException("Title is obligatory");
            error.sendErrorMessage();
            return;
        }
        this._title = title;
    }

    set description(description) {
        if (description == undefined || description == "") {
            const error = new ProductException("Description is obligatory");
            error.sendErrorMessage();
            return;
        }
        this._description = description;
    }

    set imageURL(imageURL) {
        if (imageURL == undefined || imageURL == "") {
            const error = new ProductException("Image URL is obligatory");
            error.sendErrorMessage();
            return;
        }
        this._imageURL = imageURL;
    }

    set unit(unit) {
        if (unit == undefined || unit == "") {
            const error = new ProductException("Please enter a valid unit value");
            error.sendErrorMessage();
            return;
        }
        this._unit = unit;
    }

    set stock(stock) {
        if (stock == undefined || stock == "" || stock < 0) {
            const error = new ProductException("Please enter a valid stock value");
            error.sendErrorMessage();
            return;
        }
        this._stock = stock;
    }

    set pricePerUnit(pricePerUnit) {
        if (pricePerUnit == undefined || pricePerUnit == "" || pricePerUnit < 0) {
            const error = new ProductException("Please enter a valid price value");
            error.sendErrorMessage();
            return;
        }
        this._pricePerUnit = pricePerUnit;
    }

    set category(category) {
        if (category == undefined || category == "") {
            const error = new ProductException("Category is obligatory");
            error.sendErrorMessage();
            return;
        }
        this._category = category;
    }

    get uuid() {
        return this._uuid;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get imageURL() {
        return this._imageURL;
    }

    get unit() {
        return this._unit;
    }

    get stock() {
        return this._stock;
    }

    get pricePerUnit() {
        return this._pricePerUnit;
    }

    get category() {
        return this._category;
    }

    static createFromJson(jsonValue) {
        const jsonObj = JSON.parse(jsonValue);
        const { title, description, imageURL, unit, stock, pricePerUnit, category, uuid } = jsonObj;
        if (!uuid || !title || !description || !imageURL || !unit || !stock || !pricePerUnit || !category) {
            throw new ProductException("Invalid JSON data for creating a product.");
        }
        return new Product(title, description, imageURL, unit, stock, pricePerUnit, category, uuid);
    }


    static cleanObject(obj) {
        const productKeys = ["title", "description", "imageURL", "unit", "stock", "pricePerUnit", "category"];
        let object = {}
        for (const key in productKeys) {
            if (obj.hasOwnProperty(key)) {
                object[key] = obj[key]
            }
        }
        return object;
    }

    static createFromObject(obj) {
        const { title, description, imageURL, unit, stock, pricePerUnit, category } = obj;
        return new Product(title, description, imageURL, unit, stock, pricePerUnit, category);
    }

}

module.exports = Product; 