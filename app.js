require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

global.appName = 'Lannister Pay';

const apiRouter = require('./routes/api.routes.js');

const PORT = process.env.PORT || 4000;

const app = express();
app.listen(PORT, () => console.log(`[${appName}]: http://localhost:${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(apiRouter);


mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log(`[Database connection]: Connected correctly to MongoDB server for ${appName}`))
    .catch(error => console.log('connection error: ', error));