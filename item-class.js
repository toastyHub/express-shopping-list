// Import the fakeDb module, which contains the 'items' array used to store the shopping cart items.
const items = require("./fakeDb");

// Define a class called Item to represent an item in the shopping cart.
class Item {
    // Constructor for creating an item with the provided 'name' and 'price'.
    constructor(name, price) {
        // Initialize the 'name' and 'price' properties of the item instance.
        this.name = name;
        this.price = price;
        // Add the current item to the 'items' array, effectively adding it to the shopping cart.
        items.push(this);
    }

    // Static method to find all items in the shopping cart.
    static findAll() {
        return items; // Return the 'items' array containing all items in the shopping cart.
    }

    // Static method to update an item with matching name to the provided data.
    static update(name, data) {
        // Find the item with the matching name in the 'items' array.
        let foundItem = Item.find(name);
        // If no item is found with the given name, throw an error indicating it was not found.
        if (foundItem === undefined) {
            throw { message: "Not Found", status: 404 };
        }
        // Update the name and price of the found item with the new data.
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem; // Return the updated item.
    }

    // Static method to find an item by its name in the shopping cart.
    static find(name) {
        // Use the find() method on the 'items' array to search for an item with the given name.
        const foundItem = items.find((item) => item.name === name);
        // If no item is found with the given name, throw an error indicating it was not found.
        if (foundItem === undefined) {
            throw { message: "Not Found", status: 404 };
        }
        return foundItem; // Return the found item.
    }

    // Static method to remove an item with a matching name from the shopping cart.
    static remove(name) {
        // Find the index of the item with the given name in the 'items' array.
        let foundIdx = items.findIndex((item) => item.name === name);
        // If no item is found with the given name, throw an error indicating it was not found.
        if (foundIdx === -1) {
            throw { message: "Not Found", status: 404 };
        }
        // Remove the item from the 'items' array using the splice() method.
        items.splice(foundIdx, 1);
    }
}

// Export the Item class to make it accessible in other parts of the application.
module.exports = Item;
