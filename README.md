Herkese merhaba Task’ımızın 2.  bölümü olan  

TASK 2 

• using any programming language, get only the data on page 1 from 

https://scrapeme.live/shop/. The data sample is as follows. 

• write the data you get in 1 second intervals and json format to the kafka topic. 

• save the data written to the kafka topic in a file. 

• write rest api service for the data you have saved in the file. You can use any 

programming language you want. 

 

Aşamaları nasıl yaptığımı anlatacağım. 

 

KISIMDA  

Web Scraping ve Kafka'ya Veri Gönderme 

Node.js ve axios, cheerio, kafkajs kütüphanelerini kullanarak web scraping ve Kafka'ya veri gönderme: 

 

Gerekli Paketleri Kurdum: Terminalde şu komutları çalıştırarak gerekli Node.js kütüphanelerini yükledim  

“ npm install axios cheerio kafkajs “ 

 

Web Scraping ve Kafka'ya Veri Gönderme Kodu: 

 

Önceki Task’ımızda belirttiğim gibi aynı şekilde visual studio üzerinde 

scrape_and_send_to_kafka.js adlı bir dosya oluşturdum ve aşağıdaki kodu ekledim 

const axios = require('axios'); 

const cheerio = require('cheerio'); 

const { Kafka } = require('kafkajs'); 

const fs = require('fs'); 

 

// Kafka ayarları 

const kafka = new Kafka({ 

clientId: 'my-app', 

brokers: ['localhost:9092'], 

}); 

 

const producer = kafka.producer(); 

const topic = 'digital-brain-topic'; 

 

// Web scraping ve Kafka'ya veri gönderme 

const scrapeAndSend = async () => { 

try { 

await producer.connect(); 

 

const response = await axios.get('https://scrapeme.live/shop/'); 

const $ = cheerio.load(response.data); 

 

const products = $('li.product').map((i, el) => ({ 

name: $(el).find('h2.woocommerce-loop-product__title').text().trim(), 

price: $(el).find('span.woocommerce-Price-amount.amount').text().trim(), 

link: $(el).find('a').attr('href'), 

})).get(); 

 

for (const product of products) { 

await producer.send({ 

topic, 

messages: [{ value: JSON.stringify(product) }], 

}); 

console.log(`Sent to Kafka: ${JSON.stringify(product)}`); 

await new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniye bekle 

} 

} catch (error) { 

console.error('Error:', error); 

} finally { 

await producer.disconnect(); 

} 

}; 

 

scrapeAndSend(); 

 

 

 

KISIMDA  

 

Kafka'dan Veri Okuma ve Dosyaya Kaydetme 

Kafka'dan veri okuyup dosyaya kaydetmek için: 

Gerekli Paketleri Kurdum “npm install kafkajs” 

 

save_to_file.js adlı bir dosya oluşturdum ve aşağıdaki kodu ekledim: 

const { Kafka } = require('kafkajs'); 

const fs = require('fs'); 

 

// Kafka ayarları 

const kafka = new Kafka({ 

clientId: 'my-app', 

brokers: ['localhost:9092'], 

}); 

 

const consumer = kafka.consumer({ groupId: 'my-group' }); 

const topic = 'digital-brain-topic'; 

 

const saveToFile = async () => { 

await consumer.connect(); 

await consumer.subscribe({ topic, fromBeginning: true }); 

 

const dataFile = 'data.json'; 

const stream = fs.createWriteStream(dataFile, { flags: 'a' }); 

 

await consumer.run({ 

eachMessage: async ({ message }) => { 

const data = message.value.toString(); 

stream.write(`${data}\n`); 

console.log(`Data written to file: ${data}`); 

}, 

}); 

}; 

 

saveToFile().catch(console.error); 

 

 

KISIMDA 

REST API Servisi Oluşturma 

Node.js ve express kütüphanesi ile REST API servisi oluşturmak için 

Gerekli Paketleri Kurdum:  “ npm install express “ 

 

REST API Servisi Kodu: 

rest_api.js adlı bir dosya oluşturdum ve aşağıdaki kodu ekledim: 

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

 

 

 

SONUÇ OLARAK: 

Terminal üzerinden dosya konumuma gidip : 

Web scraping ve Kafka'ya veri gönderme: scrape_and_send_to_kafka.js dosyasını çalıştırarak verileri Kafka'ya gönderdim  

“node scrape_and_send_to_kafka.js” 

Kodunu çalıştırdım 

 

Kafka'dan veri okuma ve dosyaya kaydetme: save_to_file.js dosyasını çalıştırarak Kafka'dan veri okuyup dosyaya kaydettim:  

“node save_to_file.js” 

 

REST API servisini çalıştırma: rest_api.js dosyasını çalıştırarak REST API servisini başlattım: 

“node rest_api.js” 

Bu adımları takip ederek Node.js ile web scraping, Kafka ile veri gönderme ve REST API oluşturma işlemlerini gerçekleştirdim. 

Gerekli Paketler: 

axios: HTTP istekleri yapmak için kullandım 

cheerio: HTML elementlerini manipüle etmek ve seçmek için kullandım 

kafkajs: Kafka'ya veri göndermek ve almak için kullandım 

 

 

 

 

 

 

 

 

 

 

 

 
