---
id: introduction-to-remix
title: Introduction to Remix
keywords:
  - docs
  - apothem
  - token
  - remix
description: >-
  What Remix is, what it is used for, and how to use it for development on the
  XDC Network.
---

# Remix

## 🧭 Table of contents

* [🧭 Table of contents](remix.md#-table-of-contents)
* [📰 Overview](remix.md#-overview)
  * [What you will learn](remix.md#what-you-will-learn)
  * [What you will do](remix.md#what-you-will-do)
  * [📰 About Remix](remix.md#-about-remix)
    * [Why do you need development environment](remix.md#why-do-you-need-development-environment)
* [🎧 Start New Project](remix.md#-start-new-project)
  * [Remix project structure](remix.md#remix-project-structure)
* [🎧 Remix Solidity Editor](remix.md#-remix-solidity-editor)
* [🎧 Remix File Explorer](remix.md#-remix-file-explorer)
* [🎧 Remix Compiler](remix.md#-remix-compiler)
* [🎧 Remix Plugin Manager](remix.md#-remix-plugin-manager)
* [🎧 Using XinFin Remix to develop on XDC](remix.md#-using-xinfin-remix-to-develop-on-xdc)
  * [🎧 Configuring XDC Mainnet and Apothem Testnet on XinFin Remix](remix.md#-configuring-xdc-mainnet-and-apothem-testnet-on-xinfin-remix)

## 📰 Overview

![remix](https://remix.xinfin.network/assets/img/guitarRemiCroped.webp)

[Remix](https://remix.xinfin.network/) is a browser-based **IDE**, which stands for **Integrated Development Environment**. Remix provides you platform with tools for development smart contracts on Ethereum-like blockchains.

#### What you will learn

This article will teach you what Remix is, what Remix is used for, and how to use the features of Remix for development on the XDC Network.

#### What you will do

* Learn what Remix is
* Explore features of Remix IDE
* Learn how Remix can be used to develop on XDC network

### 📰 About Remix

Remix is intergrate development environment which lets you compile, test and deploy smart contracts on Ethereum-like networks. Remix is all-in web application so it requires no setup. You can start developing on XDC right after openning [XinFin Remix](https://remix.xinfin.network).

#### Why do you need development environment

Deploying smart contracts is a very complex task and can cost you a lot of money if you do it wrong, that's why you need to use development environment like Remix.

Remix comes with all tools you need out of box, including built-in Solidity Editor, File Explorer and Terminal, which make you life easier and increase your productivity as dApp developer.

### 🎧 Remix Overview

![homepage](https://user-images.githubusercontent.com/102393474/196577072-81e185a3-b2ad-4972-9c89-dc524dc2d771.png)

Remix consists of four key parts:

* Solidity Editor
* File Explorer
* Solidity Compiler
* Plugin Manager
* Terminal

### 🎧 Start New Project

![workspace\_create](https://user-images.githubusercontent.com/102393474/196576591-00c3a0c5-ef5e-4e16-bbea-1d9ad7c02f11.png)

To create new project, simply press `+` near `Workspaces` in File Explorer and then provide a name for your project.

#### Remix project structure

![project](https://user-images.githubusercontent.com/102393474/196577260-4f226175-cbd8-4cad-be75-a1cc813a8dca.png)

Remix project has the following folders:

* `contracts`: folder for smart contract source code
* `contracts/artifacts`: contains contract compilation artifacts
* `scripts`: folder where scripts for deploying are stored
* `test`: place to store both Javascript and Solidity tests

### 🎧 Remix Solidity Editor

In Solidity Editor, you can edit our smart contract and it will recompile it each time it is editor. It also provides word completion and syntax highlighting for solidity language. You can open and edit multiple files in different.

![solidity\_editor](https://user-images.githubusercontent.com/102393474/196578424-6519cd6e-e8d7-4249-accf-2ee2c4a4b73e.png)

### 🎧 Remix File Explorer

![file\_explorer\_ico](https://user-images.githubusercontent.com/102393474/196577922-2f71a0fb-a739-458e-a65a-7d2ddbc42f97.png)

File Explorer displays workspaces and their files. You can select workspace by clicking workspace dropdown or add new workspaces. Each workspace represents separate Remix project, with folder structure described above. File Explorer lets you create, move, rename, delete, copy files. You can run custom scripts by right-clicking and pressing `Run` on them.

![file\_explorer\_pane](https://user-images.githubusercontent.com/102393474/196578378-82ae1e95-54b1-492e-a551-48f5d3a9bd08.png)

### 🎧 Remix Compiler

![solidity\_ico](https://user-images.githubusercontent.com/102393474/196577910-64f9d860-4962-4e5f-a9d8-b6d3df6b5023.png)

In compiler panel you can configure options for solidity compiler:

* `compiler`: version of solidity compiler
* `language`: Solidity or Yul (for version >=0.5.7)
* `evm version`: version of ethereum virtual machine
* `auto compile`: compiles your solidity contract each time it is changed
* `enable optimizations`: optimize smart contract gas usage

Once configured, you can compile contract currently selected in File Explorer by hitting `Compile` button. Compiler will compile contract and all its dependencies.

![compiler\_1](https://user-images.githubusercontent.com/102393474/196578850-243c96bb-8266-417b-9c24-e7cbe4045c16.png)

After compilation is finished, you can publish resulting contract on IPFS, see the compilation details or copy its ABI.

![compiler\_contract](https://user-images.githubusercontent.com/102393474/196578947-53244da8-c51f-4d1c-9af9-e38eee293c68.png)

### 🎧 Remix Deployer

![deploy\_ico](https://user-images.githubusercontent.com/102393474/196577874-c07aaeb6-1796-41bd-8717-8b293c0c83ee.png)

Now lets take a look at `Deploy & run transactions` panel. First is `Environment` menu. XinFin Remix provides for options for connecting to a blockchain:

* `Javascript VM`: For connecting to a local browser-based blockchain node started by XinFin Remix. On each reload XinFin will create new blockchain instance and **the old one will be deleted**.
* `Injected Web3`: For connecting XinFin Remix to an injected web3 provider. The most common injected provider is `Metamask` and `XDCPay`.
* `Web3 Provider`: For connecting XinFin Remix to a remote node.

`Account` field shows XDC address which will be used to deploy your contract. In `Gas Limit` field you can select maximum amount of gas used to deploy your contract and in `Value` you can set amounts of XDC tokens sent on creation. Then you select previously compiled contract in `Contract` field and hit `Deploy` to deploy it on selected environment.

![deploy\_window2](https://user-images.githubusercontent.com/102393474/196579380-41358965-ab65-4284-9382-3e270a8774b8.png)

Once contract is deployed, you can interact with its methods by expanding it in `Deployed Contracts` list. If you already deployed your contract and just want to interact with it through Remix IDE, you can paste its address in `At Address` field.

![deployed\_list](https://user-images.githubusercontent.com/102393474/196579104-ca5e9d02-4a1d-4324-987b-11143fa631e7.png)

#### Recording & Replaying transactions.

Recording and replaying use cases are:

* automating multi-transaction deployment
* testing your contracts in simulated environment and then deploying it to live network.
* record transactions for debugging

To record transactions, simply press `save` icon under `Transactions recorded` block. Transactions will be save in `JSON` format under provided name or `scenario.json` by default. To replay transactions, select one of scenarios you recorded in File Explorer and hit `run` icon in under `Transactions recorded` block.

![tx\_record](https://user-images.githubusercontent.com/102393474/196579078-ad355afe-a726-48c1-961f-bb55e46c3084.png)

### 🎧 Remix Terminal

In Remix terminal you can do the following things:

* View logs of Remix actions, like deploying or interactions with a contract
* Search for transactions
* By checking `listen on network` you will get a log of all blocks mined to currently connected blockchain network.
* Run custom web3 scripts. To do that, type `remix.execute(pathToScript)` or elect script to be active in editor and type `remix.exeCurrent()` in command line at the bottom.

![terminal](https://user-images.githubusercontent.com/102393474/196579006-fb918b14-97b5-4806-9b9f-2da3a761c4ae.png)

### 🎧 Remix Plugin Manager

![plugin\_ico](https://user-images.githubusercontent.com/102393474/196577855-129a8fc3-30f7-4bd2-a7b5-864e2f623f71.png)

Remix has extensible plugin architecture and plenty of ready-to-use plugins avaiable in Plugin Manager panel. With plugins you can add support for a specific blockchain network, enable testing and debugging capabalities to solidity and more. If you want some plugin that is not present in Plugin Manager, you can always add new plugins buy pressing `Connect to a Local Plugin`.

Some of useful plugins for starting dApp development are:

* `Debugger`: lets you debug transactions
* `DGit`: adds git capabilites to Remix IDE
* `Flattener`: flattens contracts which use dependency so you can verify them on Block Explorer.
* `Solidity Unit Testing`: adds support of unit testing for your solidity contracts

### 🎧 Using XinFin Remix to develop on XDC

XDC provides its own version of Remix here on [remix.xinfin.network](https://remix.xinfin.network) which is optimized for development on XDC.

### 🎧 Configuring XDC Mainnet and Apothem Testnet on XinFin Remix

To deploy smart contract on XDC network, you need go to `Deploy & Run Transactions` panel, then select `Injected Web3` in `Environment` dropdown menu. Then connect XinFin Remix IDE to your browser wallet with XinFin or Apothem network configured.

![injected\_env](https://user-images.githubusercontent.com/102393474/196579665-cfc55bd4-b49e-4f7a-a8e1-136c999e85ba.png)

Then hit `Deploy` button and you will be asked to confirm transaction.

![deploy\_contract](https://user-images.githubusercontent.com/102393474/196579097-7ab4e2cf-e1f8-45c7-9b03-e46de89be744.png)



For more information about Remix, Please Visit [Remix Documentation](https://remix-ide.readthedocs.io/en/latest/).\
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).\
