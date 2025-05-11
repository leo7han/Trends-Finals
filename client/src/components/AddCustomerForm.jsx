import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const AddCustomerForm = () => {
  // Initialize form data with useState
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    state: '',
    country: '',
    occupation: '',
    phoneNumber: '',
    role: 'user', // default to 'user'
  });

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    // Send the form data to the backend
    const response = await axios.post("http://localhost:5001/client/customers", formData);



    // Handle success
    if (response.status === 201) {
      alert('User successfully created!');
      // Optionally, redirect the user to another page or reset the form
    } else {
      throw new Error('Failed to create user.');
    }
  } catch (err) {
    console.error('Error creating user:', err);
    setError('Failed to create user. Please try again later.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={5}
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        {/* State */}
        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        {/* Occupation */}
        <div>
          <label htmlFor="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>

        {/* Error Message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddCustomerForm;
