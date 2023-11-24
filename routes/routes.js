const {
	getAllPolls,
	getPollForm,
	cretePoll,
	getViewPoll,
	postViewPoll,
} = require("../controllers/controllers");

const router = require("express").Router();


router.route("/create").get(getPollForm).post(cretePoll);
router.get("/", getAllPolls);
router.route("/:id").get(getViewPoll).post(postViewPoll);

module.exports = router;
