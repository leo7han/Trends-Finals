import React, { useState, useEffect } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateCustomer = () => {
  const { customerId } = useParams(); // Get customerId from the URL
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    occupation: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch the current customer data when the component mounts
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/customers/update/${customerId}`);  // Ensure the customerId is passed correctly
        setCustomerData(response.data);
      } catch (err) {
        console.error("Error loading customer data", err);
        setError(err.response ? err.response.data.message : "Failed to load customer data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await axios.patch(`http://localhost:5001/customers/update/${customerId}`, customerData); // Correct API URL for PATCH request
      navigate(`/customers/${customerId}`); // Redirect to the customer's details page after update
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error updating customer data");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show a loading spinner while the data is being fetched
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <h2>Update Customer Information</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <TextField
          label="Name"
          name="name"
          value={customerData.name}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* Email Field */}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={customerData.email}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* Phone Number Field */}
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={customerData.phoneNumber}
          onChange={handleChange}
          fullWidth
        />

        {/* Country Field */}
        <TextField
          label="Country"
          name="country"
          value={customerData.country}
          onChange={handleChange}
          fullWidth
        />

        {/* Occupation Field */}
        <TextField
          label="Occupation"
          name="occupation"
          value={customerData.occupation}
          onChange={handleChange}
          fullWidth
        />

        {/* Role Field */}
        <TextField
          label="Role"
          name="role"
          value={customerData.role}
          onChange={handleChange}
          fullWidth
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Update Customer"}
        </Button>
      </form>
    </Box>
  );
};

export default UpdateCustomer;
