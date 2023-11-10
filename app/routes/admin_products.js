const express = require('express');
const dataHandler = require('../controllers/data_handler.js');
const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');
const router = express.Router();

// Middleware de validación para verificar si el usuario es un administrador
function validateAdmin(req, res, next) {
    const authToken = req.headers['x-auth'];
    if (authToken !== 'admin') {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
}

// Middleware to validate data
const validateProductData = [
    body('_title').notEmpty().withMessage('Product title is missing in the request'),
    body('_description').notEmpty().withMessage('Product description is missing in the request'),
    body('_imageURL').notEmpty().withMessage('Product image is missing in the request'),
    body('_unit').notEmpty().withMessage('Product unit is missing in the request'),
    body('_stock').notEmpty().withMessage('Product stock is missing in the request'),
    body('_pricePerUnit').notEmpty().withMessage('Product price per unit is missing in the request'),
    body('_category').notEmpty().withMessage('Product category is missing in the request'),
];

// Create a new product
router.post('/', validateAdmin, validateProductData, (req, res) => {
    console.log("Entered the product creation route");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const requestData = req.body;
    const product = {
        _title: requestData._title,
        _description: requestData._description,
        _imageURL: requestData._imageURL,
        _unit: requestData._unit,
        _stock: requestData._stock,
        _pricePerUnit: requestData._pricePerUnit,
        _category: requestData._category,
    };
    dataHandler.createProduct(product);
    res.json(product);
    return res.status(200).send('Product inserted successfully');
});


router.route('/:id')
    .put((req, res) => {
        console.log("Entered the product update route with ID:", req.params.id);
        try {
            const existingProduct = dataHandler.getProductsById(req.params.id);

            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            existingProduct._title = req.body._title !== undefined ? req.body._title : "undefined";
            existingProduct._description = req.body._description !== undefined ? req.body._description : "undefined";
            existingProduct._imageURL = req.body._imageURL !== undefined ? req.body._imageURL : "undefined";
            existingProduct._unit = req.body._unit !== undefined ? req.body._unit : "undefined";
            existingProduct._stock = req.body._stock !== undefined ? req.body._stock : 0;
            existingProduct._pricePerUnit = req.body._pricePerUnit !== undefined ? req.body._pricePerUnit : 0;
            existingProduct._category = req.body._category !== undefined ? req.body._category : "undefined";

            const result = dataHandler.updateProduct(req.params.id, existingProduct);

            if (!result) {
                res.status(404).json({ message: "Product not found" });
            } else {
                res.status(200).json(result);
                res.json(result);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: "Error updating product", error: error.message });
        }
    })
    .delete((req, res) => {
        console.log("Entered the product delete route with ID:", req.params.id);
        try {
            const deletedProduct = dataHandler.deleteProduct(req.params.id);
            if (!deletedProduct) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.json(deletedProduct);
        } catch (error) {
            res.status(500).json({ message: "Error deleting product", error: error.message });
        }
    });

module.exports = router;