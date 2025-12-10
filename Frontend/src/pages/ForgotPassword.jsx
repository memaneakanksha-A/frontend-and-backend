import React, { useState } from 'react';
import API from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/forgot', { email });
      setMsg(res.data.msg || 'Reset link sent to your email.');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Forgot Password</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <button type="submit">Send Reset Link</button>
      <p>{msg}</p>
    </form>
  );
}
