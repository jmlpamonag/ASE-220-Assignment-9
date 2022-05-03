require('dotenv').config();

const fs = require('fs');

const bodyParser = require('body-parser');
const open = require('open');

const express = require('express');
const database = require('./database');
const userWebRouter = require('./users/routerWeb');
const userApiRouter = require('./users/routerAPI');

const app = express();

app.use(bodyParser.json());
app.use('/users', userWebRouter);
app.use('/api/users', userApiRouter);


app.get('/', (request, response) => {
    response.status(200).send(fs.readFileSync('./users/index.html', 'utf8'));
});

database.connect(() => {
    app.listen(process.env.PORT, async () => {
        console.log(`Listening on port ${process.env.PORT}.`)
        await open(`http://localhost:${process.env.PORT}`);
    })
})