# Deploy Smart Contract using Hardhat

## Overview

[Hardhat](https://hardhat.org/) is and ethereum development environment which can be used for editing, compiling, debugging and deploying your smart contracts and dApps.

### What you will learn

This guide aims at teaching how to create a smart contract using Hardhat and deploying it on XDC Network.

### Steps

- Install and set up Hardhat
- Write and Deploy contract on XDC Network
- Check the deployment status on Xinfin scan.

## Installation Prerequisites

Metamask wallet ([Extension link](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)) or XDC Pay Wallet ([Extension link](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo))

Don't know how to create a wallet? [Click here](https://myterablock.medium.com/how-to-create-or-import-a-metamask-wallet-a551fc2f5a6b#:~:text=Click%20on%20the%20MetaMask%20extension,or%20create%20a%20new%20one.&text=Click%20on%20%E2%80%9CCreate%20a%20Wallet,%E2%80%9CNo%20Thanks%E2%80%9D%20to%20proceed.)

Node.js. ([Download link](https://nodejs.org/en/download/))

## Setup

First we need to setup our hardhat project. Open the terminal and follow these commands.

Make a folder with you project name and go to the project directory.

```bash
mkdir xdc-hardhat
cd xdc-hardhat
```

Initialize the project and install hardhat.

```bash
npm init --yes
npm install --save-dev hardhat
```

In the same directory, run

```bash
npx hardhat
```
<img width="569" alt="Screenshot 2022-09-13 at 11 56 26 AM" src="https://user-images.githubusercontent.com/35517007/189841544-480b1a9c-b5d8-483c-a77e-b04501f6f121.png">


- Select `Create a Javascript project` or `Create a Typescript project` according to your requirement.
- Specify Hardhat Project root or press enter for already specified path.
- please specify `y` for yes and `n` for no for adding a .gitignore
- Press enter for `Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)?`

Note: If you are on windows, do install this

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

## Write Smart Contract

Now, you will have a folder structure as below
<img width="1159" alt="Screenshot 2022-09-13 at 11 59 40 AM" src="https://user-images.githubusercontent.com/35517007/189841745-2c5cd395-ce05-4124-9a44-e4aea01e124f.png">

- In the contract folder, create a new file and write your contract inside it. (creating `Owner.sol` for reference).

<img width="1680" alt="Screenshot 2022-09-13 at 12 05 54 PM" src="https://user-images.githubusercontent.com/35517007/189841976-c3ee4435-2b30-4cad-aa50-f478fef407ba.png">

- To compile the contract, write the following in the terminal

```bash
npx hardhat compile
```

If this returns errors, check your contract and rectify them.

## Deployment

For writing the script to deploy the contract, create `deploy.js` in `scripts` folder, if it is already not there. Copy the following code in the `deploy.js`.

```python
const hre = require("hardhat");

async function main() {
  // make sure to change the name of your contract
  const Owner = await hre.ethers.getContractFactory("Owner");
  const owner = await Owner.deploy();

  await owner.deployed();

  console.log("owner contract address:", owner.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

- To add XDC testnet network to metamask.(If you are using XDC Pay you don't have to follow this step)


<img width="1047" alt="Screenshot 2022-09-13 at 12 31 31 PM" src="https://user-images.githubusercontent.com/35517007/189842148-a3d20b76-e14a-44fa-9c94-445825acd42b.png">


- To add XDC mainnet network to metamask.(If you are using XDC Pay you don't have to follow this step)

<img width="1047" alt="Screenshot 2022-09-13 at 12 35 05 PM" src="https://user-images.githubusercontent.com/35517007/189842216-01c87935-4b4e-49bc-89ea-11026250dbf8.png">


- Dont know how to get your private key? [Read-here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key)

- Make a `.env` at the root of the project to store the private key and network url.

```python
XINFIN_NETWORK_URL="enter-network-rpc-url-here"
WALLET_PRIVATE_KEY="enter-your-private-key-here"
```

- To be able to import env file variables, please install `dotenv` from your terminal.

```bash
npm install dotenv
```

- Open the `hardhat.config.js` file. Now we will add the network url and private key of our wallet to this file, so that we can deploy our contract. Your `harhat.config.js` should look like this.

```python
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const XINFIN_NETWORK_URL = process.env.XINFIN_NETWORK_URL;
const XINFIN_PRIVATE_KEY = process.env.XINFIN_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    xinfin: {
      url: XINFIN_NETWORK_URL,
      accounts: [XINFIN_PRIVATE_KEY],
    },
  },
};
```

## Final Step

After writing code for the setup and contract, go back to the terminal. Make sure you are in your project directory and type:

```bash
npx hardhat run scripts/deploy.js --network xinfin
```

**Voila! 🎉 You did it.**

Copy the `contract address` or `transaction hash`(incase of testnet) and check it's deployment status on the block scan.

For mainnet: [XinFin Scan](https://explorer.xinfin.network/)
For testnet: [Apothem Scan](https://explorer.apothem.network/)
