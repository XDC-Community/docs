---
id: xrc721-token-hardhat
title: XRC721 using Hardhat
keywords:
  - docs
  - apothem
  - token
  - XRC721
  - hardhat
description: Use Hardhat to deploy an XRC721 Token.
---

# How to Create and Deploy an XRC721 NFT Using Hardhat

## 🧭 Table of contents

* [🧭 Table of contents](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-table-of-contents)
* [📰 Overview](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-overview)
  * [What you will learn](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#what-you-will-learn)
  * [What you will do](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#what-you-will-do)
  * [📰 About XRC721 Tokens](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-about-xrc721-tokens)
* [⚒ Starting a new Hardhat Project](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-starting-a-new-hardhat-project)
  * [⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-configuring-xdc-mainnet-and-apothem-testnet-on-hardhat)
  * [⚒ Adding Testnet XDC to Development Wallet](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-adding-testnet-xdc-to-development-wallet)
* [💵 Writing your first XRC721 Token](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-writing-our-first-xrc721-token)
  * [💵 Events](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-events)
  * [💵 Methods](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-methods)
  * [💵 XRC165](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-xrc165)
  * [💵 Enabling minting](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-enabling-minting)
  * [💵 Compiling and Deploying](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-compiling-and-deploying)
* [🔍 Veryfing Contracts on the Block Explorer](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-veryfing-contracts-on-the-block-explorer)

## 📰 Overview

![hardhat](https://raw.githubusercontent.com/menezesphill/application\_utils/main/hardhaticon.png)

[Hardhat](https://hardhat.org/) is a development environment to compile, deploy, test, and debug your Ethereum software. Get Solidity stack traces & console.log.

#### What you will learn

In this tutorial, you will learn how to set up Hardhat and use it to build, test, and deploy a XRC721 token on both the XDC Network mainnet and XDC Apothem testnet.

#### What you will do

* Install and setup Hardhat
* Create an XRC721 token
* Compile the XRC721 token
* Deploy the XRC721 token
* Interact with the XRC721 token
* Check the deployment status on [xinfin.network](https://xinfin.network/#stats)

### 📰 About XRC721 Tokens

XRC721 is an open standard that defines an interface for non-fungible tokens on XDC blockchain:

* `balanceOf(address _owner) external view returns (uint256)`
* `ownerOf(uint256 _tokenId) external view returns (address)`
* `safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable`
* `safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable`
* `transferFrom(address _from, address _to, uint256 _tokenId) external payable`
* `approve(address _approved, uint256 _tokenId) external payable`
* `setApprovalForAll(address _operator, bool _approved) external`
* `getApproved(uint256 _tokenId) external view returns (address)`
* `isApprovedForAll(address _owner, address _operator) external view returns (bool)`

These are the minimum required methods that allow an asset on the XDC network to be called an XRC721 token. Also, a XRC721 token must be able to emit the following `Events` on the blockchain:

* `Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)`
* `Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId)`
* `ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved)`

Events are helpers that come in handy in the exhaustive process of indexing state changes, and they are essential for off-chain applications to find relevant data on the blockchain. By mapping all `Transfer` events, for example, we can fetch all the historic data on token transfers more easily.

XRC721 also includes **optional** metadata parameters:

* `name`
* `symbol`

This allows your smart contract to be interrogated for its name and for details about the assets that your NFTs represent.

## ⚒ Starting a new Hardhat Project

There are a few technical requirements before we start. Please install the following:

* [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
* [Git](https://git-scm.com/)

Start by setting up tour folder. As we are creating a project called `XRC721`, create a new `XRC721` folder by running the following on terminal:

```bash
mkdir XRC721 && cd XRC721
```

You can get started with Hardhat by running:

```bash
npx hardhat
```

The following message will show on your console. Hit `y` to continue or just press `ENTER`:

```bash
Need to install the following packages:
  hardhat
Ok to proceed? (y)
```

The following message should log on your console:

![hardhat config](https://user-images.githubusercontent.com/78161484/191259993-b817901f-7df9-4df1-bb1c-c4805c416974.png)

Press `ENTER` to get started with a new JavaScript Hardhat Project. Then you will be presented with the following options:

```
? Hardhat project root: ‣ /home/taurinos/xdc_comm/docs/how-to/XRC721/Hardhat/XRC721 
// Press ENTER or y 

? Do you want to add a .gitignore? (Y/n) ‣ y
// Press ENTER or y

? Do you want to install this sample projects dependencies with npm (hardhat @nomicfoundation/hardhat-toolbox)? (Y/n) ‣ y
// Press ENTER or y
```

The standard Hardhat project comes with a pre-created `Lock.sol` contract and `deploy.js` script. It's best to clean up your working environment before moving forward:

```
rm -rf ./contracts/Lock.sol ./scripts/deploy.js ./test/Lock.js
```

Your folder files will look like this:

![hardhat folder](https://user-images.githubusercontent.com/78161484/191263408-af21bd08-98a8-440c-9270-7f9960bb531d.png)

### ⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat

In order to get started deploying new contracts on XDC Mainnet and/or Apothem, you'll need to install a new dependency called `dotenv` that will be used in the `hardhat.config.js` file:

```bash
npm install dotenv
```

You will need to configure a `.env` file with XDC Mainnet and Apothem Testnet RPC endpoints, plus the _Private Key_ of the wallet you are using for deployment. Start by running:

```bash
touch .env
```

Next, write the following info in our .env file:

```bash
XINFIN_NETWORK_URL=https://erpc.xinfin.network
APOTHEM_NETWORK_URL=https://erpc.apothem.network
PRIVATE_KEY=202e3c9d30bbeca38d6578659919d4c3dc989ae18c16756690877fdc4dfa607f
```

🚨 **Do not use the Private Key in the example above or you can risk losing your assets!** 🚨

Finally, you can configure the `hardhat.config.js` file for both Apothem and XinFin Networks by writing:

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

You should check your Signer's Address on Hardhat by accessing the Hardhat console:

```
npx hardhat console --network xinfin
```

If you get an error that Hardhat is not installed locally, and you are using a Windows OS, you will need to execute:

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

This account is on the Ethereum standard format starting with `0x`, but we can simply switch `0x` for `xdc`. In our example, the signer wallet address is: `xdcA4e66f4Cc17752f331eaC6A20C00756156719519`.

With this account in hand, you can head to the [Apothem Faucet](https://faucet.apothem.network/) and claim some TXDC for development purposes:

![Step 02](https://user-images.githubusercontent.com/78161484/189952656-eb7793cc-7dee-4307-88fc-7c351a75cec7.png)

## 💵 Writing our first XRC721 Token

The source code for the XRC721 Token used in this tutorial is available here: [XRC721 Contract Folder](XRC721/contracts/XRC721.sol). But we will address all `Events`, `Methods` and `Constants` mentioned in the section [📰 About XRC721 Tokens](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-about-xrc721-tokens).

Start by creating the `XRC721.sol` file:

```
touch ./contracts/XRC721.sol
```

You will have to use OpenZeppelin contracts, so please make sure it is installed using the following command:

```
npm install @openzeppelin/contracts
```

Next, paste this code in your XRC721 file:

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

Thanks to OpenZeppelin, we don't have to implement all the code ourself. It's still a good excerize to go through the basic parts of XRC721 contract as explained below

### 💵 Events

As mentioned in [📰 About XRC721 Tokens](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-about-xrc721-tokens), events are an important part of a smart contract logic. Events have `indexed` variables that can be filtered by off-chain interfaces. We might be tempted to index all the variables that are tied to an on-chain event, however Solidity has a _maximum of 3 indexed variable_ limitation for events. XRC721 has three basic events: `Transfer`, `Approval` and `ApprovalForAll`.

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

### 💵 Methods

You must create the six methods mentioned in [📰 About XRC721 Tokens](how-to-create-and-deploy-an-xrc721-nft-using-hardhat.md#-about-xrc721-tokens) (`ownerOf`, `balanceOf`, `safeTransferFrom`, `transferFrom`, `approve`, `setApprovalForAll`, `isApprovedForAll` and `getApproved`) and a `constructor`. This function is only called once, when the contract is deployed, where it contains information such as the token name, decimals and/or initial token supply:

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

### 💵 XRC165

We didn't mention it before, but XRC721 also requires implimentation of a XRC165 standard. Thanks to OpenZeppelin we don't have to implement it, but it is really simple. There is only one method, `supportsInterface`, and it goes as follows:

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

### 💵 Enabling minting

Now that you have a XRC721 contract, how can you mint an NFT with it? With the `mintToken` method, that's how! Each time `mintToken` is called, it will create new unique token assign to `tokenOwner`.

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
        _mint(tokenOwner, newItemId);

        return newItemId;
    }
}
```

### 💵 Compiling and Deploying

You can now compile your `XRC721.sol` by running:

```
npx hardhat compile
```

If everything is correctly configured and there are no errors, you should see the following message on your console:

```
Downloading compiler 0.8.16
Compiled 1 Solidity files successfully
```

In order to deploy our newly compiled contract artifacts to the blockchain, we need to create a deployment script into the script folder:

```
touch ./scripts/deploy.js
```

Write the following script to the `deploy.js` file:

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

If the deployment script have no errors, you can run the following command for deployment on the XDC mainnet:

```
npx hardhat run scripts/deploy.js --network xinfin
```

Or this command, for deployment on the XDC Apothem Testnet:

```
npx hardhat run scripts/deploy.js --network apothem
```

In either case, you need to have enough funds to pay for gas fees on the address that is being used for development.

If the deployment is successful, the console will log the following message after migrations complete processing:

```
Token Successfully Deployed!
Token address: 0xbC5bA2B6e2f74EC1e8e5A310a42F65D185691Af2
```

Find out how your freshly minted NFT looks on [Apothem Block Explorer](https://explorer.apothem.network/)

![XRC721\_0](https://user-images.githubusercontent.com/102393474/192279556-98d2fcb1-06aa-4b5b-8462-05a84489026b.png) ![xrc721\_1](https://user-images.githubusercontent.com/102393474/192279202-f9204bec-48a8-4a0a-8d7f-cd2c93218a42.png)

## 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

Simply grab the `XRC721.sol` address from the previous step: this address is in the Ethereum standard but we can simply swap the `0x` prefix for `xdc` and search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

![Verify 01](https://user-images.githubusercontent.com/78161484/190875518-828c0061-71de-42c2-b222-0b8427852d01.png)

Click in the `Verify And Publish` Option.

You will be redirected to the contract verification page where you will need to fill out:

* Contract Name: _XRC721_
* Compiler: _Check your_ `hardhat-config.js` _file for Compiler Version_
* Contract Code: _Just paste everything from your_ `XRC721.sol` _file_

Once everything is filled out, press Submit!

![Verify 02](https://user-images.githubusercontent.com/78161484/190875635-f6d3aa36-47b2-4b09-ad6a-fe6df3fb11f1.png)

If everything is correctly filled out, your contract page on the block explorer will display a new tab called `Contract`:

![Verify 03](https://user-images.githubusercontent.com/78161484/190875780-6223b4b0-fecc-4e79-83bc-c810c5b0351c.png)

For more information about Hardhat, Please Visit [Hardhat Documentation](https://hardhat.org/tutorial).\
For more information about the XDC Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).\
Resources used during the deployment of the XRC721 Token can be found at [XRC721 Contract Folder](XRC721/).
