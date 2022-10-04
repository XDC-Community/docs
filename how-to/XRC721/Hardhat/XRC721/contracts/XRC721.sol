// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract XRC721 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    }

    function mintToken(address tokenOwner)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(tokenOwner, newItemId);

        return newItemId;
    }
}