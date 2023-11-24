const Poll = require("../models/Poll");

exports.getAllPolls = async (req, res) => {
	try {
		const polls = await Poll.find();
		res.status(200).render("polls", { polls });
	} catch (err) {
		console.log(err);
	}
};

exports.getPollForm = async (_req, res) => {
	res.status(200).render("create");
};

exports.cretePoll = async (req, res) => {
	let { title, description, options } = req.body;

	options = options.map((opt) => {
		return {
			name: opt,
			vote: 0,
		};
	});

	const poll = new Poll({
		title,
		description,
		options,
	});

	try {
		await poll.save();
		res.redirect("/polls");
	} catch (err) {
		console.log(err);
	}

	res.status(201).send();
};

exports.getViewPoll = async (req, res) => {
	const { id } = req.params;

	try {
		const poll = await Poll.findById(id);

		const options = [...poll.options];
		const result = [];
		options.forEach((option) => {
			const percentage = (option.vote * 100) / poll.totalVote;
			result.push({
				...option._doc,
				percentage: percentage ? percentage : 0,
			});
		});

		res.status(200).render("view-poll", { poll, result });
	} catch (err) {
		console.log(err);
	}
};

exports.postViewPoll = async (req, res) => {
	const { id } = req.params;
	const opitonId = req.body.option;

	try {
		const poll = await Poll.findById(id);
		const options = [...poll.options];

		const index = options.findIndex((ob) => ob.id === opitonId);
		options[index].vote = options[index].vote + 1;

		const totalVote = poll.totalVote + 1;

		await Poll.findByIdAndUpdate(
			{ _id: poll._id },
			{ $set: { options, totalVote } }
		);

		res.redirect("/polls/" + id);
	} catch (err) {
		console.log(err);
	}
};
