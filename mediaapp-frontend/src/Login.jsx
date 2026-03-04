import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://localhost:7102/api/Auth/login", {
                username,
                password,
            });
            const token = res.data.token;
            localStorage.setItem("token", token);
            onLogin(token); // let parent know we logged in
        } catch (err) {
            console.error(err);
            setError("Login failed: check your credentials");
        }
    };

    return (
        <div style={{
            fontFamily: "Arial, sans-serif",
            padding: "20px",         // spacing from top/left edges
            backgroundColor: "#0f172a",
            color: "#e2e8f0",
            minHeight: "100vh",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "flex-start", // left-align
            alignItems: "flex-start"
        }}>
            <div style={{
                backgroundColor: "#1e293b",
                borderRadius: "12px",
                padding: "32px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                minWidth: "320px",
                maxWidth: "420px",
                width: "100%",
            }}>
                <h1 style={{ marginTop: 0, marginBottom: "24px", color: "#e2e8f0" }}>Media Tracker Login</h1>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ marginBottom: "6px", color: "#94a3b8", fontWeight: "500" }}>Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                padding: "10px 12px",
                                borderRadius: "8px",
                                border: "1px solid #334155",
                                backgroundColor: "#0f172a",
                                color: "#e2e8f0",
                                outline: "none",
                                fontSize: "14px"
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ marginBottom: "6px", color: "#94a3b8", fontWeight: "500" }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                padding: "10px 12px",
                                borderRadius: "8px",
                                border: "1px solid #334155",
                                backgroundColor: "#0f172a",
                                color: "#e2e8f0",
                                outline: "none",
                                fontSize: "14px"
                            }}
                        />
                    </div>

                    <button type="submit" style={{
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "background-color 0.2s"
                    }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#2563eb"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#3b82f6"}
                    >
                        Login
                    </button>

                    {error && <p style={{ color: "#ef4444", margin: 0 }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}