import React, { useState } from "react";
import axios from "axios";

export default function CreateMediaItem({ token, onCreated }) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Movie");
    const [information, setInformation] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "https://localhost:7102/api/MediaItems",
                {
                    title,
                    type,
                    information,
                    isCompleted,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setTitle("");
            setType("Movie");
            setInformation("");
            setIsCompleted(false);

            if (onCreated) onCreated();
        } catch (err) {
            console.error(err);
            setError("Failed to create media item");
        }
    };

    // ✅ Added consistent styling objects
    const formRowStyle = {
        display: "flex",
        flexDirection: "column",
        marginBottom: "15px",
    };

    const labelStyle = {
        marginBottom: "5px",
        fontWeight: "bold",
    };

    const inputStyle = {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "100%",
        boxSizing: "border-box",
    };

    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Add New Media Item</h3>

            <form onSubmit={handleSubmit}>
                <div style={formRowStyle}>
                    <label style={labelStyle}>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>

                <div style={formRowStyle}>
                    <label style={labelStyle}>Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="Movie">Movie</option>
                        <option value="Series">Series</option>
                        <option value="Book">Book</option>
                    </select>
                </div>

                <div style={formRowStyle}>
                    <label style={labelStyle}>Information</label>
                    <textarea
                        value={information}
                        onChange={(e) => setInformation(e.target.value)}
                        style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }}
                    />
                </div>

                <div
                    style={{
                        ...formRowStyle,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                    />
                    <label style={{ fontWeight: "bold" }}>Completed</label>
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 16px",
                        fontWeight: "500",
                        cursor: "pointer",
                        width: "100%",
                        marginTop: "10px"
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#2563eb"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#3b82f6"}
                    >
                    Create
                </button>
            </form>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
}