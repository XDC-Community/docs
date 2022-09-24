// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// inherit ERC20 from openzeppelin by simply adding 'is ERC20'
contract MyToken is ERC20 {
    address public owner;
     constructor() ERC20("MyToken", "MTK") {
        owner = msg.sender;
        // premint 1000 tokens to the owner of the contract.
        _mint(msg.sender, 1000 * 10 ** decimals());
     }

    function mint(address to, uint256 amount) public {
        require(owner == msg.sender, "Only owner can mint the token!");
        _mint(to, amount);
    }
}