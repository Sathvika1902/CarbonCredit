import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/users/all", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        throw new Error(data.message || "Unexpected response format");
      }
    } catch (err) {
      console.error("Failed to load users:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin: User Management</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {Array.isArray(users) && users.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border">User ID</th>
              <th className="py-2 border">Name</th>
              <th className="py-2 border">Email</th>
              <th className="py-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.UserID}>
                <td className="py-2 border">{user.UserID}</td>
                <td className="py-2 border">{user.Name}</td>
                <td className="py-2 border">{user.Email}</td>
                <td className="py-2 border">{user.Role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No users to display.</p>
      )}
    </div>
  );
};

export default AdminPanel;
