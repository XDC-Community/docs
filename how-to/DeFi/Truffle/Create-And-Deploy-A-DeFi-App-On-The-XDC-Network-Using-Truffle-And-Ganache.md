---
id: Defi-app-XDC-Network
title: DeFi App using Truffle and Ganache
description:  "Create And Deploy A DeFi App On The XDC Network Using Truffle And Ganache."
keywords:
  - docs
  - Apothem
  - smart
  - contract
  - truffle
  - Ganache
  - Defi
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
  - [🔍 Veryfing Contracts on the Block Explorer](#-veryfing-contracts-on-the-block-explorer)

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

Decentralized finance (often stylized as DeFi) offers financial instruments without relying on intermediaries such as brokerages, exchanges, or banks by using smart contracts on a blockchain. DeFi platforms allow people to lend or borrow funds from others, speculate on price movements on assets using derivatives, trade cryptocurrencies, insure against risks, and earn interest in savings-like accounts. DeFi uses a layered architecture and highly composable building blocks.

# 🚀 Setting up the development environment

There are a few technical requirements before we start. Please install the following:

- [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
- [Git](https://git-scm.com/)
- [Ganache](https://trufflesuite.com/ganache/)
- [VS Code](https://code.visualstudio.com/)

Once we have those installed, we only need one command to install Truffle:

```bash
npm install -g truffle
```

To verify that Truffle is installed properly, type **`truffle version`** on a terminal. You should see something like:

```bash
Truffle v5.5.32 (core: 5.5.32)
Ganache v7.4.3
Solidity v0.5.16 (solc-js)
Node v16.15.0
Web3.js v1.7.4
```

If you see an error instead, make sure that your npm modules are added to your path.

## ⚒ Starting a new Truffle Project

Lets start by setting up our folder, we are creating a project called `FarmToken`, create a new `FarmToken` folder by running on terminal

```bash
mkdir FarmToken
cd FarmToken
truffle init
```

And running `truffle init`. If truffle is correctly installed on your local environment, you should see the following message:

```bash
Starting init...
================

> Copying project files to C:\Users\ASUS\FarmToken

Init successful, sweet!

Try our scaffold commands to get started:
  $ truffle create contract YourContractName # scaffold a contract
  $ truffle create test YourTestName         # scaffold a test

http://trufflesuite.com/docs
```

This will create a blank project for the development and deployment of our smart contracts. The created project structure is the following:

- `contracts`: Folder for the solidity smart contracts

- `migrations`: Folder for the deployment scripts

- `test`: Folder for testing our smart contracts

- `truffle-config.js`: Truffle configuration file


Now open this folder in VS Code IDE nd your folder files will look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/69668077/193394944-cde65eb0-572a-481e-840c-6a536cd9c425.png">
</p>




## ⚒ Configuring XDC Mainnet and Apothem Testnet on Truffle

In order to get started deploying new contracts on XDC Mainnet and/or Apothem, we need to install two new dependencies that will be used in the `truffle-config.js` file. These dependencies are `@truffle/hdwallet-provider` and `dotenv`. First choose your preferred package manager. In this example we are using `yarn` but you can also use `npm`.

 If you never used `yarn` before, you might need to install it first. ‼️You can skip this step if you already have yarn installed‼️.

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
type .env
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
npm install dotenv
```


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
  <img src="https://user-images.githubusercontent.com/69668077/193399211-e3f1a4f3-2fa9-4922-a3e0-d7ba7dea3c79.png"
>
</p>

# 💵 Creating our first DeFi App

First we need to create our XRC20 token that we will use to stake on the smart contract. To create our fungible token, we will first need to install the OpenZeppelin library.

## 💵 Create and Deploy XRC20 Token

OpenZeppelin library contains the implementations of standards, To install it, run the command:

```sh
npm install @openzeppelin/contracts
```

```sh
cd contracts
```
For Window use `type >` and for linux / mac os / unix `touch ./contracts/MyToken.sol`

```sh
type > MyToken.sol
```

<p align="center">
<img src="https://user-images.githubusercontent.com/69668077/193399896-7fccbef7-26f1-4539-8e1a-aba20865ace2.png">
  </p>
  
```sh
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```
In the code above on:
- `import "@openzeppelin/contracts/token/ERC20/ERC20.sol";` We import the contract ERC20.sol from openzeppelin that contains the implementation for this token standard.
- `contract MyToken is ERC20` We inherit from the ERC20.sol contract.
- `constructor() public ERC20("MyToken", "MTKN")` We are calling the ERC20.sol constructor and passing for the name and symbol parameters as "MyToken" and "MTKN" respectively.
- ` _mint(msg.sender, 1000000000000000000000000)` We are minting and transferring 1 million tokens for the account that is deploying the smart contract (we are using the default 18 decimals for the ERC20 token, that means that if we want to mint 1 token, you will represent it as 1000000000000000000, 1 with 18 zeros).


## 💵 Create FarmToken contract

```sh
type > FarmToken.sol
```
<p align="center"><img src
The FarmToken smart contract will have 3 functions:

- `balance()`: Get the MyToken balance on the FarmToken smart contract.

- `deposit(uint256 _amount)`: Transfer MyToken on behalf of the user to the FarmToken smart contract then mint and transfer FarmToken to the user.

- `withdraw(uint256 _amount)`: Burn users FarmTokens and transfer MyTokens to the users address.

Lets look at the FarmToken constructor:

```sh
  
// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract FarmToken is ERC20 {
    using Address for address;
    using SafeERC20 for IERC20;
    IERC20 public token;
    constructor(address _token) public ERC20("FarmToken", "FRM"){
        token = IERC20(_token);
    }
```

- We are importing the following contracts from openzeppelin: IERC20.sol, Address.sol, SafeERC20.sol and ERC20.sol.
- The FarmToken will inherit from the ERC20 contract.
- The FarmToken constructor will receive as parameter the address of MyToken contract and we will assign its contract to our public variable called token.                       
                       
Lets implement the `balance()` function. It will receive no parameters and it will return the balance of MyToken on this smart contract. It is implemented as shown below:

```solidity
function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
```

For the `deposit(uint256 _amount)` function, it will receive as parameter the amount the user wants to deposit and it will mint and transfer FarmTokens to the user:

```solidity
function deposit(uint256 _amount) public {
    // Amount must be greater than zero
    require(_amount > 0, "amount cannot be 0");
    // Transfer MyToken to smart contract
    token.safeTransferFrom(msg.sender, address(this), _amount);
    // Mint FarmToken to msg sender
    _mint(msg.sender, _amount);
}
```

For the `withdraw(uint256 _amount)` function, we will receive as parameter the amount of FarmTokens the user wants to burn and then transfer the same amount of MyTokens back to the user:

```solidity
function withdraw(uint256 _amount) public {
    // Burn FarmTokens from msg sender
    _burn(msg.sender, _amount);
    // Transfer MyTokens from this smart contract to msg sender
    token.safeTransfer(msg.sender, _amount);
}
```

`FarmToken.sol` full code :
  
  ```sh
  // SPDX-License-Identifier: MIT  
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract FarmToken is ERC20 {
    using Address for address;
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
  
  
  
  
 ## 💵 Compiling and Deploying

Lets try compiling the `MyToken.sol` and `FarmToen.sol` contract by running:

```sh
truffle compile
```

If everything is correctly configured and there is no errors, you should see the following message on your console:

```sh
Compiling your contracts...
===========================
> Compiling @openzeppelin\contracts\token\ERC20\ERC20.sol
> Compiling @openzeppelin\contracts\token\ERC20\IERC20.sol
> Compiling @openzeppelin\contracts\token\ERC20\extensions\IERC20Metadata.sol
> Compiling @openzeppelin\contracts\token\ERC20\extensions\draft-IERC20Permit.sol
> Compiling @openzeppelin\contracts\token\ERC20\utils\SafeERC20.sol
> Compiling @openzeppelin\contracts\utils\Address.sol
> Compiling @openzeppelin\contracts\utils\Context.sol
> Compiling .\contracts\FarmToken.sol
> Compiling .\contracts\MyToken.sol
> Artifacts written to C:\Users\ASUS\FarmToken\build\contracts
> Compiled successfully using:
   - solc: 0.8.16+commit.07a7930e.Emscripten.clang
```

And your folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/69668077/193403411-98291001-706f-4cf1-ad60-98914e88071a.png">
</p>

## 🍕 Deploying

In order to deploy our newly compiled contract artifacts to the blockchain, we need to create a deployment script into the migrations folder.

```sh
type > ./migrations/1_defi_migration.js
```

And write the following migration script:

```jsx
const XRC20Token = artifacts.require("XRC20Token");
const FarmToken = artifacts.require("FarmToken")
module.exports = async function (deployer) {
  // Deploy XRC20Token
  await deployer.deploy(XRC20Token);
  const myToken = await XRC20Token.deployed()
  // Deploy FarmToken
  await deployer.deploy(FarmToken, myToken.address)
  const farmToken = await FarmToken.deployed()
}
```

Now lets run it on a ganache local network. First, open [Ganache app](https://trufflesuite.com/ganache/) and choose `Quickstart` option to start local blockchain network.

![](https://user-images.githubusercontent.com/69668077/193405311-7182601e-86d9-47ea-8370-65862ebfa893.png)

we can go ahead and run the command to deploy in Ganache

```sh
truffle migrate
```
Then, deploy contracts by running:

```sh
truffle migrate
```

If everything is fine, you'll have an output like this:

```Starting migrations...
======================
> Network name:    'ganache'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_defi_migration.js
===================

   Deploying 'MyToken'
   -------------------
   > transaction hash:    0xf41ea5eabe34bfa1bd5dba7a76c165255eb32cbd80e6d81b237ad91a76f33b45
   > Blocks: 0            Seconds: 0
   > contract address:    0x385A8398cD03273Fc57Bf81d710313E12A13043B
   > block number:        1
   > block timestamp:     1664621725
   > account:             0xd58668a6168554A88ccE2C09cC698B60272ed6A1
   > balance:             99.97667762
   > gas used:            1166119 (0x11cb27)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.02332238 ETH


   Deploying 'FarmToken'
   ---------------------
   > transaction hash:    0x25ac3b38a39c070912e84a22ee4f9061005ef9e50c5e99e563ebbc622a975b74
   > Blocks: 0            Seconds: 0
   > contract address:    0xF239Ad6906FD08a0269e7dfb8de0554A6C942e5B
   > block number:        2
   > block timestamp:     1664621726
   > account:             0xd58668a6168554A88ccE2C09cC698B60272ed6A1
   > balance:             99.9372343
   > gas used:            1972166 (0x1e17c6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03944332 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0627657 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.0627657 ETH
``` 

![dtg 6](https://user-images.githubusercontent.com/69668077/193406371-946c653a-8dd1-4811-9a1a-34d243202a9b.png)

![dtg 7](https://user-images.githubusercontent.com/69668077/193406373-4f5d5c44-c2de-44ae-8389-78433b238f89.png)


## 💵 Testing FarmToken contract

Let's test our smart contract. Instead of using the truffle console to interact with our smart contract, we will create a script to automate this process. Create a folder called scripts and add the following file getMyTokenBalance.js. It will check the balance of MyTokens on the FarmToken smart contract:

```sh
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  myToken = await MyToken.deployed()
  farmToken = await FarmToken.deployed()
  balance = await myToken.balanceOf(farmToken.address)
  console.log(web3.utils.fromWei(balance.toString()))
  callback()
}
```

To execute this script, run the following cli command:

```bash
truffle exec .\scripts\getMyTokenBalance.js
```
We will get the expected result that is 0. If you get an error about the FarmToken not being deployed yet, the truffle network has not received the latest version of your contract code. Just close ganache, quickstart it again and make sure to run truffle migrate.

Now, let's stake the MyToken to the smart contract. Since the function `deposit(uint256 _amount)` calls the function `safeTransferFrom` from the ERC20, the user must first approve the smart contract to transfer MyToken on the user's behalf. So on the script below, we will first approve this step then we will call the function:
Make a new test file `transferMyTokenToFarmToken.js`
```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")
module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()
  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await myToken.allowance(
    accounts[0],
    farmToken.address
  )
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )
  // In order to allow the Smart Contract to transfer to MyToken (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of MyToken on our behalf
  await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"))
  // Validate that the farmToken can now move x amount of MyToken on our behalf
  const allowanceAfter = await myToken.allowance(accounts[0], farmToken.address)
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )
  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )
  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )
  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await farmToken.deposit(web3.utils.toWei("100", "ether"))
  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )
  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )
  // End function
  callback()
}
```

To run this script: ```truffle exec .\scripts\transferMyTokenToFarmToken.js```. 
You should see on your console:
```
Using network 'ganache'.

Amount of MyToken FarmToken is allowed to transfer on our behalf Before: 0
Amount of MyToken FarmToken is allowed to transfer on our behalf After: 100000000000000000000
*** My Token ***
Balance MyToken Before accounts[0] 1000000
Balance MyToken Before TokenFarm 0
*** Farm Token ***
Balance FarmToken Before accounts[0] 0
Balance FarmToken Before TokenFarm 0
Call Deposit Function
*** My Token ***
Balance MyToken After accounts[0] 999900
Balance MyToken After TokenFarm 100
*** Farm Token ***
Balance FarmToken After accounts[0] 100
Balance FarmToken After TokenFarm 0
```

As we can see, we have successfully deposited MyTokens to the smart contract as the first account has now FarmTokens.

In order to withdraw: make a new file `withdrawMyTokenFromTokenFarm.js`
```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")
module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()
  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )
  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )
  // Call Deposit function from FarmToken
  console.log("Call Withdraw Function")
  await farmToken.withdraw(web3.utils.toWei("100", "ether"))
  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )
  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )
  // End function
  callback()
}
```
To run this script: `truffle exec .\scripts\withdrawMyTokenFromTokenFarm.js`. As we can see on the output below, we have successfully got the MyTokens back and we have burned the FarmTokens:

```
Balance MyToken Before accounts[0] 999900
Balance MyToken Before TokenFarm 100
*** Farm Token ***
Balance FarmToken Before accounts[0] 100
Balance FarmToken Before TokenFarm 0
Call Withdraw Function
*** My Token ***
Balance MyToken After accounts[0] 1000000
Balance MyToken After TokenFarm 0
*** Farm Token ***
Balance FarmToken After accounts[0] 0
Balance FarmToken After TokenFarm 0
```

## 💵 Deploying on a live network

For deployment on XDC mainet, or:

```sh
truffle migrate --network xinfin
```

For deployment on the XDC Apothem Testnet.

```sh
truffle migrate --network apothem
```

In either case, you need to have enough funds to pay for gas fees on the address that is being used for development.

If the deployment is sucessful, the console should log the following message after migrations complete processing:

```sh
Starting migrations...
======================
> Network name:    'apothem'
> Network id:      51
> Block gas limit: 420000000 (0x1908b100)


1_defi_migration.js
===================

   Deploying 'MyToken'
   -------------------
   > transaction hash:    0xce5fad46a9c68a0b6edcef94127a0d2173e6c37b91c229f81ef11dade483c8ed
   > Blocks: 4            Seconds: 9
   > contract address:    0x6a48ff540812d56cDaAc822815ce009752d77754
   > block number:        39500245
   > block timestamp:     1664623546
   > account:             0xE60cAcCc974B24959465C9eB791819Ab4c8B6987
   > balance:             999.99963643725
   > gas used:            1454251 (0x1630ab)
   > gas price:           0.25 gwei
   > value sent:          0 ETH
   > total cost:          0.00036356275 ETH


   Deploying 'FarmToken'
   ---------------------
   > transaction hash:    0x86de0a85bb692b0afb08911ea85784a8d0d7d0ec4bd934dfa0518158ef28f062
   > Blocks: 4            Seconds: 9
   > contract address:    0x8516c05f65d1c4E60cE9D43172B6af1BC5FBa8A9
   > block number:        39500253
   > block timestamp:     1664623562
   > account:             0xE60cAcCc974B24959465C9eB791819Ab4c8B6987
   > balance:             999.99903092275
   > gas used:            2422058 (0x24f52a)
   > gas price:           0.25 gwei
   > value sent:          0 ETH
   > total cost:          0.0006055145 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:       0.00096907725 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.00096907725 ETH
```



This transaction is immediately reflected in the block explorer, [Mytoken](https://explorer.apothem.network/txs/0xce5fad46a9c68a0b6edcef94127a0d2173e6c37b91c229f81ef11dade483c8ed#overview) and [FarmToken](https://explorer.apothem.network/txs/0x86de0a85bb692b0afb08911ea85784a8d0d7d0ec4bd934dfa0518158ef28f062#overview)

# 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [Apothem Block Explorer](https://explorer.apothem.network/).

First lets check the address our contract is deployed to by running:

```sh
truffle networks
```

If you have a contract already deployed, the console should log something like this:

```sh
Network: UNKNOWN (id: 5777)
  FarmToken: 0xF239Ad6906FD08a0269e7dfb8de0554A6C942e5B
  MyToken: 0x385A8398cD03273Fc57Bf81d710313E12A13043B

Network: apothem (id: 51)
  FarmToken: 0x8516c05f65d1c4E60cE9D43172B6af1BC5FBa8A9
  MyToken: 0x6a48ff540812d56cDaAc822815ce009752d77754
```

Here we have a `Mytoken` contract deployed on Apothem Testnet at the `0x6a48ff540812d56cDaAc822815ce009752d77754`, we can search for our newly deployed contract on [Apothem Block Explorer](https://explorer.apothem.network/):

<p align="center">
  <img src="https://user-images.githubusercontent.com/69668077/193407636-5f174d70-a542-46f1-99be-77c18d85a21f.png"
>
</p>

And click in the `Verify And Publish` Option. 

We will be redirected to the Contract verification page where we need to fill out:

- Contract Name: <em>MyToken</em>
- Compiler: <em> Check your</em> `truffle-config.js` <em>file for Compiler Version</em>
- Contract Code: <em> Just paste everything from your</em> `FarmToken.sol` <em>file</em> flatten code. Read detaild guide on here [for Flatten](https://www.xdc.dev/ivan_blocksscan/learn-how-to-flatten-a-smart-contract-and-verify-on-blocksscan-56on)

We need to add a plugin in vs code for our source code Flatten.

![dtg 10](https://user-images.githubusercontent.com/69668077/193407869-32a67e53-82ef-4bb8-8ea2-b0390ab9e14a.png)

![dtg 11](https://user-images.githubusercontent.com/69668077/193407874-1a239adc-5cd3-4f55-90c1-fe9aaf99d395.png)


Once everything is filled out, press Submit!

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/69668077/193415001-5f1099cd-4cc2-4003-bca3-cc798a15e50f.png"
>
</p>

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:


In this page you can Read from, Write to, or simply read the information tied to your Smart Contract on the blockchain:

![dtg 16](https://user-images.githubusercontent.com/69668077/193415102-96be88f2-6677-4313-ae05-d49b20d40584.png)


![dtg 17](https://user-images.githubusercontent.com/69668077/193415109-42d08451-ffd8-4235-96c3-382c894d11ee.png)


---

For more information about Truffle Suite, Please Visit [Truffle Suite Documentation](https://trufflesuite.com/docs/truffle/).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
Resources used during the deployment of the Pizza Smart Contract can be found at [The Pizza Contract Folder](./Pizza).





