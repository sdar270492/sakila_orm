const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

require('./config/db.config');

const app = express();

app.use(logger('dev'));
app.use(express.json());

const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

const routes = require('./config/routes.config');
app.use('/api', routes);

// app.use((req, res, next) => {
//     xt(createError(404, 'Route not found'));
// });

app.use((error, req, res, next) => {
    if (!error.status) {
        error = createError(500, error);
    }

    if (error.status >= 500) {
        console.error(error);
    }

    const data = {};
    data.message = error.message;

    if (error.errors) {
        data.errors = Object.keys(error.errors)
            .reduce((errors, key) => {
                errors[key] = error.errors[key].message;
                return errors;
            }, {});
    }
    res.status(error.status).json(data);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.info(`Application running at port ${port}`)
});