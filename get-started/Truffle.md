---
Id:  To-Truffle-the-XDC-Network-Development.
Title: To Truffle For XDC Network Development.
Description: "An Introduction To Truffle For XDC Network Development".
Keywords:
   - Documents
   - Truffle
   - Contract
   - Apothem
---

#   Overview
This tutorial shows how easy it is to migrate a DApp running on Ethereum to XDC Network to use the many unrivaled features and advantages that XDC Network has over Ethereum.

   - what is a DApp?
     
     Ethereum DApps are built on smart contracts deployed onto the Ethereum blockchain, where Ethereum serves as the back-end for the application. One of the most popular DApps — Cryptokitties, is a collectibles-style Dapp built on Ethereum. When we build a game with Ethereum, each game action and transaction is essentially stored on the Ethereum blockchain.

##  What you gonna learn
In this tutorial, we will see how to build a DApp using Solidity and then deploy it to the XDC Network blockchain.

###  What you gonna do

   - Setting up Truffle, the most popular development framework for Ethereum, which also works perfectly for XDC Network.
   - Creating a Truffle project.
   - Creating an XDC Network wallet.
   - Writing a smart contract.
   - Compiling and migrating the smart contract from Ethereum Network to XDC Network.

#  What is XDC Network?
    
    XDC Network is an innovative solution to the scalability problem with the Ethereum blockchain and other blockchain platforms. XDC Network XDCPoS masternode architecture offers near-zero transaction fees and instant transaction confirmation. Security, stability, and chain finality are guaranteed via novel techniques such as double validation and uniform randomization.

    XDC Network supports all EVM-compatible smart contracts, protocols, and atomic cross-chain token transfers. Scaling techniques such as sharding, EVM parallelization, and private-chain generation into XDC Network will become an ideal scalable smart-contract public blockchain for decentralized apps, token issuance, and token integration for small and big businesses.
    
**`NOTE`**: Every DApp running on Ethereum can be easily ported to XDC Network. 

