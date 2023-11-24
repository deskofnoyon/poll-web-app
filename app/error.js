exports.notFoundHandler = (_req, _res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
};

exports.errorHandler = (error, _req, res, _next) => {
	// console.log(error);
	if (error.status) {
		res.status(error.status).json({
			message: error.message,
		});
	} else {
		res.status(500).json({
			message: error.message,
		});
	}
};
