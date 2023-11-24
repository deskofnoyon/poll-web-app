require("dotenv").config();
require("colors");
const { mongoose } = require("mongoose");
const app = require("./app/app");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 4000;

// Set up Mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
	family: 4, // Use IPv4, skip trying IPv6
});

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB".cyan);
});

mongoose.connection.on("error", (err) => {
	console.error(`MongoDB connection error: ${err}`.red);
});

server.listen(port, () => {
	console.log(
		`Server is listening on port ${port} \nhttp://localhost:${port}`.blue
	);
});
