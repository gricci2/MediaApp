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
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleDelete = async (item) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${item.title}"?`);
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://localhost:7102/api/MediaItems/${item.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Remove deleted item from local state
            setMediaItems((prev) => prev.filter((i) => i.id !== item.id));
        } catch (err) {
            console.error("Failed to delete item:", err);
            alert("Failed to delete this item. Please try again.");
        }
    };

    const handleDiscover = (item) => {
        const query = encodeURIComponent(`Similar to ${item.title} ${item.type}`);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    };

    const filteredItems = mediaItems.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
            item.title.toLowerCase().includes(search) ||
            item.type.toLowerCase().includes(search) ||
            (item.information && item.information.toLowerCase().includes(search))
        );
    });
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

                {/* Top row: Form + Logout, Table */}
                <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "40px",
                    marginTop: 0
                }}>

                    {/* Left column: form + logout stacked vertically */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                        {/* Form box */}
                        <div style={{
                            backgroundColor: "#1e293b",
                            borderRadius: "12px",
                            padding: "24px",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                            minWidth: "320px",
                            maxWidth: "420px"
                        }}>
                            <h1 style={{ margin: "0 0 10px 0" }}>Media Tracker</h1>
                            <CreateMediaItem
                                token={token}
                                onCreated={fetchMediaItems}
                                editingItem={editingItem}
                                clearEditing={() => setEditingItem(null)}
                            />
                        </div>

                        {/* Logout button outside the form box, stacked below */}
                        <div>
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

                    </div>
                   
                    {/* Right side: Table */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: "2", minWidth: "400px" }}>
                        {/* Media Items Table */}
                        <div style={{
                            backgroundColor: "#1e293b",
                            borderRadius: "12px",
                            padding: "24px",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                            minWidth: "900px",
                            overflowX: "auto"
                        }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "16px"
                            }}>
                                <h2 style={{ margin: 0 }}>My Media Items</h2>

                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
                                    onBlur={(e) => e.target.style.border = "1px solid #334155"}
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: "8px",
                                        border: "1px solid #334155",
                                        backgroundColor: "#0f172a",
                                        color: "#e2e8f0",
                                        width: "250px",
                                        outline: "none",
                                        transition: "border 0.2s"
                                    }}
                                />
                            </div>
                            <table style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                tableLayout: "fixed",
                                boxSizing: "border-box"
                            }}>
                                <thead>
                                    <tr>
                                        <th style={{ ...thStyle, width: "20%" }} onClick={() => sortBy("title")}>Title {sortColumn === "title" ? (sortAsc ? "▲" : "▼") : ""}</th>
                                        <th style={{ ...thStyle, width: "10%" }} onClick={() => sortBy("type")}>Type {sortColumn === "type" ? (sortAsc ? "▲" : "▼") : ""}</th>
                                        <th style={{ ...thStyle, width: "10%", textAlign: "center" }} onClick={() => sortBy("isCompleted")}>Status {sortColumn === "isCompleted" ? (sortAsc ? "▲" : "▼") : ""}</th>
                                        <th style={{ ...thStyle, width: "40%" }} onClick={() => sortBy("information")}>Information {sortColumn === "information" ? (sortAsc ? "▲" : "▼") : ""}</th>
                                        <th style={{ ...thStyle, width: "20%", textAlign: "center" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredItems.map((item) => (
                                        <tr
                                            key={item.id}
                                            style={trStyle}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#333"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                        >
                                            <td style={{ ...tdStyle, width: "20%" }}>{item.title}</td>
                                            <td style={{ ...tdStyle, width: "10%" }}>{item.type}</td>
                                            <td style={{ ...tdStyle, width: "10%", textAlign: "center" }}>
                                                {item.isCompleted ? "Completed" : "In Progress"}
                                            </td>
                                            <td
                                                style={{
                                                    ...tdStyle,
                                                    width: "40%",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {renderInformation(item.information)}
                                            </td>
                                            <td style={{ width: "20%", padding: 0 }}>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "center", // horizontally center buttons
                                                    gap: "6px"
                                                }}>
                                                {/* Edit button */}
                                                <button
                                                    onClick={() => setEditingItem(item)}
                                                    style={{
                                                        backgroundColor: "#f59e0b",
                                                        color: "white",
                                                        border: "none",
                                                        padding: "6px 10px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    Edit
                                                </button>

                                                {/* Delete button */}
                                                <button
                                                    onClick={() => handleDelete(item)}
                                                    style={{
                                                        backgroundColor: "#ef4444", // red
                                                        color: "white",
                                                        border: "none",
                                                        padding: "6px 10px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    Delete
                                                    </button>
                                                    {/* Discover button */}
                                                    <button
                                                        onClick={() => handleDiscover(item)}
                                                        style={{
                                                            backgroundColor: "#10b981",
                                                            color: "white",
                                                            border: "none",
                                                            padding: "6px 10px",
                                                            borderRadius: "6px",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        Discover
                                                    </button>
                                                </div>
                                            </td>
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