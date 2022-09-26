---
id: xrc721-token-hardhat
title: XRC721 using Hardhat
description:  "Use Hardhat to deploy an XRC721 Token."
keywords:
  - docs
  - apothem
  - token
  - XRC721
  - hardhat
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
    - [What you will learn](#what-you-will-learn)
    - [What you will do](#what-you-will-do)
  - [📰 About XRC721 Tokens](#-about-xrc721-tokens)
- [⚒ Starting a new Hardhat Project](#-starting-a-new-hardhat-project)
  - [⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat](#-configuring-xdc-mainnet-and-apothem-testnet-on-hardhat)
  - [⚒ Adding Testnet XDC to Development Wallet](#-adding-testnet-xdc-to-development-wallet)
- [💵 Writing our first XRC721 Token](#-writing-our-first-xrc721-token)
  - [💵 Constants](#-constants)
  - [💵 Events](#-events)
  - [💵 Methods](#-methods)
  - [💵 Compiling and Deploying](#-compiling-and-deploying)
  - [💵 XRC165](#-xrc165)
  - [💵 Enabling minting](#-enabling-minting)
- [🔍 Veryfing Contracts on the Block Explorer](#-veryfing-contracts-on-the-block-explorer)
  - [🔍 Interacting with your contract on the Block Explorer](#-interacting-with-your-contract-on-the-block-explorer)

# 📰 Overview

<p align="center">
  <img width=10% src="https://raw.githubusercontent.com/menezesphill/application_utils/main/hardhaticon.png" alt="hardhat"/>
</p>

[Hardhat](https://hardhat.org/) is a development environment to compile, deploy, test, and debug your Ethereum software. Get Solidity stack traces & console.log.

### What you will learn
In this tutorial, you will learn how to set up Hardhat and use it to build, test and deploy a XRC721 Token on both the XDC Network mainnet and XDC Apothem testnet.

### What you will do
- Install and setup Hardhat
- Create an XRC721 token
- Compile the XRC721 token
- Deploy the XRC721 token
- Interact with the XRC721 token
- Check the deployment status on [xinfin.network](https://xinfin.network/#stats)

## 📰 About XRC721 Tokens

XRC721 is an open standard that defines an interface for non-fungible tokens on XDC blockchain. :

- `balanceOf(address _owner) external view returns (uint256)`
- `ownerOf(uint256 _tokenId) external view returns (address)`
- `safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable`
- `safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable`
- `transferFrom(address _from, address _to, uint256 _tokenId) external payable`
- `approve(address _approved, uint256 _tokenId) external payable`
- `setApprovalForAll(address _operator, bool _approved) external`
- `getApproved(uint256 _tokenId) external view returns (address)`
- `isApprovedForAll(address _owner, address _operator) external view returns (bool)`

These are the minimum required methods that allow an asset on the XinFin network to be called an XRC721 token. Also, a XRC721 token must be able to emit the following `Events` on the blockchain:

- `Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)`
- `Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId)`
- `ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved)`

Events are helpers that come in handy in the exhaustive labor of indexing state changes, and they are essential to off-chain applications to find relevant data on the blockchain. By mapping all `Transfer` events, for example, we can fetch all the historic data on token transfers more easily.

XRC721 also includes **optional** metadata parameters. 

- `name`
- `symbol`

This allows your smart contract to be interrogated for its name and for details about the assets which your NFTs represent.

# ⚒ Starting a new Hardhat Project

There are a few technical requirements before we start. Please install the following:

- [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
- [Git](https://git-scm.com/)

Lets start by setting up our folder, we are creating a project called `XRC721`, create a new `XRC721` folder by running on terminal

```bash
mkdir XRC721 && cd XRC721
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


<p align="center">
  <img width=40% src="https://user-images.githubusercontent.com/78161484/191259993-b817901f-7df9-4df1-bb1c-c4805c416974.png" alt="hardhat config"/>
</p>

Press `ENTER` to get started with a new JavaScript Hardhat Project. Then you will be presented with the following options:

```sh
? Hardhat project root: ‣ /home/taurinos/xdc_comm/docs/how-to/XRC721/Hardhat/XRC721 
// Press ENTER or y 

? Do you want to add a .gitignore? (Y/n) ‣ y
// Press ENTER or y

? Do you want to install this sample projects dependencies with npm (hardhat @nomicfoundation/hardhat-toolbox)? (Y/n) ‣ y
// Press ENTER or y
```

The standard Hardhat project comes with a pre-created `Lock.sol` contract and `deploy.js` script. Lets clean up our working environment before moving forward:

```sh
rm -rf ./contracts/Lock.sol ./scripts/deploy.js ./test/Lock.js
```

And your folder files will look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/191263408-af21bd08-98a8-440c-9270-7f9960bb531d.png" alt="hardhat folder"/>
</p>

## ⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat

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

## ⚒ Adding Testnet XDC to Development Wallet

Let's check our Signer's Address on Hardhat by accessing the hardhat console:

```sh
npx hardhat console --network xinfin
```
If you get an error that hardhat is not installed locally and are running on a Windows OS you will need to execute:

```sh
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

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/189952656-eb7793cc-7dee-4307-88fc-7c351a75cec7.png" alt="Step 02"/>
</p>

# 💵 Writing our first XRC721 Token

The source code for the XRC721 Token used in this tutorial is available here: [XRC721 Contract Folder](./XRC721/contracts/XRC721.sol). But we will address all `Events`, `Methods` and `Constants` mentioned in the section [📰 About XRC721 Tokens](#-about-xrc721-tokens).

Lets start by creating the `XRC721.sol` file:

```sh
touch ./contracts/XRC721.sol
```

We are going to use OpenZeppelin contracts so lets make sure it is installed:
```sh
npm install @openzeppelin/contracts
```

And now paste this code in our XRC721 file:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract XRC721 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    }
}
```

Thanks to OpenZeppelin we don't have to implement all the code ourself but lets still go through basic parts of XRC721 contract.

## 💵 Events

As mentioned in [📰 About XRC721 Tokens](#-about-xrc721-tokens). Events are very important part of a Smart Contract logic. Events have `indexed` variables that are variables that can be filtered by off-chain interfaces. We might be tempted to index all the variables that are tied to an on-chain event, however we can't go crazy about it since Solidity has a _maximum of 3 indexed variable_ limitation for Events. XRC721 has three basic events: `Transfer`, `Approval` and `ApprovalForAll`.

```solidity
interface XRC721 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
}
```

## 💵 Methods

We need to create the six methods mentioned in [📰 About XRC721 Tokens](#-about-xrc721-tokens) (`ownerOf`, `balanceOf`, `safeTransferFrom`, `transferFrom`, `approve`, `setApprovalForAll`, `isApprovedForAll`  and `getApproved`) and a `constructor` that is a function called only once when the contract is deployed, where we can parse as arguments information such as the token name, decimals and/or initial token supply:

```solidity
// SPDX-License-Identifier: MIT
interface XRC721 {
    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) external view returns (address operator);

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved) external;

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;
}
```

## 💵 XRC165

We didn't mention it before, but XRC721 also requires to implement XRC165 standard. Don't worry, thanks to OpenZeppelin we don't have to implement it, but it is really simple. It describes only one method `supportsInterface`.

```solidity
/**
 * @dev Interface of the XRC165 standard
 *
 * Implementers can declare support of contract interfaces, which can then be
 * queried by others (`XRC165Checker`).
 *
 * For an implementation, see `XRC165`.
 */
interface IXRC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`.
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

## 💵 Enabling minting

Ok, we have XRC721 contract, but how can we mint NFT with it? To do that, lets add `mintToken` method. Each time `mintToken` is called, it will create new unique token assign to `tokenOwner`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract XRC721 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    }

    function mintToken(address tokenOwner)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);

        return newItemId;
    }
}
```

## 💵 Compiling and Deploying

We can now compile our `XRC721.sol` by running:

```sh
npx hardhat compile
```

If everything is correctly configured and there is no errors, you should see the following message on your console:

```sh
Downloading compiler 0.8.16
Compiled 1 Solidity files successfully
```

And your folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/191273560-8f666f6c-c7b9-4bad-8369-46337f6243b2.png" alt="Folder 02"/>
</p>

In order to deploy our newly compiled contract artifacts to the blockchain, we need to create a deployment script into the script folder:

```sh
touch ./scripts/deploy.js
```

And write the following script to the `deploy.js` file:

```jsx
async function main() {
  const [deployer] = await ethers.getSigners();

  const XRC721 = await ethers.getContractFactory("XRC721");
  const myNFT = await XRC721.deploy("MyNFTToken", "myNFT");

  await myNFT.deployed();
  
  console.log("Token Successfully Deployed!");
  console.log("Token address:", myNFT.address);

  // and now lets mint token
  const newItemId = await myNFT.mintToken(deployer.address)

  console.log("NFT minted: ", newItemId)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

If the deployment script have no errors, we can go ahead and run the command:

```sh
npx hardhat run scripts/deploy.js --network xinfin
```

For deployment on XDC mainet, or:

```sh
npx hardhat run scripts/deploy.js --network apothem
```

For deployment on the XDC Apothem Testnet. In either case, you need to have enough funds to pay for gas fees on the address that is being used for development.

If the deployment is sucessful, the console should log the following message after migrations complete processing:

```sh
Token Successfully Deployed!
Token address: 0xbC5bA2B6e2f74EC1e8e5A310a42F65D185691Af2
```

# 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

Lets grab the `XRC721.sol` address from the previous step: this address is in the Ethereum standard but we can simply swap the `0x` prefix for `xdc` and search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190875518-828c0061-71de-42c2-b222-0b8427852d01.png" alt="Verify 01"/>
</p>

And click in the `Verify And Publish` Option.

We will be redirected to the Contract verification page where we need to fill out:

- Contract Name: <em>XRC721</em>
- Compiler: <em> Check your</em> `hardhat-config.js` <em>file for Compiler Version</em>
- Contract Code: <em> Just paste everything from your</em> `XRC721.sol` <em>file</em>

Once everything is filled out, press Submit!

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190875635-f6d3aa36-47b2-4b09-ad6a-fe6df3fb11f1.png" alt="Verify 02"/>
</p>

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190875780-6223b4b0-fecc-4e79-83bc-c810c5b0351c.png" alt="Verify 03"/>
</p>

For more information about Hardhat, Please Visit [Hardhat Documentation](https://hardhat.org/tutorial).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
Resources used during the deployment of the XRC721 Token can be found at [XRC721 Contract Folder](./XRC721).

