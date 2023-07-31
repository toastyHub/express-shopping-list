// Import the 'Item' class from the "../item" module.
const Item = require("../item");

// Import the 'express' module, which is a web framework for Node.js applications.
const express = require("express");

// Create an instance of the Express Router, which allows defining routes for the 'itemsRoutes'.
const router = express.Router();

/**
 * GET /items => [item, ...]
 * This route handles the HTTP GET request to fetch all items in the shopping cart.
 */
router.get("", (req, res, next) => {
    try {
        // Call the 'findAll' static method of the 'Item' class to retrieve all items.
        return res.json({ items: Item.findAll() });
    } catch (err) {
        // If an error occurs, pass it to the error-handling middleware using 'next()'.
        return next(err);
    }
});

/** 
 * POST /items {name, price} => new-item
 * This route handles the HTTP POST request to add a new item to the shopping cart.
 */
router.post("", (req, res, next) => {
    try {
        // Create a new item using the data from the request body (name and price).
        let newItem = new Item(req.body.name, req.body.price);
        // Return the newly created item as a JSON response.
        return res.json({ item: newItem });
    } catch (err) {
        // If an error occurs, pass it to the error-handling middleware using 'next()'.
        return next(err);
    }
});

/** 
 * GET /items/:name => item
 * This route handles the HTTP GET request to fetch a specific item by its name in the shopping cart.
 */
router.get("/:name", (req, res, next) => {
    try {
        // Call the 'find' static method of the 'Item' class to search for the item by its name.
        let foundItem = Item.find(req.params.name);
        // Return the found item as a JSON response.
        return res.json({ item: foundItem });
    } catch (err) {
        // If an error occurs, pass it to the error-handling middleware using 'next()'.
        return next(err);
    }
});

/** 
 * PATCH /items/:name {name, price} => item
 * This route handles the HTTP PATCH request to update a specific item's name and/or price in the shopping cart.
 */
router.patch("/:name", (req, res, next) => {
    try {
        // Call the 'update' static method of the 'Item' class to update the item by its name.
        let foundItem = Item.update(req.params.name, req.body);
        // Return the updated item as a JSON response.
        return res.json({ item: foundItem });
    } catch (err) {
        // If an error occurs, pass it to the error-handling middleware using 'next()'.
        return next(err);
    }
});

/** 
 * DELETE /items/:name => "Deleted"
 * This route handles the HTTP DELETE request to remove a specific item by its name from the shopping cart.
 */
router.delete("/:name", (req, res, next) => {
    try {
        // Call the 'remove' static method of the 'Item' class to remove the item by its name.
        Item.remove(req.params.name);

    // Return a JSON response indicating that the item was successfully deleted.
    return res.json({ message: "Deleted" });
    } catch (err) {
        // If an error occurs, pass it to the error-handling middleware using 'next()'.
        return next(err);
    }
});

// Export the router to make it accessible in other parts of the application.
module.exports = router;
