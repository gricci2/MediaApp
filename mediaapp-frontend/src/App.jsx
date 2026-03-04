//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

//function App() {
//  const [count, setCount] = useState(0)

//  return (
//    <>
//      <div>
//        <a href="https://vite.dev" target="_blank">
//          <img src={viteLogo} className="logo" alt="Vite logo" />
//        </a>
//        <a href="https://react.dev" target="_blank">
//          <img src={reactLogo} className="logo react" alt="React logo" />
//        </a>
//      </div>
//      <h1>Vite + React</h1>
//      <div className="card">
//        <button onClick={() => setCount((count) => count + 1)}>
//          count is {count}
//        </button>
//        <p>
//          Edit <code>src/App.jsx</code> and save to test HMR
//        </p>
//      </div>
//      <p className="read-the-docs">
//        Click on the Vite and React logos to learn more
//      </p>
//    </>
//  )
//}

//export default App

import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import CreateMediaItem from "./CreateMediaItem";

function App() {
    const thStyle = {
        padding: "12px",
        textAlign: "left",
        cursor: "pointer",
        backgroundColor: "#1e293b",
        color: "#94a3b8",
        fontWeight: "600",
        borderBottom: "1px solid #334155"
    };

    const tdStyle = {
        padding: "10px",
        borderBottom: "1px solid #444",
    };

    const trStyle = {
        transition: "background-color 0.2s",
    };

    const [sortColumn, setSortColumn] = useState("");
    const [sortAsc, setSortAsc] = useState(true);

    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [mediaItems, setMediaItems] = useState([]);

    const sortBy = (column) => {
        const asc = sortColumn === column ? !sortAsc : true;
        const sorted = [...mediaItems].sort((a, b) => {
            if (a[column] < b[column]) return asc ? -1 : 1;
            if (a[column] > b[column]) return asc ? 1 : -1;
            return 0;
        });
        setMediaItems(sorted);
        setSortColumn(column);
        setSortAsc(asc);
    };

    const fetchMediaItems = async () => {
        try {
            const res = await axios.get("https://localhost:7102/api/MediaItems", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMediaItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        setMediaItems([]);
    };

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const res = await axios.get("https://localhost:7102/api/MediaItems", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMediaItems(res.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    handleLogout(); // auto logout if token expired
                } else {
                    console.error(err);
                }
            }
        };

        fetchData();
    }, [token]);

    

    if (!token) return <Login onLogin={setToken} />;

    const renderInformation = (info) => {
        if (!info) return "";

        const isUrl = info.startsWith("http://") || info.startsWith("https://");

        if (isUrl) {
            return (
                <a
                    href={info}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#3b82f6", textDecoration: "none" }}
                    onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                    onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                >
                    {info}
                </a>
            );
        }

        return info;
    };

    return (
        <div style={{
            fontFamily: "Arial, sans-serif",
            padding: "20px",
            backgroundColor: "#0f172a",
            color: "#e2e8f0",
            minHeight: "100vh",
            boxSizing: "border-box",
        }}>

            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

                {/* Top row: Form, Table + Logout */}
                <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "40px",
                    marginTop: 0
                }}>

                    {/* Left: CreateMediaItem form */}
                    <div style={{
                        backgroundColor: "#1e293b",
                        borderRadius: "12px",
                        padding: "24px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                        minWidth: "320px",
                        maxWidth: "420px"
                    }}>
                        <h1 style={{ margin: "0 0 10px 0" }}>Media Tracker</h1>
                        <CreateMediaItem token={token} onCreated={fetchMediaItems} />
                    </div>

                    {/* Right side: Table + Logout */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: "2", minWidth: "400px" }}>
                        {/* Logout button top-right */}
                        <div style={{ alignSelf: "flex-end" }}>
                            <button
                                onClick={handleLogout}
                                style={{
                                    backgroundColor: "#3b82f6",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "10px 16px",
                                    fontWeight: "500",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = "#2563eb"}
                                onMouseLeave={(e) => e.target.style.backgroundColor = "#3b82f6"}
                            >
                                Logout
                            </button>
                        </div>

                        {/* Media Items Table */}
                        <div style={{
                            backgroundColor: "#1e293b",
                            borderRadius: "12px",
                            padding: "24px",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
                        }}>
                            <h2 style={{ marginTop: 0, marginBottom: "10px" }}>My Media Items</h2>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        {["title", "type", "isCompleted", "information"].map((col) => (
                                            <th
                                                key={col}
                                                style={{
                                                    ...thStyle,
                                                    backgroundColor: sortColumn === col ? "#3a3a3a" : "#2c2c2c"
                                                }}
                                                onClick={() => sortBy(col)}
                                            >
                                                {col === "title" ? "Title" :
                                                    col === "type" ? "Type" :
                                                        col === "isCompleted" ? "Status" : "Information"}{" "}
                                                {sortColumn === col ? (sortAsc ? "▲" : "▼") : ""}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {mediaItems.map((item) => (
                                        <tr
                                            key={item.id}
                                            style={trStyle}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#333"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                        >
                                            <td style={tdStyle}>{item.title}</td>
                                            <td style={tdStyle}>{item.type}</td>
                                            <td style={tdStyle}>{item.isCompleted ? "Completed" : "In Progress"}</td>
                                            <td style={tdStyle}>{renderInformation(item.information)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;