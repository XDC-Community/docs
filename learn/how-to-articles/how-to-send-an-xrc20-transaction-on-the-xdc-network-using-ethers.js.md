---
id: xrc20-token-ethers.js
title: Sending XRC20 Tokens on the XDC Network Using Ethers.js
description:  "Use Ethers.js to send XRC20 tokens over the XDC network"
keywords:
  - docs
  - apothem
  - token
  - XRC20
  - ethers.js
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
    - [What you will learn](#what-you-will-learn)
    - [What you will do](#what-you-will-do)
  - [📰 About XRC20 Tokens](#-about-xrc20-tokens)
- [🚀 Setting up the development environment](#-setting-up-the-development-environment)
  - [⚒ Starting a new NPM Project and Installing Dependencies](#-starting-a-new-npm-project-and-installing-dependencies)
  - [💵 Transacting an XRC20 token contract on the XDC Network with ethers](#-transacting-an-xrc20-token-contract-on-the-xdc-network-with-ethers)
  - [💵 Add funds to wallet using Apothem Faucet](#-add-funds-to-wallet-using-apothem-faucet)
  - [💵 What is an XDC transaction](#-what-is-an-xdc-transaction)
  - [💵 Setting up env file](#-setting-up-env-file)
  - [💵 Using ethers to transact XRC20](#-using-ethers-to-transact-xrc20)
  - [🔍 Verifying transaction via Apothem network explorer](#-verifying-transaction-via-apothem-network-explorer)

# 📰 Overview
[Ethers.js](https://github.com/ethers-io/ethers.js/) is a library written in Javascript which simplifies blockchain interactions.

### What you will learn
In this tutorial, you will learn how to import ethers.js, transact an XRC20 token, and set gas prices appropriately.

### What you will do
- Import ethers.js
- Transfer an XRC20 token
- Verify Transaction

## 📰 About XRC20 Tokens

XRC20 is a set of rules to standardize assets on the XDC network. Every XRC20 Token must be able to execute the following methods:

- `totalSupply()`
- `balanceOf(address account)` 
- `allowance(address owner, address spender)`
- `transfer(address recipient, uint amount)`
- `approve(address spender, uint amount)`
- `transferFrom(address sender, address recipient, uint amount)`

These are the minimum required methods that allow an asset on the XDC network to be called an XRC20 token. Also, a XRC20 token must be able to emit the following `Events` on the blockchain:

- `Approval(address indexed tokenOwner, address indexed spender,
 uint tokens)`
 - `Transfer(address indexed from, address indexed to,
 uint tokens)`
 
Events are helpers that come in handy in the exhaustive labor of indexing state changes, and they are essential to off-chain applications to find relevant data on the blockchain. By mapping all `Transfer` events, for example, we can fetch all the historic data on token transfers more easily.

Last but not least, a few contract constants that are public that are also very important to have are:

- `name`
- `symbol`
- `decimals`

Without these public constants, it would be impossible to label tokens on block explorers, for example. In this tutorial we will deploy a XRC20 token that have all the `Methods`, `Events` and `Constants` mentioned above.

# 🚀 Setting up the development environment

There are a few technical requirements before you start. Please install the following:

- [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
- [Git](https://git-scm.com/)

## ⚒ Starting a new NPM Project and Installing Dependencies

Start by setting up your folder. As we are creating a project called `XRC20`, you should create a new `XRC20` folder by running on terminal.

```bash
mkdir XRC20 && cd XRC20
```

Initialize the new project in that folder:
```sh
npm init
```
> Tip: to generate project without any questions you can use `npm init -y`

Install the necessary dependencies:
```sh
npm install ethers dotenv
```
## 💵 Transacting an XRC20 token contract on the XDC Network with ethers

Before sending actual transactions, we have to do some preparations.
## 💵 Add funds to wallet using Apothem Faucet

Go to https://faucet.apothem.network/ and paste your address and press `Request 1000 XDC`
![faucet](https://user-images.githubusercontent.com/102393474/191441945-6eee9b64-acef-4901-bf22-62becd342f93.png)

If you don't have an XDC address yet, you can create new wallet using [XDCPay](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo)

## 💵 What is an XDC transaction

An XDC transaction is a set of instructions one account sends to another. Transactions can be used to transfer native XDC token or for interactions with smart contracts.

## 💵 Setting up env file

You can use `.env.example` as a template.

Your `.env` file should look like this: 

```
XINFIN_NETWORK_URL=https://erpc.xinfin.network
XINFIN_PRIVATE_KEY=0xyourprivatekey
APOTHEM_NETWORK_URL=https://erpc.apothem.network
APOTHEM_PRIVATE_KEY=0xyourprivatekey
XRC20_TOKEN_ADDRESS=0xyourtokenaddress
```

> Tip: never commit files containing your seed phrase or private key to a git

❕ Keep in mind that you need to replace `xdc` prefix in your token address with `0x`.
So token address `xdcfc1b5137a6c8dffcf816857463afbb4672d462f3` will become `0xfc1b5137a6c8dffcf816857463afbb4672d462f3`.

If you don't have any XRC20 tokens, you can follow one of those tutorials to create one:

- [Create XRC20 token using Hardhat](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Hardhat/how-to.md)
- [Create XRC20 token using Remix](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Remix/how-to.md)
- [Create XRC20 token using Truffle](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Truffle/how-to.md)

If you don't know what private key is or how to get it, this is how you can copy your private key from XDCPay 
![stage0](https://user-images.githubusercontent.com/102393474/191442289-32269ab1-5b5a-4a94-b4a1-00a1d35a6358.png)
![stage1](https://user-images.githubusercontent.com/102393474/191442300-45cc3af3-674c-4fcd-9310-e8ae1daa731f.png)
![stage2](https://user-images.githubusercontent.com/102393474/191442310-4ada2b4f-43d0-4bd0-88f9-991e3a9cf9f4.png)
![stage3](https://user-images.githubusercontent.com/102393474/191442321-10a88d6b-664e-453b-a653-e938fc3c63b9.png)

## 💵 Using ethers to transact XRC20

Create a file named `send_token.js` in your project with following content:

```javascript
require('dotenv').config()
const ethers = require('ethers')
const XRC20ABI = require('./XRC20.json')

const testnetProvider = new ethers.providers.JsonRpcProvider(process.env.APOTHEM_NETWORK_URL)
const wallet = new ethers.Wallet(process.env.APOTHEM_PRIVATE_KEY, testnetProvider)
const walletSigner = wallet.connect(testnetProvider)

// we are using our address as a recipient, but you can use any address you want
const recipient_address = wallet.address
const your_xrc20_token_address = process.env.XRC20_TOKEN_ADDRESS
const number_of_tokens = ethers.utils.parseUnits('10', 18)

async function main() {
  const contract = new ethers.Contract(
    your_xrc20_token_address,
    XRC20ABI,
    walletSigner
  )

  const receipt = await contract.transfer(recipient_address, number_of_tokens)

  console.log(receipt.hash)
}

main()
```

Now lets go through each line:

```javascript
const XRC20ABI = require('./XRC20.json')
```

In order to interact with the contract, you need to provide an `ABI` or application binary interface. This is basically just list of functions and events which explains how to interact with smart contract. You can copy `ABI` from here [XRC20 ABI](./example-xrc20-transfer/XRC20.json)

```javascript
const testnetProvider = new ethers.providers.JsonRpcProvider(process.env.APOTHEM_NETWORK_URL)
```

You will create an rpc provider to be able to send and receive messages from blockchain.

```javascript
const wallet = new ethers.Wallet(process.env.APOTHEM_PRIVATE_KEY, testnetProvider)
const walletSigner = wallet.connect(testnetProvider)
```

This is your wallet which is used to sign transactions. You must connect it to your rpc provider.

```javascript
const recipient_address = wallet.address
const your_xrc20_token_address = process.env.XRC20_TOKEN_ADDRESS
const decimals = 18
const number_of_tokens = ethers.utils.parseUnits('10', decimals)
```

`recipient_address` is the recipient we want send tokens to, `your_xrc20_token_address` is XRC20 token we will transfer, and `decimals` is decimals value for your token and `number_of_tokens` is amount of tokens we will send.

```javascript
const recipient_address = "0x585dd46bfa516cc4325d877c614321f22ec7ce5e"
const your_xrc20_token_address = process.env.XRC20_TOKEN_ADDRESS
const decimals = 18
const number_of_tokens = ethers.utils.parseUnits('10', decimals)
```

If you would like to send the tokens to a different `recipient_address` simply replace`wallet.address` with the XDC address you would like to send the tokens to, being sure to replace the "xdc" prefix with "0x".

```javascript
const contract = new ethers.Contract(
  your_xrc20_token_address,
  XRC20ABI,
  walletSigner
)
```

We create a contract instance which we use to interact with our XRC20 contract on blockchain. First argument is token address, second is `ABI`, and the third is our wallet to sign transaction.

```javascript
const receipt = await contract.transfer(recipient_address, number_of_tokens)
console.log(receipt.hash)
```

Now lets run it!

```sh
node send_token.js
```

Next, wait few seconds and you should see something like this:

```
0xabf5957a25f943dfb1b71c6d9fc041c7c419b6440af4661f8aab21fc185bd134
```

## 🔍 Verifying transaction via Apothem network explorer

After running our script, you should have received a transaction hash. You can use this hash to check transaction on a blockchain.
To do this, go to https://explorer.apothem.network and paste your transaction hash in search field.

You should see the following:
![txinfo](https://user-images.githubusercontent.com/102393474/191441715-334960ee-4b40-455a-a14a-2e1b49e60609.png)

Here, you can see that your transaction ended with success:
![txstatus](https://user-images.githubusercontent.com/102393474/191441672-128fd5f5-a394-497c-8bea-27528901635f.png)

This is how much you ended up paying for our transaction:
![txprice](https://user-images.githubusercontent.com/102393474/191441705-df45c604-86aa-4e07-9680-5ae530be7cbb.png)

And here is how much tokens we sent:
![tokenamount](https://user-images.githubusercontent.com/102393474/191441729-eeb9d535-dd31-4cac-8aaa-fe19b7b2dce9.png)

---

For more information about ether.js check out [ethers.js github repo](https://github.com/ethers-io/ethers.js/) and [ethers.js documentation website](https://docs.ethers.io/v5/).<br>
For more information about the XDC Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
You can find resources used for this tutorial here [example-xrc20-transfer](./example-xrc20-transfer).
