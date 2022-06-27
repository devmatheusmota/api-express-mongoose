// initial config

const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

//config to read JSON

app.use(express.json());

//routes
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

app.get('/', (request, response) => {
	response.json({ message: 'Hello World!' });
});

//delivering a port and connecting to DB

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const connectString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.flydf.mongodb.net/apiDB?retryWrites=true&w=majority`;

mongoose
	.connect(connectString)
	.then(() => {
		console.log('MongoDB connected.');
		app.listen(3000);
	})
	.catch((e) => console.log(e));
