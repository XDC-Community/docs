---
id: xdc-frontend-integration
title: Creating a front-end for an XDC dApp.
description:  "Creating a front-end for an XDC decentralized app and connecting it to XDC smart contracts."
keywords:
  - docs
  - apothem
  - dApp
  - front-end
  - XRC20
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
    - [What you will learn](#what-you-will-learn)
    - [What you will do](#what-you-will-do)
    - [What you will need](#what-you-will-need)
- [🚀 Project Introduction](#-project-introduction)
  - [Smart Contracts](#smart-contracts)
    - [Using Truffle](#using-truffle)
    - [Using Hardhat](#using-hardhat)
    - [Using Remix](#using-remix)
  - [XRC20 Egg Token](#xrc20-egg-token)
  - [XRC721 Egg NFT](#xrc721-egg-nft)
  - [About XRC721 Egg NFT Metadata](#about-xrc721-egg-nft-metadata)
  - [EGT Faucet](#egt-faucet)
  - [Migration script using Truffle](#migration-script-using-truffle)
  - [Migration script using Hardhat](#migration-script-using-hardhat)
- [📀 Flattening Solidity files](#-flattening-solidity-files)
    - [Step 01](#step-01)
    - [Step 02](#step-02)
    - [Step 03](#step-03)
- [🏗 Building a Front-End Application](#-building-a-front-end-application)
  - [Creating Smart Contract Instances in React](#creating-smart-contract-instances-in-react)
    - [EggToken.ts](#eggtokents)
    - [EggNFT.ts](#eggnftts)
    - [Faucet.ts](#faucetts)
  - [Creating Smart Contract Constants File](#creating-smart-contract-constants-file)
  - [Creating Smart Contract Wrappers in React](#creating-smart-contract-wrappers-in-react)
    - [EggTokenWrapper.ts](#eggtokenwrapperts)
    - [EggNFTWrapper.ts](#eggnftwrapperts)
    - [FaucetWrapper.ts](#faucetwrapperts)
  - [Creating a Blockchain Context Provider in React](#creating-a-blockchain-context-provider-in-react)
  - [Integrating Blockchain Methods to DOM elements](#integrating-blockchain-methods-to-dom-elements)
    - [Updating `app.tsx` elements](#updating-apptsx-elements)
- [💧 Setting up Faucet Contract](#-setting-up-faucet-contract)
    - [On Truffle](#on-truffle)
    - [On Hardhat](#on-hardhat)
- [🔥 DApp Demo](#-dapp-demo)

 # 📰 Overview
 
In this tutorial, you will work with a few different tools to create a working decentralized App front-end from start to finish, leveraging [React](https://reactjs.org/) to bootstrap our front end. [Web3Modal](https://www.npmjs.com/package/web3modal) and [web3.js](https://www.npmjs.com/package/web3) will be used to create a touchpoint between our front-end and the XDC Network. You'll use the smart contract development environment of your choice: [Truffle](https://trufflesuite.com/), [Hardhat](https://hardhat.org/) or [Remix](https://remix.xinfin.network/)!

### What you will learn
In this tutorial, you will learn how to interact with XDC Network smart contracts and tokens through a simple web front-end on the XDC Network mainnet and XDC Apothem testnet.

### What you will do
 - Create a simple web front end
 - Further instructions on how to deploy multiple smart contracts
 - Interact with smart contracts
 - Create Interfaces to use XRC20 tokens on a React App
 - Create Interfaces to use XRC721 tokens on a React App

### What you will need

There are a few technical requirements before we start. Please install the following:

- [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
- [Git](https://git-scm.com/)

As you will be using XDCPay to interact with our first dApp on XDC Network, you can download XDCPay at:

- [XDCPay on Chrome Store](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo)

# 🚀 Project Introduction

This tutorial is full of important concepts and we wanted to make something both interesting and fun, with that in mind, we are happy to introduce `EGG GACHA`!

<p align="center">
    <img src="https://user-images.githubusercontent.com/78161484/193483143-7589a63f-4204-4adb-9394-42544497e2c2.png" alt="Egg Gacha!">
  </a>
   
  <p align="center">
    <b>EGG GACHA!</b>
  </p>
</p>

Gacha is a Japanese term for a small toy sold in a plastic capsule in a vending machine. And this is what we will make: A NFT vending machine where you can trade in an XRC20 token for a new XRC721 non-fungible token. We will create in the course of this tutorial:

  1. An XRC20 Token called `EGT` (Egg Tokens);
  2. An XRC721 Token called `EGGS`;
  3. An `EGT Faucet` smart contract, so people can get more `EGT` and buy new `EGGS`;
  4. An interface where users can interact with `EGT`, `EGGS` and the `EGT Faucet` Smart Contract;
  
  ## Smart Contracts
  
It is not uncommon to see several smart contracts interacting in a real-world application to create a complete user experience - and that's what you'll be doing here. You will deploy three smart contracts that depend on one another to create our decentralized app experience.

**If you have never deployed a Smart Contract on XDC Mainnet or Apothem Tesnet, please check the following tutorials before continuing** (You can chose between using **Truffle**, **Hardhat** or **Remix**):

### Using Truffle
:rotating_light: [Use Truffle to deploy a Smart Contract](https://github.com/XDC-Community/docs/blob/main/how-to/truffle.md)<br>
:rotating_light: [Use Truffle to deploy a XRC20 Token](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Truffle/how-to.md)<br>
:rotating_light: [Use Truffle to deploy a XRC721 Token](https://github.com/XDC-Community/docs/blob/main/how-to/XRC721/Truffle/how-to.md)

### Using Hardhat
:rotating_light: [Use Hardhat to deploy a Smart Contract](https://github.com/XDC-Community/docs/blob/main/how-to/contract-hardhat.md)<br>
:rotating_light: [Use Hardhat to deploy a XRC20 Token](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Hardhat/how-to.md)

### Using Remix
:rotating_light: [Use Remix to deploy a Smart Contract](https://github.com/XDC-Community/docs/blob/main/how-to/remix-example.md)<br>
:rotating_light: [Use Remix to deploy a XRC20 Token](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Remix/how-to.md)<br>
:rotating_light: [Use Remix to deploy a XRC721 Token](https://github.com/XDC-Community/docs/blob/main/how-to/XRC721/Remix/XRC721.md)

## XRC20 Egg Token

First, you will abstract some of the code for the EGT tokens using Open Zeppelin's [Smart Contract Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard). If you followed one of the tutorials listed in the [Smart Contracts](#smart-contracts) section, you might need to install `@openzeppelin/contracts` to your working directory first:

```sh
npm install @openzeppelin/contracts
```

Create your EGT tokens by creating an `EggToken.sol` file with the following content:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EggToken is ERC20, Ownable {
    constructor() ERC20("Egg Token", "EGT") {
        _mint(msg.sender, 50000 * 10 ** decimals());
    }
}
```

:bangbang: IMPORTANT: the contract above needs to be flattened to get verified on the block explorer :bangbang:

## XRC721 Egg NFT

Following the same logic as above, you will ceate an `Eggs.sol` file using a Open Zeppelin's smart contracts with a few small changes:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract EggNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    ERC20 public paymentCurrency;

    constructor(ERC20 _paymentCurrency) ERC721("Egg NFT", "EGGS") {
      require(address(_paymentCurrency) != address(0), "Token address can't be address zero");
      paymentCurrency = _paymentCurrency;
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
    
    function buyEgg() public {
        require(paymentCurrency.transferFrom(msg.sender, address(this), 10 ether), "Failed to process payment!");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, 
            string(
                abi.encodePacked(
                    "https://gateway.pinata.cloud/ipfs/QmYDm8Bzye4RMS7h9HUv1KoupajqXcsfKUWwMeGvsC3ZkA/eggo00",
                    Strings.toString(tokenId),
                    ".json"
                )
            )
        );
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```
:bangbang: IMPORTANT: the contract above needs to be flattened to get verified on the block explorer :bangbang:

## About XRC721 Egg NFT Metadata

In the section above, we define the NFT metadata inside the `buyEgg()` method:

```solidity

        _setTokenURI(tokenId, 
            string(
                abi.encodePacked(
                    "https://gateway.pinata.cloud/ipfs/QmYDm8Bzye4RMS7h9HUv1KoupajqXcsfKUWwMeGvsC3ZkA/eggo00",
                    Strings.toString(tokenId),
                    ".json"
                )
            )
        );
```

This URI is pointing to a pre-defined list of assets created for this tutorial and hosted on IPFS. The full list of URI metadata can be found here: [Egg Metadata on IPFS](https://gateway.pinata.cloud/ipfs/QmYDm8Bzye4RMS7h9HUv1KoupajqXcsfKUWwMeGvsC3ZkA/).

Publishing files to IPFS is not within the scope of this tutorial, but if you want to know more, check out [This tutorial on how to create NFTs and publish metadata to IPFS using Pinata](https://github.com/menezesphill/eggnator).

## EGT Faucet

You also need to provide users a way to claim a few `EGT` tokens! The best way to do so is creating a FAUCET smart contract. Our faucet will have a `claimTokens()` method that users can call to get `50 EGT tokens` for free every 24-hours. Create a `Faucet.sol` contract with the following code:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable {

    ERC20 public token;

    struct Airdrop {
        address claimer;
        uint256 lastTimeClaimed;
    }

    event tokenAirdropped(address indexed claimer, uint256 claimTime);
    mapping ( address => Airdrop ) private tokensDroped;


    constructor(ERC20 _token) {
        require(address(_token) != address(0), "Token address can't be address zero");
        token = _token;
    }

    function depositToken(uint256 amount_) public {
        require(token.transferFrom(msg.sender, address(this), amount_), "Transaction Failed!");
    }

    function claimTokens() public {
        require( currentTime() > tokensDroped[msg.sender].lastTimeClaimed + 86400, 'User claimed less than 24hrs ago');
        
        Airdrop memory _airdrop = Airdrop({
            claimer: msg.sender, 
            lastTimeClaimed: currentTime()
        });

        tokensDroped[msg.sender] = _airdrop;

        require(token.transfer(msg.sender, 50 ether), "Token Transfer Failed!");
        emit tokenAirdropped(msg.sender, _airdrop.lastTimeClaimed);
    }

    function currentTime() private view returns (uint256) {
        return block.timestamp;
    }
}
```

## Migration script using Truffle

If you followed the [Use Truffle to deploy a Smart Contract](https://github.com/XDC-Community/docs/blob/main/how-to/truffle.md) tutorial, you might need to adjust your migration script accordingly so all three smart contracts are correctly deployed to the blockchain. For Truffle, you'll need to create a `1_project_migration.js` file with the following code:

```jsx
const EGT = artifacts.require("EggToken");
const EGGS = artifacts.require("EggNFT");
const Faucet = artifacts.require("Faucet");

module.exports = function (deployer) {
    deployer.deploy(EGT)
    .then(() => deployer.deploy(EGGS, EGT.address))
    .then(() => deployer.deploy(Faucet, EGT.address));
}
```

And your folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/193672515-d058ee10-70ee-4693-91f0-546592efe52a.png" alt="Truffle Workspace"/>
</p>


## Migration script using Hardhat

Conversely, if you followed the [Use Hardhat to deploy a Smart Contract](https://github.com/XDC-Community/docs/blob/main/how-to/contract-hardhat.md) tutorial, you need to adjust your `deploy.js` script to deploy all three contracts:

```jsx
async function main() {

    // Deploy EggToken
    const EggToken = await ethers.getContractFactory("EggToken");
    const eggToken = await EggToken.deploy();
    await eggToken.deployed();
    console.log("EggToken deployed to:", eggToken.address);

    // Deploy EggNFT
    const EggNFT = await ethers.getContractFactory("EggNFT");
    const eggNFT = await EggNFT.deploy(eggToken.address);
    await eggNFT.deployed();
    console.log("EggNFT deployed to:", eggNFT.address);

    // Deploy Faucet
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy(eggToken.address);
    await faucet.deployed();
    console.log("Faucet deployed to:", faucet.address);    

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
```

And your folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/193684235-f794ebff-40f1-463d-87fd-039b9a4fa6cb.png" alt="Hardhat Workspace"/>
</p>

# 📀 Flattening Solidity files

To **Verify and Publish** your smart contracts inherited from `@openzeppelin/contracts`, you'll need to flatten your solidity smart contract into one file. In this section, you will learn how to use the [Solidity Visual Developer](https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-visual-auditor) plugin on **VSCode** to flatten your smart contracts.

### Step 01

 - On the left-sided panel, click on `Extensions` (or press `CTRL`+`SHIFT`+`X`);
 - Seach for `Solidity`;
 - Find `Solidity Visual Developer` and click in install.

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/193687692-ededd9b9-3466-496e-bc25-6e250533327d.png" alt="Solidity Flattening 01"/>
</p>

### Step 02

 - Go to `Explorer` on the left-side panel (or press `CTRL`+`SHIFT`+`E`);
 - Select the `.sol` file you want to flatten;
 - On the top of your visual code Editor window, you will see a list of new commands. Find `flatten` and click on it:
 
<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/193695078-ee199266-0103-405d-bf58-a62ee666dd87.png" alt="Solidity Flattening 02"/>
</p>

### Step 03

 - Once you click on `flatten`, a new editor window will open to the right;
 - Press `CTRL`+`S` to Save As and name it `{name}-flat.sol` or whatever you feel is a good option to keep your folder organized;
 - Repeat the process to any `.sol` file that uses `import @openzeppelin/contracts`;
 
<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/193696014-c496f3b6-7d8d-4011-bc2e-2a93fbffcc2a.png" alt="Solidity Flattening 03"/>
</p>

By the end of this process, your folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/193696481-44aad18b-0384-4895-91ec-3299751fb53f.png" alt="Solidity Flattening 04"/>
</p>

:rotating_light: **Remember to use the FLATTENED `.sol` files instead of the original file when verifying these contracts on the XDC Block Explorer.**

# 🏗 Building a Front-End Application

We prepared a project scaffold for the Egg Gacha. You can find the project folder [Here](https://github.com/menezesphill/egg-gacha-scaffold). Get started by cloning this dApp to your working directory:

```sh
git clone https://github.com/menezesphill/egg-gacha-scaffold.git
cd egg-gacha-scaffold
```

Once you have cloned your dApp scaffold, you can install all the necessary dependencies. You can either use `yarn` or `npm`, but in this example we use `npm`:

```sh
npm install
```

When npm finishes installing your dependencies, you can run the `start` script to see if everything is working:

```sh
npm run start
```

You should see the following React App served at `http://localhost:3000/`:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/193703640-1fcd5cf2-d8e1-47b2-88a6-803cb496f604.png" alt="Egg Gacha Front-end"/>
</p>

In this project folder, you will find a `contexts` folder with all methods necessary to connect to your `XDCPay` wallet. If you are not sure where this code is coming from or how to use it, please check the [XDCPay Integration Tutorial](https://github.com/menezesphill/docs/blob/main/how-to/XDCPay/Integration/how-to.md) before continuing.

We are ready to move to the next steps if you see the page above!

## Creating Smart Contract Instances in React

You will start by creating your smart contract instances in React. Create a `blockchain` folder locally, and a sub-folder called `contracts`:

```sh
mkdir -p ./src/blockchain/contracts
```

The only files you need to import from `Truffle` and `Hardhat` (whichever you decided to use for development), are the compiled artifacts of our Smart Contracts. These artifacts can be found at:

```jsx
// On your Truffle project folder:

'./build/contracts/EggToken.json'
'./build/contracts/EggNFT.json'
'./build/contracts/Faucet.json'

// On your Hardhat project folder:

'./artifacts/contracts/Eggs.sol/EggNFT.json'
'./artifacts/contracts/EggToken.sol/EggToken.json'
'./artifacts/contracts/TokenFaucet.sol/Faucet.json'
```

Move or copy these three `.json` files to our recently created `./src/blockchain/contracts` folder. Our working directory should now look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/193709413-8a2f95ed-64cf-4bbf-b28e-0f2ad9246ccc.png" alt="Egg Gacha Folder 01"/>
</p>

You'll need to install two new dependencies to your project, `web3-utils` and `web3-eth-contract`:

```sh
npm install web3-utils web3-eth-contract
```

Create a generic contract handler in the `./src/blockchain/contracts` folder: 

```sh
touch ./src/blockchain/contracts/Contract.ts
```

With the following code:

```jsx
import Web3 from "web3";
import { AbiItem } from 'web3-utils';
import { Contract as Web3Contract } from "web3-eth-contract";

class Contract {
  web3: Web3;
  chainId: number;
  account: string | null;
  tag: string | null;
  events: object;
  contract: Web3Contract;

  constructor(options, tag: string, abi, address: string) {
    this.web3 = options.web3;
    this.chainId = options.chainId;
    this.account = options.account;

    this.contract = new this.web3.eth.Contract(abi as AbiItem[], address);

    if (tag) this.tag = tag;
    else this.tag = "contract-" + Date.now();

    this.events = {};
  }
  
  call(method, ...params) {
    return new Promise((resolve, reject) => {
      this.contract.methods[method](...params).call({from: this.account})
        .then(resolve)
        .catch(reject)
    });
  }

  send(method, options, ...params) {
    return new Promise((resolve, reject) => {
      this.contract.methods[method](...params).send({...options, from: this.account})
        .then(resolve)
        .catch(reject)
    });
  }

  on(event, callback, onerr) {
    if (this.events[event])
      return;
    this.contract.events[event]((err, res) => {
      if (err === null) {
        callback(res.returnValues, this.tag);
      } else {
        if (onerr) onerr(err);
        else console.log(err);
      }
    });
    this.events[event] = true;
  }
}

export default Contract;
```

This way, you can your `EggToken`, `EggNFT` and `Faucet` contracts inherit from `Contract.ts`. You'll create three new files in the `./src/blockchain/contracts` folder:

```sh
touch ./src/blockchain/contracts/EggToken.ts
touch ./src/blockchain/contracts/EggNFT.ts
touch ./src/blockchain/contracts/Faucet.ts
```

And each one of these files extends `Contract`:

### EggToken.ts

```jsx
// EggToken.ts

import Contract from "./Contract";
import Artifacts from "./EggToken.json";

class EggToken extends Contract {
    constructor(options, address) {
        super(options, "EggToken", Artifacts["abi"], address);
    }
}

export default EggToken;
```

### EggNFT.ts

```jsx
// EggNFT.ts

import Contract from "./Contract";
import Artifacts from "./EggNFT.json";

class EggNFT extends Contract {
    constructor(options, address) {
        super(options, "EggNFT", Artifacts["abi"], address);
    }
}

export default EggNFT;
```

### Faucet.ts

```jsx
// Faucet.ts

import Contract from "./Contract";
import Artifacts from "./Faucet.json";

class Faucet extends Contract {
    constructor(options, address) {
        super(options, "Faucet", Artifacts["abi"], address);
    }
}

export default Faucet;
```

At this point, your project folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/193714901-0f6519b8-433a-46e4-aa98-df0678f2c8cb.png" alt="Egg Gacha Folder 02"/>
</p>

## Creating Smart Contract Constants File

At this point, if you still haven't deployed the contracts, remember to check the scripts provided in [Migration script using Truffle](#migration-script-using-truffle) or [Migration script using Hardhat](#migration-script-using-hardhat). In this instance, we will show you how to deploy them using `Truffle`:

```sh
truffle migrate --network apothem
```

If migrations complete sucessfully, you can run `truffle networks` to get your contract addresses:

```sh
Network: apothem (id: 51)
  EggNFT: 0xDfe0F690Bb0F03b62D0350cc34B8195EdDa85134
  EggToken: 0x8544C3568Fd88BC256eef824C5232fB12fAd2F69
  Faucet: 0x71e9774B1c70202f072326759B55c9c2a9C46E0b

Network: xinfin (id: 50)
  No contracts deployed.
```

To keep your React dApp folder organized, you will create a `constants.ts` file with your deployment information:

```sh
touch ./src/blockchain/constants.ts
```

Our `constants.ts` file should have the following exports:

```jsx
export const EggTokenAddress = {
  Contract: {
    51: "0x8544C3568Fd88BC256eef824C5232fB12fAd2F69",
  },
};

export const EggNFTAddress = {
  Contract: {
    51: "0xDfe0F690Bb0F03b62D0350cc34B8195EdDa85134",
  },
};

export const FaucetAddress = {
  Contract: {
    51: "0x71e9774B1c70202f072326759B55c9c2a9C46E0b",
  },
};
```

## Creating Smart Contract Wrappers in React


The next step is to create Wrappers, where you'll define what kind of methods you want to access on the blockchain. You will create one for each contract:

```sh
touch ./src/blockchain/EggTokenWrapper.ts
touch ./src/blockchain/EggNFTWrapper.ts
touch ./src/blockchain/FaucetWrapper.ts
```

### EggTokenWrapper.ts

You won't need to use all methods nor access all variables available in `EggToken.sol`, so you will only create the `balanceOf()`, `approve()`, and `allowance()` methods in your `EggTokenWrapper.ts` file:

```jsx
// EggTokenWrapper.ts

import Web3 from 'web3';
import EggToken from './contracts/EggToken';
import { EggTokenAddress, EggNFTAddress } from './constants';

export default class EggTokenWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: EggToken;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        }

        this.Contract = new EggToken(this.wrapperOptions, EggTokenAddress.Contract[this.chainId]);
    }

    async balanceOf() : Promise<unknown> {
        try {
            const balance = await this.Contract.call("balanceOf", this.account);
            return balance;
        } catch (error) { 
            throw error;
        }
    }

    async approve() {
        const value = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )
        try {
            const tx = await this.Contract.send("approve", {from: this.account}, EggNFTAddress.Contract[this.chainId], value);
            console.log(tx);
        } catch (error) {
            throw error;
        }
    }

    async allowance() : Promise<unknown> {
        try {
            const allowance = await this.Contract.call("allowance", this.account, EggNFTAddress.Contract[this.chainId]);
            return allowance;
        } catch (error) {
            throw error;
        }
    }
}
```

### EggNFTWrapper.ts

In `EggNFTWrapper.ts`, you will declare your `buyEgg()` method, which is probably the most important method, and a few other methods to help you display your collection in the front-end application like:`balanceOf()`, `tokenOfOwnerByIndex()`, and `tokenURI()`:

```jsx
import Web3 from 'web3';
import EggNFT from './contracts/EggNFT';
import { EggNFTAddress } from './constants';

export default class EggNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: EggNFT;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        }

        this.Contract = new EggNFT(this.wrapperOptions, EggNFTAddress.Contract[this.chainId]);
    }

    async balanceOf() : Promise<unknown> {
        try {
            const balance = await this.Contract.call("balanceOf", this.account);
            return balance;
        } catch (error) { 
            throw error;
        }
    }

    async buyEgg() : Promise<unknown> {
        try {
            const tx = await this.Contract.send("buyEgg", { from: this.account });
            return tx;
        } catch (error) { 
            throw error;
        }
    }

    async tokenOfOwnerByIndex(index: number) : Promise<unknown> {
        try {
            const tokenId = await this.Contract.call("tokenOfOwnerByIndex", this.account, index);
            return tokenId;
        } catch (error) { 
            throw error;
        }
    }

    async tokenURI(tokenId: number) : Promise<unknown> {
        try {
            const tokenURI = await this.Contract.call("tokenURI", tokenId);
            return tokenURI;
        } catch (error) { 
            throw error;
        }
    }
}
```

### FaucetWrapper.ts

Our `FaucetWrapper.ts` is the simpliest of the three contracts. You should only care about the `claimTokens()` method in your dApp:

```jsx
import Web3 from 'web3';
import Faucet from './contracts/Faucet';
import { FaucetAddress } from './constants';

export default class Faucetrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: Faucet;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        }

        this.Contract = new Faucet(this.wrapperOptions, FaucetAddress.Contract[this.chainId]);
    }

    async claimTokens() {
        try {
            const tx = await this.Contract.send("claimTokens", {from: this.account});
            console.log(tx);
        } catch (error) {
            throw error;
        }
    }
}
```

## Creating a Blockchain Context Provider in React

You are almost there! Next, you'll want to create a `Blockchain Context` so that you can access our blockchain methods throughout our React app. Right now, it might sound a bit exhausting to go through all these files, but trust us, in a real-world application, you will be glad you have created such a nice-looking and well-sectioned React project. 

If you feel like grabbing a coffee, go ahead, I'll be here waiting for you...

:coffee:

...and continuing, it is now time to create a `BlockchainProvider.tsx` into our `contexts` folder:

```sh
touch ./src/contexts/BlockchainProvider.tsx
```

There, we will create our `BlockchainContext` by writting:

```jsx
import EggNFTWrapper from "../blockchain/EggNFTWrapper";
import EggTokenWrapper from "../blockchain/EggTokenWrapper";
import Faucetrapper from "../blockchain/FaucetWrapper";
import { createContext, useEffect, useState, useContext } from "react";
import { Web3ModalContext } from "./Web3ModalProvider";

interface IBlockchainContext {
    eggNFT: EggNFTWrapper | null;
    eggToken: EggTokenWrapper | null;
    faucet: Faucetrapper | null;
    EGGS: EGGScontent[];
}

type EGGScontent = {
    image : string,
  }

export const BlockchainContext = createContext<IBlockchainContext>({
    eggNFT: null,
    eggToken: null,
    faucet: null,
    EGGS : [],
});

export const BlockchainProvider = ({ children }) => {

    const { web3, chainId, account } = useContext(Web3ModalContext);
    const [ eggNFT, setEggNft ] = useState<EggNFTWrapper | null>(null);
    const [ eggToken, setEggToken ] = useState<EggTokenWrapper | null>(null);
    const [ faucet, setFaucet ] = useState<Faucetrapper | null>(null);
    const [ EGGS, setEGGS] = useState<EGGScontent[]>([]);

    useEffect(() => {
        if (web3 && chainId && account) {
            try{
                const _eggNFT = new EggNFTWrapper(web3, chainId, account);
                const _eggToken = new EggTokenWrapper(web3, chainId, account);
                const _faucet = new Faucetrapper(web3, chainId, account);
                setEggNft(_eggNFT);
                setEggToken(_eggToken);
                setFaucet(_faucet);
            } catch (e) {
                console.log(e);
            }
        } else {
            setEggNft(null);
            setEggToken(null);
            setFaucet(null);
        }
    } , [web3, chainId, account]);

    useEffect(() => {
        
            eggNFT?.balanceOf().then((res) => {
                let _EGGS : EGGScontent[] = [];
                let zeros = "000"
                for (let i = 0; i < Number(res); i++) {
                    eggNFT?.tokenOfOwnerByIndex(i).then((res) => {
                      _EGGS.push( { image : `https://gateway.pinata.cloud/ipfs/Qmdvr95JsHCnuKVEdAX784qcYDK9HndbpPMT7FDopdF8eQ/eggo${zeros.slice((String(res).length))}${res}.png`})
                    });
                  }
                  setEGGS(_EGGS);
                  // console.log(EGGS);
            });
        
      }, [chainId, account]);


    return (
        <BlockchainContext.Provider value={{ eggNFT, eggToken, faucet, EGGS }}>
            {children}
        </BlockchainContext.Provider>
    );
}

export default BlockchainProvider;
```

This way, whenever your `account` address, `chainId`, or `web3` provider changes, all contracts are updated accordingly throughout your React App, and you are also capable of tracking your EGGS NFTs images to show on the front-end.

## Integrating Blockchain Methods to DOM elements

Now you'll need to update our `index.tsx` file in the `src` with your newly created provider. Your `index.tsx` should look like this:

```jsx
import ReactDOM from "react-dom/client";
import Web3ModalProvider from "./contexts/Web3ModalProvider";
import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Web3ModalProvider>
    <App />
  </Web3ModalProvider>
);
```

You will update it with your `BlockchainProvider`:

```jsx
import ReactDOM from "react-dom/client";
import Web3ModalProvider from "./contexts/Web3ModalProvider";
import BlockchainProvider from "./contexts/BlockchainProvider"; // Importing new Provider
import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Web3ModalProvider>
    <BlockchainProvider> // Add it to our provider list
      <App />
    </BlockchainProvider>
  </Web3ModalProvider>
);
```

### Updating `app.tsx` elements

Next, move to your main App file at `./src/app.tsx` and make some changes:

```jsx
import React, { useState, useCallback, useEffect } from "react";
import "./app.css";
import { Web3ModalContext } from "./contexts/Web3ModalProvider";

// You will start by importing your newly created BlockchainContext to app.tsx:
import { BlockchainContext } from "./contexts/BlockchainProvider";



const App: React.FC = () => {

// You are not using this state anymore, so you can remove it.
// Instead we will use the EGGS state from our BlockchainContext.

/*   const EGTS = [
    { image: "blueEgg" },
    { image: "brownEgg" },
    { image: "cyanRedEgg" },
    { image: "darkEgg" },
    { image: "fullGreenEgg" },
    { image: "orangeEgg" },
    { image: "whiteBlackEgg" },
    { image: "whiteGreenEgg" },
    { image: "yellowStripedEgg" },
  ]; */ 

  const [slide, setSlide] = useState(0);

  // Here, you'll want to import from Web3ModalContext 'web3' and 'chainId'
  // besides 'account', 'connect' and 'disconnect'
  const { web3, account, connect, disconnect, chainId } =
    React.useContext(Web3ModalContext);

  // And you will import from BlockchainContext the 'EGGS' state and your 
  // contract wrappers:
  const {
    eggNFT: eggNFTWrapper,
    eggToken: eggTokenWrapper,
    faucet: faucetWrapper,
    EGGS,
  } = React.useContext(BlockchainContext);


  // You'll need to create your balance states and gachaAllowance state:
  const [egtTokenBalance, setEgtTokenBalance] = useState("");
  const [egtNftBalance, setEgtNftBalance] = useState("");
  const [gachaAllowance, setGachaAllowance] = useState("");

  // A getBalance function that will get our EGT and EGG token balances
  const getBalances = async () => {
    if (web3 && account && chainId) {
      const _egtBalance = await eggTokenWrapper?.balanceOf();
      const _eggBalance = await eggNFTWrapper?.balanceOf();

      setEgtTokenBalance(String(Number(_egtBalance) / 10 ** 18) || "0");
      setEgtNftBalance(String(_eggBalance) || "0");
    }
  };

  // And a getGachaAllowance function to check whether
  // the EggNFT contract is allowed to spend your EGT tokens
  const getGachaAllowance = async () => {
    if (web3 && account && chainId) {
      const _gachaAllowance = await eggTokenWrapper?.allowance();
      setGachaAllowance(String(Number(_gachaAllowance) / 10 ** 18) || "0");
    }
  };

  // This useEffect will update your balances and allowance
  // so you can update our UI
  useEffect(() => {
    getBalances();
    getGachaAllowance();
  });

  // This function handles the DROP ME MORE EGT! button clicks
  const handleDrop = () => {
    if (web3 && account && chainId) {
      faucetWrapper
        ?.claimTokens()
        .then(() => {
          alert("Claimed 50 EGTS!");
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  // This function handles the MINT NEW EGG! button clicks
  const handleBuyEgg = () => {
    if (web3 && account && chainId) {
      eggNFTWrapper
        ?.buyEgg()
        .then(() => {
          alert("Minted Egg!");
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  // This function handles the APPROVE GACHA! button clicks
  const handleApprove = () => {
    if (web3 && account && chainId) {
      eggTokenWrapper
        ?.approve()
        .then(() => {
          alert("Approved!");
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  // <=== This section of the code is pretty much left unchanged ===>
 
  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  function ellipseAddress(address: string = "", width: number = 4): string {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  }

  // <===============================================================>

  return (
    <main>
      <div className="background">
        <div className="decoration">
          <img src="/images/decorator.svg" alt="Decoration" />
        </div>
        <div className="dragon">
          <img src="/images/dragon.webp" alt="Dragon" />
        </div>
      </div>
      <header>
        {!account ? (
          <div className={"connect"} onClick={handleConnectWallet}>
            CONNECT WALLET
          </div>
        ) : (
          <div className={"connect"} onClick={handleDisconnectWallet}>
            {ellipseAddress(account)}
          </div>
        )}
      </header>
      <div className="app">
        <div className="wrapper">
          <div className="infosContainer">
            <div className="infos">
              {/* Here We Update our UI to show the balances updated in the getBalances() function */}
              <span>MY EGT TOKENS: {egtTokenBalance}</span>
              <span>MY EGGS: {egtNftBalance}</span>
            </div>
              {/* And we want to add a 'handleDrop' function once the DROP ME MORE EGT button is clicked */}
            <div className="infosButton" onClick={handleDrop}>
              DROP ME MORE EGT!
            </div>
          </div>
          <div className="mintContainer">
            <div className="left">
              {slide === EGGS.length ? (
                <img src="/images/leftArrowUncolored.svg" alt="Left Arrow" />
              ) : (
                <img
                  src="/images/leftArrowColored.svg"
                  alt="Left Arrow"
                  onClick={() => setSlide(slide + 1)}
                />
              )}
            </div>

            <div className="center">
              <div className="count">
                {/* Here you change from EGGS.length to EGGS?.length to avoid getting undefined 'EGGS' values*/}
                {slide}/{EGGS?.length} 
              </div>
              <div className="nft">
                {slide === 0 ? (
                  <img src="/images/interrogation.webp" alt="No NFT" />
                ) : (
                  <img 
                    src={
                      // And we change a little bit the way we get the image of the NFT
                      // also to avoid getting undefined values
                      EGGS[0]?.image !== undefined
                        ? `${EGGS[slide - 1]?.image}`
                        : "/images/interrogation.webp"
                    }
                    alt="No NFT"
                  />
                )}
              </div>
              {/* The MINT NEW EGG! button now needs to check a condition "gachaAllowance" 
                  to check if the gacha contract can spend EGT tokens on your behalf...
                  
                  This section of the code means:

                  if (gachaAllowance === 0) so Display the 'APPROVE GACHA!' button
                  else Display the 'MINT NEW EGG!' button
                  */}
              {gachaAllowance === "0" ? (
                <div className="mintButton" onClick={handleApprove}>
                  APPROVE GACHA!
                </div>
              ) : (
                <div className="mintButton" onClick={handleBuyEgg}>
                  MINT NEW EGG!
                </div>
              )}
            </div>
            {/* And by now, you've already changed everything you needed to have a fully functional Front-End*/}
            <div className="right">
              {slide === 0 ? (
                <img src="/images/rightArrowUncolored.svg" alt="Right Arrow" />
              ) : (
                <img
                  src="/images/rightArrowColored.svg"
                  alt="Right Arrow"
                  onClick={() => setSlide(slide - 1)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
```

🎉 Contrats! If you got this far, you have created your first fully functional decentralized app on XDC! 

If you are not sure if your code is correct or if you feel you missed something, you can check the [Egg Gacha Scaffold Completed repo](https://github.com/menezesphill/egg-gacha-scaffold-completed)

# 💧 Setting up Faucet Contract

You are almost ready to run your dApp demo, but first you'll need to fund your `Faucet` contract with some `EGT tokens`:

Move to your smart contract development environment.

### On Truffle

You will begin by starting your development tool console:

```sh
truffle console --network apothem
```

Once the console opens, please instantiate your `EggToken` contract:

```sh
truffle(apothem)> let eggToken = await EggToken.deployed()
// Should log: undefined
```

Next, instantiate your `Faucet` contract:

```sh
truffle(apothem)> let faucet = await Faucet.deployed()
// Should log: undefined
```

You first need to approve `Faucet` to spend your EggTokens:

```sh
truffle(apothem)> let amount = web3.utils.toWei("40000", "ether")
truffle(apothem)> eggToken.approve(faucet.address, amount)
```

It should log a Transaction Receipt (or a rejection in case it fails). If it failed, try again with a lower value, otherwise go ahead and use the `depositToken()` method:

```sh
truffle(apothem)> faucet.depositToken(amount)
```

It should log a Transaction Receipt (or a rejection in case it fails). If it failed, check if you hold the amount of tokens you are trying to deposit.

### On Hardhat

Using hardhat, you'll need to remember tour smart contract addresses. Fortunately, you can find the addresses in your dApp folder at `./src/blockchain/constants.ts`.

You can begin by starting your development tool console:

```sh
npx hardhat console --network apothem
```

Once the console opens, attach your `EggToken` contract:

```sh
> const EggToken = await ethers.getContractFactory("EggToken");
// Should log: undefined
> const eggTokenInstance = await EggToken.attach('0x8544C3568Fd88BC256eef824C5232fB12fAd2F69');
// Should log: undefined
```

Next, attach your `Faucet` contract:

```sh
> const Faucet = await ethers.getContractFactory("Faucet");
// Should log: undefined
> const faucetInstance = await Faucet.attach('0x71e9774B1c70202f072326759B55c9c2a9C46E0b');
// Should log: undefined
```

You'll need to approve `Faucet` to spend tour EggTokens:

```sh
> let amount = ethers.utils.parseUnits("40000", 18)
> await eggTokenInstance.approve(faucetInstance.address, amount)
```

Then, call the `depositToken()`

```sh
> await faucetInstance.depositToken(amount)
```

You are now ready for your first dApp demo!

# 🔥 DApp Demo

Head to our front-end folder and run:

```sh
npm run start
```

If everything is OK, you should be able to run the following demo:

[egg-gacha.webm](https://user-images.githubusercontent.com/78161484/193936166-cd92282c-3506-4bf7-8495-fd1a6333e5f5.webm)

**OBS:.** _Depending on Network Conditions, Transaction approval can be slower than in the demo video... If thats the case, you just need to be a little bit patient_

For more information on XDC Network Development please visit [the XDC Community Docs site](https://docs.xdc.community/)
