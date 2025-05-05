import { JsonRpcProvider, Contract } from "ethers";
import abi from "./abi.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const RPC_URL = process.env.REACT_APP_RPC_URL;

export const getContract = async () => {
    if (!RPC_URL || !CONTRACT_ADDRESS) {
        throw new Error("RPC URL or Contract Address is not defined in .env");
    }

    try {
        const provider = new JsonRpcProvider(RPC_URL);
        const signer = provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, abi, signer);

        return { contract, signer };
    } catch (error) {
        console.error("Error initializing contract:", error.message);
        throw error;
    }
};
