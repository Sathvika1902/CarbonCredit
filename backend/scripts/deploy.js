const hre = require("hardhat");

async function main() {
    try {
        // Get the first signer (deployer)
        const [deployer] = await hre.ethers.getSigners();

        console.log("\n🚀 Deploying contracts...");
        console.log("📜 Using account:", deployer.address);
        console.log("💰 Account balance:", (await deployer.getBalance()).toString(), "\n");

        // Deploy the CarbonCredit contract
        const CarbonCredit = await hre.ethers.getContractFactory("CarbonCredit");
        const carbonCredit = await CarbonCredit.deploy(); // No need for .deployed() in ethers v6

        await carbonCredit.waitForDeployment(); // Wait for the deployment to complete

        console.log("✅ CarbonCredit contract deployed successfully!");
        console.log("📍 Contract address:", carbonCredit.target); // Use `.target` in ethers v6
        console.log("\n🔗 Transaction hash:", carbonCredit.deploymentTransaction()?.hash, "\n");
    } catch (error) {
        console.error("❌ Deployment failed:", error);
        process.exitCode = 1; // Exit the process with a non-zero code
    }
}

// Execute the deployment script
main();
