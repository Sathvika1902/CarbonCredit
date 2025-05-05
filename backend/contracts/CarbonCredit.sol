// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract CarbonCredit is ERC1155, AccessControl, Ownable, Pausable {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    uint256 public constant ISSUED_CREDIT = 1;
    uint256 public constant RETIRED_CREDIT = 2;

    mapping(uint256 => uint256) public totalSupply;

    event CreditsIssued(address indexed issuer, uint256 amount);
    event CreditsTraded(address indexed from, address indexed to, uint256 amount);
    event CreditsRetired(address indexed retiree, uint256 amount);

    constructor() ERC1155("https://example.com/metadata/{id}.json") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ISSUER_ROLE, msg.sender);
    }

    modifier onlyIssuer() {
        require(hasRole(ISSUER_ROLE, msg.sender), "Not an approved issuer");
        _;
    }

    function setIssuer(address account) external onlyOwner {
        grantRole(ISSUER_ROLE, account);
    }

    function revokeIssuer(address account) external onlyOwner {
        revokeRole(ISSUER_ROLE, account);
    }

    function issueCredits(uint256 amount) external onlyIssuer whenNotPaused {
        _mint(msg.sender, ISSUED_CREDIT, amount, "");
        totalSupply[ISSUED_CREDIT] += amount;
        emit CreditsIssued(msg.sender, amount);
    }

    function tradeCredits(address to, uint256 amount) external whenNotPaused {
        require(balanceOf(msg.sender, ISSUED_CREDIT) >= amount, "Insufficient credits");
        safeTransferFrom(msg.sender, to, ISSUED_CREDIT, amount, "");
        emit CreditsTraded(msg.sender, to, amount);
    }

    function retireCredits(uint256 amount) external whenNotPaused {
        require(balanceOf(msg.sender, ISSUED_CREDIT) >= amount, "Insufficient credits");
        _burn(msg.sender, ISSUED_CREDIT, amount);
        _mint(msg.sender, RETIRED_CREDIT, amount, "");
        totalSupply[ISSUED_CREDIT] -= amount;
        emit CreditsRetired(msg.sender, amount);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Explicitly override supportsInterface to resolve ambiguity
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
// QUICKNODE_AMOY_URL=https://evocative-old-arm.matic-amoy.quiknode.pro/c189924c040c418a594d82b77f7740ebae255122 
// PRIVATE_KEY=d9d5a87c62ccf04366acb8cf80ff3dd4b3adb726c54cace9cf198fdc1eeadb47