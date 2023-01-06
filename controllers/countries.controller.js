const db = require('../models');
const createError = require('http-errors');

const Country = db.countries;

module.exports.countries = (req, res, next) => {
    // const countries = 
    Country.findAll()
        .then((data) => {
            res.json(data);
        })
        .catch(next);

    // return countries;                        
}