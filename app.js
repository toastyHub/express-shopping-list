// Import the 'express' module, which is a web framework for Node.js applications.
const express = require("express");

// Create an instance of the Express application.
const app = express();

// Import the 'itemsRoutes' module, which contains the routes for managing items in the shopping cart.
const itemsRoutes = require("./routes/items");

// Import the 'ExpressError' module, which is a custom error class used for handling errors.
const ExpressError = require("./expressError");

// Middleware: Parse incoming JSON data.
app.use(express.json());

// Middleware: Mount the 'itemsRoutes' module under the '/items' path.
app.use("/items", itemsRoutes);

// 404 handler: If no route matches the requested path, this middleware will be executed.
app.use(function (req, res, next) {
    // Create a new ExpressError object with the message "Not Found" and status code 404.
    return new ExpressError("Not Found", 404);
});

// General error handler: This middleware handles all errors that occur during request processing.
app.use((err, req, res, next) => {
    // Set the HTTP status code to the error's status code if available, or 500 (Internal Server Error) otherwise.
    res.status(err.status || 500);
    // Respond with a JSON object containing the error message.
    return res.json({
        error: err.message,
    });
});

// Export the 'app' variable to make it accessible in other parts of the application.
module.exports = app;
