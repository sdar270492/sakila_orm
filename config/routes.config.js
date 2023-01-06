const express = require('express');
const router = express.Router();

const countries = require('../controllers/countries.controller');


// User
router.get('/countries', countries.countries);


module.exports = router;