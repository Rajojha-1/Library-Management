const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
	console.log(`[REQ] ${req.method} ${req.originalUrl}`);
	next();
});

app.use("/api", bookRoutes);
app.use(errorHandler);

const startServer = async () => {
	try {
		console.log("[INIT] Starting Library Management backend...");
		await connectDB();
		app.listen(PORT, () => {
			console.log(`[STARTED] Server is running on port ${PORT}`);
			console.log(`[INFO] API base URL: http://localhost:${PORT}/api`);
		});
	} catch (error) {
		console.error("[FATAL] Failed to start server:", error.message);
		process.exit(1);
	}
};

startServer();
