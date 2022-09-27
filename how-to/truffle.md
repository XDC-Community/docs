---
id: truffle-example
title: Using Truffle Example
description:  "Use Truffle to deploy a Smart Contract."
keywords:
  - docs
  - Apothem
  - smart
  - contract
  - truffle
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
- [🚀 Setting up the development environment](#-setting-up-the-development-environment)
  - [⚒️ Starting a new Truffle Project](#-starting-a-new-truffle-project)
  - [⚒️ Configuring XDC Mainnet and Apothem Testnet on Truffle](#-configuring-xdc-mainnet-and-apothem-testnet-on-truffle)
  - [⚒️ Adding Testnet XDC to Development Wallet](#-adding-testnet-xdc-to-development-wallet)
- [🍕 Writing our first Smart Contract](#-writing-our-first-smart-contract)
  - [🍕 Compiling](#-compiling)
  - [🍕 Deploying](#-deploying)
  - [🍕 Interacting with your contract using Truffle Console](#-interacting-with-your-contract-using-truffle-console)
- [🔍 Veryfing Contracts on the Block Explorer](#-veryfing-contracts-on-the-block-explorer)

# 📰 Overview
[Truffle](https://trufflesuite.com/) is a blockchain development environment, which you can use to create and test smart contracts by levering an Ethereum Virtual Machine.

### What you will learn
This guide aims at teaching how to create a smart contract using Truffle and deploying it on XDC Network.

### What you will do
- Install and set up Truffle
- Deploy contract on XDC Network
- Check the deployment status on [xinfin.network](https://xinfin.network/#stats).

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

Lets start by setting up our folder, we are creating a project called `Pizza`, create a new `Pizza` folder by running on terminal

```bash
mkdir Pizza && cd Pizza
```

And running `truffle init`. If truffle is correctly installed on your local environment, you should see the following message:

```bash
Starting init...
================

> Copying project files to /home/your/path/to/Pizza

Init successful, sweet!

Try our scaffold commands to get started:
  $ truffle create contract YourContractName # scaffold a contract
  $ truffle create test YourTestName         # scaffold a test

http://trufflesuite.com/docs
```

And your folder files will look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/189928139-f8448866-b691-486c-a300-2b7dd21f10c1.png" alt="Step 01"/>
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

# 🍕 Writing our first Smart Contract

Lets create a simple `Pizza.sol` contract on Solidity, the Pizza contract should have:

 - a `constructor` where the deployer can define the pizza size, 
 - a `eatSlice` method to consume slices available, 
 - a `bakeNewPizza` method to refill all slices only if the previous pizza have been entirely eaten! 😋

Lets start by creating the `Pizza.sol` file:

```sh
touch ./contracts/Pizza.sol
```

And write the following code to `Pizza.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract Pizza {
    uint256 public PIZZA_SIZE;
    uint256 public slices;

    constructor(uint256 _pizzaSize) {
        PIZZA_SIZE = _pizzaSize;
        slices = 0;
        slices += PIZZA_SIZE;
    }

    function eatSlice() public {
        require(slices > 0, "No Slices Left. Lets Bake a new Pizza!");
        slices -= 1;
    }

    function bakeNewPizza() public {
        require(slices == 0, "There still slices from a previous Pizza!");
        slices += PIZZA_SIZE;
    }
}
```

## 🍕 Compiling

Lets try compiling the `Pizza.sol` contract by running:

```sh
truffle compile
```

If everything is correctly configured and there is no errors, you should see the following message on your console:

```sh
Compiling your contracts...
===========================
> Compiling ./contracts/Pizza.sol
> Artifacts written to /home/your/path/to/Pizza/build/contracts
> Compiled successfully using:
   - solc: 0.8.16+commit.07a7930e.Emscripten.clang
```

And your folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/189987467-d1dc7cb8-623b-4e94-a4fa-f8732f46426d.png" alt="Step 03"/>
</p>

## 🍕 Deploying

In order to deploy our newly compiled contract artifacts to the blockchain, we need to create a deployment script into the migrations folder.

```sh
touch ./migrations/1_pizza_migration.js
```

And write the following migration script:

```jsx
const Pizza = artifacts.require("Pizza");

// Constructor variables can be declared here
const SLICES = 8;  

module.exports = function (deployer) {
    deployer.deploy(Pizza, [SLICES]);
}
```

If the migration script have no errors, we can go ahead and run the command.

```sh
truffle migrate --network xinfin
```

For deployment on XDC mainet, or:

```sh
truffle migrate --network apothem
```

For deployment on the XDC Apothem Testnet. In either case, you need to have enough funds to pay for gas fees on the address that is being used for development.

If the deployment is sucessful, the console should log the following message after migrations complete processing:

```sh
1_pizza_migration.js
====================

   Deploying 'Pizza'
   -----------------
   > transaction hash:    0xc523d2fd7ccb9fec01b25d194a7a0edebaf6f9456c649038a7c447df0c09ba47
   > Blocks: 4            Seconds: 9
   > contract address:    0x8C998fa3d75b8c87253D1C97f5dE9BaaBfbbde3e
   > block number:        50305350
   > block timestamp:     1663109646
   > account:             0xA4e66f4Cc17752f331eaC6A20C00756156719519
   > balance:             1124.5120119465
   > gas used:            352214 (0x55fd6)
   > gas price:           0.25 gwei
   > value sent:          0 ETH
   > total cost:          0.0000880535 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:        0.0000880535 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.0000880535 ETH
```

## 🍕 Interacting with your contract using Truffle Console

Another amazing tool that allow us to try out our contracts straight from our development environment is the `truffle console` CLI.

To start interacting with you smart contracts you can start running:

```sh
truffle console --network xinfin
```

Once the console opens, we can instantiate our `Pizza` contract by running:

```jsx
truffle(xinfin)> let instance = await Pizza.deployed() 
// It should log: undefined
```

We can check if this `instance` points to our deployment on chain by writing:

```jsx
truffle(xinfin)> instance.address
// It should log: '0xF899E5C79ccfa144fc76261Ad9A9F0300708FF24'
```

Or simply run our `eatSlice()` method:

```jsx
truffle(xinfin)> instance.eatSlice()
```

It should log a transaction confirmation (Or rejection) object like the following:

```sh
{
  tx: '0x0153f15932d79ad7ac0b26df299defa1b55aded33284928b3e441d9fea5c3de7',
  receipt: {
    blockHash: '0x55c565b34efa5403a18ae7793286458347e2e92c154c0f56cdb9cc89d573921b',
    blockNumber: 50307378,
    contractAddress: null,
    cumulativeGasUsed: 28232,
    from: '0xa4e66f4cc17752f331eac6a20c00756156719519',
    gasUsed: 28232,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    to: '0xf899e5c79ccfa144fc76261ad9a9f0300708ff24',
    transactionHash: '0x0153f15932d79ad7ac0b26df299defa1b55aded33284928b3e441d9fea5c3de7',
    transactionIndex: 1,
    rawLogs: []
  },
  logs: []
}
```

This transaction is immediately reflected in the corresponding block explorer, [as seen here!](https://explorer.xinfin.network/txs/0x0153f15932d79ad7ac0b26df299defa1b55aded33284928b3e441d9fea5c3de7)

# 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

First lets check the address our contract is deployed to by running:

```sh
truffle networks
```

If you have a contract already deployed, the console should log something like this:

```sh
Network: apothem (id: 51)
  No contracts deployed.

Network: xinfin (id: 50)
  Pizza: 0xF899E5C79ccfa144fc76261Ad9A9F0300708FF24
```

Here we have a `Pizza` contract deployed on XDC Mainnet at the `0xF899E5C79ccfa144fc76261Ad9A9F0300708FF24`, we can search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190028078-ebc0f083-28a5-4772-88c1-ef49e91681fa.png" alt="Verify 01"/>
</p>

And click in the `Verify And Publish` Option. 

We will be redirected to the Contract verification page where we need to fill out:

- Contract Name: <em>Pizza</em>
- Compiler: <em> Check your</em> `truffle-config.js` <em>file for Compiler Version</em>
- Contract Code: <em> Just paste everything from your</em> `Pizza.sol` <em>file</em>

Once everything is filled out, press Submit!

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190028508-003c942d-685a-4d14-9d93-264e7ff4a0b5.png" alt="Verify 02"/>
</p>

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190029029-2547af3f-d32c-48d6-a785-e47b1f7a91c5.png" alt="Verify 03"/>
</p>

In this page you can Read from, Write to, or simply read the information tied to your Smart Contract on the blockchain:

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190030842-4ab30b85-f87b-43d1-a8b2-8d089abb1a34.png" alt="Verify 03"/>
</p>


---

For more information about Truffle Suite, Please Visit [Truffle Suite Documentation](https://trufflesuite.com/docs/truffle/).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
Resources used during the deployment of the Pizza Smart Contract can be found at [The Pizza Contract Folder](./Pizza).






