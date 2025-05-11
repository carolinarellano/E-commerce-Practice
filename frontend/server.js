const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'src/public')));

// Ruta de prueba
app.get('/', (req, res) => {
  res.render('home', {
    user: { name: "Emiliano" },
    products: [
      { title: "Reloj", imageURL: "/Images/1.png", price: 100 },
      { title: "Cámara", imageURL: "/Images/2.png", price: 250 },
      { title: "Zapatos", imageURL: "/Images/3.png", price: 80 }
    ]
  });
});


app.listen(3000, () => {
  console.log("Frontend preview running on http://localhost:3000");
});
