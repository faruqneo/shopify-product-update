const express = require('express');
const path = require('path');
const Shopify = require('shopify-api-node');
const hbs = require('express-hbs');
const dotenv = require('dotenv').config();

//set dotenv values
const apiKey = process.env.SHOPIFY_PRIVATE_API_KEY;
const apiPass = process.env.SHOPIFY_PRIVATE_API_PASSWORD;
const apiSecret = process.env.SHOPIFY_PRIVATE_API_SECRET;
const shop = process.env.SHOPIFY_PRIVATE_API_SHOP;
const shopname = process.env.SHOPIFY_PRIVATE_API_SHOP_name;

//Init app
const app = express();


// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
  }));

//set view engine
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));

//shopify API settng
const shopify = new Shopify({
    shopName: shopname,
    apiKey: apiKey,
    password: apiPass
  });

//Product list
app.get('/shopify_products',function(req, res){
    shopify.product.list()
  .then(product => 
    //res.send(product)
    res.render('product',{
      title: "product",
      product: product
  })
  )
  .catch(err => console.error(err));
});

//Details views
app.get('/product/view/:id',function(req, res){
    shopify.product.get(req.params.id)
    .then(product =>
        //res.send(product)
        res.render('details',{
            title: "detail view",
            product: product
        })
        )
    .catch(err => console.error(err));
});

// index for testing
app.get('/',function(req, res){
   // res.send('Hello');
   res.render('index',{
       title: "index",
       data: "it is working."
   });
});

app.listen(3000, function(req, res){
    console.log("server is running");
});