# How to Migrate a dApp from Ethereum to the XDC Network Using Truffle

## 🧭 Table of contents

* [🧭 Table of contents](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#-table-of-contents)
* [📰 Overview](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#-overview)
  * [What you will learn](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#what-you-will-learn)
  * [What you will do](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#what-you-will-do)
* [🚀 Setting up the development environment](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#-setting-up-the-development-environment)
  * [⚒ Starting a new Truffle Project](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#-starting-a-new-truffle-project)
* [📝 Writing your first Smart Contract](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#-writing-our-first-smart-contract)
  * [🍕 Compiling](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#-compiling)
  * [Creating a .env file](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#creating-a-env-file)
  * [🔀 Migrating from Ethereum to XDC network](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#-migrating-from-ethereum-to-xdc-network)
  * [🍕 Deploying](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#-deploying)
  * [🍕 Interacting with your contract using Truffle Console](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#-interacting-with-your-contract-using-truffle-console)
* [🔍 Veryfing Contracts on the Block Explorer](how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle.md#-veryfing-contracts-on-the-block-explorer)

## 📰 Overview

[Truffle](https://trufflesuite.com/) is a blockchain development environment, which you can use to create and test smart contracts by leveraging an Ethereum Virtual Machine.

dApps use truffle and hardhat to work with decentralized networks like Ethereum and XDC.

#### What you will learn

This guide aims at teaching on how to migrate a dApp from ethereum to the XDC network using truffle.

#### What you will do

* Install and set up Truffle
* Create a Truffle project
* Write a smart contract
* Compile and migrate the smart contract from the Ethereum Network to the XDC Network
* Check the deployment status on [xinfin.network](https://xinfin.network/#stats).

## 🚀 Setting up the development environment

There are a few technical requirements before you start. Please install the following:

* [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
* [Git](https://git-scm.com/)

Once you have those installed, you only need one command to install Truffle:

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

Start by setting up your folder. As we are creating a project called `Pizza`, create a new `Pizza` folder by running this on terminal:

```bash
mkdir Pizza && cd Pizza
```

Next, you have to run `truffle init`. If truffle is correctly installed on your local environment, you should see the following message:

```bash
Starting init...
================

> Copying project files to /home/your/path/to/Pizza

Init successful. Sweet!

Try our scaffold commands to get started:
  $ truffle create contract YourContractName # scaffold a contract
  $ truffle create test YourTestName         # scaffold a test

http://trufflesuite.com/docs
```

And your folder files will look like this:

![Screenshot 2022-09-29 at 1 01 13 PM](https://user-images.githubusercontent.com/35517007/192987763-26cd7979-0e21-4804-b3c3-75ba66a8e1b0.png)

## 📝 Writing our first Smart Contract

Lets create a simple `Pizza.sol` in the `contracts folder`. The Pizza contract should have:

* a `constructor` where the deployer can define the pizza size,
* a `eatSlice` method to consume slices available,
* a `bakeNewPizza` method to refill all slices only if the previous pizza have been entirely eaten! 😋

Write the following code to `Pizza.sol`:

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

### 🍕 Compiling

Now try compiling the `Pizza.sol` contract by running:

```
truffle compile
```

If everything is correctly configured and there are no errors, you should see the following message on your console:

```
Compiling your contracts...
===========================
> Compiling ./contracts/Pizza.sol
> Artifacts written to /home/your/path/to/Pizza/build/contracts
> Compiled successfully using:
   - solc: 0.8.16+commit.07a7930e.Emscripten.clang
```

Your folder should look like this:

![Screenshot 2022-09-29 at 1 03 39 PM](https://user-images.githubusercontent.com/35517007/192988098-11f5f626-6623-421b-8e9d-255c2cd3b3f5.png)

> If you see an error while compiling on a Mac, you can use `sudo truffle compile`

In order to get started deploying new contracts on XDC Mainnet and/or Apothem(testnet), you need to install two new dependencies that will be used in the `truffle-config.js` file. These dependencies are `@truffle/hdwallet-provider` and `dotenv`. First choose your preferred package manager. In this example, you can use either `npm` or `yarn`.

If you never used `yarn` before, you might need to install it first. ‼️You can skip this step if you already have yarn installed‼️.

```
npm install --global yarn
```

### Creating a .env file

Initialize your package manager on your folder and install the required dependencies through your terminal:

```
npm init -y
npm add @truffle/hdwallet-provider dotenv
```

You will also need a **24-Word Mnemonic Phrase**. To configure your wallet, create a new `.env` file in the 'root' of your project and write your mnemonic in there:

Remember to change the **24-Word Mnemonic** above to your own mnemonic. The contents of your `.env` file should read as follow:

```jsx
MNEMONIC=arm derive cupboard decade course garlic journey blast tribe describe curve obey
```

🚨 **Do not use the mnemonic in the example above in production or you can risk losing your assets and/or the ownership of your smart contracts!** 🚨

### 🔀 Migrating from Ethereum to XDC network

For this step we need to change the `truffle-config.js` file.

Your file for ethereum would look like this:

```jsx
require("dotenv").config();
const { MNEMONIC } = process.env;
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    goerli: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          "https://eth-goerli.g.alchemy.com/v2/fL62vBm-USylE5oCgKWohkTG5ppo7MJE"
        ),
      network_id: 5,
      gasLimit: 67219,
      confirmation: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 2000,
    },
  },
  // add your XDC network here....
  mocha: {},

  compilers: {
    solc: {
      version: "0.8.16",
    },
  },
};
```

To migrate it to XDC network, you'll need to add a network for XDC Network Mainnet and XDC testnet(apothem)

```jsx
require("dotenv").config();
const { MNEMONIC } = process.env;
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    goerli: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          "https://eth-goerli.g.alchemy.com/v2/fL62vBm-USylE5oCgKWohkTG5ppo7MJE"
        ),
      network_id: 5,
      gasLimit: 67219,
      confirmation: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 2000,
    },
    xinfin: {
      provider: () =>
        new HDWalletProvider(MNEMONIC, "https://erpc.xinfin.network"),
      network_id: 50,
      gasLimit: 6721975,
      confirmation: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 2000,
    },

    apothem: {
      provider: () =>
        new HDWalletProvider(MNEMONIC, "https://erpc.apothem.network"),
      network_id: 51,
      gasLimit: 6721975,
      confirmation: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 2000,
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.16",
    },
  },
};
```

### 🍕 Deploying

In order to deploy our newly compiled contract artifacts to the blockchain, you'll have to create a deployment script in the migrations folder.

Create a file `1_pizza_migration.js` in the migrations folder and write the following migration script:

```jsx
const Pizza = artifacts.require("Pizza");

// Constructor variables can be declared here
const SLICES = 8;

module.exports = function (deployer) {
  deployer.deploy(Pizza, [SLICES]);
};
```

If the migration script have no errors, we can go ahead and run the command.

> Make sure you change the network name from 'goerli' to 'xinfin' for the following command.

For deployment on XDC testnet:

```
truffle migrate --network xinfin
```

For deployment on XDC testnet:

```
truffle migrate --network apothem
```

For deployment on the XDC Apothem Testnet. In either case, you need to have enough funds to pay for gas fees on the address that is being used for development.

If the deployment is sucessful, the console should log the following message after migrations complete processing:

```
1_pizza_migration.js
====================

   Deploying 'Pizza'
   -----------------
   > transaction hash:    0x62cb1e534ae20bf1df1ca04c37ef5567f52c4e9a55f9f14ffd7c068b48abf721
   > Blocks: 7            Seconds: 14
   > contract address:    0x4FA229354CdF9c49FD2752e3869150C24c6A80c7
   > block number:        50962365
   > block timestamp:     1664437464
   > account:             0xA4e66f4Cc17752f331eaC6A20C00756156719519
   > balance:             23.5083477565
   > gas used:            352546 (0x56122)
   > gas price:           0.25 gwei
   > value sent:          0 ETH
   > total cost:          0.0000881365 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:        0.0000881365 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.0000881365 ETH
```

### 🍕 Interacting with your contract using Truffle Console

The `truffle console` CLI is another amazing tool that allows us to try out our contracts straight from our development environment.

To start interacting with you smart contracts you can start running:

```
truffle console --network xinfin
```

Once the console opens, we can instantiate our `Pizza` contract by running:

```jsx
truffle(xinfin)> let instance = await Pizza.deployed()
// It should log: undefined
```

We can check if this `instance` points to our deployment on chain by writing:

```jsx
truffle(xinfin) > instance.address;
// It should log: '0x4FA229354CdF9c49FD2752e3869150C24c6A80c7'
```

Or simply run our `eatSlice()` method:

```jsx
truffle(xinfin) > instance.eatSlice();
```

It should log a transaction confirmation (Or rejection) object like the following:

```
{
  tx: '0x27ee33417f2f471bda1beaaaff57c5c71ce3edcbacec99de677b04e0863a0f29',
  receipt: {
    blockHash: '0xf2d69523254d8e2b45175ecd8acc1aba8d468f586db994f92c07b9d079afa10f',
    blockNumber: 50962423,
    contractAddress: null,
    cumulativeGasUsed: 79757,
    from: '0xa4e66f4cc17752f331eac6a20c00756156719519',
    gasUsed: 28232,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    to: '0x4fa229354cdf9c49fd2752e3869150c24c6a80c7',
    transactionHash: '0x27ee33417f2f471bda1beaaaff57c5c71ce3edcbacec99de677b04e0863a0f29',
    transactionIndex: 2,
    rawLogs: []
  },
  logs: []
}
```

This transaction is immediately reflected in the corresponding block explorer, [as seen here!](https://explorer.xinfin.network/txs/0x27ee33417f2f471bda1beaaaff57c5c71ce3edcbacec99de677b04e0863a0f29#overview)

## 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, may find it interesting to verify your contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

First lets check the address our contract is deployed to by running:

```
truffle networks
```

If you have a contract already deployed, the console should log something like this:

```
Network: apothem (id: 51)
  No contracts deployed.

Network: xinfin (id: 50)
  Pizza: 0x4FA229354CdF9c49FD2752e3869150C24c6A80c7
```

There is a `Pizza` contract deployed on XDC Mainnet at the `0x4FA229354CdF9c49FD2752e3869150C24c6A80c7`. You can search for this newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

![Screenshot 2022-09-29 at 1 23 00 PM](https://user-images.githubusercontent.com/35517007/192988503-29ea1b20-fd9d-4ca7-beb8-0f79d65b9678.png)

Click in the `Verify And Publish` Option.

We will be redirected to the Contract verification page where we need to fill out:

* Contract Name: _Pizza_
* Compiler: _Check your_ `truffle-config.js` _file for Compiler Version_
* Contract Code: _Just paste everything from your_ `Pizza.sol` _file_

Once everything is filled out, press Submit!

![Screenshot 2022-09-29 at 1 23 14 PM](https://user-images.githubusercontent.com/35517007/192988653-f5987b54-df83-4464-a96a-2d71e2002905.png)

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

![Screenshot 2022-09-29 at 1 23 24 PM](https://user-images.githubusercontent.com/35517007/192988808-72505e63-7810-402d-a61f-cf59defb15e3.png)

In this page you can read from, write to, or simply read the information tied to your smart contract on the blockchain:

![Screenshot 2022-09-29 at 1 23 40 PM](https://user-images.githubusercontent.com/35517007/192988899-eb41c2ae-c4b9-4bab-89e8-227d42bfe2b3.png)

***

For more information about Truffle Suite, Please Visit [Truffle Suite Documentation](https://trufflesuite.com/docs/truffle/).\
For more information about XDC Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.community/).\
Resources used during the deployment of the Pizza Smart Contract can be found at [The Pizza Contract Folder](https://github.com/XDC-Community/docs/tree/main/how-to/Pizza).
