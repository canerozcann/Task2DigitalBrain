const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;
const dataFile = 'data.json';

// Dosyadan veri okuma
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf-8').split('\n').filter(line => line.trim()).map(line => JSON.parse(line));
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
};

// REST API endpoint'leri
app.get('/products', (req, res) => {
  const data = readDataFromFile();
  res.json(data);
});

app.get('/products/:name', (req, res) => {
  const data = readDataFromFile();
  const result = data.filter(product => product.name === req.params.name);
  res.json(result.length ? result : { message: 'Product not found' });
});

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`);
});
