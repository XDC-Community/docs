---
id: openzeppelin-example
title: How To create and deploy a smart contract using OpenZeppelin
description: "Use OpenZeppelin's Smart Contracts to create your tokens."
keywords:
  - docs
  - howto
  - tutorial
  - apothem
  - smart contract
  - contract
  - openzeppelin
  - solidity
  - token
  - xrc721
  - erc721
---

![OpenZeppelin logo](../.gitbook/assets/openzeppelin-example-header.png)

# Overview

OpenZeppelin is an open-source library to build secure smart contracts, provides many audited contracts, and is a good point to start and learn.

# What you will learn

In this tutorial, you will learn how to create and deploy a Solidity smart contract using OpenZeppelin and deploy it to the Apothem test network.

# What you will do

* Set up OpenZeppelin
* Create a simple non-fungible token contract
* Compile
* Deploy the contract
* Verifying and interacting with

# About OpenZeppelin library

OpenZeppelin is a “battle-tested” open-source framework comprised of reusable Ethereum smart contracts. The framework helps smart contract developers reduce the risk of vulnerabilities in their distributed applications by using standard, tested, community-reviewed code. It provides flexibility regarding how contracts are combined, along with custom useful extensions.

## Using Contracts Wizard

OpenZeppelin's [Contracts Wizard](https://wizard.openzeppelin.com/) as an interactive smart contract generator is the easiest way to get started building smart contracts based on OpenZeppelin's components.

<p align="center">
  <img width=70% src="../.gitbook/assets/openzeppelin-example-wizard.png" alt="OpenZeppelin Contracts Wizard"/>
</p>

Select the kind of contract that you want, set your parameters and desired features, and the Wizard will generate all of the code necessary. The resulting code is ready to be compiled and deployed, or it can serve as a starting point and be customized further.

---

# Writing our first Non-Fungible Token (NFT)

