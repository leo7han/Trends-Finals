import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5001/login', { email, password });
    console.log("Login success:", response.data);
    navigate('/');
  } catch (err) {
    console.error("Login failed:", err.response?.data?.message || err.message);
  }
};

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Log In</button>
      </form>
        <p>Don't have an account?</p>
        <Link>Sign up</Link>
    </div>
  );
}

export default Login;
