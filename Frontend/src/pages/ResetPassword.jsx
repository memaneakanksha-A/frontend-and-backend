import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(true); // track message type
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // Check if token exists
  useEffect(() => {
    if (!token) {
      setMsg('Invalid or missing reset token');
      setIsError(true);
    }
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();

    if (!password) {
      setMsg('Please enter a new password');
      setIsError(true);
      return;
    }

    if (!token) {
      setMsg('Invalid or missing reset token');
      setIsError(true);
      return;
    }

    setLoading(true);
    setMsg('');

    try {
      // Update this endpoint if your backend has a different path
      const res = await API.post(`/auth/reset-password/${token}`, { password });
      console.log('Reset response:', res);

      const message =
        res?.data?.msg || res?.data?.message || 'Password reset successful';
      setMsg(message);
      setIsError(false);

      // Redirect to signin after 1.5s
      setTimeout(() => nav('/signin'), 1500);
    } catch (err) {
      console.error('Reset error:', err);

      if (err.response) {
        if (err.response.status === 404) {
          setMsg('Invalid or expired reset link');
        } else {
          setMsg(
            err.response.data?.msg ||
              err.response.data?.message ||
              `Error: ${err.response.status}`
          );
        }
      } else if (err.request) {
        setMsg('No response from server. Please try again later.');
      } else {
        setMsg('An unexpected error occurred. Please try again.');
      }

      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={submit} style={styles.form}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        {msg && (
          <p
            style={{
              ...styles.msg,
              color: isError ? 'red' : 'green',
            }}
          >
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f0f2f5',
  },
  form: {
    padding: 30,
    borderRadius: 10,
    background: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  input: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    border: '1px solid #ccc',
    fontSize: 16,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    border: 'none',
    background: '#007bff',
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer',
  },
  msg: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
};
