---
id: blockscan-api-introduction
title: Introduction to Blocksscan APIs for XDC Network Development
keywords:
  - docs
  - apothem
  - token
  - XRC20
  - blocksscan
description: >-
  What Blocksscan APIs are, what they are used for, and how to use them for
  development on the XDC Network.
---

# Blocksscan APIs

## 🧭 Table of contents

* [🧭 Table of contents](blocksscan-apis.md#-table-of-contents)
* [📰 Overview](blocksscan-apis.md#-overview)
  * [📰 About BlockScan API](blocksscan-apis.md#-about-blockscan-api)
* [🔍 API Overview](blocksscan-apis.md#-api-overview)
  * [🔍 Interact With BlockScan API](blocksscan-apis.md#-interact-with-blockscan-api)

## 📰 Overview

![blockscan](https://blocksscan.com/assets/images/blocksscan\_logo.png)

BlockScan is a blockchain explorer and analytics platform for EVM networks.

#### What you will learn

This article will teach you what Blocksscan APIs are, what Blocksscan APIs are used for, and how to use the features of Blocksscan APIs for development on the XDC Network.

#### What you will do

* Explore BlockScan APIs
* Execute BlockScan API methods

### 📰 About BlockScan API

Blockscan is a blockchain explorer which provides realtime information on blocks, transactions, tokens, balances and more on XDC network. [BlockScan API](https://xdc.blocksscan.io/docs/) gives developers direct access to BlockScan explorer data via **HTTP GET** requests.

#### Why and when to use BlockScan API

BlockScan API is used when you need to get data from blockchain. By using BlockScan API, you don't need to run our own blockchain node and storing hundreds of gigabytes of blockchain data which is very expensive and unreliable. It can be used to fetch data for wide range of applications from blockchain dashboards to decentralized exchanges.

## 🔍 API Overview

BlockScan API consists of five main methods:

* `Accounts`: get XDC account data like balance, address, txCount etc.
* `Blocks`: get XDC blockchain block info
* `Contracts`: get contract details and verified contracts
* `Transactions`: get list of transactions, transaction details and logs
* `Tokens`: get details on XRC20 and XRC721 tokens

### 🔍 Interact With BlockScan API

In this introduction we will display two main ways to interact with BlockScan API: **Swagger UI** and via **Node.js**.

#### Swagger UI

Swagger UI is a tool to visualize and interact with API. It is great as a learning tool or documentation.

To open XDC BlockScan API Swagger UI go to [xdc.blocksscan.io/docs](https://xdc.blocksscan.io/docs).

Click on one of the dropdowns, in this example `/api/tokens`. Scroll to bottom of page to find it.

![api\_get\_token\_select](https://user-images.githubusercontent.com/102393474/196593582-dbbfa7d3-5ac4-40c9-a0b7-c14b51961465.png)

You will see input fields and description of parameters for this request. To unlock requests, click `Try it out`.

![api\_get\_token](https://user-images.githubusercontent.com/102393474/196593022-f2ae3513-ae22-4492-ad74-a147a56c6566.png)

Now fill `type` field with `xrc721`, because we are going to search for NFT tokens. In `page` field type 1 for the first page and set limit to `10`. Once it is done, hit `Execute`.

![api\_parameters](https://user-images.githubusercontent.com/102393474/196593081-41d2c8e2-8f84-4752-b1e1-8d154c1698d0.png)

After waiting a bit, you will receive a response with NFT data from XinFin blockchain.

![api\_response](https://user-images.githubusercontent.com/102393474/196593079-ccf537cf-26db-47b6-bd30-61d46ae0e8b6.png)

#### Node.js

Run this to install `axios` package.

```
npm -i axios
```

Then create `index.js`, copy and run this Javascript code.

```javascript
const axios = require('axios');

axios({
  method: 'get',
  url: 'https://xdc.blocksscan.io/api/tokens?type=xrc721&page=1&limit=10',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(function (response) {
    console.log('status code', response.status)
    if (response.status === 200) {
      console.log(response.data)
    }
  });
```

Once completed, you should see account info like this:

```javascript
{
  "total": 348,
  "perPage": 10,
  "currentPage": 1,
  "pages": 35,
  "items": [
    {
      "_id": "61410c550a4a58a55d4ab669",
      "hash": "xdc60d6765a0bb5fbb5be0cab91d34dcbf89b5712af",
      "createdAt": "2021-09-14T20:55:49.064Z",
      "updatedAt": "2022-10-19T01:03:23.492Z",
      "decimals": 0,
      "isMintable": false,
      "name": "XNFT",
      "status": true,
      "symbol": "XNFT",
      "totalSupply": "3",
      "totalSupplyNumber": 3,
      "txCount": 0,
      "type": "xrc721",
      "changePercent": 0,
      "circulatingSupply": "0",
      "circulatingSupplyNumber": 0,
      "coingeckoID": "0",
      "holderCount": 1,
      "martketCap": 0,
      "priceUSD": 0,
      "volume24h": 0
    },
    // ...
  ]
}
```

***

For more information about BlockScan, Please Visit [BlockScan Website](https://blocksscan.io/).\
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).\
