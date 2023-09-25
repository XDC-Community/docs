---
id: flatten-contract-hardhat
title: Flatten a Smart Contract Using Hardhat
keywords:
  - docs
  - apothem
  - token
  - flatten
  - hardhat
description: Use Hardhat to deploy and verify smart contract
---

# Flattening Smart Contracts with Hardhat

## 🧭 Table of contents

* [🧭 Table of contents](flattening-smart-contracts-with-hardhat.md#-table-of-contents)
* [📰 Overview](flattening-smart-contracts-with-hardhat.md#-overview)
  * [What you will learn](flattening-smart-contracts-with-hardhat.md#what-you-will-learn)
  * [What you will do](flattening-smart-contracts-with-hardhat.md#what-you-will-do)
* [⚒ Starting a new Hardhat Project](flattening-smart-contracts-with-hardhat.md#-starting-a-new-hardhat-project)
  * [⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat](flattening-smart-contracts-with-hardhat.md#-configuring-xdc-mainnet-and-apothem-testnet-on-hardhat)
  * [⚒ Adding Testnet XDC to Development Wallet](flattening-smart-contracts-with-hardhat.md#-adding-testnet-xdc-to-development-wallet)
* [💵 Writing Smart Contract](flattening-smart-contracts-with-hardhat.md#-writing-smart-contract)
  * [💵 Compiling and Testing](flattening-smart-contracts-with-hardhat.md#-compiling-and-testing)
    * [Testing](flattening-smart-contracts-with-hardhat.md#testing)
  * [💵 Deploying Contract](flattening-smart-contracts-with-hardhat.md#-deploying-contract)
  * [💵 Flattening Contract](flattening-smart-contracts-with-hardhat.md#-flattening-contract)
* [🔍 Veryfing Contracts on the Block Explorer](flattening-smart-contracts-with-hardhat.md#-veryfing-contracts-on-the-block-explorer)

## 📰 Overview

[Hardhat](https://hardhat.org/) is a development environment to compile, deploy, test, and debug your Ethereum software. Get Solidity stack traces & console.log.

#### What you will learn

In this tutorial, you will learn how to set up Hardhat and use it to build, test and deploy smart contract on both the XDC Network mainnet and XDC Apothem testnet and verify it on Block Explorer.

#### What you will do

* Install and set up Hardhat
* Create a complex smart contract with dependencies (like OpenZeppelin)
* Compile the smart contract
* Test the smart contract
* Deploy the smart contract
* Flatten the smart contract
* Verify the smart contract

## ⚒ Starting a new Hardhat Project

There are a few technical requirements before we start. Please install the following:

* [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
* [Git](https://git-scm.com/)

Lets start by setting up our folder, we are creating a project called `MyCounter`, create a new `MyCounter` folder by running on terminal

```bash
mkdir MyCounter && cd MyCounter
```

We can get started with Hardhat by running:

```bash
npx hardhat
```

And the following message will show on your console. Hit `y` to continue or just press `ENTER`:

```bash
Need to install the following packages:
  hardhat
Ok to proceed? (y)
```

The following message should log on your console:

![hardhat config](https://user-images.githubusercontent.com/78161484/191259993-b817901f-7df9-4df1-bb1c-c4805c416974.png)

Press `ENTER` to get started with a new JavaScript Hardhat Project. Then you will be presented with the following options:

```
? Hardhat project root: ‣ /home/path/to/MyCounter 
// Press ENTER or y 

? Do you want to add a .gitignore? (Y/n) ‣ y
// Press ENTER or y

? Do you want to install this sample projects dependencies with npm (hardhat @nomicfoundation/hardhat-toolbox)? (Y/n) ‣ y
// Press ENTER or y
```

The standard Hardhat project comes with a pre-created `Lock.sol` contract and `deploy.js` script. Lets clean up our working environment before moving forward:

```
rm -rf ./contracts/Lock.sol ./scripts/deploy.js ./test/Lock.js
```

And your folder files will look like this:

![hardhat folder](https://user-images.githubusercontent.com/78161484/191263408-af21bd08-98a8-440c-9270-7f9960bb531d.png)

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

### ⚒ Adding Testnet XDC to Development Wallet

Let's check our Signer's Address on Hardhat by accessing the hardhat console:

```
npx hardhat console --network xinfin
```

If you get an error that hardhat is not installed locally and are running on a Windows OS you will need to execute:

```
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Once the hardhat console CLI opens, you can run:

```jsx
> const hre = require("hardhat");
// Should log: Undefined
> const [owner] = await ethers.getSigners();
// Should log: Undefined
> owner.address
// Should log: '0xA4e66f4Cc17752f331eaC6A20C00756156719519' or your wallet address if you are using a different Private Key
```

This account is on the Ethereum standard format starting with `0x`, but we can simply switch `0x` for `xdc`. In this case, our signer wallet address is: `xdcA4e66f4Cc17752f331eaC6A20C00756156719519`.

With this account in hand, we can head to the [Apothem Faucet](https://faucet.apothem.network/) and claim some TXDC for development purposes:

![Step 02](https://user-images.githubusercontent.com/78161484/189952656-eb7793cc-7dee-4307-88fc-7c351a75cec7.png)

## 💵 Writing Smart Contract

We will be using OpenZeppelin for this guide so lets install it first:

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

We can now compile our `MyCounter.sol` by running:

```
npx hardhat compile
```

If everything is correctly configured and there is no errors, you should see the following message on your console:

```
Downloading compiler 0.8.16
Compiled 2 Solidity files successfully
```

And your folder should look like this:

![Folder 02](https://user-images.githubusercontent.com/78161484/191273560-8f666f6c-c7b9-4bad-8369-46337f6243b2.png)

#### Testing

Now lets create a simple test to see everything works as intended before we deploy our contract to live network. This will save us time and gas fees, so it is recommended you do as much as possible tests for your smart contracts before deploying.

Create file `MyCounter.js` under `test` directory:

```javascript
const { expect } = require("chai");

describe("MyCounter contract", function () {
  it("should deploy MyCounter", async () => {
    const [owner] = await ethers.getSigners();
    const MyCounter = await ethers.getContractFactory("MyCounter");

    const myCounterInstance = await MyCounter.deploy();
    const current = await myCounterInstance.current();

    expect(current.valueOf()).to.equal(0)
  });
  it("should increment and decrement MyCounter and show current count", async () => {
    const [owner] = await ethers.getSigners();
    const MyCounter = await ethers.getContractFactory("MyCounter");

    const myCounterInstance = await MyCounter.deploy();

    await myCounterInstance.increment()
    await myCounterInstance.increment()
    await myCounterInstance.decrement()

    const current = await myCounterInstance.current();

    expect(current.valueOf()).to.equal(1)
  });
});
```

Then run:

```
npx hardhat test
```

Your output should look like this:

```
MyCounter contract
  ✔ should deploy MyCounter (847ms)
  ✔ should increment and decrement MyCounter and show current count (66ms)

2 passing (916ms)
```

### 💵 Deploying Contract

In order to deploy our newly compiled contract artifacts to the blockchain, we need to create a deployment script into the script folder:

```
touch ./scripts/deploy.js
```

And write the following script to the `deploy.js` file:

```jsx
async function main() {
  const MyCounter = await ethers.getContractFactory("MyCounter");
  const myCounter = await MyCounter.deploy();

  await myCounter.deployed();
  
  console.log("MyCounter Successfully Deployed!");
  console.log("MyCounter address:", myCounter.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

If the deployment script have no errors, we can go ahead and run the command:

```
npx hardhat run scripts/deploy.js --network xinfin
```

For deployment on XDC mainet, or:

```
npx hardhat run scripts/deploy.js --network apothem
```

For deployment on the XDC Apothem Testnet. In either case, you need to have enough funds to pay for gas fees on the address that is being used for development.

If the deployment is sucessful, the console should log the following message after migrations complete processing:

```
MyCounter Successfully Deployed!
MyCounter address: 0xfCd7d366048a50E0600C46Dd854Da343050EB3A1
```

### 💵 Flattening Contract

If smart contract imports external files like ours, we need to flatten it before verifying on Block Explorer.

Now lets flatten our contract:

```bash
npx hardhat flatten contracts/MyCounter.sol > MyCounterFlatten.sol
```

Then open `MyCounterFlatten.sol` and remove every line which starts with `// SPDX-License-Identifier` except the first one. We do this because Block Explorer does not accepts contracts with mutliple license definitions.

## 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

Lets grab the `MyCounter.sol` address from the previous step: this address is in the Ethereum standard but we can simply swap the `0x` prefix for `xdc` and search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

![Verify 01](https://user-images.githubusercontent.com/78161484/190875518-828c0061-71de-42c2-b222-0b8427852d01.png)

And click in the `Verify And Publish` Option.

We will be redirected to the Contract verification page where we need to fill out:

* Contract Name: _MyCounter_
* Compiler: _Check your_ `hardhat-config.js` _file for Compiler Version_
* Contract Code: _Just paste everything from your_ `MyCounterFlatten.sol` _file_

❕ Keep in mind that `Contract Code` should be `MyCounterFlatten.sol`, not `MyCounter.sol`. ❕

Once everything is filled out, press Submit!

![Verify 02](https://user-images.githubusercontent.com/78161484/190875635-f6d3aa36-47b2-4b09-ad6a-fe6df3fb11f1.png)

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

![Verify 03](https://user-images.githubusercontent.com/78161484/190875780-6223b4b0-fecc-4e79-83bc-c810c5b0351c.png)



For more information about Hardhat, Please Visit [Hardhat Documentation](https://hardhat.org/tutorial).\
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.community/).\
Resources used during the deployment of the MyCounter can be found at [MyCounter Contract Folder](https://github.com/XDC-Community/docs/tree/main/how-to/SmartContract/Flatten/Hardhat/example-flatten-smart-contract).
