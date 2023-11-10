const express = require('express');
const path = require('path');
const productRouter = require('../routes/products');
const adminProductRouter = require('../routes/admin_products');

const router = express.Router();

function validateAdmin(req, res, next) {
    const authToken = req.headers['x-auth'];
    if (authToken !== 'admin') {
        res.status(403).json({ message: "Unauthorized access" });
        return;
    }
    next();
}

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/home.html'));
});
router.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/home.html'));
});
router.get('/shopping_cart', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/shopping_cart.html'))
});

router.use('/products', productRouter);
router.use('/admin/products', validateAdmin, adminProductRouter);

router.post('/products/cart', async (req, res) => {
    try {
        const ids = req.body;
        if (!Array.isArray(ids)) {
            return res.status(400).json({ message: "Expected an array of product IDs." });
        }

        const products = await getProducts();
        const cartProducts = [];

        for (const id of ids) {
            const product = products.find(prod => prod.id === id);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${id} not found.` });
            }
            cartProducts.push(product);
            res.json(product);
        }

        res.json(cartProducts);
    } catch (error) {
        res.status(500).json({ message: "Error processing the request." });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const products = await getProductsById(id);
        const product = products.find(prod => prod.id === id);
        if (!product) {
            return res.status(404).json({ message: `Product with ID ${id} not found.` });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error processing the request." });
    }
});

module.exports = router;