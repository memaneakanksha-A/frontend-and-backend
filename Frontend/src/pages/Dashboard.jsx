import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUser({ token });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location = '/signin';
        }}
      >
        Sign out
      </button>
    </div>
  );
}
