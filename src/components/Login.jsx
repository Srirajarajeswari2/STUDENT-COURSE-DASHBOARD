import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("signin"); // or 'register'
  const auth = useAuth();

  const submit = (e) => {
    e.preventDefault();
    setError(null);
    if (mode === "signin") {
      const res = auth.signin({ username: username.trim(), password });
      if (!res.ok) setError(res.message || "Login failed");
    } else {
      const res = auth.register({ username: username.trim(), password });
      if (!res.ok) setError(res.message || "Registration failed");
      else {
        // after register, automatically sign in
        auth.signin({ username: username.trim(), password });
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
      <form className="card login-card" onSubmit={submit} style={{ width: 360 }}>
        <h2 style={{ marginTop: 0 }}>{mode === "signin" ? "Sign In" : "Create Account"}</h2>
        <p style={{ color: "#6b7280", marginTop: 6 }}>{mode === "signin" ? "Sign in with your credentials" : "Create a username and password"}</p>

        <label style={{ display: "block", marginTop: 12, fontSize: 13 }}>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" />

        <label style={{ display: "block", marginTop: 10, fontSize: 13 }}>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />

        {error && <div style={{ color: "#ef4444", marginTop: 8 }}>{error}</div>}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
          <button type="submit">{mode === "signin" ? "Sign In" : "Register"}</button>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => { setUsername("demo"); setPassword("demo"); }}>Demo</button>
            <button type="button" onClick={() => { setMode(mode === "signin" ? "register" : "signin"); setError(null); }}>{mode === "signin" ? "Create account" : "Have an account?"}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
