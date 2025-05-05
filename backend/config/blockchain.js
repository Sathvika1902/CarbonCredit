require("dotenv").config();
const { ethers } = require("ethers");

// Environment variables
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Validate environment variables
if (!RPC_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error("Missing required blockchain environment variables");
}

// Initialize provider, wallet, and contract
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contractABI = require("../artifacts/contracts/CarbonCredit.sol/CarbonCredit.json").abi;
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

module.exports = { contract, provider, wallet };
