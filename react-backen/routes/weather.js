var express = require('express');
var router = express.Router();
const axios = require("axios");





const APIKey = '724148bcae93e89689001b480c710e9b';

/* GET users listing. */
router.get('/', async function(req, res, next) {
    console.log('parmssss', req, res);
    const city = req.query.city;
    try {
		const response = await axios({
			url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`,
			method: "get",
		});
		res.status(200).json(response.data);
	} catch (err) {
        res.status(500).json('City is Not Found, Please Try!');
	}
});


 



module.exports = router