##  Prerequisites
To start building your DApp, you will need to install some programs:

   - Install Node.js & npm(https://nodejs.org/en/download/). <img src="https://user-images.githubusercontent.com/114388943/195639371-d4a63e2a-f7f0-4cdf-8274-40d01f3f605b.png">.
   - Install Git(https://git-scm.com/downloads). <img src="https://user-images.githubusercontent.com/114388943/195641184-9ffc5db2-0981-4bf5-9f44-d5109a8ca67f.png">.

To check that Node is installed correctly, open a console (admin PowerShell on Windows) and type node -v. This should print a version number, like v16.16.0(as shown in below fig). 
To test npm, type npm -v, and you should see the version number, like 8.11.0(as shown in below fig).

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195645408-ae2157a5-5f19-4ce9-a824-6c964f43750d.png">.
</p>

### 1. Getting Started: Installation

   Truffle Framework(https://trufflesuite.com/) is an excellent tool for developing DApps. You can use Truffle to deploy your smart contracts to XDC Network.

   We only need this single command to install Truffle, the popular development framework for Ethereum.

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195646875-b2548300-b724-4b1b-9a54-12dc69ce7f57.png">
</p>

  `npm install -g truffle`

You can verify that Truffle is correctly installed by typing the truffle version. <img src="https://user-images.githubusercontent.com/114388943/195648990-4c396d2a-4c3d-4bce-8a22-6ade8d3c89f9.png">.


### 2.  Creating a Truffle project

Truffle initializes in the current directory, so first create a directory in your development folder of choice and then move inside it.

   `mkdir pet-shop-tutorial`
   
   `cd pet-shop-tutorial`

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195663763-385217a6-431e-4330-a290-f84fc1f46c91.png">
</p>

Let’s see how to create a Truffle project(https://trufflesuite.com/docs/truffle/getting-started/creating-a-project/). There are two options. You can create a bare new project from scratch with no smart contracts included, and the other option for those just getting started, you can use Truffle Boxes(https://trufflesuite.com/docs/truffle/advanced/creating-a-truffle-box/), which are example applications and project templates.

A special Truffle Box(https://trufflesuite.com/docs/truffle/advanced/creating-a-truffle-box/) for this tutorial called pet shop includes the basic project structure and code for the user interface. Use the truffle unbox command to unpack this Truffle Box:
   
   `truffle unbox pet-shop`

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195655472-6a465e9e-f4ea-4b57-a22d-8d8f39749b0f.png">
</p>

The default Truffle directory structure contains a series of folders and files. If you want to know more, please check Truffle tutorials(https://trufflesuite.com/guides/pet-shop/#directory-structure).

**`Note`**: This tutorial is focused on the process of building a DApp on XDC Network, so we will not enter all the details.


### 3. Creating an XDC Wallet
#1.

You will need a wallet address and some main-net tokens for gas fees. We will show you how to do it on the XDC Network.

Using the mnemonic phrase, you can create a new XDC wallet using XinFin Web Wallet or XDCPay Extension wallet.

You can also create a new XDC wallet with MetaMask, MyEtherWallet For instance, for mainnet, you can go to MyEtherWallet and select XinFin Network on the top right corner. Enter a password and then Create a new wallet. Write down your recovery phrase.

For this tutorial, my wallet address (testnet) is:
   
   `0x30BC0cd9c595742048b8c1bb5f97F72EE60a8961`
   
My recovery phrase (12-word mnemonic) is:
   
   `Garden shadow dash husband scan bonus nerve bright fashion dose balcony circle`
   
  - Write them down. This will be needed later. Notice that your wallet address (public key) and recovery phrase will differ from mine.
  - Important! Always keep your private key and recovery phrase secret!

#2. Get some XDC faucet

Tokens are required for different matters, like smart contract deployment or used in DApps.

Testnet: Receive 1000 free testnet XDC tokens using Faucet(https://faucet.apothem.network/) <img src="https://user-images.githubusercontent.com/114388943/195658074-804cee5e-ace8-4efb-b822-822a4c294fa3.png">


#3. The Block Explorer

To check the balance of a wallet address, you can use XinFin Explorer.

   - Testnet: Explore Apothem Network(https://explorer.apothem.network/).
   - Main-net: Explore XinFin Network(https://explorer.xinfin.network/).

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195659701-978001c8-ef01-4095-a28e-5d863fb62136.png">
</p>

### 4. Writing the smart contract

We’ll start our DApp by writing the smart contract that acts as the back-end logic and storage.

1.We’ll start our DApp by writing the smart contract that acts as the back-end logic and storage.
2. Copy the following code:

```
pragma solidity ^0.5.0;
contract Adoption {
address[16] public adopters;
// Adopting a pet
function adopt(uint petId) public returns (uint) {
// check that petId is in range of our adopters array
require(petId >= 0 && petId <= 15);
// add the address who called this function to our adopter array
adopters[petId] = msg.sender;
// return the petId provided as a confirmation
return petId;
}
// Retrieving the adopters
function getAdopters() public view returns (address[16] memory) {
return adopters;
}
}
```

### 5. Compiling

Solidity is a compiled language, meaning we must compile our Solidity to bytecode for the Ethereum Virtual Machine (EVM) to execute. Think of it as translating our human-readable Solidity into something the EVM understands.

XDC Network is EVM-compatible, which means that every contract written in Ethereum can be seamlessly ported to XDC Network without effort

In a terminal, make sure you are in the root of the directory that contains the DApp and type:

   `truffle compile`
   
<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195665901-e7ff8175-9b98-47c1-94cd-98218b0d0be7.png">
</p>


### 6. Migration-Deploying

Now that we’ve successfully compiled, it’s time to migrate your smart contracts to XDC Network blockchain!

Migration is a deployment script meant to alter the state of your application’s contracts, moving it from one state to the next. (More about migrations in the Truffle documentation)[https://trufflesuite.com/docs/truffle/getting-started/running-migrations/].

#1. Create the migration scripts

Open the migrations/ directory and you will see one JavaScript file: 1_initial_migration_js. This handles deploying the Migrations.sol contract to observe subsequent smart contract migrations and ensures we don’t double-migrate unchanged contracts in the future.

Now we are ready to create our own migration script.

   1. Create a new file named 2_deploy_contracts.js in the migrations/ directory.
   
   2. Add the following content to the 2_deploy_contracts.js file

```
var Adoption = artifacts.require(“Adoption”);
module.exports = function(deployer) {
deployer.deploy(Adoption);
};
```

#2. Configure the migration networks in truffle.js

Before starting the migration, we need to specify the blockchain where we want to deploy our smart contracts, the address to deploy — the wallet we just created, and optionally the gas, gas price, etc.

   1. Install Truffle’s HDWalletProvider, a separate npm package to find and sign transactions for addresses derived from a 12-word mnemonic — in a certain blockchain. (Read more about HDWalletProvider)[https://github.com/trufflesuite/truffle-hdwallet-provider]'

   2. Open the truffle.js file (truffle-config.js on Windows). You can edit here the migration settings: networks, chain IDs, gas… The current file has only a single network defined. You can define multiple. We will add two networks to migrate our DApp: development, XinFin Test network, and XinFin Main-net.

Replace the truffle.js file with this new content:

```
‘use strict’
var HDWalletProvider = require(“truffle-hdwallet-provider”); var mnemonic = ‘arm derive cupboard decade course garlic journey blast tribe describe curve obey’; module.exports = {
networks: {
development: {
provider: () => new HDWalletProvider(
mnemonic,
“http://127.0.0.1:8545",
),
host: “127.0.0.1”,
port: “8545”,
network_id: “*”, // Match any network id
},
xinfinmainnet: {
provider: () => new HDWalletProvider(
mnemonic,
“https://erpc.xinfin.network",
0,
1,
true,
“m/44'/889'/0'/0/”
),
network_id: “50”,
gas: 2000000,
gasPrice: 25000000000
},
xinfintestnet: {
provider: () => new HDWalletProvider(
mnemonic,
“https://rpc.apothem.network",
0,
1,
true,
“m/44'/889'/0'/0/”,
),
network_id: “51”,
gas: 2000000,
gasPrice: 10000000000000,
}
}
};
```

   3. Remember to update the truffle.js file using your own wallet recovery phrase. Copy the 12 words obtained previously and paste them as the value of the mnemonic variable.

var mnemonic = ‘<PUT YOUR WALLET 12-WORD RECOVERY PHRASE HERE>’;

Done. Please, notice the XinFin Main-net network will be used to deploy our smart contract. We have also added the XinfFin Test network if you want to deploy it to XinFin Tesnet. However, if you are familiar with Ganache, you could use the development network to do the local test as well if you want to. Ganache is a locally running personal blockchain for Ethereum development you can use to deploy contracts, develop applications, and run tests.

We have added the migration configuration to deploy to public blockchains like XinFin (both testnet and mainnet).

**`Warning`**: In production, we highly recommend storing the mnemonic in another secret file (loaded from environment variables or a secure secret management system), to reduce the risk of the mnemonic becoming known. If someone knows your mnemonic, they have all of your addresses and private keys!

#3.  Start the migration

You should have your smart contract already compiled. Otherwise, now it’s a good time to do it with truffle compile.

Back in our terminal, migrate the contract to XinFin main-net network:

   `truffle migrate — network xinfinmainnet`
   
The migrations will start…

```
truffle migrate — network xinfinmainnet
Compiling your contracts…
===========================
> Compiling .\contracts\Adoption.sol
> Compiling .\contracts\Migrations.sol
> Artifacts written to C:\Users\IndSoft-PC\Desktop\pet-shop-tutorial\build\contracts
> Compiled successfully using:
- solc: 0.5.16+commit.9c3226ce.Emscripten.clang
Starting migrations…
======================
> Network name: ‘xinfinmainnet’
> Network id: 50
> Block gas limit: 420000000 (0x1908b100)
1_initial_migration.js
======================
Deploying ‘Migrations’
 — — — — — — — — — — — 
> transaction hash: 0xd1cf1315a0963b1bb04dbaee9122ee7aba5a6f9b02153e944a2c9bc3018f6e6d
> Blocks: 2 Seconds: 5
> contract address: 0xA444e1180B898AB62f8D01FB3715eb55f2E17825
> block number: 50457694
> block timestamp: 1663416685
> account: 0x6BE9772969A2E853452124D460A6fd57653808bB
> balance: 0.094236125
> gas used: 222155 (0x363cb)
> gas price: 25 gwei
> value sent: 0 ETH
> total cost: 0.005553875 ETH
> Saving migration to chain.
> Saving artifacts
 — — — — — — — — — — — — — — — — — — -
> Total cost: 0.005553875 ETH
2_deploy_contracts.js
=====================
Deploying ‘Adoption’
 — — — — — — — — — — 
> transaction hash: 0x44b6c25709539d8a7ea578269b3a21111bca7187136fcc0724b73cda2d756bbd
> Blocks: 2 Seconds: 5
> contract address: 0xBc6EF4D97880D44e68C4f6cEB694234560174A94
> block number: 50457703
> block timestamp: 1663416703
> account: 0x6BE9772969A2E853452124D460A6fd57653808bB
> balance: 0.0871733
> gas used: 239915 (0x3a92b)
> gas price: 25 gwei
> value sent: 0 ETH
> total cost: 0.005997875 ETH
> Saving migration to chain.
> Saving artifacts
 — — — — — — — — — — — — — — — — — — -
> Total cost: 0.005997875 ETH
Summary
=======
> Total deployments: 2
> Final cost: 0.01155175 ETH
The transaction ID is: 0x31fb3d5aef9d9c67852ba31ca0049158783ef32e6a61a45f6af3130d617790c3
```

The contract address is: `xdc1e636c6adf5ab1fbc447ecfec0690c7b9e13ac25`

So, this was complete introduction to Truffle XDC Network Deployment.





    
