import React, { useEffect, useState } from "react";

const ProfileWallet = () => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileAndWallet = async () => {
      try {
        // Fetch profile
        const profileRes = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profileData = await profileRes.json();

        if (!profileRes.ok) throw new Error(profileData.message || "Failed to fetch profile");
        setProfile(profileData.user);

        // Fetch wallet
        const walletRes = await fetch("/api/users/wallet", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const walletData = await walletRes.json();

        if (!walletRes.ok) throw new Error(walletData.message || "Failed to fetch wallet");
        setWalletBalance(walletData.balance);
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.message);
      }
    };

    fetchProfileAndWallet();
  }, [token]);

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">👤 My Profile & Wallet</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {profile && (
        <div className="grid gap-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{profile.Name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{profile.Email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Role:</span>
            <span className="capitalize">{profile.Role}</span>
          </div>
        </div>
      )}

      <hr className="my-6 border-gray-300" />

      {walletBalance !== null ? (
        <div className="text-center text-lg text-green-700 font-bold">
          💰 Wallet Balance: ${walletBalance.toFixed(2)}
        </div>
      ) : (
        !error && <p className="text-center text-gray-500">Loading wallet info...</p>
      )}
    </div>
  );
};

export default ProfileWallet;
