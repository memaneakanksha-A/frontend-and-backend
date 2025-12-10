import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/signin", {
        email,
        password,
      });

      // Save token if backend sends it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      nav("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Signin</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />

      <button type="submit">Signin</button>
      <p>{msg}</p>
    </form>
  );
}
