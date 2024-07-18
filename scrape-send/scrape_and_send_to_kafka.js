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
