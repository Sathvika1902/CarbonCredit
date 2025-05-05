const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CarbonCredit Contract", function () {
    let carbonCredit, owner, issuer, buyer;

    beforeEach(async function () {
        [owner, issuer, buyer] = await ethers.getSigners();

        const CarbonCredit = await ethers.getContractFactory("CarbonCredit");
        carbonCredit = await CarbonCredit.deploy();
    });

    it("Should allow the owner to grant and revoke issuer roles", async function () {
        await carbonCredit.setIssuer(issuer.address);
        expect(await carbonCredit.hasRole(await carbonCredit.ISSUER_ROLE(), issuer.address)).to.be.true;

        await carbonCredit.revokeIssuer(issuer.address);
        expect(await carbonCredit.hasRole(await carbonCredit.ISSUER_ROLE(), issuer.address)).to.be.false;
    });

    it("Should allow an issuer to issue credits", async function () {
        await carbonCredit.setIssuer(issuer.address);
        await carbonCredit.connect(issuer).issueCredits(100);

        const balance = await carbonCredit.balanceOf(issuer.address, 1); // Token ID 1 for issued credits
        expect(balance.toString()).to.equal("100"); // Convert BigNumber to string for comparison
    });

    it("Should allow trading of credits", async function () {
        await carbonCredit.setIssuer(issuer.address);
        await carbonCredit.connect(issuer).issueCredits(100);

        await carbonCredit.connect(issuer).tradeCredits(buyer.address, 50);

        const balance = await carbonCredit.balanceOf(buyer.address, 1); // Token ID 1 for issued credits
        expect(balance.toString()).to.equal("50"); // Convert BigNumber to string for comparison
    });

    it("Should allow retirement of credits", async function () {
        await carbonCredit.setIssuer(issuer.address);
        await carbonCredit.connect(issuer).issueCredits(100);

        await carbonCredit.connect(issuer).retireCredits(50);

        const retiredBalance = await carbonCredit.balanceOf(issuer.address, 2); // Token ID 2 for retired credits
        expect(retiredBalance.toString()).to.equal("50"); // Convert BigNumber to string for comparison
    });

    it("Should not allow non-issuers to issue credits", async function () {
        await expect(
            carbonCredit.connect(buyer).issueCredits(100)
        ).to.be.revertedWith("Not an approved issuer");
    });
    
});
