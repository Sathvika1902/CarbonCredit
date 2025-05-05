import React, { useEffect, useState } from "react";

const Marketplace = () => {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch("/api/trades/listings", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          
        const data = await res.json();
        if (Array.isArray(data)) setCredits(data);
      } catch (err) {
        console.error("Marketplace load error", err);
      }
    };
    fetchCredits();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      {credits.length === 0 ? (
        <p>No credits available for trading.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credits.map((credit) => (
            <div key={credit.CreditID} className="p-4 border rounded shadow">
              <p><strong>Project ID:</strong> {credit.ProjectID}</p>
              <p><strong>Total:</strong> {credit.TotalCredits}</p>
              <p><strong>Status:</strong> {credit.Status}</p>
              <p><strong>Price:</strong> ${credit.PricePerCredit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
