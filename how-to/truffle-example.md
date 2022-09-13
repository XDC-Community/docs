---
id: truffle-example
title: Using Truffle Example
description:  "Use Truffle to deploy a Smart Contract."
keywords:
  - docs
  - apothem
  - smart
  - contract
  - truffle
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
- [🚀 Setting up the development environment](#-setting-up-the-development-environment)
  - [⚒️ Starting a new Truffle Project](#-starting-a-new-truffle-project)
  - [⚒️ Configuring Apothem Network on Truffle](#-configuring-apothem-network-on-truffle)
  - [⚒️ Adding Testnet XDC to Development Wallet](#-adding-testnet-xdc-to-development-wallet)
- [🍕 Writing our first Smart Contract](#-writing-our-first-smart-contract)
  - [🍕 Compiling](#-compiling)
  - [🍕 Deploying](#-deploying)

# 📰 Overview
[Truffle](https://trufflesuite.com/) is a blockchain development environment, which you can use to create and test smart contracts by levering an Ethereum Virtual Machine.

### What you will learn
This guide aims at teaching how to create a smart contract using Truffle and deploying it on XDC Network.

### What you will do
- Install and set up Truffle
- Deploy contract on Matic Network
- Check the deployment status on Polygonscan.

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

And running the `truffle init`. If truffle is correctly installed on your local environment, you should see the following message:

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

## ⚒ Configuring Apothem Network on Truffle

In order to get started deploying new contracts on Apothem, we need to install two new dependencies that will be used in the `truffle-config.js` file. These dependencies are `@truffle/hdwallet-provider` and `dotenv`. First choose your preferred package manager, in this example we are using `yarn` but you can also use `npm`.

 If you never used `yarn` before, you might need to install it first. ‼️You can skip this step if you already have yarn installed‼️.

```sh
npm install --global yarn
```

Initialize your package manager on your folder and install the required dependencies:

```sh
yarn init -y
yarn add @truffle/hdwallet-provider dotenv
```

To get started deploying smart contracts to Apothem Network you will also need a **24-Word Mnemonic Phrase**. To configure your wallet, create a new `.env` file and write your mnemonic, you can run:

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
truffle console --network apothem
```

Once the truffle console CLI opens, you can run:

```sh
truffle(apothem)> accounts
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

These accounts are on the Ethereum standard format starting with `0x`, but we can simply switch `0x` for `xdc` and we have our main deployment account `xdcA4e66f4Cc17752f331eaC6A20C00756156719519`.

With this account in hand, we can head to the [Apothem Faucet](https://faucet.apothem.network/) and claim some TXDC for development purposes:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/189952656-eb7793cc-7dee-4307-88fc-7c351a75cec7.png" alt="Step 02"/>
</p>

# 🍕 Writing our first Smart Contract

Lets create a simple `Pizza.sol` contract on Solidity, the Pizza contract should have a `constructor` where the deployer can define the pizza size, a `eatSlice` method to consume slices available and a `bakeNewPizza` to refill all slices only if the previous pizza have been entirely eaten! 😋

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

    function eatPizza() external {
        require(slices > 1, "No Slices Left. Lets Bake a new Pizza!");
        slices -= 1;
    }

    function bakeNewPizza() external {
        require(slices == 0, "There still slices from a previous Pizza!");
        slices += PIZZA_SIZE;
    }
}
```

## 🍕 Compiling
## 🍕 Deploying
