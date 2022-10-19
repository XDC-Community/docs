---
id: introduction-to-remix
title: Introduction to Remix
description:  "What Remix is, what it is used for, and how to use it for development on the XDC Network."
keywords:
  - docs
  - apothem
  - token
  - remix
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
    - [What you will learn](#what-you-will-learn)
    - [What you will do](#what-you-will-do)
  - [📰 About Remix](#-about-remix)
    - [Why do you need development environment](#why-do-you-need-development-environment)
- [🎧 Create Remix project](#-create-remix-project)
  - [Remix project structure](#-remix-project-structure)
- [🎧 Remix Solidity Editor](#-remix-solidity-editor)
- [🎧 Remix File Explorer](#-remix-file-explorer)
- [🎧 Remix Compiler](#-remix-compiler)
- [🎧 Remix Plugin Manager](#-remix-plugin-manager)
- [🎧 Using XinFin Remix to develop on XDC](#-using-xinfin-remix-to-develop-on-xdc)
  - [🎧 Configuring XDC Mainnet and Apothem Testnet on XinFin Remix](#-configuring-xdc-mainnet-and-apothem-testnet-on-xinfin-remix)

# 📰 Overview

<p align="center">
  <img width=20% src="https://remix.xinfin.network/assets/img/guitarRemiCroped.webp" alt="remix"/>
</p>

[Remix](https://remix.xinfin.network/) is a browser-based **IDE**, which stands for **Integrated Development Environment**. Remix provides you platform with tools for development smart contracts on Ethereum-like blockchains.

### What you will learn
This article will teach you what Remix is, what Remix is used for, and how to use the features of Remix for development on the XDC Network.

### What you will do
- Learn what Remix is
- Explore features of Remix IDE
- Learn how Remix can be used to develop on XDC network

## 📰 About Remix

Remix is intergrate development environment which lets you compile, test and deploy smart contracts on Ethereum-like networks. Remix is all-in web application so it requires no setup. You can start developing on XDC right after openning [XinFin Remix](https://remix.xinfin.network).

### Why do you need development environment

Deploying smart contracts is a very complex task and can cost you a lot of money if you do it wrong, that's why you need to use development environment like Remix. 

Remix comes with all tools you need out of box, including built-in Solidity Editor, File Explorer and Terminal, which make you life easier and increase your productivity as dApp developer.

## 🎧 Remix Overview

Remix consists of four key parts:
 - Solidity Editor
 - File Explorer
 - Solidity Compiler
 - Plugin Manager
 - Terminal

## 🎧 Start New Project

To create new project, simply press `+` near `Workspaces` in File Explorer and then provide a name for your project.

### Remix project structure

Remix project has the following folders:

- `contracts`: folder for smart contract source code
- `contracts/artifacts`: contains contract compilation artifacts
- `scripts`: folder where scripts for deploying are stored
- `test`: place to store both Javascript and Solidity tests

## 🎧 Remix Solidity Editor

In Solidity Editor, you can edit our smart contract and it will recompile it each time it is editor. It also provides word completion and syntax highlighting for solidity language. You can open and edit multiple files in different.

## 🎧 Remix File Explorer

File Explorer displays workspaces and their files. You can select workspace by clicking workspace dropdown or add new workspaces. Each workspace represents separate Remix project, with folder structure described above. File Explorer lets you create, move, rename, delete, copy files. You can run custom scripts by right-clicking and pressing `Run` on them.

## 🎧 Remix Compiler

In compiler window you can configure options for solidity compiler:

 - `compiler`: version of solidity compiler
 - `language`: Solidity or Yul (for version >=0.5.7)
 - `evm version`: version of ethereum virtual machine
 - `auto compile`: compiles your solidity contract each time it is changed
 - `enable optimizations`: optimize smart contract gas usage

Once configured, you can compile contract currently selected in File Explorer by hitting `Compile` button. Compiler will compile contract and all its dependencies.

After compilation is finished, you can publish resulting contract on IPFS, see the compilation details or copy its ABI.

## 🎧 Remix Deployer

Now lets take a look at `Deploy & run transactions` window. First is `Environment` menu. XinFin Remix provides for options for connecting to a blockchain:

- `Javascript VM`: For connecting to a local browser-based blockchain node started by XinFin Remix. On each reload XinFin will create new blockchain instance and **the old one will be deleted**.
- `Injected Web3`: For connecting XinFin Remix to an injected web3 provider. The most common injected provider is `Metamask` and `XDCPay`.
- `Web3 Provider`: For connecting XinFin Remix to a remote node.

`Account` field shows XDC address which will be used to deploy your contract.
In `Gas Limit` field you can select maximum amount of gas used to deploy your contract and in `Value` you can set amounts of XDC tokens sent on creation. 
Then you select previously compiled contract in `Contract` field and hit `Deploy` to deploy it on selected environment. 

Once contract is deployed, you can interact with its methods by expanding it in `Deployed Contracts` list. If you already deployed your contract and just want to interact with it through Remix IDE, you can paste its address in `At Address` field.

### Recording & Replaying transactions.

Recording and replaying use cases are:
 - automating multi-transaction deployment 
 - testing your contracts in simulated environment and then deploying it to live network.
 - record transactions for debugging

To record transactions, simply press `save` icon under `Transactions recorded` block. Transactions will be save in `JSON` format under provided name or `scenario.json` by default. To replay transactions, select one of scenarios you recorded in File Explorer and hit `run` icon in under `Transactions recorded` block.


## 🎧 Remix Terminal

In Remix terminal you can do the following things:

 - View logs of Remix actions, like deploying or interactions with a contract
 - Search for transactions
 - By checking `listen on network` you will get a log of all blocks mined to currently connected blockchain network. 
 - Run custom web3 scripts. To do that, type `remix.execute(pathToScript)` or elect script to be active in editor and type `remix.exeCurrent()` in command line at the bottom.

## 🎧 Remix Plugin Manager

Remix has extensible plugin architecture and plenty of ready-to-use plugins avaiable in Plugin Manager window. With plugins you can add support for a specific blockchain network, enable testing and debugging capabalities to solidity and more. If you want some plugin that is not present in Plugin Manager, you can always add new plugins buy pressing `Connect to a Local Plugin`.

Some of useful plugins for starting dApp development are:
 - `Debugger`: lets you debug transactions
 - `DGit`: adds git capabilites to Remix IDE
 - `Flattener`: flattens contracts which use dependency so you can verify them on Block Explorer.
 - `Solidity Unit Testing`: adds support of unit testing for your solidity contracts

## 🎧 Using XinFin Remix to develop on XDC

XDC provides its own version of Remix here on [remix.xinfin.network](https://remix.xinfin.network) which is optimized for development on XDC.

## 🎧 Configuring XDC Mainnet and Apothem Testnet on XinFin Remix

To deploy smart contract on XDC network, you need to select `Injected Web3` in `Environment` dropdown menu. Then connect XinFin Remix IDE to your browser wallet with XinFin or Apothem network configured.

---

For more information about Remix, Please Visit [Remix Documentation](https://remix-ide.readthedocs.io/en/latest/).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>