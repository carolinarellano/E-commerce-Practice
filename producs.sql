-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Crear tabla products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(255),
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, category, image)
VALUES
('Vestido Floral', 'Vestido fresco ideal para primavera', 799.99, 'Fashion', 'https://i.ibb.co/YTBZ1k6/vestido.jpg'),
('Zapatillas Running', 'Zapatillas deportivas ultraligeras', 1200.00, 'Collection', 'https://i.ibb.co/1QMJ0WR/zapatillas.jpg'),
('Bolso de Cuero', 'Bolso elegante para eventos formales', 950.50, 'Fashion', 'https://i.ibb.co/3sH2yTg/bolso.jpg'),
('Chaqueta Denim', 'Chaqueta de mezclilla estilo casual', 1100.00, 'Collection', 'https://i.ibb.co/mBFnWLz/chaqueta.jpg'),
('Pantalón Cargo', 'Pantalón resistente y cómodo', 850.75, 'Fashion', 'https://i.ibb.co/PCR95rG/pantalon.jpg');
