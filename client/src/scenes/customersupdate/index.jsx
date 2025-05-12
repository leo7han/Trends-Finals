import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateCustomer = () => {
  const { customerId } = useParams(); // Get customerId from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    occupation: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch customer data
  useEffect(() => {
    if (!customerId) return;

    const controller = new AbortController();
    const fetchCustomerData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:5001/client/customers/update/${customerId}`,
          { signal: controller.signal }
        );
        setCustomerData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled", err.message);
        } else {
          console.error("Error loading customer data", {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          });
          setError(
            err.response?.data?.message || "Failed to load customer data"
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
    return () => controller.abort();
  }, [customerId]);

  // Handle form input changes
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
    setIsSubmitting(true);
    setError(null);

    if (!customerId || !customerData || typeof customerData !== "object") {
      setError("Invalid customer ID or data.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5001/client/customers/update/${customerId}`,
        customerData
      );

      if (response.status === 200) {
        alert("Customer successfully updated!");
        navigate(`/customers`); // Redirect to updated customer page
      } else {
        throw new Error("Failed to update customer.");
      }
    } catch (err) {
      console.error("Error updating customer:", err);
      setError("Failed to update customer. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Box m="1.5rem 2.5rem">
      <h2>Update Customer Information</h2>
      <div><strong>Customer ID:</strong> {customerId}</div>
      <div><strong>Name:</strong> {customerData.name}</div>
      <div><strong>Email:</strong> {customerData.email}</div>
      <div><strong>Phone Number:</strong> {customerData.phoneNumber}</div>
      <div><strong>Country:</strong> {customerData.country}</div>
      <div><strong>Occupation:</strong> {customerData.occupation}</div>
      <div><strong>Role:</strong> {customerData.role}</div>

      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={customerData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={customerData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={customerData.phoneNumber}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Country"
          name="country"
          value={customerData.country}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Occupation"
          name="occupation"
          value={customerData.occupation}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Role"
          name="role"
          value={customerData.role}
          onChange={handleChange}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Update Customer"}
        </Button>
      </form>
    </Box>
  );
};

export default UpdateCustomer;
