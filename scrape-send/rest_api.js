const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const dataFile = 'data.json';

// Dosyadan veri okuma
const readDataFromFile = () => {
  if (fs.existsSync(dataFile)) {
    const rawData = fs.readFileSync(dataFile, 'utf-8').split('\n').filter(line => line.trim());
    const validData = [];

    rawData.forEach(line => {
      try {
        // JSON.parse işlemi yapılırken hata yönetimi eklenir
        const jsonData = JSON.parse(line);
        validData.push(jsonData);
      } catch (err) {
        // Geçersiz JSON verileri console'a yazdırılır
        console.error('Invalid JSON line:', line);
      }
    });

    return validData;
  } else {
    return [];
  }
};

// REST API endpoint'leri
app.get('/products', (req, res) => {
  try {
    const data = readDataFromFile();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error reading data', error });
  }
});

app.get('/products/:name', (req, res) => {
  try {
    const data = readDataFromFile();
    const result = data.filter(product => product.name === req.params.name);
    res.json(result.length ? result : { message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error reading data', error });
  }
});

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`);
});
