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

function App() {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [mediaItems, setMediaItems] = useState([]);

    useEffect(() => {
        if (!token) return; // don't fetch if not logged in

        axios
            .get("https://localhost:7102/api/MediaItems", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setMediaItems(res.data))
            .catch((err) => console.error(err));
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        setMediaItems([]);
    };

    if (!token) return <Login onLogin={setToken} />;

    return (
        <div>
            <h1>Media Tracker</h1>
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {mediaItems.map((item) => (
                    <li key={item.id}>
                        {item.title} ({item.type}) - {item.isCompleted ? "Completed" : "In Progress"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;