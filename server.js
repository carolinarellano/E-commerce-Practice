require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const productRoutes = require('./src/app/routes/products');


const app = express();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Rutas Front
app.use('/', require('./src/app/routes/home'));
app.use('/about_us', require('./src/app/routes/aboutUs'));
app.use('/store', require('./src/app/routes/store'));
app.use('/auth', require('./src/app/routes/auth'));
app.use('/cart', require('./src/app/routes/cart'));
app.use('/orders', require('./src/app/routes/orders'));
app.use('/profile', require('./src/app/routes/profile'));
app.use('/products', productRoutes);

// Rutas Admin
app.use('/admin', require('./src/app/routes/admin'));

// Ruta de Health Check (opcional)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Página 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
