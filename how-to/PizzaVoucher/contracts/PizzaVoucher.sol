// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PizzaVoucher is ERC721, Pausable, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Address of the token to be charged on minting
    address private costToken;
    // Set the cost of the voucher
    uint256 private cost;
    // Treasury address to receive the points
    address private treasury;

    constructor(
        string memory _name,
        string memory _symbol,
        address _costToken,
        uint256 _cost,
        address _treasury
    ) ERC721(_name, _symbol) {
        require(_costToken != address(0), "This type of voucher require token points to be charge");
        require(_treasury != address(0), "Treasury address for voucher points is not valid");

        costToken = _costToken;
        cost = _cost;
        treasury = payable(_treasury);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to) public {
        // Check JOE allowance
        uint256 pointsAllowance = IERC20(costToken).allowance(msg.sender, address(this));
        require(pointsAllowance >= cost, "You don't have enough points to claim this voucher");

        // Transfer the cost of voucher from minter to treasury
        bool isPaid = IERC20(costToken).transferFrom(msg.sender, treasury, cost);
        require(isPaid, "Voucher can't transfer points");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}