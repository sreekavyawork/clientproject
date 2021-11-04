const CLIENT_ID = 'KaUoz1Y3pquuFsnZsmK2rQ';
const API_KEY = 'C-a4ghZelQaqwKSf7m_zf4YzZpRLBtEpa-y923fnGBJ2VYWemzuci5ZfuKRAiIHqPC0mJp9YSFtOVLIqF6EfPpHWaKXG-lwa0ZCn_xKBUrm57zyBKH7PdwpPNn-DYXYx'

const yelp = require('yelp-fusion');
var express = require('express');
const axios = require("axios");
var router = express.Router();
const client = yelp.client(API_KEY);



router.get('/', (req, res, next) => {
   
    client.reviews('gary-danko-san-francisco').then(response => {
        console.log(response.jsonBody.reviews[0].text);            
        res.status(200).json(response.jsonBody.reviews);

    }).catch(e => {
        console.log(e);
        res.status(500).json(e);

    });
})


module.exports = router;