ERC721 is a standard for **non-fungible tokens** and is defined in the [EIP-721 Token Standard](https://eips.ethereum.org/EIPS/eip-721) by Ethereum. With this standard, you can represent ownership of non-fungible tokens, where each token is unique. Let's build :man_technologist:

## Create the contract

<p align="center">
  <img width=50% src="../.gitbook/assets/openzeppelin-example-nft-logo.png" alt="Joe's Free Voucher image"/>
</p>

Joe has a Pizza shop and for the opening day, he wants to create a one-time free voucher for each client that show with her web3 wallet.

Make a simple non-fungible token contract that can be paused and minted only by the owner, we gonna use OpenZeppelin's ERC721 contract for this. Open [Remix IDE](https://remix.ethereum.org/), and let's start creating a new Solidity file named `PizzaFreeVoucher.sol` in the contracts folder:

<p align="center">
  <img width=30% src="../.gitbook/assets/openzeppelin-example-createfile01.png" alt="How to create a new file in Remix IDE"/> <img width=30% src="../.gitbook/assets/openzeppelin-example-createfile02.png" alt="How to create a new file in Remix IDE"/> <img width=30% src="../.gitbook/assets/openzeppelin-example-createfile03.png" alt="How to create a new file in Remix IDE"/>
</p>

Most of the OpenZeppelin contracts are expected to be used via inheritance: you will inherit from them when writing your contracts. Here is a possible code for the contract, copy this code below for your `PizzaFreeVoucher.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PizzaFreeVoucher is ERC721, Pausable, Ownable, ERC721Burnable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Pizza Free Voucher", "JOE_FVOUCH") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmUWy3zCsLLAu4jMpypUZkiEs9Nktnm3qNgKPzZVkrdpeo";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to) public onlyOwner {
        uint256 bal = balanceOf(to);
        require(bal == 0, 'Already request your voucher');

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
```

### Contract explained

The token behind the contract is an `ERC721` token, which can be `Pausable`, is `Ownable` by someone, and can be also `Burnable` by someone. In this basic example, the owner has all this control, "Joe".

With `contract PizzaFreeVoucher is ERC721, Pausable, Ownable, ERC721Burnable` we define multiple inheritances, voucher contract `is` inherited from many contracts. By doing this, we can use some external properties from other contracts:

* At our constructor, we call the OpenZeppelin's `ERC721(name, symbol)` constructor, where the token name is "**Pizza Free Voucher**" and the symbol is "**JOE_FVOUCH**".
* As variables, we uniquely use a [Counter](https://docs.openzeppelin.com/contracts/4.x/api/utils#Counters) to automatically store and increment the *tokenId*.
* Functions:
  * [`_baseURI() → string`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721-_baseURI--): Base URI for computing *tokenURI*.
  * [`pause() public onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/security#Pausable-_pause--): Triggers stopped state (can only be called by the owner).
  * [`unpause() public onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/security#Pausable-_unpause--): Returns to a normal state (can only be called by the owner).
  * [`safeMint(address to) public onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721-_safeMint-address-uint256-): Safely mints a voucher and transfers it to an address.
    * Before the mint, to make sure each Joe's client can only have one voucher, we check if the balance of the address for this token is 0;
    * Also, increment the *tokenId*.
  * [`_beforeTokenTransfer(address from, address to, uint256 tokenId)`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721-_beforeTokenTransfer-address-address-uint256-): Hook that is called before any token transfer. This includes minting and burning.

## Compiling

We just need to compile the Solidity file, by changing the Remix tab to `Solidity Compiler` or just hitting `Ctrl + S` in the editor.

<p align="center">
  <img width=40% src="../.gitbook/assets/openzeppelin-example-compile.png" alt="Compile contract"/>
</p>

## Deploy the contract

For this tutorial, we gonna deploy the contract using a web3 wallet compatible with XDC Network, the [*XDCPay*](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo). Install the wallet and create a new account, after that we need to have network gas for interacting with the blockchain.

> :warning: Because we are just testing, check if you are connected to the **XDC Apothem** testnet network.

Visit the [XDC Apothem network faucet](https://faucet.apothem.network/), enter the public address of your account, and `Request 1000 XDC`. After the success message from the faucet, you can confirm if you have 1000 XDC tokens transferred to your wallet.

<p align="center">
  <img width=30% valign="middle" src="../.gitbook/assets/openzeppelin-example-wallet-faucet01.png" alt="Apothem Network Faucet"/> <img width=30% valign="middle" src="../.gitbook/assets/openzeppelin-example-wallet-faucet02.png" alt="Apothem Network Faucet"/> <img width=30% valign="middle" src="../.gitbook/assets/openzeppelin-example-wallet-faucet03.png" alt="Apothem Network Faucet"/>
</p>

Now that we have gas, deploy the contract we previously create. Just change to deploy tab on your Remix IDE, set the environment to `Injected Provider`, and connect Remix with your *XDCPay* account. Select the `PizzaFreeVoucher` contract and click on `Deploy`.

<p align="center">
  <img width=30% valign="middle" src="../.gitbook/assets/openzeppelin-example-deploy01.png" alt="Deploy"/> <img width=30% valign="middle" src="../.gitbook/assets/openzeppelin-example-deploy02.png" alt="Deploy"/> <img width=35% valign="middle" src="../.gitbook/assets/openzeppelin-example-deploy03.png" alt="Deploy"/>
</p>

After that, you should see a pop-up notification to accept/deny the deployment transaction, accept by clicking on `Submit`.

<p align="center">
  <img width=35% valign="middle" src="../.gitbook/assets/openzeppelin-example-deploy04.png" alt="Verify"/> <img width=35% valign="middle" src="../.gitbook/assets/openzeppelin-example-verify01.png" alt="Verify"/>
</p>

Wait for the blockchain confirmation in the `Transactions` tab of your wallet. You can now copy the transaction hash `0xe487f01b027172ce171f5980e465307da5bdb66a0425904ff8f48f25f797b15d` :partying_face::partying_face:

## Verifying and interacting with your contract

Open the [**XDC Apothem Network Explorer**](https://explorer.apothem.network/) and search for the previously copied hash. Here, at explorer, we can check all the transactions that occur on the network, including the deployment of our contract. Check the `To` address, should be your contract address (starting with `xdc...`).

<p align="center">
  <img width=70% valign="middle" src="../.gitbook/assets/openzeppelin-example-verify02.png" alt="Verify"/>
</p>

Search for the contract address on the explorer, we can see that the contract isn't verified. Click on `Verify and Publish` that will open the verification page.

<p align="center">
  <img width=70% valign="middle" src="../.gitbook/assets/openzeppelin-example-verify03.png" alt="Verify"/>
</p>

Now, we have to submit the source code, name, address, and compiler version of the contract. With this, the final user can confirm if the contract was been verified or not, but also interact with it directly on the explorer.

> :information_source: When using external dependencies in your code (for example OpenZeppelin imports or other imports), we need to flat all the code before verifying.

On the bottom-left corner in Remix, open `Plugin Manager` and install the `Flattener` plugin. Change to `Flattener` tab on the left navigation bar and click on `contracts/Flattern PizzaFreeVoucher.sol` (this will copy the flat code to your clipboard).

<p align="center">
  <img width=40% valign="middle" src="../.gitbook/assets/openzeppelin-example-flat01.png" alt="Flat the source code"/> <img width=40% valign="middle" src="../.gitbook/assets/openzeppelin-example-flat02.png" alt="Flat the source code"/>
</p>

Back to the verification page, paste this code, and fill in the rest of the information. Finally, click `Submit`.

<p align="center">
  <img width=60% valign="middle" src="../.gitbook/assets/openzeppelin-example-verify04.png" alt="Verify"/>
</p>

Once the contract is verified, just navigate to `Contract` > `Read Contract` tab, and here you can perform reading actions, such as getting the balance of an account, getting the contract owner, etc.

<p align="center">
  <img width=60% valign="middle" src="../.gitbook/assets/openzeppelin-example-interact01.png" alt="Interact"/>
</p>

Let's mint our first non-fungible token by changing to the `Write Contract` tab. First, connect your web3 wallet by clicking on the `Connect to Web3` button and then call the `SafeMint` method with the address that gonna receive the NFT.

<p align="center">
  <img width=50% valign="middle" src="../.gitbook/assets/openzeppelin-example-interact02.png" alt="Interact"/> <img width=25% valign="middle" src="../.gitbook/assets/openzeppelin-example-interact03.png" alt="Interact"/>
</p>

Accept the action by submitting the transaction :rocket:

# Confirm the balance

If the mint transaction was confirmed, congratulations! The target address now has one free pizza voucher.

<p align="center">
  <img width=70% valign="middle" src="../.gitbook/assets/openzeppelin-example-interact04.png" alt="Interact"/>
</p>

You can pick the voucher contract address (`xdcF26E1ac69D9e173C96848FbD1bBE8759f5C71106`) and add it to the list of *XDCPay*'s tokens.

<p align="center">
  <img width=30% valign="middle" src="../.gitbook/assets/openzeppelin-example-wallet-token01.png" alt="Confirm wallet"/> <img width=30% valign="middle" src="../.gitbook/assets/openzeppelin-example-wallet-token02.png" alt="Confirm wallet"/> <img width=30% valign="middle" src="../.gitbook/assets/openzeppelin-example-wallet-token03.png" alt="Confirm wallet"/>
</p>

Now you can see the voucher NFT in your wallet :rocket::rocket: