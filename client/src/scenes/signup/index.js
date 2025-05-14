import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
  PhoneAndroid,
  LocationCity,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
        navigate(-1);
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: theme.palette.background.default,
        p: 3,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: theme.palette.background.default,
          p: 4,
          borderRadius: '16px',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.5)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography
          variant="h2"
          fontSize="60px"
          component="h1"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            textAlign: 'center',
            mb: 2,
            fontFamily: 'inherit',
            textShadow:
              theme.palette.mode === 'dark'
                ? '0 2px 4px rgba(0,0,0,0.3)'
                : '0 2px 4px rgba(0,0,0,0.1)',
            letterSpacing: '1px',
          }}
        >
          Create New User
        </Typography>

        {[
          { label: 'Name', name: 'name', type: 'text', icon: <PersonOutline /> },
          { label: 'Email', name: 'email', type: 'email', icon: <EmailOutlined /> },
          { label: 'Password', name: 'password', type: 'password', icon: <LockOutlined /> },
          { label: 'City', name: 'city', type: 'text', icon: <LocationCity /> },
          { label: 'State', name: 'state', type: 'text', icon: <LocationCity /> },
          { label: 'Country', name: 'country', type: 'text', icon: <LocationCity /> },
          { label: 'Occupation', name: 'occupation', type: 'text', icon: <PersonOutline /> },
          { label: 'Phone Number', name: 'phoneNumber', type: 'text', icon: <PhoneAndroid /> },
        ].map(({ label, name, type, icon }) => (
          <TextField
            key={name}
            label={label}
            variant="outlined"
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required={['name', 'email', 'password'].includes(name)}
            InputProps={{
              startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary[300],
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary[400],
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary[500],
                  boxShadow: `0 0 0 2px ${theme.palette.primary[200]}`,
                },
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.text.secondary,
                '&.Mui-focused': {
                  color: theme.palette.primary[500],
                },
              },
              transition: 'all 0.3s ease',
            }}
          />
        ))}

        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            label="Role"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary[300],
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary[400],
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary[500],
                  boxShadow: `0 0 0 2px ${theme.palette.primary[200]}`,
                },
              },
            }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="superadmin">Superadmin</MenuItem>
          </Select>
        </FormControl>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            py: 1.5,
            backgroundColor: theme.palette.primary[500],
            '&:hover': {
              backgroundColor: theme.palette.primary[600],
              transform: 'translateY(-2px)',
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 6px 12px rgba(85, 107, 61, 0.4)'
                  : '0 6px 12px rgba(85, 107, 61, 0.3)',
            },
            transition: 'all 0.3s ease',
            fontWeight: 600,
            letterSpacing: '0.5px',
            fontSize: '1rem',
            borderRadius: '8px',
          }}
        >
          {loading ? 'Creating...' : 'Create User'}
        </Button>

        {error && (
          <Typography
            sx={{
              color: 'red',
              mt: 2,
              textAlign: 'center',
              fontSize: '14px',
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Signup;
