pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XRC20Token is ERC20 {
    constructor(string memory name, string memory symbol) public ERC20(name, symbol){
        _mint(msg.sender, 1000e18);
    }
}
