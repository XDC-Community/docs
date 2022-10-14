# Hardhat

## Table of contents

- [What is Hardhat](#-what-is-hardhat)
- [What is used for](#-what-is-used-for)
- [Setting up the development environment](#-setting-up-the-development-environment)
  - [Starting a new hardhat Project](###-starting-a-new-hardhat-project)
- [Smart Contract](##-smart-contract)
  - [Compiling](###-compiling)
  - [Deploying](###-deploying)
- [Veryfing Contracts on the Block Explorer](#-veryfing-contracts-on-the-block-explorer)

## What Is Hardhat
[Hardhat](https://hardhat.org/) is a development environment for Ethereum software. 

### What is used for
It consists of different components for editing, compiling, debugging and deploying your smart contracts and dApps, all of which work together to create a complete development environment.

Hardhat is designed around the concepts of tasks and plugins. The bulk of Hardhat's functionality comes from plugins, and you're free to choose the ones you want to use.

Every time you're running Hardhat from the command-line, you're running a task. For example, npx hardhat compile is running the compile task. To see the currently available tasks in your project, run npx hardhat. Feel free to explore any task by running `npx hardhat help [task]`.

Hardhat is unopinionated in terms of what tools you end up using, but it does come with some built-in defaults. All of which can be overriden. Most of the time the way to use a given tool is by consuming a plugin that integrates it into Hardhat.

## How to use it

### Setting up the development environment
 
 ### Instalation prerequisites
  - [Metamask wallet](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) or [XDC Pay Wallet](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo)
  - [Node.js v8+ LTS and npm (comes with Node)](https://nodejs.org/en/)
  - [Yarn](https://yarnpkg.com/) (Optional) I will use yarn for this test

 ### Starting a new hardhat project
 
 First let's create a hardhat project(this is from windows). Open a console and write the following commands: 
 
 ```bash
 mkdir hardhat-xdc && cd hardhat-xdc
 ```
 
 Initilize the project and install hardhat: 
 
 ```bash
 npm init --y
 or
 yarn init 
 ```
 
 ```bash
 npm i -d hardhat
 or 
 yarn add -dev hardhat
 ```
 
 In the same directory where you installed Hardhat run:
 ```bash
 npx hardhat
 ```
 ![Screenshot_1](https://user-images.githubusercontent.com/34518489/195737738-69980bf9-e35d-436a-aaf7-dbe50cd9c50f.png)
 
 - Select Create a `Javascript project` or Create a `Typescript project` according to your requirement. I will choose `Typescript`.
 - Specify Hardhat Project root or press enter for already specified path.
 - Please specify y for yes and n for no for adding a .gitignore


 ![Screenshot_2](https://user-images.githubusercontent.com/34518489/195737938-8fc941b2-ce63-40ed-b5bf-a2f5dc90f2ee.png)
 
 Now we need to instal the dependencies and dotenv wich we'll use later:
 
 ```bash
 yarn add --dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-network-helpers @nomicfoundation/hardhat-chai-matchers @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan chai ethers hardhat-gas-reporter solidity-coverage @typechain/hardhat typechain @typechain/ethers-v5 @ethersproject/abi @ethersproject/providers 
 ```
 
 And dotenv: 
 
 ```bash
 yarn add dotenv
 ```
## Smart Contract 

In the `contract` folder we'll see a `look.sol` file. We going to rename it to `Pizza.sol`. Inside of it delete all that code and paste this one: 

```jsx
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.17;

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

### Compiling

Compile the contract with the following command: 

```bash
npx hardhat compile
```
![Screenshot_3](https://user-images.githubusercontent.com/34518489/195739220-b58d18b6-fdd7-4a3c-970d-a39add7d3b11.png)


### Deploying

First we need to edit the code in scripts/deploy.ts for this new code for our Pizza smart contract: 

```jsx
const hre = require("hardhat");

async function main() {
  // make sure to change the name of your contract
  const Pizza = await hre.ethers.getContractFactory("Pizza");
  // 4 in the bracket is to give the value to the parameter(_pizzaSize) in the constructor of the smart contract contract.
  const pizza = await Pizza.deploy(4);

  await pizza.deployed();

  console.log("pizza contract address:", pizza.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```
Go to your xdc extension wallet and find your private key and copy.

![Screenshot_4](https://user-images.githubusercontent.com/34518489/195740141-afdfcd22-d729-484e-9c19-c3cbd982b249.png)

![Screenshot_5](https://user-images.githubusercontent.com/34518489/195740218-11492c27-c348-47c1-a8fb-ed6b8fe2609b.png)

![Screenshot_6](https://user-images.githubusercontent.com/34518489/195740235-a43f256f-51eb-4bca-904a-889a9e04af8c.png)

![Screenshot_7](https://user-images.githubusercontent.com/34518489/195740241-b772b705-ec2c-4a80-a39f-e29f17d96a34.png)


Create a .env file and paste your private key to it: 

```bash
PRIVATE_KEY="your private key"
```

Also we need to edit our hardhat.config.ts 

```jsx
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    xinfin: {
      url: "https://erpc.xinfin.network",
      accounts: [PRIVATE_KEY!],
    },
    apothem: {
      url: "https://erpc.apothem.network",
      accounts: [PRIVATE_KEY!]
    }
  },
};

export default config;

```

Now run this command to deploy to our testnet apothem: 

```bash
npx hardhat run --network apothem  scripts/deploy.ts 
``` 

If all it's ok it shows the contract address of our deployment:

![Screenshot_8](https://user-images.githubusercontent.com/34518489/195740595-0c7e805b-7967-4144-a275-cad88fff2ddd.png)

## Veryfing Contracts on the Block Explorer

Go to [Apothem explorer](https://explorer.apothem.network/) to watch is our deployment has been recorded: 

![Screenshot_9](https://user-images.githubusercontent.com/34518489/195740879-efe9cd3d-b1bc-4980-a4bd-ee546a53ce32.png)




 
