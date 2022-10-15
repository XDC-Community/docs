---
id: introduction-to-truffle
title: Introduction to Truffle
description:  "What Truffle is, what it is used for, and how to use it for development on the XDC Network."
keywords:
  - docs
  - apothem
  - token
  - truffle
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
    - [What you will learn](#what-you-will-learn)
    - [What you will do](#what-you-will-do)
  - [📰 About Truffle](#-about-truffle)
    - [Why do you need development environment](#why-do-you-need-development-environment)
- [⚒ Create Truffle project](#-create-truffle-project)
  - [⚒ Truffle project structure](#-truffle-project-structure)
- [⚒ Truffle Config](#-truffle-config)
- [⚒ Truffle Commands](#-truffle-commands)
- [⚒ Truffle Boxes](#-truffle-boxes)
- [⚒ Using Truffle to develop on XDC](#-using-truffle-to-develop-on-xdc)
  - [⚒ Configuring XDC Mainnet and Apothem Testnet on Truffle](#-configuring-xdc-mainnet-and-apothem-testnet-on-truffle)

# 📰 Overview

<p align="center">
  <img width=20% src="https://trufflesuite.com/img/truffle-logo-light.svg" alt="truffle"/>
</p>

[Truffle](https://trufflesuite.com/truffle/) is a development environment to compile, deploy, test, and debug your Ethereum software.

### What you will learn
This article will teach you what Truffle is, what Truffle is used for, and how to use the features of Truffle for development on the XDC Network.

### What you will do
- Learn what Truffle is
- Learn how to create and configure Truffle project
- Explore Truffle commands
- Explore Truffle boxes

## 📰 About Truffle

Truffle is development environment which lets you compile and deploy smart contracts on Ethereum-like networks. Truffle has extensible tooling platform, solidity debugger, plugin ecosystem, Typescript support and more. It is one of the most popular development environments along with Remix and Truffle. 

### Why do you need development environment

Deploying smart contracts is a very complex task and can cost you a lot of money if you do it wrong, that's why you need to use development environment like Truffle. 

Truffle comes with lots of tools out of the box which make you life easier and increase your productivity as dApp developer. Truffle debugging and testing tools allow you to weed out bugs and vulnerabilities in your smart contract before deploying it to live network.

## ⚒ Create Truffle Project

### Installation of Truffle:

If truffle is not present on your system, you can use `npm` to install it.

```sh
npm install -g truffle
```

To create new Truffle simply run this command:

```bash
truffle init
```

This will create `truffle-config.js` as well as three folders: `contracts`, `migrations` and `test`.

## ⚒ Truffle project structure

Truffle project has the following folders:

- `build`: contains contract compilation artifacts
- `contracts`: folder for smart contract source code
- `migrations`: folder where migration files are stored. A migration is a script which manages deploying smart contracts
- `test`: place to store both Javascript and Solidity tests

## ⚒ Truffle Config

Truffle config is stored in `truffle-config.js`. Config defines which network and accounts Truffle will use, which version of compiler it will run and more.

Here is an example of Truffle config:

```javascript
module.exports = {
  networks: {
    xinfin: {
      provider: () => new HDWalletProvider(
        MNEMONIC,
        'https://erpc.xinfin.network'),
      network_id: 50,
    }
  },
  compilers: {
    solc: {
      version: "0.8.16",
    }
  },
};
```

- `networks`: list of blockchain networks you will use
    - `provider`: default web3 provider
- `compilers`: list of compiler configurations
    - `solc`: solidity compiler options
        - `settings`: compiler settings with the same schema as `settings` in [Solidity JSON input interface](https://docs.soliditylang.org/en/v0.7.4/using-the-compiler.html#input-description)

For the full documentation of `truffle-config.js` options visit [Truffle Configuration](https://trufflesuite.com/docs/truffle/reference/configuration).

## ⚒ Truffle commands

Truffle comes with a bunch of predefined commands which automate tasks like compiling, testing, deploying and so on.

Open truffle console:

```sh
truffle console
```

This will connect to development network, if one is defined in config.

```sh
truffle(development)>
```

Or you can use custom predefined network

```sh
truffle console --network apothem
```

```sh
truffle(apothem)>
```

Compile contracts:
```sh
truffle compile
```

```sh
Compiling your contracts...
===========================
> Compiling ./contracts/Hello.sol
> Artifacts written to /your/project/path/build/contracts
> Compiled successfully using:
   - solc: 0.8.16+commit.07a7930e.Emscripten.clang
```

Running tests:
```
truffle test
```

```
  Contract: Hello
    ✔ should deploy Hello contract and call `hello` (54ms)


  1 passing (74ms)
```

Run migration script:
```
truffle migrate
```

Add `--network` parameter to deploy on specific network
```
truffle migrate --network apothem
```

To see addresses for all deployed contracts on each network, run:
```
truffle networks
```

```
Network: apothem (id: 51)
  No contracts deployed.

Network: xinfin (id: 50)
  No contracts deployed.
```
You can explore more built-in tasks  by running:

```
truffle help
```

Or get full information on a specific task by running

```
truffle help commandName
```

## ⚒ Truffle Boxes

Frameworks like truffle require writing lots of boilerplate code. Each new project need `truffle-config.js`, migration files, tests and more.
To avoid writing this boilerplate code each time, Truffle provides **boxes** - a simple way to reuse already existing code.

To create new project using truffle boxes, simply run this in new folder:
```sh
truffle unbox react
```

Then it will take few minutes to initialize the project. This project has two main folders `client` and `truffle`. 

`truffle` folders comes with lots of boilerplate code for contracts, testing and migrating.
```sh
contracts:
SimpleStorage.sol

migrations:
1_deploy_simple_storage.js

scripts:
increment.js

test:
simplestorage.js  SimpleStorageTest.sol
```

Most popular boxes are:
  - `react-box`: provides basic scaffolding for dApp project
  - `drizzle-box`: provides everything you need to start developing react app with Drizzle, a popular dApp library
  - `pet-shop-box`: provides code for a Truffle tutorial

You can explore the full list of Truffle boxes [here](https://github.com/truffle-box?q=&type=all&language=&sort=stargazers) or on official [Truffle box page](https://truffle-box.github.io/).

## ⚒ Using Truffle to develop on XDC

Truffle development experience on XDC is mostly indistinguishable from any other Ethereum-like network, but there are still some things you need to learn before starting developing on XDC.

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
  compilers: {
    solc: {
      version: "0.8.16",
    }
  },
};
```

---

For more information about Truffle, Please Visit [Truffle Documentation](https://trufflesuite.com/truffle/).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
