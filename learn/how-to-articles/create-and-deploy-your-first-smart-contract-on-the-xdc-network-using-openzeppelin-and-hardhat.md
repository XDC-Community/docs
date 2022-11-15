# Create and Deploy Your First Smart Contract on the XDC Network Using OpenZeppelin and Hardhat

# 🧭 Table of contents

- [Create and Deploy Your First Smart Contract on the XDC Network Using OpenZeppelin and Hardhat](#create-and-deploy-your-first-smart-contract-on-the-xdc-network-using-openzeppelin-and-hardhat)
- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
    - [What you will learn](#what-you-will-learn)
    - [What you will do](#what-you-will-do)
- [⚒ Starting a new Hardhat Project](#-starting-a-new-hardhat-project)
    - [Prerequisites](#prerequisites)
    - [Setup for a Hardhat Project](#setup-for-a-hardhat-project)
- [💵 Write Smart Contract Using OpenZeppelin](#-write-smart-contract-using-openzeppelin)
  - [Compile the Contract](#compile-the-contract)
  - [Writing a script file to deploy the contract](#writing-a-script-file-to-deploy-the-contract)
  - [Setup .env file](#setup-env-file)
  - [⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat](#-configuring-xdc-mainnet-and-apothem-testnet-on-hardhat)
  - [💵 Deploying the contract](#-deploying-the-contract)
  - [Flattening the Smart Contract](#flattening-the-smart-contract)
  - [🔍 Veryfing Contracts on the Block Explorer](#-veryfing-contracts-on-the-block-explorer)

# 📰 Overview

<!-- <p align="center">
  <img width=10% src="https://raw.githubusercontent.com/menezesphill/application_utils/main/hardhaticon.png" alt="hardhat"/>
</p> -->

[OpenZeppelin](https://www.openzeppelin.com/) is an open-source framework that helps to build secure smart contracts to automate your decentralized applications.

OpenZeppelin contracts are written in solidity and use ERC standards for Ethereum-based tokens.

### What you will learn

In this tutorial, you will learn how to set up Hardhat and use it to build, test, and deploy a smart contract build with OpenZeppelin on both the XDC Network mainnet and XDC Apothem testnet.

The complete tutorial code can be found [here](./xdc-openzeppelin).

### What you will do

- Install and setup Hardhat
- Create a smart contract with the help of openzeppelin
- Compile the smart contract
- Deploy the smart contract
- Interact with the smart contract
- Check the deployment status on [xinfin.network](https://xinfin.network/#stats)

# ⚒ Starting a new Hardhat Project

### Prerequisites

Metamask wallet ([Extension link](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)) or XDC Pay wallet ([Extension link](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo))

Don't know how to create a wallet? [Click here](https://myterablock.medium.com/how-to-create-or-import-a-metamask-wallet-a551fc2f5a6b#:~:text=Click%20on%20the%20MetaMask%20extension,or%20create%20a%20new%20one.&text=Click%20on%20%E2%80%9CCreate%20a%20Wallet,%E2%80%9CNo%20Thanks%E2%80%9D%20to%20proceed.)

Node.js. ([Download link](https://nodejs.org/en/download/))

### Setup for a Hardhat Project

First, you'll need to setup your hardhat project. Open the terminal and follow these commands.

Make a folder with you project name and go to the project directory:

```bash
mkdir xdc-openzeppelin
cd xdc-openzeppelin
```

Initialize the project and install Hardhat:

```bash
npm init --yes
npm install --save-dev hardhat
```

In the same directory, run:

```bash
npx hardhat
```

<img width="569" alt="Screenshot 2022-09-13 at 11 56 26 AM" src="https://user-images.githubusercontent.com/35517007/189841544-480b1a9c-b5d8-483c-a77e-b04501f6f121.png">

- Select `Create a Javascript project` or `Create a Typescript project` according to your requirement.
- Specify Hardhat Project root or press enter for already specified path.
- Specify `y` for yes and `n` for no for adding a .gitignore
- Press enter for `Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)?`

Note: If you are on windows, install this:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Now, you will have a folder structure as below
<img width="1680" alt="Screenshot 2022-09-25 at 12 12 40 AM" src="https://user-images.githubusercontent.com/35517007/192116380-698146f9-860f-4748-95f6-cba2cfa2edde.png">

# 💵 Write Smart Contract Using OpenZeppelin

To use OpenZeppelin contracts, install the package in the project using:

```bash
npm install @openzeppelin/contracts
```

In the contract folder, create a new file and write your contract inside it. In this example, we are creating `MyToken.sol` for reference.

You'll use the [ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) of OpenZeppelin to create and mint tokens.

1] You'll import ERC20.sol from OpenZeppelin using `import "@openzeppelin/contracts/token/ERC20/ERC20.sol";`

2] You'll inherit all the methods and variable from OpenZeppelin's ERC20.sol and use it in your contract, by simply adding `is ERC20` after the contract name

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// inherit ERC20 from OpenZeppelin by simply adding 'is ERC20'
contract MyToken is ERC20 {
    //...to be continued
}
```

3] If you see the constructor of OpenZeppelin's ERC20.sol file, it takes in 2 parameters - name and symbol.

The \_mint function of OpenZeppelin's ERC20.sol file also takes in 2 parameters - account(the address you want to send tokens to) and the amount of tokens you want to send.

Next, add it to out contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// inherit ERC20 from openzeppelin by simply adding 'is ERC20'
contract MyToken is ERC20 {
     constructor() ERC20("MyToken", "MTK") {
        // premint 1000 tokens to the owner of the contract.
        _mint(msg.sender, 1000 * 10 ** decimals());
     }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```

4] Since we want the mint function to be called only by the owner, you'll use an owner variable in the contract, and set a require statement in the mint function:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// inherit ERC20 from openzeppelin by simply adding 'is ERC20'
contract MyToken is ERC20 {
    address public owner;
     constructor() ERC20("MyToken", "MTK") {
        owner = msg.sender;
        // premint 1000 tokens to the owner of the contract.
        _mint(msg.sender, 1000 * 10 ** decimals());
     }

    function mint(address to, uint256 amount) public {
        require(owner == msg.sender, "Only owner can mint the token!");
        _mint(to, amount);
    }
}
```

## Compile the Contract

- To compile the contract, write the following in the terminal:

```bash
npx hardhat compile
```

If this returns errors, check your contract and rectify them.

If everything is correctly configured and there is no errors, you should see the following message on your console:

```sh
Compiled 5 Solidity files successfully
```

## Writing a script file to deploy the contract

For writing the script to deploy the contract, create `deploy.js` in `scripts` folder, if it is already not there. Copy the following code in the `deploy.js`:

```jsx
const hre = require("hardhat");

async function main() {
  // make sure to change the name of your contract
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();

  await myToken.deployed();

  console.log("My token contract address:", myToken.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

- To add the XDC Testnet network to metamask: (If you are using XDCPay, you don't have to follow this step)

<img width="1047" alt="Screenshot 2022-09-13 at 12 31 31 PM" src="https://user-images.githubusercontent.com/35517007/189842148-a3d20b76-e14a-44fa-9c94-445825acd42b.png">

- To add XDC mainnet network to metamask: (If you are using XDCPay you don't have to follow this step)

<img width="1047" alt="Screenshot 2022-09-13 at 12 35 05 PM" src="https://user-images.githubusercontent.com/35517007/189842216-01c87935-4b4e-49bc-89ea-11026250dbf8.png">

## Setup .env file

> Make sure you do not push this file to github.

- Make a `.env` at the root of the project to store the private key and network url.

```python
XINFIN_NETWORK_URL="enter-network-rpc-url-here"
XINFIN_PRIVATE_KEY="enter-your-private-key-here"
```

.env file that I have used for this project.

```solidity
XINFIN_NETWORK_URL=https://erpc.xinfin.network
APOTHEM_NETWORK_URL=https://erpc.apothem.network
PRIVATE_KEY=202e3c9d30bbeca38d6578659919d4c3dc989ae18c16756690877fdc4dfa607f
```

🚨 **Do not use the Private Key in the example above in production or you can risk losing your assets!** 🚨

- Dont know how to get your private key? Open your XDCPay wallet extension and click on the three dots on the top-left. This will open a popup.
  <img width="360" alt="Screenshot 2022-09-18 at 12 27 44 AM" src="https://user-images.githubusercontent.com/35517007/190872826-b3437164-e6a8-487d-91c7-4a1d85d341d1.png">

Click on the `Export Private key` inside the popup.

<img width="360" alt="Screenshot 2022-09-18 at 12 31 05 AM" src="https://user-images.githubusercontent.com/35517007/190872880-c0c34a79-b81f-40f5-895d-d29714ef42b6.png">

Enter the password that you used while creating the account.

<img width="360" alt="Screenshot 2022-09-18 at 12 31 20 AM" src="https://user-images.githubusercontent.com/35517007/190872906-4cf58f76-bb80-4a53-a496-b05a33217758.png">

Copy your private key. This key will be used to sign transactions when deploying the contract through hardhat.

<img width="360" alt="Screenshot 2022-09-18 at 12 31 35 AM" src="https://user-images.githubusercontent.com/35517007/190872961-7ffb8329-2601-4346-bbb0-7a4ff38fd5f8.png">

## ⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat

- To be able to import env file variables, please install `dotenv` from your terminal:

```bash
npm install dotenv
```

- Open the `hardhat.config.js` file. Now we will add the network url and private key of our wallet to this file, so that we can deploy our contract. Your `harhat.config.js` should look like this.

```jsx
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.16",
  networks: {
    xinfin: {
      url: process.env.XINFIN_NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    apothem: {
      url: process.env.APOTHEM_NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

## 💵 Deploying the contract

After writing code for the setup and contract, go back to the terminal. Make sure you are in your project directory and type:

For the XDC mainnet:

```bash
npx hardhat run scripts/deploy.js --network xinfin
```

For the testnet:

```sh
npx hardhat run scripts/deploy.js --network apothem
```

In either case, you need to have enough funds to pay gas fees on the address that is being used for development.

If the deployment is sucessful, the console should log the following message after migrations complete processing:

```sh
My token contract address: 0xc8Ac88d77b9870D289806F54AfF9057f170bAb21
```

## Flattening the Smart Contract

When importing third-party libraries like OpenZeppelin, it becomes necessary to flatten your smart contract and then verify it on the blockscan, because blockscan doesn't have access to the OpenZeppelin's code. When we flatten the code, the OpenZeppelin's code will be included in the same file as your samrt contract.

To flatten the contract using Hardhat, write the following in the terminal:

```bash
npx hardhat flatten ./path-to-file/contractName.sol > flattenedContractName.sol
```

In this case, you'll write:

```bash
npx hardhat flatten ./contracts/MyToken.sol > flattenedMyToken.sol
```

This will create a new file `flattenedMyToken.sol` which would include flattened code for your smart contract.

## 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify your contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

Change the prefix `0x` to `xdc` to look for your contract on [XinFin Block Explorer](https://explorer.xinfin.network/)

In this example, there is a `MyToken` contract deployed on XDC Mainnet at the `0x802555081f6AAcE51559d0650Bf15f242aBe7fd7`. You could search for your newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

<p align="center">
  
<img width="1674" alt="Screenshot 2022-10-05 at 11 26 10 AM" src="https://user-images.githubusercontent.com/35517007/194009497-9deffaf8-dc30-482a-a143-f4cb972e1a53.png" alt="Verify 01" />

</p>

Click in the `Verify And Publish` Option.

You will be redirected to the contract verification page where we need to fill out:

- Contract Name: <em>MyToken</em>
- Compiler: <em> Check your</em> `hardhat-config.js` <em>file for Compiler Version</em>
- Contract Code: <em> Just paste everything from your</em> `flattenedMyToken.sol` <em>file</em>

Once everything is filled out, press Submit!

<p align="center">
  <img width="1671" alt="Screenshot 2022-10-05 at 11 28 46 AM" src="https://user-images.githubusercontent.com/35517007/194009622-ea5966ba-aa15-4f81-ba94-bd2da2ca7dbf.png" alt="Verify 02"/>


</p>

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

<p align="center">
  
<img width="1676" alt="Screenshot 2022-10-05 at 11 35 12 AM" src="https://user-images.githubusercontent.com/35517007/194009732-96bdc2be-cb9a-4fff-895c-9bcb7a1feb10.png" alt="Verify 03"/>

</p>

In this page you can Read from, Write to, or simply read the information tied to your Smart Contract on the blockchain:

<p align="center">
  <img width="1675" alt="Screenshot 2022-10-05 at 1 28 22 PM" src="https://user-images.githubusercontent.com/35517007/194010105-908c60ed-1261-4eac-b752-6b1f6feb8cc9.png" alt="Verify 04" />

</p>

---

For more information about Hardhat, Please Visit [Hardhat Documentation](https://hardhat.org/tutorial).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
Resources used during the deployment of the openzeppelin ERC20 Token can be found [here](https://docs.openzeppelin.com/contracts/4.x/erc20).
