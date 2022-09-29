# How to Deploy Your First Smart Contract on the XDC Network Using Hardhat and TypeScript

## Overview

[Hardhat](https://hardhat.org/) is an ethereum development environment which can be used for editing, compiling, debugging and deploying your smart contracts and dApps.

[TypeScript](https://www.typescriptlang.org/) is a strongly typed programming language that builds on TypeScript.

### What you will learn

This guide aims at teaching how to create a smart contract using Hardhat with TypeScript and deploying it on XDC Network.

### Steps

* Install and set up Hardhat
* Write and Deploy contract on XDC Network
* Check the deployment status on Xinfin scan.

## Installation Prerequisites

Metamask wallet ([Extension link](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)) or XDC Pay Wallet ([Extension link](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo))

Don't know how to create a wallet? [Click here](https://myterablock.medium.com/how-to-create-or-import-a-metamask-wallet-a551fc2f5a6b)

Node.js. ([Download link](https://nodejs.org/en/download/))

## Setup

First we need to setup our hardhat project. Open the terminal and follow these commands.

Make a folder with you project name and go to the project directory.

```bash
mkdir xdc-hardhat && cd xdc-hardhat
```

Initialize the project with hardhat.

```bash
npx hardhat
```

![Hardhat init](https://user-images.githubusercontent.com/14329097/192101554-da367351-53d9-498f-a533-94766022eff2.png)

* Select `Create a Typescript project` with `↓` and `Enter`.
* Specify Hardhat Project root or press enter for already specified path.
* please specify `y` for yes and `n` for no for adding a `.gitignore` file.
* Press `Enter` for `Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)?`

## Write Smart Contract

Now, you will have a folder structure as below

![Screenshot](https://user-images.githubusercontent.com/14329097/192101550-4d4a070d-1411-43f0-bf2c-fe1e3c23eaec.png)

* In the contract folder, create a new file and write your contract inside it. (creating `Pizza.sol` for reference. The code for Pizza.sol is given below).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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

* To compile the contract, write the following in the terminal

```bash
npx hardhat compile
```

If this returns errors, check your contract and rectify them.

## Deployment

For writing the script to deploy the contract, create `deploy.ts` in `scripts` folder, if it is not already there. Copy the following code in the `deploy.ts`.

```ts
import { ethers } from "hardhat";

async function main() {
  // make sure to change the name of your contract
  const Pizza = await ethers.getContractFactory("Pizza");
  // 4 in the bracket is to give the value to the parameter(_pizzaSize) in the constructor of the smart contract contract.
  const myContract = await Pizza.deploy(4);

  await myContract.deployed();

  console.log("pizza contract address:", myContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

* To add XDC testnet network to metamask.(If you are using XDC Pay you don't have to follow this step)

![Screenshot 2022-09-13 at 12 31 31 PM](https://user-images.githubusercontent.com/35517007/189842148-a3d20b76-e14a-44fa-9c94-445825acd42b.png)

* To add XDC mainnet network to metamask.(If you are using XDC Pay you don't have to follow this step)

![Screenshot 2022-09-13 at 12 35 05 PM](https://user-images.githubusercontent.com/35517007/189842216-01c87935-4b4e-49bc-89ea-11026250dbf8.png)

## Setup .env file

> Make sure you do not push this file to github.

* Make a `.env` at the root of the project to store the private key and network url.

```python
XINFIN_NETWORK_URL="enter-network-rpc-url-here"
XINFIN_PRIVATE_KEY="enter-your-private-key-here"
```

Depending on which network (Apothem or XinFin) you are deploying to you will need to use one of these Network URL's:

```python
XINFIN_NETWORK_URL=https://erpc.xinfin.network
APOTHEM_NETWORK_URL=https://erpc.apothem.network
```

* Dont know how to get your private key? Open you XDC pay wallet extension and click on the three dots on the top-left. This will open a popup. ![Screenshot 2022-09-18 at 12 27 44 AM](https://user-images.githubusercontent.com/35517007/190872826-b3437164-e6a8-487d-91c7-4a1d85d341d1.png)

Click on the `Export Private key` inside the popup.

![Screenshot 2022-09-18 at 12 31 05 AM](https://user-images.githubusercontent.com/35517007/190872880-c0c34a79-b81f-40f5-895d-d29714ef42b6.png)

Enter the password that you used while creating the account.

![Screenshot 2022-09-18 at 12 31 20 AM](https://user-images.githubusercontent.com/35517007/190872906-4cf58f76-bb80-4a53-a496-b05a33217758.png)

Copy your private key. This key will be used to sign transactions when deploying the contract through hardhat.

![Screenshot 2022-09-18 at 12 31 35 AM](https://user-images.githubusercontent.com/35517007/190872961-7ffb8329-2601-4346-bbb0-7a4ff38fd5f8.png)

* To be able to import env file variables, please install `dotenv` from your terminal.

```bash
npm install --save-dev dotenv
```

* Open the `hardhat.config.ts` file. Now we will add the network url and private key of our wallet to this file, so that we can deploy our contract. Your `harhat.config.ts` should look like this.

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    xinfin: {
      url: process.env.XINFIN_NETWORK_URL,
      accounts: [process.env.XINFIN_PRIVATE_KEY!]
    }
  }
};

export default config;
```

## Final Step

After writing code for the setup and contract, go back to the terminal. Make sure you are in your project directory and type:

```bash
npx hardhat run scripts/deploy.ts --network xinfin
```

**Voila! 🎉 You did it.**

Copy the `contract address` or `transaction hash` (in case of testnet) and check it's deployment status on the block scan.

For mainnet: [XinFin Scan](https://explorer.xinfin.network/) For testnet: [Apothem Scan](https://explorer.apothem.network/)
