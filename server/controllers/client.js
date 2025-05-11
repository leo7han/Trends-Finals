import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

// Function explanations

export const getProducts = async (req, res) => {
  try {
    // Get all products by id
    const products = await Product.find();

    // Join the id with stats
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    // Fetch customers with the user role from mongoose, excluding password
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomer = async (req, res) => {
  const { id } = req.params; // Extract the customer ID from the request parameters

  try {
    // Log the customer ID for debugging purposes
    console.log(`Fetching customer with ID: ${id}`);

    // Attempt to find the customer in the database by the provided ID
    const customer = await User.findById(id);

    // If the customer is not found, return a 404 error with a helpful message
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // If the customer is found, return the customer data in the response
    return res.status(200).json(customer);
  } catch (error) {
    // Handle any other errors that might occur during the database query or other issues
    console.error("Error fetching customer:", error); // Log the error for debugging
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { name, email, phoneNumber, country, occupation, role } = req.body;

  try {
    // Find the customer by ID and update the specified fields
    const updatedCustomer = await User.findByIdAndUpdate(
      customerId,
      { name, email, phoneNumber, country, occupation, role },
      { new: true, overwrite: false } // Don't overwrite the entire document, just update the provided fields
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json(updatedCustomer);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    // Get all users
    const users = await User.find();

    // Strip everything but their country and tallies it
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!countryISO3) {
        return acc;  // Skip user if invalid
      }

      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CRUD operations for user (customers)

// Create User
export const createUser = async (req, res) => {
  try {
    const { name, email, password, city, state, country, occupation, phoneNumber, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    // Prevent duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "A user with this email already exists." });
    }

    // Create and save new user
    const newUser = new User({
      name,
      email,
      password, // stored as-is (plain text) — not secure!
      city,
      state,
      country,
      occupation,
      phoneNumber,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete User (Customer)
export const deleteCustomer = async (req, res) => {
  const customerId = req.params.id; // This is where you're extracting the 'id' parameter from the URL

  try {
    // Assuming you have a Customer model connected to your database
    const result = await User.findByIdAndDelete(customerId);

    if (!result) {
      // If no customer was found with the given ID, return a 404 error
      return res.status(404).json({ message: "Customer not found" });
    }

    // Successfully deleted
    res.status(200).json({ message: "Customer deleted successfully!" });
  } catch (error) {
    // Handle error and send a response
    console.error(error);
    res.status(500).json({ message: "Failed to delete customer" });
  }
};

