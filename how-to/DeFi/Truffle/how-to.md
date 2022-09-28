---
id: defi-app-truffle
title: DeFi App using Truffle and Ganache
description:  "Use Truffle and Ganace to create DeFi App"
keywords:
  - docs
  - apothem
  - token
  - DeFi
  - truffle
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
  - [📰 About DeFi](#-about-defi)
- [🚀 Setting up the development environment](#-setting-up-the-development-environment)
  - [⚒️ Starting a new Truffle Project](#-starting-a-new-truffle-project)
  - [⚒️ Configuring XDC Mainnet and Apothem Testnet on Truffle](#-configuring-xdc-mainnet-and-apothem-testnet-on-truffle)
  - [⚒️ Adding Testnet XDC to Development Wallet](#-adding-testnet-xdc-to-development-wallet)
- [💵 Creating our first DeFi App](#-creating-our-first-defi-app)
  - [💵 Create and Deploy XRC20 Token](#-create-and-deploy-xrc20-token)
  - [💵 Create FarmToken contract](#-create-farmtoken-contract)
  - [💵 Compiling and Deploying](#-compiling-and-deploying)
  - [💵 Testing FarmToken contract](#-testing-farmtoken-contract)
  - [💵 Deploying on a live network](#-deploying-on-a-live-network)

# 📰 Overview
[Truffle](https://trufflesuite.com/) is a blockchain development environment, which you can use to create and test smart contracts by levering an Ethereum Virtual Machine. [Ganache](https://trufflesuite.com/ganache/) is a tool to create local blockchain for testing your smart contracts. It simulates all the features of real blockchain network but costs you nothing to deploy and test your code.

### What you will learn
In this tutorial we will build a DeFi Application with Solidity where users can deposit an XRC20 token to the smart contract and it will mint and transfer Farm Tokens to them. The users can later withdraw their XRC20 tokens by burning their Farm Token on smart contract and the XRC20 tokens will be transferred back to them.

### What you will do

- Install and setup Truffle and Ganache
- Create a Truffle project
- Create an XRC20 Token
- Compile an XRC20 Token
- Deploy an XRC20 Token
- Create FarmToken Smart Contract

## 📰 About DeFi

Decentralized finance, or **DeFi**, is a term which describes blockchain-based financial services. DeFi provides basically any financial service on a blockchain in permissionless way. You can borrow, lend, stake, trade, and more using DeFi services.

# 🚀 Setting up the development environment

There are a few technical requirements before we start. Please install the following:

- [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
- [Git](https://git-scm.com/)

Once we have those installed, we only need one command to install Truffle:

```bash
npm install -g truffle
```

To verify that Truffle is installed properly, type **`truffle version`** on a terminal. You should see something like:

```bash
Truffle v5.5.27 (core: 5.5.27)
Ganache v7.4.0
Solidity v0.5.16 (solc-js)
Node v16.16.0
Web3.js v1.7.4
```

If you see an error instead, make sure that your npm modules are added to your path.

## ⚒ Starting a new Truffle Project

Lets start by setting up our folder, we are creating a project called `FarmToken`, create a new `FarmToken` folder by running on terminal

```bash
mkdir FarmToken && cd FarmToken
```

And running `truffle init`. If truffle is correctly installed on your local environment, you should see the following message:

```bash
Starting init...
================

> Copying project files to /home/your/path/to/FarmToken

Init successful, sweet!

Try our scaffold commands to get started:
  $ truffle create contract YourContractName # scaffold a contract
  $ truffle create test YourTestName         # scaffold a test

http://trufflesuite.com/docs
```

And your folder files will look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/190839624-495ef863-e177-4c62-81ca-680e5e6a4cab.png" alt="Step 01"/>
</p>


## ⚒ Configuring XDC Mainnet and Apothem Testnet on Truffle

In order to get started deploying new contracts on XDC Mainnet and/or Apothem, we need to install two new dependencies that will be used in the `truffle-config.js` file. These dependencies are `@truffle/hdwallet-provider` and `dotenv`. First choose your preferred package manager. In this example we are using `yarn` but you can also use `npm`.

 If you never used `yarn` before, you might need to install it first. <br>‼️You can skip this step if you already have yarn installed‼️

```sh
npm install --global yarn
```

Initialize your package manager on your folder and install the required dependencies:

```sh
yarn init -y
yarn add @truffle/hdwallet-provider dotenv
```

You will also need a **24-Word Mnemonic Phrase**. To configure your wallet, create a new `.env` file and write your mnemonic by running:

```sh
touch .env
echo MNEMONIC=arm derive cupboard decade course garlic journey blast tribe describe curve obey >> .env
```

Remember to change the **24-Word Mnemonic** above for your own mnemonic. The contents of your `.env` file should read as follow:

```jsx
MNEMONIC=arm derive cupboard decade course garlic journey blast tribe describe curve obey
```


🚨 **Do not use the mnemonic in the example above in production or you can risk losing your assets and/or the ownership of your smart contracts!** 🚨

And finally, we can configure the `truffle-config.js` file for both Apothem and XinFin Networks by writting:

```jsx
require('dotenv').config();
const { MNEMONIC } = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  networks: {

    xinfin: {
      provider: () => new HDWalletProvider(
        MNEMONIC,
        'https://erpc.xinfin.network'),
      network_id: 50,
      gasLimit: 6721975,
      confirmation: 2,
    },

    apothem: {
      provider: () => new HDWalletProvider(
        MNEMONIC,
        'https://erpc.apothem.network'),
      network_id: 51,
      gasLimit: 6721975,
      confirmation: 2,
    }
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.16",
    }
  },
};
```

## ⚒ Adding Testnet XDC to Development Wallet

It is possible to list all XDC addresses bound to your mnemonic on truffle by accessing the truffle console:

```sh
truffle console --network xinfin
```

Once the truffle console CLI opens, you can run:

```sh
truffle(xinfin)> accounts
```

And the console should log all accounts bound to your mnemonic phrase as follow:

```jsx
[
  '0xA4e66f4Cc17752f331eaC6A20C00756156719519',
  '0x0431d52FE37F3839895018272dfa3bA189fcE07E',
  '0x11A6D9727c16064950473a4c8A92dC294190f7fF',
  '0x4464DDF9969E9a8e5CfF02E3706AEB4ccA92A314',
  '0xFa73bE6AA126DEC47ce14a22B7BAaF8BAFaB59Fb',
  '0xEdFFc4e7476f05f43cA3e6f5784349dE6E6373D5',
  '0x07795c732Bb013165FADCE64B884bf9971Bf9636',
  '0x5dF551A53bEaAB8bb2307eF459aA5AAFbb5F73cc',
  '0x910435b01e6Aa66dE22769062998F6AE98566f23',
  '0x573b009b2dE9A95531f82DA10BB0D793050329d2'
]
```

These accounts are on the Ethereum standard format starting with `0x`, but we can simply switch `0x` for `xdc`. By default, the deployment account is the first account from the list above: `xdcA4e66f4Cc17752f331eaC6A20C00756156719519`.

With this account in hand, we can head to the [Apothem Faucet](https://faucet.apothem.network/) and claim some TXDC for development purposes:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/189952656-eb7793cc-7dee-4307-88fc-7c351a75cec7.png" alt="Step 02"/>
</p>

# 💵 Creating our first DeFi App

The source code for the DeFi App used in this tutorial is available here: [FarmToken Contract](./FarmToken/contracts/FarmToken.sol) and [MyToken Contract](./FarmToken/contracts/MyToken.sol).

## 💵 Create and Deploy XRC20 Token

Before creating FarmToken contract, lets first create new XRC20 token. This is going to be a quick guide and if you want to go more in depth `XRC20` standard, please take a look at those tutorials:

- [Create XRC20 token using Hardhat](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Hardhat/how-to.md)
- [Create XRC20 token using Remix](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Remix/how-to.md)
- [Create XRC20 token using Truffle](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Truffle/how-to.md)

We will need to install OpenZeppelin in order to not writing all code by ourself

```sh
yarn add @openzeppelin/contracts
```

or using `npm`

```sh
npm install @openzeppelin/contracts
```

Now create file called `MyToken.sol` in `contracts` folder with following content:

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XRC20Token is ERC20 {
    constructor(string memory name, string memory symbol) public ERC20(name, symbol){
        _mint(msg.sender, 1000e18);
    }
}
```

## 💵 Create FarmToken contract

Create another smart contract called `FarmToken.sol`.

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    using SafeMath for uint256; // As of Solidity v0.8.0, mathematical operations can be done safely without the need for SafeMath
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token) public ERC20("FarmToken", "FRM") {
        token = IERC20(_token);
    }

    function balance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function deposit(uint256 _amount) public {
        // Amount must be greater than zero
        require(_amount > 0, "amount cannot be 0");

        // Transfer MyToken to smart contract
        token.safeTransferFrom(msg.sender, address(this), _amount);

        // Mint FarmToken to msg sender
        _mint(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) public {
        // Burn FarmTokens from msg sender
        _burn(msg.sender, _amount);

        // Transfer MyTokens from this smart contract to msg sender
        token.safeTransfer(msg.sender, _amount);
    }
}
```

`FarmToken` is a XRC20 token, but with 3 custom methods. `balance` shows how much of `MyToken` our `FarmToken` holds. `deposit` transfers `MyToken` from our account to `FarmToken` and gives us respective amount of `FarmToken`. And finally, `withdraw` burns our `FarmToken` and returns back `MyToken` to us. This prevents us from having both same amounts of `FarmToken` and `MyToken`, we can hold only one of them.

## 💵 Compiling and Deploying

We can compile our smart contracts (`FarmToken.sol` and `MyToken.sol`) by running:

```sh
truffle compile
```

If everything is correctly configured and there is no errors, you should see the following message on your console:

```sh
Compiling your contracts...
===========================
> Compiling ./contracts/FarmToken.sol
> Compiling ./contracts/MyToken.sol                                                                                    
> Compiling @openzeppelin/contracts/token/ERC20/ERC20.sol
> Compiling @openzeppelin/contracts/token/ERC20/IERC20.sol                                                             
> Compiling @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol
> Compiling @openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol
> Compiling @openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol 
> Compiling @openzeppelin/contracts/utils/Address.sol
> Compiling @openzeppelin/contracts/utils/Context.sol
> Compiling @openzeppelin/contracts/utils/math/SafeMath.sol
...
```

And your folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/190875030-27137576-84b6-45a1-be1d-f52f55d6488f.png" alt="Step 03"/>
</p>

In order to deploy our newly compiled contract artifacts to the blockchain, we need to create a deployment script into the migrations folder:

```sh
touch ./migrations/1_defi_migration.js
```

And write the following migration script to the `1_defi_migration.js` file:

```javascript
const XRC20Token = artifacts.require("XRC20Token");
const FarmToken = artifacts.require("FarmToken")

const NAME = "MyToken";
const SYMBOL = "MTK";

module.exports = async function (deployer) {
  // Deploy XRC20Token
  await deployer.deploy(XRC20Token, NAME, SYMBOL);
  const myToken = await XRC20Token.deployed()

  // Deploy FarmToken
  await deployer.deploy(FarmToken, myToken.address)
  const farmToken = await FarmToken.deployed()

  console.log('FarmToken deployed:', farmToken.address)
}
```

Now lets run it on a ganache local network. First, open Ganache app and choose `Quickstart` option to start local blockchain network. Then, deploy contracts by running:

```sh
truffle migrate
```

If everything is fine, you'll have an output like this:

```sh
Starting migrations...
======================
> Network name:    'ganache'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_defi_migration.js
===================

   Deploying 'XRC20Token'
   ----------------------
   > transaction hash:    0x7c05e8cc683f2125a94e76e037191ddc792e4a1fbecb750d7f299e3f000a1b9d
   > Blocks: 0            Seconds: 0
   > contract address:    0xD63Ab469Ebc2acf0332B7d01028d02E3b363f076
   > block number:        1
   > block timestamp:     1664390940
   > account:             0x7EF6aCFd4F0B8B6828Bf25D440Bf46f1Eb28c6A6
   > balance:             99.97646966
   > gas used:            1176517 (0x11f3c5)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.02353034 ETH


   Deploying 'FarmToken'
   ---------------------
   > transaction hash:    0x3cb3cf3c959ce40cdc79430b9f78edb2d8f44df4eb25ce5cd1e26631e173aa49
   > Blocks: 0            Seconds: 0
   > contract address:    0xDFe652110afBc0f32060De436F24eDD8E856A82d
   > block number:        2
   > block timestamp:     1664390941
   > account:             0x7EF6aCFd4F0B8B6828Bf25D440Bf46f1Eb28c6A6
   > balance:             99.93702634
   > gas used:            1972166 (0x1e17c6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03944332 ETH

FarmToken deployed: 0xDFe652110afBc0f32060De436F24eDD8E856A82d
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.06297366 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.06297366 ETH
```

## 💵 Testing FarmToken contract

First, lets make sure that our `FarmToken` balance is 0 now: `truffle exec ./scripts/getMyTokenBalance.js`

```sh
Using network 'ganache'.

0
```

Ok, now lets deposit some tokens

```sh
truffle exec ./scripts/depositMyToken.js
```

```sh
Using network 'ganache'.

Amount of MyToken FarmToken is allowed to transfer on our behalf Before: 0
Amount of MyToken FarmToken is allowed to transfer on our behalf After: 100000000000000000000
*** My Token ***
Balance MyToken Before accounts[0] 1000
Balance MyToken Before TokenFarm 0
*** Farm Token ***
Balance FarmToken Before accounts[0] 0
Balance FarmToken Before TokenFarm 0
Call Deposit Function
*** My Token ***
Balance MyToken After accounts[0] 900
Balance MyToken After TokenFarm 100
*** Farm Token ***
Balance FarmToken After accounts[0] 100
Balance FarmToken After TokenFarm 0
```

Lets check our balance again using `truffle exec ./scripts/getMyTokenBalance.js`

```sh
Using network 'ganache'.

100
```

Ok, looks like everything is working as intended.

Finally, we can check if we can withdraw it back:

```sh
truffle exec ./scripts/withdrawMyToken.js
```

```sh
Using network 'ganache'.

*** My Token ***
Balance MyToken Before accounts[0] 900
Balance MyToken Before TokenFarm 100
*** Farm Token ***
Balance FarmToken Before accounts[0] 100
Balance FarmToken Before TokenFarm 0
Call Withdraw Function
*** My Token ***
Balance MyToken After accounts[0] 1000
Balance MyToken After TokenFarm 0
*** Farm Token ***
Balance FarmToken After accounts[0] 0
Balance FarmToken After TokenFarm 0
```

## 💵 Deploying on a live network

Finally, we can deploy everything on a XDC Apothem Testnet.

```sh
truffle migrate --network apothem
```

If you want to deploy it on XDC mainet, change network to `xinfin`.

```sh
truffle migrate --network xinfin
```

---

For more information about Truffle Suite, Please Visit [Truffle Suite Documentation](https://trufflesuite.com/docs/truffle/).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
Resources used during the deployment of the DeFi App can be found at [FarmToken Contract Folder](./FarmToken).

