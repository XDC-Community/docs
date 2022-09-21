---
id: xrc20-token-ethers.js
title: Sending XRC20 Tokens on the XDC Network Using Ethers.js
description:  "Use Ethers.js to send XRC20 tokens over XDC network"
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
  - [📰 About XRC20 Tokens](#-about-xrc20-tokens)
- [🚀 Setting up the development environment](#-setting-up-the-development-environment)
  - [⚒️ Starting a new NPM Project and Installing Dependencies](#-starting-a-new-npm-project-and-installing-dependencies)
- [💵 Transacting an XRC20 token contract on the XDC Network with ethers](#-transacting-an-xrc20-token-contract-on-the-xdc-network-with-ethers)
  - [💵 Add funds to wallet using Apothem Faucet](#-add-funds-to-wallet-using-apothem-faucet)
  - [💵 What is an XDC transaction](#-what-is-an-XDC-transaction)
  - [💵 Setting up env file](#-setting-up-env-file)
  - [💵 Using ethers to transact XRC20](#-using-ethers-to-transact-xrc20)
- [🔍 Verifying transaction via Apothem network explorer](#-veryfing-transaction-via-Apothem-network-explorer)

# 📰 Overview
[Ethers.js](https://github.com/ethers-io/ethers.js/) is a library written in Javascript which simplifies blockchain interactions.

### What you will learn
In this tutorial, you will learn how to import ethers.js, transact an XRC20 token, and set gas prices appropriately.

### What you will do
- Import ethers.js
- Transfer an XRC20 token
- Verify Transaction

## 📰 About XRC20 Tokens

XRC20 is a set of rules to standardize assets on the XinFin network. Every XRC20 Token must be able to execute the following methods:

- `totalSupply()`
- `balanceOf(address account)` 
- `allowance(address owner, address spender)`
- `transfer(address recipient, uint amount)`
- `approve(address spender, uint amount)`
- `transferFrom(address sender, address recipient, uint amount)`

These are the minimum required methods that allow an asset on the XinFin network to be called an XRC20 token. Also, a XRC20 token must be able to emit the following `Events` on the blockchain:

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

There are a few technical requirements before we start. Please install the following:

- [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
- [Git](https://git-scm.com/)

## ⚒ Starting a new NPM Project and Installing Dependencies

Lets start by setting up our folder, we are creating a project called `XRC20`, create a new `XRC20` folder by running on terminal

```bash
mkdir XRC20 && cd XRC20
```

Initialize new project in that folder:
```sh
npm init
```
> Tip: to generate project without any questions you can use `npm init -y`

Install necessary dependencies:
```sh
npm install ethers dotenv
```
## 💵 Transacting an XRC20 token contract on the XDC Network with ethers

Before sending actual transactions we have to do some preparations.
## 💵 Add funds to wallet using Apothem Faucet

Go to https://faucet.apothem.network/ and paste your address and press `Request 1000 XDC`

If you don't have XDC address yet, you can create new wallet using [XDCPay](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo)

Set up new wallet and then copy your address

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
So token address `xdcfc1b5137a6c8dffcf816857463afbb4672d462f3` will became `0xfc1b5137a6c8dffcf816857463afbb4672d462f3`.

If you don't have any XRC20 token, you can follow one of those tutorials to create one:

- [Create XRC20 token using Hardhat](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Hardhat/how-to.md)
- [Create XRC20 token using Remix](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Remix/how-to.md)
- [Create XRC20 token using Truffle](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Truffle/how-to.md)


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

We create an rpc provider to be able to send and receive messages from blockchain.

```javascript
const wallet = new ethers.Wallet(process.env.APOTHEM_PRIVATE_KEY, testnetProvider)
const walletSigner = wallet.connect(testnetProvider)
```

This is our wallet which is used to sign transactions. We are connecting it to our rpc provider.

```javascript
const recipient_address = wallet.address
const your_xrc20_token_address = process.env.XRC20_TOKEN_ADDRESS
const decimals = 18
const number_of_tokens = ethers.utils.parseUnits('10', decimals)
```

This is some arguments which we will use in our transaction. `recipient_address` is the recipient we want send tokens to, `your_xrc20_token_address` is XRC20 token we will transfer, `decimals` is decimals value for your token and `number_of_tokens` is amount of tokens we will send.

```javascript
const contract = new ethers.Contract(
  your_xrc20_token_address,
  XRC20ABI,
  walletSigner
)
```

We create a contract instance which we use to interact with our XRC20 contract on blockchain. First argument is token address, second is `ABI` and third is our wallet to sign transaction.

```javascript
const receipt = await contract.transfer(recipient_address, number_of_tokens)
console.log(receipt.hash)
```

Now let run it!

```sh
node send_token.js
```

Then wait few seconds and you should see something like this

```
0xabf5957a25f943dfb1b71c6d9fc041c7c419b6440af4661f8aab21fc185bd134
```

## 🔍 Verifying transaction via Apothem network explorer

After running our script, we received a transaction hash. We can use it to check transaction on a blockchain.
To do this, go to https://explorer.apothem.network and paste your transaction hash in search field.

You should see this.

Here we can see that our transaction ended with success.

This is how much we ended up paying for our transaction.

And here is how much tokens we sent.

---

For more information about ether.js check out [ethers.js github repo](https://github.com/ethers-io/ethers.js/) and [ethers.js documentation website](https://docs.ethers.io/v5/).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
You can find resources used for this tutorial here [example-xrc20-transfer](./example-xrc20-transfer).
