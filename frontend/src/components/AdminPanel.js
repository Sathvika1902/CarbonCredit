import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unauthorized access");
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers(users.filter((u) => u.UserID !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (user) => {
    const newName = prompt("Enter new name:", user.Name);
    const newEmail = prompt("Enter new email:", user.Email);
    const newRole = prompt("Enter new role (Admin, Issuer, Trader):", user.Role);
    if (!newName || !newEmail || !newRole) return;

    fetch(`/api/users/${user.UserID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newName, email: newEmail, role: newRole }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        fetchUsers();
      })
      .catch((err) => setError(err.message));
  };

  const filteredUsers = users.filter((u) =>
    u.Name.toLowerCase().includes(search.toLowerCase()) ||
    u.Email.toLowerCase().includes(search.toLowerCase()) ||
    u.Role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Admin: User Management</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Search by name, email, or role"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.UserID} className="border-b hover:bg-gray-50">
                <td className="p-2 border">{user.UserID}</td>
                <td className="p-2 border">{user.Name}</td>
                <td className="p-2 border">{user.Email}</td>
                <td className="p-2 border">{user.Role}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.UserID)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
