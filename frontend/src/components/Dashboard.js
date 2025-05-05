import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => console.error("User fetch error", err));

    axios.get("/api/credits/my-credits", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (Array.isArray(res.data)) setCredits(res.data);
    })
    .catch(err => console.error("Credits fetch error", err));
  }, [token]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>

      <h2 className="text-xl font-semibold mt-6">Your Carbon Credits</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {credits.map(credit => (
          <div key={credit.id} className="bg-white shadow-md p-4 rounded">
            <p><strong>Project:</strong> {credit.projectName}</p>
            <p><strong>Credits:</strong> {credit.total}</p>
            <p><strong>Status:</strong> {credit.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
