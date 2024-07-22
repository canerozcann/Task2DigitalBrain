Herkese merhaba Task’ımızın 2.  bölümü olan  

TASK 2 

• using any programming language, get only the data on page 1 from 

https://scrapeme.live/shop/. The data sample is as follows. 

• write the data you get in 1 second intervals and json format to the kafka topic. 

• save the data written to the kafka topic in a file. 

• write rest api service for the data you have saved in the file. You can use any 

programming language you want. 

 

Aşamaları nasıl yaptığımı anlatacağım. 

 

1. KISIMDA  

Web Scraping ve Kafka'ya Veri Gönderme 

Node.js ve axios, cheerio, kafkajs kütüphanelerini kullanarak web scraping ve Kafka'ya veri gönderme: 

 

Gerekli Paketleri Kurdum: Terminalde şu komutları çalıştırarak gerekli Node.js kütüphanelerini yükledim  

“ npm install axios cheerio kafkajs “ 

 

Web Scraping ve Kafka'ya Veri Gönderme Kodu: 

 

Önceki Task’ımızda belirttiğim gibi aynı şekilde visual studio üzerinde 

scrape_and_send_to_kafka.js adlı bir dosya oluşturdum ve aşağıdaki kodu ekledim 


 <img width="942" alt="Ekran Resmi 2024-07-22 19 05 48" src="https://github.com/user-attachments/assets/2566fe33-e0dd-4233-b4f9-afc0898c4f26">


 

 

2. KISIMDA  

 

Kafka'dan Veri Okuma ve Dosyaya Kaydetme 

Kafka'dan veri okuyup dosyaya kaydetmek için: 

Gerekli Paketleri Kurdum “npm install kafkajs” 

 

save_to_file.js adlı bir dosya oluşturdum ve aşağıdaki kodu ekledim: 

<img width="555" alt="Ekran Resmi 2024-07-22 19 06 46" src="https://github.com/user-attachments/assets/c3b019f2-9c9c-4e8e-ad68-509f9fc7a05f">

 

 

3. KISIMDA 

REST API Servisi Oluşturma 

Node.js ve express kütüphanesi ile REST API servisi oluşturmak için 

Gerekli Paketleri Kurdum:  “ npm install express “ 

 

REST API Servisi Kodu: 

rest_api.js adlı bir dosya oluşturdum ve aşağıdaki kodu ekledim: 


 <img width="741" alt="Ekran Resmi 2024-07-22 19 08 31" src="https://github.com/user-attachments/assets/340630e7-8d88-40aa-b1b9-3858d56d8e48">


 
4. KISIMDA

   server.js adında bir dosya oluşturarak aşağıdaki kodu içine ekledim 
 
<img width="952" alt="Ekran Resmi 2024-07-22 19 10 43" src="https://github.com/user-attachments/assets/e62c1445-fd35-4c40-8a0f-1c1da4c9da26">




Bu kod Node.js ve Express.js kullanarak basit bir REST API sunucusu oluşturur. Bu API, bir dosyadan (data.json) ürün bilgilerini okur ve bu bilgileri iki farklı endpoint aracılığıyla sunar.

Sunucuyu Başlatma:

javascript
Kodu kopyala
app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`);
});
Bu bölüm, Express.js sunucusunu belirtilen portta (3001) başlatır ve sunucunun başarılı bir şekilde çalıştığını belirten bir mesaj konsola yazdırır.


Bu kod, dosya tabanlı bir veri kaynağından veri okuyan ve bu veriyi RESTful API endpoint'leri aracılığıyla sunan basit bir web sunucusu oluşturur. data.json dosyasında bulunan ürün verilerini /products ve /products/:name endpoint'leri üzerinden erişilebilir hale getirir.


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

 

 

 

 

 

 

 

 

 

 

 

 
