import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

// simple client-side auth using localStorage (mock)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("scd_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("scd_user", JSON.stringify(user));
    else localStorage.removeItem("scd_user");
  }, [user]);

  // Users store is an object mapping username -> encoded password
  const readUsers = () => {
    try {
      const raw = localStorage.getItem("scd_users");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  };

  const saveUsers = (users) => {
    try {
      localStorage.setItem("scd_users", JSON.stringify(users));
    } catch (e) {}
  };

  const encode = (s) => {
    try {
      return btoa(s);
    } catch (e) {
      return s;
    }
  };

  const signin = (credentials) => {
    const { username = "", password = "" } = credentials || {};
    if (!username || !password) return { ok: false, message: "Provide username and password" };

    const users = readUsers();
    const stored = users[username];
    if (!stored) return { ok: false, message: "User not found" };

    if (stored === encode(password)) {
      const u = { name: username };
      setUser(u);
      return { ok: true };
    }
    return { ok: false, message: "Incorrect password" };
  };

  const register = (credentials) => {
    const { username = "", password = "" } = credentials || {};
    if (!username || !password) return { ok: false, message: "Provide username and password" };

    const users = readUsers();
    if (users[username]) return { ok: false, message: "Username already exists" };

    users[username] = encode(password);
    saveUsers(users);
    return { ok: true };
  };

  const signout = () => setUser(null);

  const value = { user, signin, signout, register, readUsers };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
