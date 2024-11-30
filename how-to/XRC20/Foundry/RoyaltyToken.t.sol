// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import {RoyaltyToken} from "src//RoyaltyToken.sol";

import "forge-std/Test.sol";

contract RoyaltyTokenTest is Test {
    RoyaltyToken public token;
    uint256 public royaltyFeePercentage = 2;
    uint256 public initialSupply = 10 ** 4;


    function setUp() public {
       token = new RoyaltyToken("RoyaltyToken", "ROYT", 18, royaltyFeePercentage, initialSupply);
    }

    function testTransfer() public {
        address alice = address(1);
        address bob = address(2);
        
        token.transfer(alice, 1000);
        
        assertEq(token.balanceOf(alice), 980);
        assertEq(token.balanceOf(address(this)), 9020);

        hoax(alice);
        token.transfer(bob, 100);

        assertEq(token.balanceOf(alice), 880);
        assertEq(token.balanceOf(bob), 98);
        assertEq(token.balanceOf(address(this)), 9022);
    }
}