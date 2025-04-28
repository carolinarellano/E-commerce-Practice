const axios = require('axios');

const products = [
  {
    title: 'Coco Channel Bag Pharrel Williams',
    description: 'A stylish bag by Pharrel Williams with Chanel branding.',
    imageURL: 'https://i.ibb.co/93gx354H',
    unit: 'unit',
    stock: 100,
    pricePerUnit: 3500.00,
    category: 'Fashion'
  },
  {
    title: 'Stars Heels Miu Miu',
    description: 'Elegant high heels by Miu Miu with star embellishments.',
    imageURL: 'https://i.ibb.co/bGwC1QQ',
    unit: 'unit',
    stock: 150,
    pricePerUnit: 1200.00,
    category: 'Footwear'
  },
  {
    title: 'New Balance Tennis Shoes',
    description: 'Comfortable and stylish tennis shoes by New Balance.',
    imageURL: 'https://i.ibb.co/gMjNNKFm',
    unit: 'pair',
    stock: 200,
    pricePerUnit: 899.99,
    category: 'Footwear'
  },
  {
    title: 'Sonny Angels Sea Edition',
    description: 'Sonny Angels collectible figurines in a sea theme.',
    imageURL: 'https://i.ibb.co/NdWC5ynw',
    unit: 'unit',
    stock: 300,
    pricePerUnit: 150.00,
    category: 'Toys'
  },
  {
    title: 'Sylvanian Friends',
    description: 'Adorable animal figurines from the Sylvanian Families series.',
    imageURL: 'https://i.ibb.co/h1y5VCRp',
    unit: 'set',
    stock: 120,
    pricePerUnit: 800.00,
    category: 'Toys'
  },
  {
    title: 'Pink Globe',
    description: 'A decorative pink globe with vintage-style details.',
    imageURL: 'https://i.ibb.co/0pZK0jFT',
    unit: 'unit',
    stock: 50,
    pricePerUnit: 350.00,
    category: 'Home Decor'
  },
  {
    title: 'Ceramic Blender',
    description: 'A ceramic blender for blending your favorite smoothies.',
    imageURL: 'https://i.ibb.co/1fQ2kN8Y',
    unit: 'unit',
    stock: 75,
    pricePerUnit: 1500.00,
    category: 'Kitchen Appliances'
  }
];

async function populateProducts() {
  try {
    for (const product of products) {
      const response = await axios.post('http://localhost:3000/products', product);
      console.log('Producto creado:', response.data.title);
    }
    console.log('✅ Todos los productos fueron cargados exitosamente.');
  } catch (error) {
    console.error('❌ Error al crear productos:', error.response?.data || error.message);
  }
}

populateProducts();
