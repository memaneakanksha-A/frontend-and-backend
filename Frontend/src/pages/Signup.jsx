import React, { useState } from "react";
import API from "../services/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/signup", {
        email,
        password,
      });

      setMsg(res.data.msg || "Signup successful");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>

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

      <button type="submit">Signup</button>

      <p>{msg}</p>
    </form>
  );
}
