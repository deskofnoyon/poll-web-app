const express = require("express");
const morgan = require("morgan");

module.exports = [
	express.json(),
	morgan("dev"),
	express.urlencoded({ extended: true }),
];
