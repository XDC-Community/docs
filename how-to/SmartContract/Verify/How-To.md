---
id: verify-smart-contract
title: Verify Smart Contract
description:  "To verify smart contracts on the XDC Network"
keywords:
  - docs
  - apothem
  - verify
  - contract
  - remix
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
- [🔍 Viewing Deployed Contracts on the Block Explorer](#-viewing-deployed-contracts-on-the-block-explorer)
- [🔍 Veryfing Contracts on the Block Explorer](#-veryfing-contracts-on-the-block-explorer)

# 📰 Overview
Smart Contracts are a piece of code which when deployed on the blockchain, will always remain there and there is no way to change the logic of that smart contract until and unless it is specified in the smart contract. Also any such update to the code will result in an immutable change which is registered to the network for forever.
Whenever we deploy a smart contract, we also have the option to `Verify and Publish` the smart contract so that others can check it out and see whether the logic is the same as popularised in the protocol advertisements. 
This also gives an option to find some malicious smart contracts over the blockchain.

### What you will learn
This guide aims at teaching how to verify a smart contract on the XDC Apothem Testnet.

### What you will do
- Checking the deployed smart contract on Block Explorer
- Verify the smart contract on a block explorer
- Check the deployment status on [xinfin.network](https://xinfin.network/#stats).

## 🔍 Viewing Deployed Contracts on the Block Explorer

We can deploy our smart contracts on the XDC Apothem Testnet or XinFin Mainnet according to our requirements. 

First we would like to get the address of the deployed smart contract that we have to verify on the Block Explorer. For that we have to go to the XDCPay wallet and get the latest transaction hash that we performed to create the deployment.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190076901-179e4fac-d4e8-43c7-a657-ea525a4e3883.png">
</p>

If we are deploying the smart contract using Truffle or Hardhat, we would have to get the respective transaction hash from the terminal and get the respective deployed contract address from the block explorer or terminal itself. 

```
Token Successfully Deployed!
Token address: 0xbC5bA2B6e2f74EC1e8e5A310a42F65D185691Af2
```

Next, navigate to the [XDC Block explorer](https://explorer.apothem.network/) and paste the transaction hash there.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190076901-179e4fac-d4e8-43c7-a657-ea525a4e3883.png">
</p>

From there, we need to get the transaction details as well as the **`To Address`** where the contract is deployed. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/191072000-7aed020a-bd12-4536-ab68-dd45f0044121.png">
</p>


# 🔍 Veryfing Contracts on the Block Explorer

Here we have a contract deployed on XDC Apothem Testnet, we can search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

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

`In case, you are importing some external packages or libraries within your code, you would have to flatten out your smart contract first and then verify that flattened smart contract on the Block Explorer. You can check out our tutorials to flatten the smart contracts on Remix IDE, Truffle and Hardhat also. `

---

For more information about Remix IDE, Please Visit [Remix IDE Documentation](https://remix-ide.readthedocs.io/en/latest/).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>

