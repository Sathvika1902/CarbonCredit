exports.tradeCredits = async (req, res) => {
    try {
        const { buyer_id, credit_id, amount } = req.body;

        const [[credit]] = await pool.execute("SELECT PricePerCredit FROM CarbonCredits WHERE CreditID = ?", [credit_id]);
        const totalAmount = credit.PricePerCredit * amount;

        await pool.execute("INSERT INTO Transactions (BuyerID, CreditID, Amount, BlockchainHash) VALUES (?, ?, ?, ?)", [buyer_id, credit_id, totalAmount, "mockhash123"]);
        await pool.execute("UPDATE CarbonCredits SET Status = 'Sold' WHERE CreditID = ?", [credit_id]);

        res.status(200).json({ success: true, message: "Trade successful" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getMarketplaceListings = async (req, res) => {
    try {
        const [listings] = await pool.execute(`SELECT * FROM CarbonCredits WHERE Status = 'Available'`);
        res.status(200).json({ success: true, listings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
