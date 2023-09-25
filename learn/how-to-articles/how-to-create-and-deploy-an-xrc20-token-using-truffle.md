---
id: xrc20-token-truffle
title: XRC20 using Truffle
keywords:
  - docs
  - apothem
  - token
  - XRC20
  - truffle
description: Use Truffle to deploy an XRC20 Token.
---

# How To Create and Deploy an XRC20 Token Using Truffle

## 🧭 Table of contents

* [🧭 Table of contents](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-table-of-contents)
* [📰 Overview](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-overview)
  * [What you will learn](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#what-you-will-learn)
  * [What you will do](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#what-you-will-do)
  * [📰 About XRC20 Tokens](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-about-xrc20-tokens)
* [🚀 Setting up the development environment](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-setting-up-the-development-environment)
  * [⚒ Starting a new Truffle Project](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-starting-a-new-truffle-project)
  * [⚒ Configuring XDC Mainnet and Apothem Testnet on Truffle](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-configuring-xdc-mainnet-and-apothem-testnet-on-truffle)
  * [⚒ Adding Testnet XDC to Development Wallet](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-adding-testnet-xdc-to-development-wallet)
* [💵 Writing your first XRC20 Token](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-writing-our-first-xrc20-token)
  * [💵 Constants](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-constants)
  * [💵 Events](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-events)
  * [💵 Methods](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-methods)
  * [💵 Compiling and Deploying](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-compiling-and-deploying)
* [🔍 Veryfing Contracts on the Block Explorer](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-veryfing-contracts-on-the-block-explorer)
  * [🔍 Interacting with your contract on the Block Explorer](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-interacting-with-your-contract-on-the-block-explorer)

## 📰 Overview

[Truffle](https://trufflesuite.com/) is a blockchain development environment that you can use to create and test smart contracts by levering an Ethereum Virtual Machine.

#### What you will learn

In this tutorial, you will learn how to set up Truffle and use it to build, test, and deploy a XRC20 Token on both the XDC Network mainnet and XDC Apothem testnet.

#### What you will do

* Install and setup Truffle
* Create an XRC20 token
* Compile the XRC20 token
* Deploy the XRC20 token
* Interact with the XRC20 token
* Check the deployment status on [xinfin.network](https://xinfin.network/#stats)

### 📰 About XRC20 Tokens

XRC20 is a set of rules to standardize assets on the XDC network. Every XRC20 token must be able to execute the following methods:

* `totalSupply()`
* `balanceOf(address account)`
* `allowance(address owner, address spender)`
* `transfer(address recipient, uint amount)`
* `approve(address spender, uint amount)`
* `transferFrom(address sender, address recipient, uint amount)`

These are the minimum required methods that allow an asset on the XDC Network to be called an XRC20 token. An XRC20 token must be able to emit the following `Events` on the blockchain:

* `Approval(address indexed tokenOwner, address indexed spender, uint tokens)`
* `Transfer(address indexed from, address indexed to, uint tokens)`

Events are help with the process of indexing state changes, and they are essential to allowing off-chain applications to find relevant data on the blockchain. By mapping all `Transfer` events, for example, we can fetch all the historic data on token transfers more easily.

Several contract constants are public and very important to have:

* `name`
* `symbol`
* `decimals`

Without these public constants, it would be impossible to label tokens on block explorers, for example. In this tutorial, we will deploy a XRC20 token that have all the `Methods`, `Events` and `Constants` mentioned above.

## 🚀 Setting up the development environment

Here are several technical requirements before you get started. Please install the following:

* [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
* [Git](https://git-scm.com/)

Once you have installed those, you only need one command to install Truffle:

```bash
npm install -g truffle
```

To verify that Truffle is installed properly, type **`truffle version`** on a terminal. You should see something like:

```bash
Truffle v5.5.27 (core: 5.5.27)
Ganache v7.4.0
Solidity v0.5.16 (solc-js)
Node v16.16.0
Web3.js v1.7.4
```

If you see an error instead, make sure that your npm modules are added to your path.

### ⚒ Starting a new Truffle Project

Start by setting up our folder. As we are creating a project called `XRC20`, create a new `XRC20` folder by running on terminal:

```bash
mkdir XRC20 && cd XRC20
```

Next, run `truffle init`. If truffle is correctly installed on your local environment, you should see the following message:

```bash
Starting init...
================

> Copying project files to /home/your/path/to/XRC20

Init successful, sweet!

Try these scaffold commands to get started:
  $ truffle create contract YourContractName # scaffold a contract
  $ truffle create test YourTestName         # scaffold a test

http://trufflesuite.com/docs
```

Your folder files will look like this:

![Step 01](https://user-images.githubusercontent.com/78161484/190839624-495ef863-e177-4c62-81ca-680e5e6a4cab.png)

### ⚒ Configuring XDC Mainnet and Apothem Testnet on Truffle

In order to get started deploying new contracts on the XDC Mainnet and/or Apothem, we need to install two new dependencies that will be used in the `truffle-config.js` file. These dependencies are `@truffle/hdwallet-provider` and `dotenv`. First choose your preferred package manager. In this example we are using `yarn` but you can also use `npm`.

If you never used `yarn` before, you will likely need to install it first.\
‼️You can skip this step if you already have yarn installed‼️

```
npm install --global yarn
```

Initialize your package manager on your folder and install the required dependencies:

```
yarn init -y
yarn add @truffle/hdwallet-provider dotenv
```

You will also need a **24-Word Mnemonic Phrase**. To configure your wallet, create a new `.env` file and write your mnemonic by running:

```
touch .env
echo MNEMONIC=arm derive cupboard decade course garlic journey blast tribe describe curve obey >> .env
```

Remember to change the **24-Word Mnemonic** above for your own mnemonic. The contents of your `.env` file should read as follow:

```jsx
MNEMONIC=arm derive cupboard decade course garlic journey blast tribe describe curve obey
```

🚨 **Do not use the mnemonic in the example above in production or you can risk losing your assets and/or the ownership of your smart contracts!** 🚨

Finally, you can configure the `truffle-config.js` file for both Apothem and XinFin Networks by writting:

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

### ⚒ Adding Testnet XDC to Development Wallet

It is possible to list all XDC addresses bound to your mnemonic on truffle by accessing the truffle console:

```
truffle console --network xinfin
```

Once the truffle console CLI opens, you can run:

```
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

With this account, you can head to the [Apothem Faucet](https://faucet.apothem.network/) and claim some TXDC for development purposes:

![Step 02](https://user-images.githubusercontent.com/78161484/189952656-eb7793cc-7dee-4307-88fc-7c351a75cec7.png)

## 💵 Writing our first XRC20 Token

The source code for the XRC20 Token used in this tutorial is available here: [XRC20 Contract Folder](../../how-to/XRC20/Truffle/XRC20/contracts/MyToken.sol). But we will address all `Events`, `Methods` and `Constants` mentioned in the section [📰 About XRC20 Tokens](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-about-xrc20-tokens).

You can start by creating the `XRC20.sol` file:

```
touch ./contracts/XRC20.sol
```

Next, write the shell of our smart contract by writing:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token.
 */

contract XRC20Token {

}
```

### 💵 Constants

Inside your `contract XRC20Token`, you will need to instantiate `name`, `symbol` and `decimals` as public variables as well as a private `_totalSupply` that will be used on our `totalSupply()` method later on. You'll also have two mapping variables, `balances` and `allowances`, that are key/value variables that maps user balances and approved spending allowances to other users:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token.
 */

contract XRC20Token {

    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 private _totalSupply;
    
    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowances;
    
    // To be Continued ... 

}
```

### 💵 Events

As mentioned in [📰 About XRC20 Tokens](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-about-xrc20-tokens), events are very important part of a smart contract logic. Events have `indexed` variables that are variables that can be filtered by off-chain interfaces. You might be tempted to index all the variables tied to an on-chain event, however Solidity has a _maximum of 3 indexed variable_ limitation for events. You should write both `Approval` and `Transfer` events:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token.
 */

contract XRC20Token {

    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 private _totalSupply;
    
    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowances;
 
    // Notice we indexed only the ADDRESSES in Approval and Transfer since it 
    // would be not practical to filter transactions nor approvals by value.
    
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);
      
    // To be Continued ... 

}
```

### 💵 Methods

We need to create the six methods mentioned in [📰 About XRC20 Tokens](how-to-create-and-deploy-an-xrc20-token-using-truffle.md#-about-xrc20-tokens) (`totalSupply`, `balanceOf`, `allowance`, `transfer`, `approve` and `transferFrom`), as well as a `constructor` that is a function called only once when the contract is deployed. In the latter, we can attatch information such as the token name, decimals and/or initial token supply:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token.
 */

contract XRC20Token {

    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 private _totalSupply;
    
    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowances;
    
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);
      
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;

        _totalSupply += _initialSupply * 10 ** decimals;
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual returns (uint256) {
        return balances[account];
    }

    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return allowances[owner][spender];
    }

    function transfer(address recipient, uint amount) external returns (bool) {
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowances[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

}
```

Now you have implemented everything we needed to make our token compliant with the XRC20 standard. Of course there are more features we can implement to this contract, such as the [SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) library that replace naive mathematical operations for methods that will avoid `underflows` and `overflows`, and supply management methods such as `mint` and `burn`.

### 💵 Compiling and Deploying

We can compile our `MyToken.sol` by running:

```
truffle compile
```

If everything is correctly configured and there are no errors, you will see the following message on your console:

```
Compiling your contracts...
===========================
> Compiling ./contracts/MyToken.sol
> Artifacts written to /home/your/path/to/build/contracts
> Compiled successfully using:
   - solc: 0.8.16+commit.07a7930e.Emscripten.clang
```

Your folder should look like this:

![Step 03](https://user-images.githubusercontent.com/78161484/190875030-27137576-84b6-45a1-be1d-f52f55d6488f.png)

In order to deploy our newly compiled contract artifacts to the blockchain, you'll need to create a deployment script into the migrations folder:

```
touch ./migrations/1_token_migration.js
```

Next, write the following migration script to the `1_token_migration.js` file:

```jsx
const XRC20Token = artifacts.require("XRC20Token");

const NAME = "MyToken";
const SYMBOL = "MTK";
const DECIMALS = 18;
const INITIAL_SUPPLY = 1000;

module.exports = function (deployer) {
    deployer.deploy(XRC20Token, NAME, SYMBOL, DECIMALS, INITIAL_SUPPLY);
}
```

If the migration script have no errors, you can run the following command for deployment on the XDC mainnet:

```
truffle migrate --network xinfin
```

Or the following commard for deployment on the XDC Apothem Testnet:

```
truffle migrate --network apothem
```

In either case, you'll need to have enough funds to pay for gas fees on the address that is being used for development.

If the deployment is sucessful, the console will log the following message after migrations complete processing:

```
1_token_migration.js
====================

   Deploying 'XRC20Token'
   ----------------------
   > transaction hash:    0x5cc1de32af041ff64ec2a4cef503b31ac996ae56dc33338d473ba04775492136
   > Blocks: 2            Seconds: 5
   > contract address:    0x53bA8Cb12EaF09E6B0b671F39ac4798A6DA7d660
   > block number:        50472279
   > block timestamp:     1663446177
   > account:             0xA4e66f4Cc17752f331eaC6A20C00756156719519
   > balance:             24.511102145
   > gas used:            1121906 (0x111e72)
   > gas price:           0.25 gwei
   > value sent:          0 ETH
   > total cost:          0.0002804765 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:        0.0002804765 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.0002804765 ETH
```

## 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify yout contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

You can check the address that your contract is deployed to by running:

```
truffle networks
```

If you have a contract deployed, the console should log something like this:

```
Network: apothem (id: 51)
  No contracts deployed.

Network: xinfin (id: 50)
  XRC20Token: 0x53bA8Cb12EaF09E6B0b671F39ac4798A6DA7d660
```

In this example, we have a `XRC20Token` contract deployed on XDC Mainnet at the `0x53bA8Cb12EaF09E6B0b671F39ac4798A6DA7d660`. This address is in the Ethereum standard but we can simply swap the `0x` prefix for `xdc` and search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

![Verify 01](https://user-images.githubusercontent.com/78161484/190875518-828c0061-71de-42c2-b222-0b8427852d01.png)

And click in the `Verify And Publish` Option.

You will be redirected to the contract verification page where you have to fill out:

* Contract Name: _XRC20Token_
* Compiler: _Check your_ `truffle-config.js` _file for Compiler Version_
* Contract Code: _Just paste everything from your_ `MyToken.sol` _file_

Once everything is filled out, press Submit!

![Verify 02](https://user-images.githubusercontent.com/78161484/190875635-f6d3aa36-47b2-4b09-ad6a-fe6df3fb11f1.png)

If everything is correctly filled out, your contract page on the block explorer will display a new tab called `Contract`:

![Verify 03](https://user-images.githubusercontent.com/78161484/190875780-6223b4b0-fecc-4e79-83bc-c810c5b0351c.png)

### 🔍 Interacting with your contract on the Block Explorer

With your XDCPay wallet, it is possible to interact with verified smart sontracts on the [XinFin Network Block Explorer](https://explorer.xinfin.network/). You can read from, write to, or simply read the information tied to your smart contract on the blockchain.

Lets head to the `Contract` tab on the explorer. Choose `Write Contract` and click in `Connect to Web3` to connect your XDCPay wallet.

![Verify 04](https://user-images.githubusercontent.com/78161484/190876289-57de5994-809a-4307-b68d-6bb37e3601af.png)

You can try transfering `500 MTK` tokens that we have just created to a new wallet `xdc0431d52fe37f3839895018272dfa3ba189fce07e`. Lets fill out the `recipient` field with the new wallet address, and fill out the `amout` field with `500 * 10^18`. Remember that our token has 18 decimals, and when you write numbers with decimals to the blockchain you must to account for the decimals as the virtual machine does not understand floating numbers like we humans do:

![Verify 05](https://user-images.githubusercontent.com/78161484/190876402-32e800d4-b456-499d-8255-ba10aa35c0af.png)

After clicking `Write`, you need to confirm the transaction on the XDCPay wallet:

![Verify 05](https://user-images.githubusercontent.com/78161484/190876653-eb8e558b-2b09-4c0f-ad5f-a3d17a54bf30.png)

You can check your successful transaction on the [Block Explorer!](https://explorer.xinfin.network/txs/0xa365a7edea3af9ed22c6dffb2f24987f1941f21dbd4d9bbb13b11022439de96a#overview)



For more information about Truffle Suite, Please Visit [Truffle Suite Documentation](https://trufflesuite.com/docs/truffle/).\
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).\
Resources used during the deployment of the XRC20 Token can be found at [XRC20 Contract Folder](XRC20/).
