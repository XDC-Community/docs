---
id: remix-example
title: Using Remix Example
description:  "Use Remix to deploy a Smart Contract."
keywords:
  - docs
  - apothem
  - smart
  - contract
  - remix
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
- [🚀 Setting up the development environment](#-setting-up-the-development-environment)
  - [⚒️ Creating XDCPay Wallet for signing transactions](#%EF%B8%8F-creating-xdcpay-wallet-for-signing-transactions)
  - [⚒️ Adding Testnet XDC to Development Wallet](#-adding-testnet-xdc-to-development-wallet)
- [🍕 Writing our first Smart Contract](#-writing-our-first-smart-contract)
  - [🍕 Compiling](#-compiling)
  - [🍕 Deploying](#-deploying)
- [🔍 Veryfing Contracts on the Block Explorer](#-veryfing-contracts-on-the-block-explorer)
- [🍕 Interacting with your contract using Remix IDE](#-interacting-with-your-contract-using-remix-ide)

# 📰 Overview
[Remix IDE](https://remix.xinfin.network/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js) is a blockchain development environment, which you can use to create and test smart contracts by levering an Ethereum Virtual Machine.

### What you will learn
This guide aims at teaching how to create a smart contract using Remix IDE and deploying it on XDC Network.

### What you will do
- Setup Remix IDE
- Creating XDCPay Wallet and using faucet for test XDC tokens
- Deploy contract on XDC Network
- Check the deployment status on [xinfin.network](https://xinfin.network/#stats).

# 🚀 Setting up the development environment

Remix is an online solidity IDE for compiling and deploying solidity code to EVM compatible blockchains. To begin working on a new smart contract, we must first create a new file in the contracts folder on the left side of the view pane.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190065372-1e43e443-f13b-463a-abb6-7497ae7c8b8c.png" width=1000px>
</p>

## ⚒️ Creating XDCPay Wallet for signing transactions

In order to get started deploying new contracts on XDC Mainnet and/or Apothem, we need to have XDCPay wallet to sign our transactions and store XDC tokens.

- First we have to install the chrome extension of [XDCPay](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo).

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190068514-7beac72f-ea99-49c9-ada7-7e88dc8cbf3e.png">
</p>

- Open the Chrome extension after it has been successfully installed.
- Agree to the Terms of Service. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190069353-3214410d-0526-41c9-9c1c-1170a10840c6.png">
</p>

- Create a new XDCPay wallet by setting up a strong password or use an existing Seed Phrase **`12 or 24-Word Mnemonic Phrase`** to recover your existing wallet here.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190121441-7b972e85-8ec0-47c2-adae-4e6c3fb01528.png">
</p>

- Keep the seed phrase safe. 🚨 **Do not share the seed phrase with anyone or you can risk losing your assets and/or the ownership of your smart contracts!** 🚨

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190071788-c134a5bc-599a-4a6d-a481-e7cf62e75a51.png">
</p>

- Verify recovery phrase
- Your XDCPay wallet has been successfully created.


## ⚒ Adding Testnet XDC to Development Wallet

Initially, our account would be empty, and we would require some XDC tokens to initiate blockchain transactions. We would use a faucet to fill our wallet with test XDC tokens for this. These tokens are worthless in and of themselves. They are simply used to test your contracts on the testnet in order to avoid losing your real money.

- First, make a copy of your wallet address. Your wallet address would look like **`xdc057ac7de8ad6f21c7bb0dcc6a389ff9161b3b943`**. These account address are interchangeable with Ethereum network. We can access these accounts on Ethereum network by simply changing the initial `xdc` with `0x`. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190072656-cf4a819b-92e1-4eb3-948b-7c6dbc8bafc1.png">
</p>

- After that, navigate to the [XDC faucet](https://faucet.apothem.network/).
- Enter your XDC account address and request for Test XDC here.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190073022-1d893bce-5f21-494d-8e28-20cdb9b91299.png">
</p>

- If your request is approved, you will be credited with the XDC in your wallet.
- If you can't see the XDC in your wallet, make sure you're connected to the XDC Apothem Testnet or the XDC Mainnet.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190086617-07b3e4a8-4b4e-4e08-affa-97cce7b1f192.png">
</p>

- If you are currently connected to the XDC Mainnet, switch to the XDC Apothem Testnet.


# 🍕 Writing our first Smart Contract

Lets create a simple `Pizza.sol` contract on Solidity, the Pizza contract should have:

 - a `constructor` where the deployer can define the pizza size, 
 - a `eatSlice` method to consume slices available, 
 - a `bakeNewPizza` method to refill all slices only if the previous pizza have been entirely eaten! 😋

Lets start by creating the `Pizza.sol` file:

Click on the **`New File`** button on the center navigation or in the left navigation pane within the **`contracts`** folder.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190065372-1e43e443-f13b-463a-abb6-7497ae7c8b8c.png" width=1000px>
</p>

And write the following code to `Pizza.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

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

The first line of code **`// SPDX-License-Identifier: MIT`** specifies the License Permissions. This line is required for error-free compilation.

The line **`pragma solidity ^0.8.16;`** specifies the version used to write the solidity code. As we all know, Solidity is a rapidly evolving language, and there may be changes that will not work with a newer version of the Solidity compiler. As a result, we include this line to compile the code with a specific version. [Pragmas](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragmas) are common instructions for compilers about how to treat the source code (e.g., pragma once).

The line **`contract Pizza {}`** is used in our smart contract to create a Solidity contract. Contracts in Solidity are similar to classes in object-oriented languages. A Solidity contract is a collection of code (its functions) and data (its state) that is stored at a specific address on the Ethereum blockchain. The line **`uint256 public PIZZA_SIZE;
    uint256 public slices;`** declares state variables of type uint256 called PIZZA_SIZE and slices. Both of these functions have a [public](https://docs.soliditylang.org/en/latest/contracts.html?highlight=public#state-variable-visibility) property that allows you to access the current value of the state variable from outside of the contract.
    
 We set initial value for **`PIZZA_SIZE`** in the constructor function and then place that value within the slices count.

Then we create a function **`eatSlice`** that decrements the value in the **`slices`** variable. We also have a function called **`bakeNewPizza`** where we increase the count of **`slices`** of the value of **`PIZZA_SIZE`**. Both these functions are of **`public`** type.


## 🍕 Compiling

Lets try compiling the `Pizza.sol` contract:

- Open the Solidity Compiler in the left side navigation pane <img src="https://user-images.githubusercontent.com/60708843/190066438-b1816a19-3051-4d04-87d2-a2b1ade198f4.png" width=50px>.

- From the compiler option, select the compiler version **`v0.8.16`**.
- Choose Language as **`Solidity`**.
- Set the EVM version as the **`compiler default`**.
- Next, select **`Compile Pizza.sol`**.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191068355-eccc73c6-d7be-4d0b-ae69-e9cad4f94139.png">
</p>

- After Successful Compilation, it will show ![alt](https://user-images.githubusercontent.com/60708843/190067983-4451282c-348c-4872-a57d-b2e698b59cad.png)

- Once our contract has been compiled, we can deploy it to the Apothem Test Network.


## 🍕 Deploying

For deployment on the XDC Apothem Testnet. In either case, you need to have enough funds to pay for gas fees on the address that is being used for development.

- Navigate to Deploy and Transactions ![alt](https://user-images.githubusercontent.com/60708843/190074569-0f6cccdb-08d6-41e9-8c54-9ac9c648a283.png).

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191068992-c110873f-6c01-4843-b50f-229220392231.png">
</p>

- Choose Injected Web3 as the Environment.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191069823-c1b9c78d-e217-49e5-b86b-972ba14f02c6.png">
</p>

- Confirm the popup to add the account to Remix IDE now.
- Next, choose the account to which you want to deploy the contract.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191070126-3f4806f0-4e0d-4ea9-a8de-983c9b1f4d6f.png">
</p>

- Choose the contract you want to use.
- Add the number of Pizza slices that we wish to create the pizza and deploy the contract.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191071346-650c1ea1-c254-4266-b41d-0ed08acaa4f5.png">
</p>

- A popup will appear, which we must confirm in order to create the transaction for contract deployment.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190075747-c7d1f7a6-2737-49ac-bd72-681a84bd95b0.png">
</p>


# 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

First lets check the address our contract is deployed. Go to your wallet and get the most recent transaction details, then copy the transaction address. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190076901-179e4fac-d4e8-43c7-a657-ea525a4e3883.png">
</p>

Next, navigate to the [XDC Block explorer](https://explorer.apothem.network/) and paste the transaction hash there.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190076901-179e4fac-d4e8-43c7-a657-ea525a4e3883.png">
</p>

From there, we need to get the transaction details as well as the **`To Address`** where the contract is deployed. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191072000-7aed020a-bd12-4536-ab68-dd45f0044121.png">
</p>

Here we have a `Pizza` contract deployed on XDC Apothem Testnet, we can search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191072440-378183b9-0993-47d3-a7c8-9525b2ac1e04.png" alt="Verify 01"/>
</p>

And click in the `Verify And Publish` Option. 

We will be redirected to the Contract verification page where we need to fill out:

- Contract Name: <em>Pizza</em>
- Compiler: <em> Check your Solidity file for Compiler Version</em>
- Contract Code: <em> Just paste everything from your</em> `Pizza.sol` <em>file</em>

Once everything is filled out, press Submit!

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191073606-85912e16-e061-4b78-a423-6623d2e8d64d.png" alt="Verify 02"/>
</p>

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191074148-2de679fb-1757-4dfa-b635-aec6d1faab59.png" alt="Verify 03"/>
</p>

In this page you can Read from, Write to, or simply read the information tied to your Smart Contract on the blockchain:

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191074476-afe017e7-5529-40de-ab16-d8caaf61dae1.png" alt="Verify 03"/>
</p>



## 🍕 Interacting with your contract using Remix IDE

We can easily test our contract with the help of that contract address. To start interacting with you smart contracts you can start running,

- Return to the Remix IDE.
- Navigate to the deploy section, paste the contract address, and then click the **`At Address`** Button. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191074867-7287bc46-3e37-41e8-aa41-1ea55ac1d85a.png" alt="Verify 03"/>
</p>

- We would then be shown all of the different functions and variables that were available for us to see and use.
- When we click that button after running our `eatSlice()` method, a transaction is started and its value is stored on the network. It should log a transaction confirmation (Or rejection) object

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/60708843/190078140-9cba86b1-40e7-46e2-b492-730db149d7fa.png" alt="Verify 03"/>
</p>


- This transaction is immediately reflected in the corresponding block explorer, [as seen here!](https://explorer.apothem.network/txs/0xbd07e02b75269798aba446db913336e1250325a1c395ef5a003ab56a1a22013f#overview)


---

For more information about Remix IDE, Please Visit [Remix IDE Documentation](https://remix-ide.readthedocs.io/en/latest/).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
Resources used during the deployment of the Pizza Smart Contract can be found at [The Pizza Contract Folder](./Pizza).






