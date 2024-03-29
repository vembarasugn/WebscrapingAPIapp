const express = require('express');
const request = require('request-promise');
const dotenv = require('dotenv');
const path = require('path');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

dotenv.config({path:'./config/.env'}) 

const PORT = process.env.PORT || 5000; 

const apiKey = process.env.API_KEY;

const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`; 


app.use(express.json());

app.get('/', (req,res) => {
    res.render('pages/index');
  });

//Get Product details 
app.get('/products/:productId', async (req,res) => {
    const {productId} = req.params;
 try {
     const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`)
     res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }   
})  

//Get Product review details
app.get('/products/:productId/reviews', async (req,res) => {
    const {productId} = req.params;
 try {
     const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`)
     res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }   
})


//Get Product offers details
app.get('/products/:productId/offers', async (req,res) => {
    const {productId} = req.params;
 try {
     const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
     res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }   
})

//Get search details
app.get('/search/:searchQuery', async (req,res) => {
    const {searchQuery} = req.params;
 try {
     const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`)
     res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }   
})


app.listen(PORT,() => console.log(`Server is listening on ${PORT}`));

