import React, { useState } from "react";

const Retirement = () => {
  const [creditId, setCreditId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleRetire = async (e) => {
    e.preventDefault();

    if (!creditId) {
      setError("Please enter a valid credit ID.");
      return;
    }

    try {
      const response = await fetch("/api/retire/retire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ creditId }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Credits retired successfully!");
        setError("");
        setCreditId("");
      } else {
        throw new Error(data.message || "Failed to retire credits.");
      }
    } catch (err) {
      console.error("Retirement error:", err);
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Retire Carbon Credits</h2>

      {success && <p className="text-green-600 mb-3">{success}</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleRetire}>
        <input
          type="text"
          name="creditId"
          value={creditId}
          onChange={(e) => setCreditId(e.target.value)}
          placeholder="Enter Credit ID"
          className="block w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Retire Credits
        </button>
      </form>
    </div>
  );
};

export default Retirement;
