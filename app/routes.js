const { getHealth, homeRoute } = require("./controllers");

const router = require("express").Router();

router.get("/health", getHealth);
router.get("/", homeRoute)


module.exports = router;