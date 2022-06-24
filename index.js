// initial config
const express = require('express');
const app = express();

//config to read JSON

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

//endpoints
app.get('/', (request, response) => {
	response.json({ message: 'Hello World!' });
});

//deliver a port
app.listen(3000);
