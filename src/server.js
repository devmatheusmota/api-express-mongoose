// initial config

const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const { auth } = require('express-openid-connect');
const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET_STRING,
	baseURL: process.env.BASEURL,
	clientID: process.env.CLIENTID,
	issuerBaseURL: process.env.ISSUERBASEURL,
};

//config to read JSON
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(auth(config));


//routes
const userRoutes = require('./routes/userRoutes');

app.use('/users', userRoutes);

app.get('/', (request, response) => {
	response.render('index');
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
