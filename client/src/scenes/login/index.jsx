import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  ThemeProvider,
  createTheme,
  useTheme,
  keyframes,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { tokensDark, tokensLight, themeSettings } from 'theme.js'; // Import your theme

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  // Update borderGlow to use theme colors
  const borderGlow = keyframes`
    0% { box-shadow: 0 0 5px ${theme.palette.primary[400]}; }
    50% { box-shadow: 0 0 20px ${theme.palette.primary[400]}; }
    100% { box-shadow: 0 0 5px ${theme.palette.primary[400]}; }
  `;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/login', { email, password });
      console.log("Login success:", response.data);
      navigate('/dashboard');
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: theme.palette.background.default,
        p: 3,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: '650px',
          maxHeight: '850px',
          p: 4,
          borderRadius: '16px',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 8px 32px rgba(0, 0, 0, 0.5)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          border: `2px solid ${theme.palette.primary[300]}`,
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            animation: `${borderGlow} 3s ease-in-out infinite`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `linear-gradient(45deg, transparent, ${theme.palette.primary[400]}, transparent)`,
            transform: 'rotate(45deg)',
            opacity: 0.1,
            transition: 'all 0.5s ease',
          },
          '&:hover::before': {
            left: '100%',
          },
          transition: 'all 0.3s ease',
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
            textShadow: theme.palette.mode === 'dark' 
              ? '0 2px 4px rgba(0,0,0,0.3)' 
              : '0 2px 4px rgba(0,0,0,0.1)',
            animation: `${floatAnimation} 4s ease-in-out infinite`,
            letterSpacing: '1px',
          }}
        >
          SYLPHONEX
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: theme.palette.text.primary,
            textAlign: 'center',
            mb: 3,
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: "25px",
          }}
        >
          Welcome back to your Dashboard!
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined color="primary" />
              </InputAdornment>
            ),
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

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{
                    color: theme.palette.primary[500],
                    '&:hover': {
                      backgroundColor: theme.palette.primary[100],
                    },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
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

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            mt: 2,
            py: 1.5,
            backgroundColor: theme.palette.primary[500],
            '&:hover': {
              backgroundColor: theme.palette.primary[600],
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 6px 12px rgba(85, 107, 61, 0.4)'
                : '0 6px 12px rgba(85, 107, 61, 0.3)',
            },
            transition: 'all 0.3s ease',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 8px rgba(85, 107, 61, 0.3)'
              : '0 4px 8px rgba(85, 107, 61, 0.2)',
            fontWeight: 600,
            letterSpacing: '0.5px',
            fontSize: '1rem',
            borderRadius: '8px',
          }}
        >
          Log In
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, gap: 1 }}>
          <Typography variant="body2" color="text.secondary" fontFamily="inherit">
            Don't have an account?
          </Typography>
          <Link
            component={RouterLink}
            to="/signup"
            sx={{
              color: theme.palette.primary[500],
              textDecoration: 'none',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              position: 'relative',
              '&:hover': {
                textDecoration: 'none',
                '&::after': {
                  width: '100%',
                },
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-2px',
                left: 0,
                width: '0%',
                height: '2px',
                backgroundColor: theme.palette.primary[500],
                transition: 'width 0.3s ease',
              },
            }}
          >
            Sign up
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default function WrappedLogin() {
  // Create theme based on your themeSettings
  const theme = createTheme(themeSettings('dark')); // Default to dark mode
  
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}