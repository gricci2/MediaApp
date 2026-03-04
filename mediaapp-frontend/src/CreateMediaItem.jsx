import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateMediaItem({
    token,
    onCreated,
    editingItem,
    clearEditing
}) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [mediaTypes, setMediaTypes] = useState([]);
    const [information, setInformation] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMediaTypes = async () => {
            try {
                const response = await axios.get(
                    "https://localhost:7102/api/MediaItems/types",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setMediaTypes(response.data);

                // Set default selected type to first enum value
                if (response.data.length > 0) {
                    setType(response.data[0]);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load media types");
            }
        };

        fetchMediaTypes();
    }, [token]);

    useEffect(() => {
        if (editingItem) {
            // Batch all updates inside requestAnimationFrame to avoid cascading render warning
            requestAnimationFrame(() => {
                setTitle(editingItem.title);
                setType(editingItem.type);
                setInformation(editingItem.information || "");
                setIsCompleted(editingItem.isCompleted);
            });
        }
    }, [editingItem]);

    useEffect(() => {
        if (!editingItem && mediaTypes.length > 0) {
            requestAnimationFrame(() => {
                setTitle("");
                setType(mediaTypes[0]);
                setInformation("");
                setIsCompleted(false);
            });
        }
    }, [editingItem, mediaTypes]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingItem) {
                // 🔥 UPDATE (PUT)
                await axios.put(
                    `https://localhost:7102/api/MediaItems/${editingItem.id}`,
                    {
                        Id: editingItem.id,
                        Title: title,
                        Type: type,
                        Information: information,
                        IsCompleted: isCompleted
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                clearEditing();
            } else {
                // 🔥 CREATE (POST)
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
            }

            // Reset form
            setTitle("");
            setType(mediaTypes[0] || "");
            setInformation("");
            setIsCompleted(false);

            if (onCreated) onCreated();

        } catch (err) {
            console.error(err);
            setError("Failed to save media item");
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
                        required
                    >
                        {mediaTypes.map((mt) => (
                            <option key={mt} value={mt}>
                                {mt}
                            </option>
                        ))}
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
                    {editingItem ? "Update" : "Create"}
                </button>
                {editingItem && (
                    <button
                        type="button"
                        onClick={() => {
                            clearEditing();
                            setTitle("");
                            setType(mediaTypes[0] || "");
                            setInformation("");
                            setIsCompleted(false);
                        }}
                        style={{
                            marginTop: "10px",
                            width: "100%",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: "#1e293b",
                            color: "white",
                            cursor: "pointer"
                        }}
                    >
                        Cancel Edit
                    </button>
                )}
            </form>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
}