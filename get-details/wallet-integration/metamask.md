---
id: introduction-to-metamask
title: Introduction to MetaMask
keywords:
  - docs
  - apothem
  - token
  - metamask
description: What MetaMask is, what it is used for, and how to add XDC Network in MetaMask
---

# Metamask

## 🧭 Table of contents

* [🧭 Table of contents](metamask.md#-table-of-contents)
* [📰 Overview](metamask.md#-overview)
  * [What you will learn](metamask.md#what-you-will-learn)
  * [What you will do](metamask.md#what-you-will-do)
  * [📰 About MetaMask](metamask.md#-about-metamask)
* [👛 MetaMask Overview](metamask.md#-metamask-overview)
* [👛 Adding XDC mainnet and apothem testnet in MetaMask](metamask.md#-adding-xdc-mainnet-and-apothem-testnet-in-metamask)
* [👛 Transfer funds on XDC using MetaMask](metamask.md#-transfer-funds-on-xdc-using-metamask)

## 📰 Overview

![Metamask Logo](https://www.ledger.com/wp-content/uploads/2019/06/assets\_logo\_metamask.jpg)


#### What you will learn

This article will teach you what MetaMask is, what MetaMask is used for, and how to connect MetaMask to the XDC Network.

#### What you will do

* Learn about MetaMask
* Connect MetaMask to XDC network
* Send tokens over XDC apothem testnet using MetaMask

### 📰 About MetaMask

MetaMask is a non-custodial cryptocurrency wallet used to interact with the Ethereum and EVM-compatible blockchains.

MetaMask allows users to access and manage their blockchain account funds via convenient user interface.

#### Why people use non-custodial wallets

To understand why people use non-custodial wallets, we first need to understand what **custodial** means. **Custodial wallet** a wallet whose private keys are held and managed by third party service (for example, an exchange). With **custodial wallet** you delegate control over your crypto holdings to another entity.

**Non-custodial** wallet is the opposite of that. With **non-custodial** wallet, only the person who has private key controls wallet's funds.

There are pros and cons that come with using non-custodial wallet:

* pros
  * You can use your funds however you want
  * No one can block your funds
* cons
  * Once you forget or lose your seed phrase or private key, your funds are lots forever
  * For every thing you do, like transfering or swapping tokens, you need to pay transaction fees. While it may not be the problem when using networks with low fees, like Polygon or XDC, fees on networks like Ethereum sometimes are very expensive

### 👛 MetaMask Overview

![metamask\_overview](https://user-images.githubusercontent.com/102393474/195914095-20cea931-8425-4508-8f71-06d76c2c11f6.png)

* `Address`: your address on a blockchain, you can use it receive funds
* `Balance`: current balance of native tokens on this account
* `Network`: current blockchain network you are using. You can change it by clicking on it and selecting another one in dropdown
* `Tokens`: your tokens balance. This includes native tokens and ERC20 (or XRC20 if you are on XDC network) tokens.

### 👛 Adding XDC mainnet and apothem testnet in MetaMask

To add new network on MetaMask, press on network dropdown near your account icon.

![open\_networks\_arrow](https://user-images.githubusercontent.com/102393474/195909157-3e266c28-fc81-4ad5-be59-ddb23d1a9801.png)

This will open list existing network and also an option to add new network. Now press `Add Network`.

![add\_network\_arrow](https://user-images.githubusercontent.com/102393474/195909164-4fb7c670-176d-47e5-9493-b177ce4df9cd.png)

New page will open asking you to fill network info.

To add `xinfin` mainnet, use following configuration:

|                    |                                  |
| ------------------ | -------------------------------- |
| Network Name       | XinFin                           |
| New RPC URL        | https://erpc.xinfin.network       |
| Chain ID           | 50                               |
| Currency Symbol    | XDC                              |
| Block Explorer URL | https://explorer.xinfin.network/ |

![xinfin\_add](https://user-images.githubusercontent.com/102393474/195908951-b74da582-4d4a-4d01-a759-e0b941285b6f.png)

To connect `apothem` testnet, repeat steps with following network settings:

|                    |                                   |
| ------------------ | --------------------------------- |
| Network Name       | Apothem                           |
| New RPC URL        | https://erpc.apothem.network      |
| Chain ID           | 51                                |
| Currency Symbol    | TXDC                              |
| Block Explorer URL | https://explorer.apothem.network/ |

![apothem\_add](https://user-images.githubusercontent.com/102393474/195908933-b42e678a-be4f-48ce-b06b-7bb9d536cd84.png)

### 👛 Transfer funds on XDC using MetaMask

First, lets get sound funds from apothem faucet. Copy your address in MetaMask, then replace `0x` with `xdc`. So, if your address is `0xA4e66f4Cc17752f331eaC6A20C00756156719519`, it should be `xdcA4e66f4Cc17752f331eaC6A20C00756156719519` on XDC network.

With this address in hand, we can head to the [Apothem Faucet](https://faucet.apothem.network/) and claim some TXDC for development purposes:

![Step 02](https://user-images.githubusercontent.com/78161484/189952656-eb7793cc-7dee-4307-88fc-7c351a75cec7.png)

Now click on `send` button to send your XDC token.

![send\_start\_arrow](https://user-images.githubusercontent.com/102393474/195909251-7b7c6f64-5527-4336-bb8d-ff34ae61dfdf.png)

This will open send modal. Paste some address in search input in `0x` format. In this exampel we just use our own account address.

![send\_arrow](https://user-images.githubusercontent.com/102393474/195909300-3f3dc2ab-b246-45e7-9ab8-eff7f166f119.png)

On next page you will be asked to fill gas price, gas limit and token amount fields. If gas price is not set automatically, just set it to `1` gwei and gas limit should be `21000`, then choose any amount of tokens you want, but less than your total balance. After all fields are filled, press `next`.

![send\_next\_arrow](https://user-images.githubusercontent.com/102393474/195909256-28876558-f2c8-4733-a114-794de8e6ba19.png)

Re-check all info you filled previously and press `confirm`.

![send\_confirm\_arrow](https://user-images.githubusercontent.com/102393474/195909286-ae36da9d-a590-47d6-8e91-98af6b82fe34.png)

After you transaction was sent, it will take some time to add to a block and then MetaMask will notify you that your transaction was added successfully (or failed).

![txinfo](https://user-images.githubusercontent.com/102393474/195911449-e61e68e2-206f-4ba4-a45d-f01c191569b9.png)

You can click on it to get more info:

![tx\_info2](https://user-images.githubusercontent.com/102393474/195911895-829f5a1d-cf18-4b64-992d-a9eb62fa5266.png)

If you press `View on block explorer`, you will be redirected to Apothem Explorer website entry with your transaction.

***

For more information about MetaMask, Please Visit [MetaMask Website](https://metamask.io/).\
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).\
