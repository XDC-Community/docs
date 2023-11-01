---
id: introduction-to-hardhat
title: Introduction to Hardhat
keywords:
  - docs
  - apothem
  - token
  - hardhat
description: >-
  What Hardhat is, what it is used for, and how to use it for development on the
  XDC Network.
---

# Hardhat

## 🧭 Table of contents

* [🧭 Table of contents](hardhat.md#-table-of-contents)
* [📰 Overview](hardhat.md#-overview)
  * [What you will learn](hardhat.md#what-you-will-learn)
  * [What you will do](hardhat.md#what-you-will-do)
  * [📰 About Hardhat](hardhat.md#-about-hardhat)
    * [Why do you need development environment](hardhat.md#why-do-you-need-development-environment)
* [⚒ Create Hardhat project](hardhat.md#-create-hardhat-project)
  * [⚒ Hardhat folder structure](hardhat.md#-hardhat-folder-structure)
* [⚒ Hardhat Config](hardhat.md#-hardhat-config)
* [⚒ Hardhat Tasks](hardhat.md#-hardhat-tasks)
* [⚒ Hardhat Debugger](hardhat.md#-hardhat-debugger)
* [⚒ Hardhat Plugins](hardhat.md#-hardhat-plugins)
* [⚒ Using Hardhat to develop on XDC](hardhat.md#-using-hardhat-to-develop-on-xdc)
  * [⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat](hardhat.md#-configuring-xdc-mainnet-and-apothem-testnet-on-hardhat)

## 📰 Overview

![hardhat](https://raw.githubusercontent.com/menezesphill/application\_utils/main/hardhaticon.png)

[Hardhat](https://hardhat.org/) is a development environment to compile, deploy, test, and debug your Ethereum software. Get Solidity stack traces & console.log.

#### What you will learn

This article will teach you what Hardhat is, what Hardhat is used for, and how to use the features of Hardhat for development on the XDC Network.

#### What you will do

* What Hardhat is
* How to create and configure Hardhat project
* Overview of Hardhat tasks
* Hardhat plugins

### 📰 About Hardhat

Hardhat is development which lets you compile and deploy smart contracts on Eethereum-like networks. Hardhat has extensible tooling platform, solidity debugger, plugin ecosystem, Typescript support and more. It is one of the most popular development environments along with Remix and Truffle.

#### Why do you need development environment

Deploying smart contracts is a very complex task and can cost you a lot of money if you do it wrong, that's why you need to use development environment like Hardhat.

Hardhat comes with lots of tools out of the box which make you life easier and increase your productivity as dApp developer. Hardhat debugging and testing tools allow you to weed out bugs and vulnerabilities in your smart contract before deploying it to live network.

### ⚒ Create Hardhat Project

To create new Hardhat run this command:

```bash
npx hardhat
```

Hardhat gives your three options how to initialize your project:

```
 What do you want to do? … 
▸ Create a JavaScript project
  Create a TypeScript project
  Create an empty hardhat.config.js
```

You can choose to create Javascript or Typescript project, which will create `hardhat.config.js` and `contracts`, `scripts`, `test` with some example files. Or you can just create empty `hardhat.config.js` file and do everything by yourself.

### ⚒ Hardhat folder structure

Hardhat has the following folders:

* `artifacts`: place where smart contract compilation artifacts are stored
* `cache`: folder used for caching internal data
* `contracts`: folder for smart contract source code
* `scripts`: folder where scripts which interact with Hardhat Runtime Environment are stored including script for deploying your smart contracts
* `test`: place to store tests

### ⚒ Hardhat Config

Hardhat config is stored in `hardhat.config.js`. Config defines which network and accounts hardhat will use, which version of compiler it will run, can be used to configure custom folder structure or configure tests.

Here is an example of hardhat config:

```javascript
module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
      accounts: [privateKey1, privateKey2, ...]
    }
  },
  solidity: {
    version: "0.5.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
```

* `defaultNetwork`: network which is used by default when you run hardhat
* `networks`: list of blockchain networks you will use
  * `url`: JSON-RPC url of network
  * `accounts`: list of accounts you will use to interact with network
* `solidity`: solidity compiler configuration
  * `version`: compiler version
  * `settings`: compiler settings with the same schema as `settings` in [Solidity JSON input interface](https://docs.soliditylang.org/en/v0.7.4/using-the-compiler.html#input-description)

You can read more about Hardhat configuration here: [Hardhat Configuration](https://hardhat.org/hardhat-runner/docs/config).

### ⚒ Hardhat Tasks

Hardhat task is a command that automates things like deploying, compiling, testing and more. Hardhat comes with some tasks out of box, but you can always define your own tasks using the same Hardhat API.

Open hardhat console:

```
npx hardhat console
```

```
Welcome to Node.js v16.11.1.
Type ".help" for more information.
> 
```

Compile contracts:

```
npx hardhat compile
```

```
Compiled 1 Solidity file successfully
```

Running tests:

```
npx hardhat test
```

```
  Lock
    Deployment
      ✔ Should set the right unlockTime (730ms)
      ✔ Should set the right owner
      ✔ Should receive and store the funds to lock
      ✔ Should fail if the unlockTime is not in the future
    Withdrawals
      Validations
        ✔ Should revert with the right error if called too soon
        ✔ Should revert with the right error if called from another account
        ✔ Shouldn't fail if the unlockTime has arrived and the owner calls it
      Events
        ✔ Should emit an event on withdrawals
      Transfers
        ✔ Should transfer the funds to the owner


  9 passing (927ms)
```

Running scripts (for example deploying):

```
npx hardhat run scripts/scriptName.js --network yourNetwork
```

Clears `cache` and deletes all `articats`:

```
npx hardhat clean
```

To flatten your smart contract in case it uses imports:

```
npx hardhat flatten > Contract_flat.sol
```

You can explore more built-in tasks by running:

```
npx hardhat help
```

Or get full information on a specific task by running

```
npx hardhat help taskName
```

### ⚒ Hardhat Debugger

You can print messages when testing you smart contract by using `console.log()`.

To do this, import `hardhat/console.sol` in your project:

```solidity
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Token {
  //...
}
```

And then add `console.log` anywhere in your code:

```solidity
    ...
    function hello() public {
        console.log('hello');
    }
    ...
```

Now you can add:

```javascript
await myContract.hello();
```

somewhere in your `tests` code and once it reaches this line of code in smart contract it will print `hello` in the console!

### ⚒ Hardhat Plugins

Hardhat plugins are extensions that add new functionality to Hardhat.

Some of popular Hardhat plugins are:

* `@nomiclabs/hardhat-ethers`: injects `ethers.js` into Hardhat Runtime Environment
* `@nomiclabs/hardhat-web3`: injects `Web3` into Hardhat Runtime Environment
* `@typechain/hardhat`: typechain support for hardhat

You can explore hardhat plugins on [Hardhat Plugins homepage](https://hardhat.org/hardhat-runner/plugins).

To add new plugin simply run:

```
npm install @nomiclabs/hardhat-ethers
```

And then add it to Hardhat by putting `require` in `hardhat.config.js`:

```javascript
require("@nomiclabs/hardhat-ethers");
```

### ⚒ Using Hardhat to develop on XDC

Hardhat development experience on XDC is mostly indistinguishable from any other Ethereum-like network, but there are still some things you need to learn before starting developing on XDC.

### ⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat

In order to get started deploying new contracts on XDC Mainnet and/or Apothem, we need to install a new dependency called `dotenv` that will be used in the `hardhat.config.js` file:

```bash
npm install dotenv
```

We will need to configure a `.env` file with XDC Mainnet and Apothem Testnet RPC endpoints, plus the _Private Key_ of the wallet we are using for deployment. Lets start by running:

```bash
touch .env
```

And writting the following info in our .env file:

```bash
XINFIN_NETWORK_URL=https://erpc.xinfin.network
APOTHEM_NETWORK_URL=https://erpc.apothem.network
PRIVATE_KEY=202e3c9d30bbeca38d6578659919d4c3dc989ae18c16756690877fdc4dfa607f
```

🚨 **Do not use the Private Key in the example above in production or you can risk losing your assets!** 🚨

And finally, we can configure the `hardhat.config.js` file for both Apothem and XinFin Networks by writting:

```jsx
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.16",
  networks: {
    xinfin: {
      url: process.env.XINFIN_NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
     apothem: {
      url: process.env.APOTHEM_NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
```

And now you can deploy and interact with your contracts on XDC mainnet by running:

```
npx hardhat run scripts/myScript.js --network xinfin
```

or on testnet:

```
npx hardhat run scripts/myScript.js --network apothem
```

***

For more information about Hardhat, Please Visit [Hardhat Documentation](https://hardhat.org/tutorial).\
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).\
