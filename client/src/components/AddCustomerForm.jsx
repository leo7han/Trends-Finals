import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AddCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    state: '',
    country: '',
    occupation: '',
    phoneNumber: '',
    role: 'user',
  });

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5001/client/customers", formData);
      if (response.status === 201) {
        alert('User successfully created!');
        // Optionally reset form
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

  // Inline styles for simplicity
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#222B18', //you
    padding: '20px',
  };

  const formStyle = {
    backgroundColor: '#334025',
    padding: '30px 40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '50%',
  };

  const inputGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
     backgroundColor: '#eaf4ea',
    fontSize: '14px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#e8e8e8',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const errorStyle = {
    color: 'red',
    marginTop: '10px',
    fontSize: '14px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create New User</h2>

        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'City', name: 'city', type: 'text' },
          { label: 'State', name: 'state', type: 'text' },
          { label: 'Country', name: 'country', type: 'text' },
          { label: 'Occupation', name: 'occupation', type: 'text' },
          { label: 'Phone Number', name: 'phoneNumber', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name} style={inputGroupStyle}>
            <label htmlFor={name} style={labelStyle}>{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              style={inputStyle}
              required={['name', 'email', 'password'].includes(name)}
              minLength={name === 'password' ? 5 : undefined}
            />
          </div>
        ))}

        {/* Role */}
        <div style={inputGroupStyle}>
          <label htmlFor="role" style={labelStyle}>Role</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        {/* Submit */}
        <div>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>

        {error && <p style={errorStyle}>{error}</p>}
      </form>
    </div>
  );
};

export default AddCustomerForm;
