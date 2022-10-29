---
id: xrc20-token-hardhat-typescript
title: XRC20 using TypeScript and Hardhat
description:  "Use TypeScript and Hardhat to deploy an XRC20 Token."
keywords:
  - docs
  - apothem
  - token
  - XRC20
  - hardhat
  - typescript
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
    - [What you will learn](#what-you-will-learn)
    - [What you will do](#what-you-will-do)
  - [📰 About XRC20 Tokens](#-about-xrc20-tokens)
- [⚒ Starting a new Hardhat Project](#-starting-a-new-hardhat-project)
  - [⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat](#-configuring-xdc-mainnet-and-apothem-testnet-on-hardhat)
  - [⚒ Adding Testnet XDC to Development Wallet](#-adding-testnet-xdc-to-development-wallet)
- [💵 Writing your first XRC20 Token](#-writing-our-first-xrc20-token)
  - [💵 Constants](#-constants)
  - [💵 Events](#-events)
  - [💵 Methods](#-methods)
  - [💵 Compiling and Deploying](#-compiling-and-deploying)
- [🔍 Veryfing Contracts on the Block Explorer](#-veryfing-contracts-on-the-block-explorer)
  - [🔍 Interacting with your contract on the Block Explorer](#-interacting-with-your-contract-on-the-block-explorer)

# 📰 Overview

<p align="center">
  <img width=10% src="https://raw.githubusercontent.com/menezesphill/application_utils/main/hardhaticon.png" alt="hardhat"/>
</p>

[Hardhat](https://hardhat.org/) is a development environment to compile, deploy, test, and debug your Ethereum software. Get Solidity stack traces & console.log.

[TypeScript](https://www.typescriptlang.org/) is a strongly typed programming language that builds on TypeScript.

### What you will learn

In this tutorial, you will learn how to set up Hardhat and use it to build, test, and deploy a XRC20 token on both the XDC Network mainnet and XDC Apothem testnet.

### What you will do

- Install and setup Hardhat
- Create an XRC20 token
- Compile the XRC20 token
- Deploy the XRC20 token
- Interact with the XRC20 token
- Check the deployment status on [xinfin.network](https://xinfin.network/#stats)

## 📰 About XRC20 Tokens

XRC20 is a set of rules to standardize assets on the XinFin network. Every XRC20 token must be able to execute the following methods:

- `totalSupply()`
- `balanceOf(address account)`
- `allowance(address owner, address spender)`
- `transfer(address recipient, uint amount)`
- `approve(address spender, uint amount)`
- `transferFrom(address sender, address recipient, uint amount)`

These are the minimum required methods that allow an asset on the XDC Network to be called an XRC20 token. Also, a XRC20 token must be able to emit the following `Events` on the blockchain:

- `Approval(address indexed tokenOwner, address indexed spender,
 uint tokens)`
 - `Transfer(address indexed from, address indexed to,
 uint tokens)`

Events come in handy in the exhaustive labor of indexing state changes, and they are essential for off-chain applications to find relevant data on the blockchain. By mapping all `Transfer` events, for example, we can fetch all the historic data on token transfers more easily.

In addition, a few contract constants that are public that are also very important to have are:

- `name`
- `symbol`
- `decimals`

Without these public constants, it would be impossible to label tokens on block explorers, for example. In this tutorial, we will deploy a XRC20 token that have all the `Methods`, `Events`, and `Constants` mentioned above.

# ⚒ Starting a new Hardhat Project

There are a few technical requirements before we start. Please install the following:

- [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
- [Git](https://git-scm.com/)

Next, set up your folder. As we are creating a project called `XRC20`, create a new `XRC20` folder by running the following on terminal:

```bash
mkdir XRC20 && cd XRC20
```

We can get started with Hardhat by running:

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


<p align="center">
  <img width=40% src="https://user-images.githubusercontent.com/78161484/191259993-b817901f-7df9-4df1-bb1c-c4805c416974.png" alt="hardhat config"/>
</p>

Press `↓` and `ENTER` to get started with a new TypeScript Hardhat Project. You will then be presented with the following options:

```sh
✔ Hardhat project root: · /Users/cr/XRC20
✔ Do you want to add a .gitignore? (Y/n) · y
✔ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · n

✔ Do you want to install this sample project's dependencies with npm (hardhat @nomicfoundation/hardhat-toolbox)? (Y/n) · y
```

The standard Hardhat project comes with a pre-created `Lock.sol` contract and `deploy.ts` script. You should clean up your working environment before moving forward:

```sh
rm -f ./contracts/Lock.sol ./scripts/deploy.ts ./test/Lock.ts
```

Your folder files will look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/14329097/192099706-bcd0f3ad-2ad1-4a3a-880f-9dcc5bbe4a72.png" alt="hardhat folder"/>
</p>

## ⚒ Configuring XDC Mainnet and Apothem Testnet on Hardhat

In order to get started deploying new contracts on XDC Mainnet and/or Apothem, we need to install a new dependency called `dotenv` that will be used in the `hardhat.config.ts` file:

```bash
npm install --save-dev dotenv
```

You will need to configure a `.env` file with XDC Mainnet and Apothem Testnet RPC endpoints, plus the _Private Key_ of the wallet we are using for deployment. Lets start by running:

```bash
touch .env
```

Next, write the following info in your .env file:

```bash
XINFIN_NETWORK_URL=https://erpc.xinfin.network
APOTHEM_NETWORK_URL=https://erpc.apothem.network
PRIVATE_KEY=202e3c9d30bbeca38d6578659919d4c3dc989ae18c16756690877fdc4dfa607f
```
🚨 **Do not use the Private Key in the example above in production or you can risk losing your assets!** 🚨

Finally, we can configure the `hardhat.config.ts` file for both Apothem and XinFin Networks by writting:

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
      accounts: [process.env.PRIVATE_KEY!]
    },
    apothem: {
      url: process.env.APOTHEM_NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY!]
    }
  }
};

export default config;
```

## ⚒ Adding Testnet XDC to Development Wallet

Now check your Signer's address on Hardhat by accessing the Hardhat console:

```sh
npx hardhat console --network xinfin
```
If you get an error that hardhat is not installed locally and are running on a Windows OS, you will need to execute:

```sh
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Once the hardhat console CLI opens, you can run:

```js
> const hre = require("hardhat");
// Should log: Undefined
> const [owner] = await ethers.getSigners();
// Should log: Undefined
> owner.address
// Should log: '0xA4e66f4Cc17752f331eaC6A20C00756156719519' or your wallet address if you are using a different Private Key
```

This account is on the Ethereum standard format starting with `0x`, but you can simply switch `0x` for `xdc`. In this example, our signer wallet address is: `xdcA4e66f4Cc17752f331eaC6A20C00756156719519`.

With this account in hand, we can head to the [Apothem Faucet](https://faucet.apothem.network/) and claim some TXDC for development purposes:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/189952656-eb7793cc-7dee-4307-88fc-7c351a75cec7.png" alt="Step 02"/>
</p>

# 💵 Writing our first XRC20 Token

The source code for the XRC20 token used in this tutorial is available here: [XRC20 Contract Folder](./XRC20/contracts/XRC20.sol). But we will address all `Events`, `Methods`, and `Constants` mentioned in the section [📰 About XRC20 Tokens](#-about-xrc20-tokens).

Start by creating the `XRC20.sol` file:

```sh
touch ./contracts/XRC20.sol
```


Write the shell of your smart contract as shown here:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token.
 */

contract XRC20Token {

}
```

## 💵 Constants

Inside `contract XRC20Token`, you will instantiate `name`, `symbol` and `decimals` as public variables, as well as a private `_totalSupply` that will be used on our `totalSupply()` method later on. You will also have two mapping variables, `balances` and `allowances`, which are key/value variables that maps user balances and approved spending allowances to other users:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token.
 */

contract XRC20Token {

    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 private _totalSupply;

    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowances;

    // To be Continued ...

}
```

## 💵 Events

As mentioned in [📰 About XRC20 Tokens](#-about-xrc20-tokens), events are very important part of a smart contract logic. Events have `indexed` variables that are variables that can be filtered by off-chain interfaces. We might be tempted to index all the variables that are tied to an on-chain event, but Solidity has a _maximum of 3 indexed variable_ limitation for events. Here is how you'll write both `Approval` and `Transfer` events:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token.
 */

contract XRC20Token {

    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 private _totalSupply;

    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowances;

    // Notice we indexed only the ADDRESSES in Approval and Transfer since it
    // would be not practical to filter transactions nor approvals by value.

    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    // To be Continued ...

}
```

## 💵 Methods

You'll need to create the six methods mentioned in [📰 About XRC20 Tokens](#-about-xrc20-tokens) (`totalSupply`, `balanceOf`, `allowance`, `transfer`, `approve` and `transferFrom`) and a `constructor` that is a function used only once, when the contract is deployed, where we can attach information such as the token name, decimals and/or initial token supply:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token.
 */

contract XRC20Token {

    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 private _totalSupply;

    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowances;

    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;

        _totalSupply += _initialSupply * 10 ** decimals;
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual returns (uint256) {
        return balances[account];
    }

    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return allowances[owner][spender];
    }

    function transfer(address recipient, uint amount) external returns (bool) {
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowances[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

}
```

Now, you have implemented everything necessary to make your token compliant with the XRC20 Standard. Of course, there are more features that you can implement to this contract, such as the [SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) library that replace naive mathematical operations for methods that will avoid `underflows` and `overflows`, and supply management methods such as `mint` and `burn`.

## 💵 Compiling and Deploying

Now you can compile your `XRC20.sol` by running:

```sh
npx hardhat compile
```

If everything is correctly configured and there are no errors, you will see the following message on your console:

```sh
Generating typings for: 1 artifacts in dir: typechain-types for target: ethers-v5
Successfully generated 6 typings!
Compiled 1 Solidity file successfully
```

Your folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/14329097/192099710-95371105-2268-49bf-b0e6-121de01dc651.png" alt="Folder 02"/>
</p>

In order to deploy your newly-compiled contract artifacts to the blockchain, you'll need to create a deployment script into the script folder:

```sh
touch ./scripts/deploy.ts
```

Next, you'll need to write the following script to the `deploy.ts` file:

```ts
import { ethers } from "hardhat";

async function main() {
  const XRC20 = await ethers.getContractFactory("XRC20Token");
  const myToken = await XRC20.deploy("MyToken", "MTK", 18, 1000);

  await myToken.deployed();

  console.log("Token Successfully Deployed!");
  console.log("Token address:", myToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

If the deployment script has no errors, you can go ahead and run the following command for deployment of the XDC Mainnet:

```sh
npx hardhat run scripts/deploy.ts --network xinfin
```

Or this command, for deployment of the XDC Apothem Testnet:

```sh
npx hardhat run scripts/deploy.ts --network apothem
```
In either case, you must have enough funds to pay for gas fees on the address that is being used for development.

If the deployment is sucessful, the console should log the following message after migrations complete processing:

```sh
Token Successfully Deployed!
Token address: 0xbC5bA2B6e2f74EC1e8e5A310a42F65D185691Af2
```

# 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

Now grab the `XRC20.sol` address from the previous step. This address is in the Ethereum standard, but you can simply swap the `0x` prefix for `xdc`. After this prefix swap, search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190875518-828c0061-71de-42c2-b222-0b8427852d01.png" alt="Verify 01"/>
</p>

Click on the `Verify And Publish` option.

You will be redirected to the contract verification page where you'll need to fill out:

- Contract Name: <em>XRC20Token</em>
- Compiler: <em> Check your</em> `hardhat-config.ts` <em>file for Compiler Version</em>
- Contract Code: <em> Just paste everything from your</em> `XRC20.sol` <em>file</em>

Once everything is filled out, press Submit!

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190875635-f6d3aa36-47b2-4b09-ad6a-fe6df3fb11f1.png" alt="Verify 02"/>
</p>

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190875780-6223b4b0-fecc-4e79-83bc-c810c5b0351c.png" alt="Verify 03"/>
</p>

## 🔍 Interacting with your contract on the Block Explorer

With your XDCPay wallet, it is possible to interact with verified Smart Contracts on the [XinFin Network Block Explorer](https://explorer.xinfin.network/). You can read from, write to, or simply read the information tied to your Smart Contract on the blockchain.

Now head to the `Contract` tab on the explorer, choose `Write Contract`, and click in `Connect to Web3` to connect your XDCPay wallet.

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190876289-57de5994-809a-4307-b68d-6bb37e3601af.png" alt="Verify 04"/>
</p>

Try transfering `500 MTK` tokens that you have just created to a new wallet `xdc0431d52fe37f3839895018272dfa3ba189fce07e`. Fill out the `recipient` field with the new wallet address, and fill out the `amout` field with `500 * 10 ^ 18`. Remember that your token has 18 decimals. When you write numbers to the blockchain you must to account for the decimals as the virtual machine does not understand floating numbers the way humans do:

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190876402-32e800d4-b456-499d-8255-ba10aa35c0af.png" alt="Verify 05"/>
</p>

After clicking in `Write`, you'll need to confirm the transaction on the XDCPay wallet:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/190876653-eb8e558b-2b09-4c0f-ad5f-a3d17a54bf30.png" alt="Verify 05"/>
</p>

You can check your successful transaction on the [Block Explorer!](https://explorer.xinfin.network/txs/0xa365a7edea3af9ed22c6dffb2f24987f1941f21dbd4d9bbb13b11022439de96a#overview)

---

For more information about Hardhat, Please Visit [Hardhat Documentation](https://hardhat.org/tutorial).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
Resources used during the deployment of the XRC20 Token can be found at [XRC20 Contract Folder](./XRC20).
