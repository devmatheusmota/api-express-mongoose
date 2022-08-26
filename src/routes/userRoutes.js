const router = require('express').Router();
const { v4: uuid } = require('uuid');
const isAuthenticated = require('../middlewares/ensureAuthenticated');
const User = require('../models/User');

//Create
router.post('/', async (request, response) => {
	const { name, email, password } = request.body;

	if (!name) {
		return response.status(422).json({ error: 'Name is mandatory!' });
		return;
	} else if (!email) {
		return response.status(422).json({ error: 'Email is mandatory!' });
	}

	const user = {
		_id: uuid(),
		name,
		email,
		password,
	};

	try {
		await User.create(user);
		response.status(201).json({ message: 'User created.' });
	} catch (error) {
		response.status(500).json({ error: error });
	}
});

//Read
router.get('/', isAuthenticated, async (request, response) => {
	try {
		const users = await User.find({}, { password: 0, __v: 0 });
		return response.status(200).json({ users });
	} catch (error) {
		return response.status(500).json({ error: error });
	}
});

//Read by Id
router.get('/:id', isAuthenticated, async (request, response) => {
	const { id } = request.params;

	try {
		const user = await User.findById(id, { password: 0, __v: 0 });
		if (!user) {
			return response.status(422).json({ message: 'User not found!' });
		}
		return response.status(200).json({ user });
	} catch (error) {
		return response.status(500).json({ error: error });
	}
});

//Update
router.patch('/:id', isAuthenticated, async (request, response) => {
	const { id } = request.params;

	const user = ({ name, salary, approved } = request.body);

	try {
		const updatedPerson = await User.updateOne({ _id: id }, user);

		if (updatedPerson.matchedCount === 0) {
			return response.status(422).json({ message: 'User not found!' });
		}
		return response.status(200).json(user);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
});

//Delete
router.delete('/:id', isAuthenticated, async (request, response) => {
	const { id } = request.params;

	const user = await User.findById(id);

	if (!user) {
		return response.status(422).json({ error: 'User not found!' });
	}
	try {
		await User.deleteOne({ _id: id });
		return response.status(200).json({ message: 'User successfully deleted!' });
	} catch (error) {
		return response.status(500).json({ error: error });
	}
});

module.exports = router;
