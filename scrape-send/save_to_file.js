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
