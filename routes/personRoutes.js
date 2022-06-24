const router = require('express').Router();

const Person = require('../models/Person');

//Create
router.post('/', async (request, response) => {
	const { name, salary, approved } = request.body;

	if (!name) {
		return response.status(422).json({ error: 'Name is mandatory!' });
		return;
	} else if (!salary) {
		return response.status(422).json({ error: 'Salary is mandatory!' });
	} else if (typeof approved === 'undefined') {
		return response
			.status(422)
			.json({ error: 'Approved status is mandatory!' });
		return;
	}

	const person = {
		name,
		salary,
		approved,
	};

	try {
		await Person.create(person);
		response.status(201).json({ message: 'Person inserted.' });
	} catch (error) {
		response.status(500).json({ error: error });
	}
});

//Read
router.get('/', async (request, response) => {
	try {
		const people = await Person.find();
		return response.status(200).json(people);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
});

//Read by Id
router.get('/:id', async (request, response) => {
	const { id } = request.params;

	try {
		const person = await Person.findById(id);
		if (!person) {
			return response.status(422).json({ message: 'User not found!' });
		}
		return response.status(200).json(person);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
});

//Update
router.patch('/:id', async (request, response) => {
	const { id } = request.params;

	const person = ({ name, salary, approved } = request.body);

	try {
		const updatedPerson = await Person.updateOne({ _id: id }, person);
		console.log(updatedPerson);
		if (updatedPerson.matchedCount === 0) {
			return response.status(422).json({ message: 'User not found!' });
		}
		return response.status(200).json(person);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
});

//Delete
router.delete('/:id', async (request, response) => {
	const { id } = request.params;

	const person = await Person.findById(id);

	if (!person) {
		return response.status(422).json({ error: 'User not found!' });
	}
	try {
		await Person.deleteOne({ _id: id });
		return response.status(200).json({ message: 'User successfully deleted!' });
	} catch (error) {
		return response.status(500).json({ error: error });
	}
});

module.exports = router;
