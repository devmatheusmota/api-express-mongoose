const isAuthenticated = function (req, res, next) {
	const isAuthenticated = req.oidc.isAuthenticated();

	if (isAuthenticated) {
		return next();
	}

	return res.status(400).json({ message: `You're not logged in.` });
};

module.exports = isAuthenticated;
