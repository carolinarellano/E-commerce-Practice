const router = require('express').Router();
const dataHandler = require('../controllers/data_handler');
const ShoppingCart = require('../controllers/shopping_cart');

// GET /products
router.get('/', (req, res) => {
    const allProducts = dataHandler.getProducts();
    res.status(200).send(allProducts);
});


//POST /products/cart
const cart = new ShoppingCart();

// Agregar productos al carrito (por IDs)
router.post('/cart', (req, res) => {
    const productIds = req.body;
    if (!Array.isArray(productIds)) {
        res.status(400).json({ message: "Body should be an array of product IDs" });
        return;
    }
    try {
        const products = productIds.map(id => dataHandler.getProductsById(id)).filter(product => product);
        if (products.length !== productIds.length) {
            res.status(404).json({ message: "Some products were not found" });
            return;
        }
        products.forEach(product => cart.addItem(product, 1));
        console.log(cart.getAllItems());
        res.json(cart.getAllItems());
    } catch (error) {
        res.status(500).json({ message: "Error fetching products for cart", error: error.message });
    }
});

// GET /products/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const product = dataHandler.getProductsById(id);

    if (!product) {
        return res.status(404).json({ error: `No product found with the id "${id}"` });
    }

    res.status(200).send(product);
});

//Find by name or category
router.get('/search/:type/:query', (req, res) => {
    const type = req.params.type;
    const query = req.params.query;
    const products = dataHandler.searchProducts(query, type);
    res.send(products);
});


module.exports = router;