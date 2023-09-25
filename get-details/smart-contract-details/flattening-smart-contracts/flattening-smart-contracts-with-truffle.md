---
id: flatten-contract-truffle
title: Flatten a Smart Contract Using Truffle
keywords:
  - docs
  - apothem
  - token
  - flatten
  - truffle
description: Use Truffle to deploy and verify smart contract
---

# Flattening Smart Contracts with Truffle

## 🧭 Table of contents

* [🧭 Table of contents](flattening-smart-contracts-with-truffle.md#-table-of-contents)
* [📰 Overview](flattening-smart-contracts-with-truffle.md#-overview)
  * [What you will learn](flattening-smart-contracts-with-truffle.md#what-you-will-learn)
  * [What you will do](flattening-smart-contracts-with-truffle.md#what-you-will-do)
* [🚀 Setting up the development environment](flattening-smart-contracts-with-truffle.md#-setting-up-the-development-environment)
  * [⚒ Starting a new Truffle Project](flattening-smart-contracts-with-truffle.md#-starting-a-new-truffle-project)
  * [⚒ Configuring XDC Mainnet and Apothem Testnet on Truffle](flattening-smart-contracts-with-truffle.md#-configuring-xdc-mainnet-and-apothem-testnet-on-truffle)
  * [⚒ Adding Testnet XDC to Development Wallet](flattening-smart-contracts-with-truffle.md#-adding-testnet-xdc-to-development-wallet)
* [💵 Writing Smart Contract](flattening-smart-contracts-with-truffle.md#-writing-smart-contract)
  * [💵 Compiling and Testing](flattening-smart-contracts-with-truffle.md#-compiling-and-testing)
    * [Testing](flattening-smart-contracts-with-truffle.md#testing)
  * [💵 Deploying Contract](flattening-smart-contracts-with-truffle.md#-deploying-contract)
  * [💵 Flattening Contract](flattening-smart-contracts-with-truffle.md#-flattening-contract)
* [🔍 Veryfing Contracts on the Block Explorer](flattening-smart-contracts-with-truffle.md#-veryfing-contracts-on-the-block-explorer)

## 📰 Overview

[Truffle](https://trufflesuite.com/) is a blockchain development environment, which you can use to create and test smart contracts by levering an Ethereum Virtual Machine.

#### What you will learn

In this tutorial, you will learn how to set up Truffle and use it to build, test and deploy smart contract on both the XDC Network mainnet and XDC Apothem testnet and verify it on Block Explorer.

#### What you will do

* Install and set up Truffle
* Create a complex smart contract with dependencies (like OpenZeppelin)
* Compile the smart contract
* Test the smart contract
* Deploy the smart contract
* Flatten the smart contract
* Verify the smart contract

## 🚀 Setting up the development environment

There are a few technical requirements before we start. Please install the following:

* [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
* [Git](https://git-scm.com/)

Once we have those installed, we only need one command to install Truffle:

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

Lets start by setting up our folder, we are creating a project called `MyCounter`, create a new `MyCounter` folder by running on terminal

```bash
mkdir MyCounter && cd MyCounter
```

And running `truffle init`. If truffle is correctly installed on your local environment, you should see the following message:

```bash
Starting init...
================

> Copying project files to /home/your/path/to/MyCounter

Init successful, sweet!

Try our scaffold commands to get started:
  $ truffle create contract YourContractName # scaffold a contract
  $ truffle create test YourTestName         # scaffold a test

http://trufflesuite.com/docs
```

And your folder files will look like this:

![Step 01](https://user-images.githubusercontent.com/78161484/190839624-495ef863-e177-4c62-81ca-680e5e6a4cab.png)

### ⚒ Configuring XDC Mainnet and Apothem Testnet on Truffle

In order to get started deploying new contracts on XDC Mainnet and/or Apothem, we need to install two new dependencies that will be used in the `truffle-config.js` file. These dependencies are `@truffle/hdwallet-provider` and `dotenv`. First choose your preferred package manager. In this example we are using `yarn` but you can also use `npm`.

If you never used `yarn` before, you might need to install it first.\
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

With this account in hand, we can head to the [Apothem Faucet](https://faucet.apothem.network/) and claim some TXDC for development purposes:

![Step 02](https://user-images.githubusercontent.com/78161484/189952656-eb7793cc-7dee-4307-88fc-7c351a75cec7.png)

## 💵 Writing Smart Contract

We will be using OpenZeppelin for this guide so lets install it first:

```
yarn add @openzeppelin/contracts
```

or using `npm`

```
npm install @openzeppelin/contracts
```

Now lets create simple smart contract called `MyCounter.sol` in `contracts` folder:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract MyCounter {
    using Counters for Counters.Counter;
    Counters.Counter private _counter;

    function current() public view returns (uint256) {
        return _counter.current();
    }

    function increment() public returns (uint256) {
        _counter.increment();
        return _counter.current();
    }

    function decrement() public returns (uint256) {
        _counter.decrement();
        return _counter.current();
    }
}
```

### 💵 Compiling and Testing

We can compile our `MyCounter.sol` by running:

```
truffle compile
```

If everything is correctly configured and there is no errors, you should see the following message on your console:

```
Compiling your contracts...
===========================
> Compiling ./contracts/MyCounter.sol
> Compiling @openzeppelin/contracts/utils/Counters.sol
> Artifacts written to /home/your/path/to/build/contracts
> Compiled successfully using:
   - solc: 0.8.16+commit.07a7930e.Emscripten.clang
```

And your folder should look like this:

![Step 03](https://user-images.githubusercontent.com/78161484/190875030-27137576-84b6-45a1-be1d-f52f55d6488f.png)

#### Testing

Now lets create a simple test to see everything works as intended before we deploy our contract to live network. This will save us time and gas fees, so it is recommended you do as much as possible tests for your smart contracts before deploying.

Create file `MyCounter.js` under `test` directory:

```javascript
const MyCounter = artifacts.require("MyCounter");

contract("MyCounter", (accounts) => {
  it("should deploy MyCounter", async () => {
    const myCounterInstance = await MyCounter.deployed();
    const current = await myCounterInstance.current();

    assert.equal(current.valueOf(), 0, "0 is not the current count");
  });
  it("should increment and decrement MyCounter and show current count", async () => {
    const myCounterInstance = await MyCounter.deployed();

    await myCounterInstance.increment()
    await myCounterInstance.increment()
    await myCounterInstance.decrement()

    const current = await myCounterInstance.current();

    assert.equal(
      current.valueOf(),
      1,
      "1 is not the current count"
    );
  });
});
```

Then run

```
truffle test
```

Your output should look like this:

```
Contract: MyCounter
  ✔ should deploy MyCounter
  ✔ should increment and decrement MyCounter and show current count (131ms)

2 passing (197ms)
```

### 💵 Deploying Contract

In order to deploy our newly compiled contract artifacts to the blockchain, we need to create a deployment script into the migrations folder:

```
touch ./migrations/1_token_migration.js
```

And write the following migration script to the `1_token_migration.js` file:

```jsx
const MyCounter = artifacts.require("MyCounter");

module.exports = function (deployer) {
    deployer.deploy(MyCounter);
}
```

If the migration script have no errors, we can go ahead and run the command:

```
truffle migrate --network xinfin
```

For deployment on XDC mainet, or:

```
truffle migrate --network apothem
```

For deployment on the XDC Apothem Testnet. In either case, you need to have enough funds to pay for gas fees on the address that is being used for development.

If the deployment is sucessful, the console should log the following message after migrations complete processing:

```
1_counter_migration.js
======================

   Deploying 'MyCounter'
   ---------------------
   > transaction hash:    0x128fdda5a1897e373259bd0a614f4b72c6d1f397696a7df4ddc55a863fb75620
   > Blocks: 0            Seconds: 0
   > contract address:    0x11d73188a9976FB32B53FFD7040030e0667CeBFa
   > block number:        9
   > block timestamp:     1665052811
   > account:             0x7EF6aCFd4F0B8B6828Bf25D440Bf46f1Eb28c6A6
   > balance:             99.92708386
   > gas used:            164965 (0x28465)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0032993 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0032993 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.0032993 ETH
```

### 💵 Flattening Contract

If smart contract imports external files like our, we need to flatten it before verifying on Block Explorer.

For that, install `truffle-flattener`.

```bash
yarn add truffle-flattener -g
```

Or using `npm`

```bash
npm install truffle-flattener -g
```

Now lets flatten our contract:

```bash
truffle-flattener contracts/MyCounter.sol > MyCounterFlatten.sol
```

Then open `MyCounterFlatten.sol` and remove every line which starts with `// SPDX-License-Identifier` except the first one. We do this because Block Explorer does not accepts contracts with mutliple license definition.

## 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

First lets check the address our contract is deployed to by running:

```
truffle networks
```

If you have a contract already deployed, the console should log something like this:

```
Network: apothem (id: 51)
  No contracts deployed.

Network: xinfin (id: 50)
  MyCounter: 0x53bA8Cb12EaF09E6B0b671F39ac4798A6DA7d660
```

Here we have a `MyCounter` contract deployed on XDC Mainnet at the `0x53bA8Cb12EaF09E6B0b671F39ac4798A6DA7d660`. This address is in the Ethereum standard but we can simply swap the `0x` prefix for `xdc` and search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

![Verify 01](https://user-images.githubusercontent.com/78161484/190875518-828c0061-71de-42c2-b222-0b8427852d01.png)

And click in the `Verify And Publish` Option.

We will be redirected to the Contract verification page where we need to fill out:

* Contract Name: _MyCounter_
* Compiler: _Check your_ `truffle-config.js` _file for Compiler Version_
* Contract Code: _Just paste everything from your_ `MyCounterFlatten.sol` _file_

❕ Keep in mind that `Contract Code` should be `MyCounterFlatten.sol`, not `MyCounter.sol`. ❕

Once everything is filled out, press Submit!

![Verify 02](https://user-images.githubusercontent.com/78161484/190875635-f6d3aa36-47b2-4b09-ad6a-fe6df3fb11f1.png)

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

![Verify 03](https://user-images.githubusercontent.com/78161484/190875780-6223b4b0-fecc-4e79-83bc-c810c5b0351c.png)



For more information about Truffle Suite, Please Visit [Truffle Suite Documentation](https://trufflesuite.com/docs/truffle/).\
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.community/).\
Resources used during the deployment of the MyCounter can be found at [MyCounter Contract Folder](https://github.com/XDC-Community/docs/tree/main/how-to/SmartContract/Flatten/Truffle/example-flatten-smart-contract).
