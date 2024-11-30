---
id: xrc20-token-remix
title: XRC20 using Remix IDE
keywords:
  - docs
  - apothem
  - token
  - XRC20
  - remix
description: Use Remix IDE to deploy an XRC20 Token.
---

# How To Create and Deploy an XRC20 Token Using Remix

## 🧭 Table of contents

* [🧭 Table of contents](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-table-of-contents)
* [📰 Overview](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-overview)
  * [What you will learn](how-to-create-and-deploy-an-xrc20-token-using-remix.md#what-you-will-learn)
  * [What you will do](how-to-create-and-deploy-an-xrc20-token-using-remix.md#what-you-will-do)
  * [📰 About XRC20 Tokens](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-about-xrc20-tokens)
* [🚀 Setting up the development environment](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-setting-up-the-development-environment)
  * [⚒️ Creating XDCPay Wallet for signing transactions](how-to-create-and-deploy-an-xrc20-token-using-remix.md#️-creating-xdcpay-wallet-for-signing-transactions)
  * [⚒ Adding Testnet XDC to Development Wallet](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-adding-testnet-xdc-to-development-wallet)
* [💵 Writing your first XRC20 Token](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-writing-our-first-xrc20-token)
  * [💵 Constants](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-constants)
  * [💵 Events](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-events)
  * [💵 Methods](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-methods)
  * [💵 Compiling and Deploying](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-compiling-and-deploying)
* [🔍 Verifying Contracts on the Block Explorer](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-verifying-contracts-on-the-block-explorer)
  * [🔍 Interacting with your contract on the Block Explorer](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-interacting-with-your-contract-on-the-block-explorer)

## 📰 Overview

[Remix IDE](https://remix.xinfin.network/#optimize=false\&runs=200\&evmVersion=null\&version=soljson-v0.8.7+commit.e28d00a7.js) is a blockchain development environment, which you can use to create and test smart contracts by leveraging an Ethereum Virtual Machine.

#### What you will learn

In this tutorial, you will learn how to set up Remix IDE and use it to build, test, and deploy a XRC20 Token on both the XDC Network mainnet and XDC Apothem testnet.

#### What you will do

* Setup Remix IDE
* Create an XRC20 token
* Compile the XRC20 token
* Deploy the XRC20 token
* Interact with the XRC20 token
* Check the deployment status on [xinfin.network](https://xinfin.network/#stats)

### 📰 About XRC20 Tokens

XRC20 is a set of rules to standardize assets on the XinFin network. Every XRC20 Token must be able to execute the following methods:

* `totalSupply()`
* `balanceOf(address account)`
* `allowance(address owner, address spender)`
* `transfer(address recipient, uint amount)`
* `approve(address spender, uint amount)`
* `transferFrom(address sender, address recipient, uint amount)`

These are the minimum required methods that allow an asset on the XDC network to be called an XRC20 token. Also, an XRC20 token must be able to emit the following `Events` on the blockchain:

* `Approval(address indexed tokenOwner, address indexed spender, uint tokens)`
* `Transfer(address indexed from, address indexed to, uint tokens)`

Events come in handy in the exhaustive labor of indexing state changes, and they are essential to off-chain applications to find relevant data on the blockchain. By mapping all `Transfer` events, for example, we can fetch all the historic data on token transfers more easily.

Last but not least, a few contract constants that are public that are also very important to have are:

* `name`
* `symbol`
* `decimals`

Without these public constants, it would be impossible to label tokens on block explorers, for example. In this tutorial, we will deploy a XRC20 token that have all the `Methods`, `Events` and `Constants` mentioned above.

## 🚀 Setting up the development environment

Remix is an online Solidity IDE for compiling and deploying Solidity code to EVM compatible blockchains. To begin working on a new smart contract, you must first create a new file in the contracts folder on the left side of the view pane.

![](https://user-images.githubusercontent.com/60708843/190065372-1e43e443-f13b-463a-abb6-7497ae7c8b8c.png)

### ⚒️ Creating XDCPay Wallet for signing transactions

In order to get started deploying new contracts on the XDC Mainnet and/or Apothem, you need to have and XDCPay wallet to sign your transactions and store XDC tokens.

* First we have to install the chrome extension of [XDCPay](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo).

![](https://user-images.githubusercontent.com/60708843/190068514-7beac72f-ea99-49c9-ada7-7e88dc8cbf3e.png)

* Open the Chrome extension after it has been successfully installed.
* Agree to the Terms of Service.

![](https://user-images.githubusercontent.com/60708843/190069353-3214410d-0526-41c9-9c1c-1170a10840c6.png)

* Create a new XDCPay wallet by setting up a strong password or use an existing Seed Phrase **`12 or 24-Word Mnemonic Phrase`** to recover your existing wallet here.

![](https://user-images.githubusercontent.com/60708843/190121441-7b972e85-8ec0-47c2-adae-4e6c3fb01528.png)

* Keep the seed phrase safe. 🚨 **Do not share the seed phrase with anyone or you can risk losing your assets and/or the ownership of your smart contracts!** 🚨

![](https://user-images.githubusercontent.com/60708843/190071788-c134a5bc-599a-4a6d-a481-e7cf62e75a51.png)

* Verify recovery phrase
* Your XDCPay wallet has been successfully created.

### ⚒ Adding Testnet XDC to Development Wallet

Initially, your account will be empty, and you'll need some XDC tokens to initiate blockchain transactions. You will use a faucet to fill our wallet with test XDC tokens for this. These tokens are worthless in and of themselves. They are simply used to test your contracts on the testnet in order to avoid losing your real assets.

* First, make a copy of your wallet address. Your wallet address would look like **`xdc057ac7de8ad6f21c7bb0dcc6a389ff9161b3b943`**. These account address are interchangeable with Ethereum network. We can access these accounts on Ethereum network by simply changing the initial `xdc` with `0x`.

![](https://user-images.githubusercontent.com/60708843/190072656-cf4a819b-92e1-4eb3-948b-7c6dbc8bafc1.png)

* Next, navigate to the [XDC faucet](https://faucet.apothem.network/).
* Enter your XDC account address and request for Test XDC here.

![](https://user-images.githubusercontent.com/60708843/190073022-1d893bce-5f21-494d-8e28-20cdb9b91299.png)

* If your request is approved, you will be credited with the XDC in your wallet.
* If you can't see the XDC in your wallet, make sure you're connected to the XDC Apothem Testnet or the XDC Mainnet.

![](https://user-images.githubusercontent.com/60708843/190086617-07b3e4a8-4b4e-4e08-affa-97cce7b1f192.png)

* If you are currently connected to the XDC Mainnet, switch to the XDC Apothem Testnet.

## 💵 Writing our first XRC20 Token

The source code for the XRC20 token used in this tutorial is available here: [XRC20 Contract Folder](XRC20/contracts/MyToken.sol). But we will address all `Events`, `Methods` and `Constants` mentioned in the section [📰 About XRC20 Tokens](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-about-xrc20-tokens).

Lets start by creating the `XRC20.sol` file.

![](https://user-images.githubusercontent.com/60708843/191022825-ada8f078-aa96-4534-a345-a3c04d390536.png)

And write the shell of our smart contract by writing:

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

### 💵 Constants

Inside your `contract XRC20Token`, you will instantiate `name`, `symbol` and `decimals` as public variables, and a private `_totalSupply` that will be used on our `totalSupply()` method later on. You'll also instantiate two mapping variables, `balances` and `allowances`, that are key/value variables for mapping user balances and approved spending allowances to other users:

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

### 💵 Events

As mentioned in [📰 About XRC20 Tokens](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-about-xrc20-tokens), events are very important part of a smart contract logic. Events have `indexed` variables that can be filtered by off-chain interfaces. You might be tempted to index all the variables that are tied to an on-chain event, but since Solidity has a _maximum of 3 indexed variable_ limitation for events. You will write both `Approval` and `Transfer` events:

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

### 💵 Methods

We need to create the six methods mentioned in [📰 About XRC20 Tokens](how-to-create-and-deploy-an-xrc20-token-using-remix.md#-about-xrc20-tokens) (`totalSupply`, `balanceOf`, `allowance`, `transfer`, `approve` and `transferFrom`) and a `constructor`, which is a function called only once when the contract is deployed. It can attach information such as the token name, decimals and/or initial token supply:

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

Now you have implemented everything needed to make your token compliant with the XRC20 standard. Of course, there are more features we can implement to this contract, such as the [SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) library that replace naive mathematical operations for methods that will avoid `underflows` and `overflows`, and supply management methods such as `mint` and `burn`.

### 💵 Compiling and Deploying

Next, try compiling the `XRC20.sol` contract:

* Open the Solidity Compiler in the left side navigation pane ![](https://user-images.githubusercontent.com/60708843/190066438-b1816a19-3051-4d04-87d2-a2b1ade198f4.png).
* From the compiler option, select the compiler version **`v0.8.16`**.
* Choose Language as **`Solidity`**.
* Set the EVM version as the **`compiler default`**.
* Next, select **`Compile XRC20.sol`**.

![](https://user-images.githubusercontent.com/60708843/191024993-0df10c25-db29-4ecc-95e4-e09f9085811a.png)

* After Successful Compilation, it will show ![alt](https://user-images.githubusercontent.com/60708843/190067983-4451282c-348c-4872-a57d-b2e698b59cad.png)
* Once your contract has been compiled, you can deploy it to the Apothem Test Network.

For deployment on the XDC Apothem Testnet. In either case, you need to have enough funds to pay for gas fees on the address that is being used for development.

* Navigate to Deploy and Transactions ![alt](https://user-images.githubusercontent.com/60708843/190074569-0f6cccdb-08d6-41e9-8c54-9ac9c648a283.png).

![](https://user-images.githubusercontent.com/60708843/191081766-041a0e2a-c55e-4ee7-bdca-d1716c334741.png)

* Choose Injected Web3 as the Environment.

![](https://user-images.githubusercontent.com/60708843/191082336-eaf54032-7a83-4330-9507-d1c59fb1baf8.png)

* Confirm the popup to add the account to Remix IDE now.
* Next, choose the account to which you want to deploy the contract.

![](https://user-images.githubusercontent.com/60708843/191082662-b62c084e-5849-49bc-8c2d-a83d49e40a79.png)

* Choose the contract you want to use.
* Add Initial values regarding your token.

![](https://user-images.githubusercontent.com/60708843/191030657-fe4a5df4-6514-4c8c-9d8f-e86249a8a9d1.png)

* Press the "transact" button on the bottom right and a popup will appear, which we must confirm in order to create the transaction for contract deployment.

![](https://user-images.githubusercontent.com/60708843/190075747-c7d1f7a6-2737-49ac-bd72-681a84bd95b0.png)

## 🔍 Verifying Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

First lets check the address our contract is deployed. Go to your wallet and get the most recent transaction details, then copy the transaction address.

![](https://user-images.githubusercontent.com/60708843/190076901-179e4fac-d4e8-43c7-a657-ea525a4e3883.png)

Next, navigate to the [XDC Block explorer](https://explorer.apothem.network/) and paste the transaction hash there.

![](https://user-images.githubusercontent.com/60708843/190076901-179e4fac-d4e8-43c7-a657-ea525a4e3883.png)

From there, we need to get the transaction details as well as the **`To Address`** where the contract is deployed.

![](https://user-images.githubusercontent.com/60708843/191083637-324e1863-6753-47f1-8c2e-1a8c25c22f21.png)

Once you have a `XRC20` contract deployed on XDC Apothem Testnet, you can search for our newly deployed contract on [Apothem Block Explorer](https://explorer.apothem.network/):

![Verify 01](https://user-images.githubusercontent.com/60708843/191084100-6c61a512-65f0-486a-87ec-8209a17a17f8.png)

Next, click in the `Verify And Publish` option.

You will be redirected to the Contract verification page where we need to fill out:

* Contract Name: _XRC20Token_
* Compiler: _Check your Solidity file for Compiler Version_
* Contract Code: _Just paste everything from your_ `XRC20.sol` _file_

Once everything is filled out, press Submit!

![Verify 02](https://user-images.githubusercontent.com/60708843/191086658-e402f798-6f4e-4a25-a5f0-c2db463390d1.png)

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

![Verify 03](https://user-images.githubusercontent.com/60708843/191087001-72eb36c7-19f2-4623-b021-b1afc560327d.png)

In this page you can read from, write to, or simply read the information tied to your XRC-20 token on the blockchain:

![Verify 03](https://user-images.githubusercontent.com/60708843/191027977-0325666f-fcff-4222-8f69-9eb7817b4de2.png)

### 🔍 Interacting with your contract on the Block Explorer

With your XDCPay wallet, it is possible to interact with verified smart contracts on the [XinFin Network Block Explorer](https://explorer.xinfin.network/). You can read from, write to, or simply read the information tied to your Smart Contract on the blockchain.

Now head to the `Contract` tab on the explorer, choose `Write Contract`, and click in `Connect to Web3` to connect your XDCPay wallet.

![Verify 04](https://user-images.githubusercontent.com/60708843/191087973-a2982bf6-abef-4163-9eff-7cbfe55c37d0.png)

Try transfering `500 MTK` tokens that we have just created to a new wallet `xdc0431d52fe37f3839895018272dfa3ba189fce07e`. Lets fill out the `recipient` field with the new wallet address, and fill out the `amout` field with `500 * 10^18`. Remember that our token has 18 decimals, and when we write numbers with decimals to the blockchain we have to account for the decimals as the Virtual Machine do not understand floating numbers like we humans do:

![Verify 05](https://user-images.githubusercontent.com/60708843/191092620-25f7c9ff-c631-45ad-ae8e-df680c9c9ed2.png)

After clicking on `Write`, you must confirm the transaction on the XDCPay wallet: (note the Amount is 500000000000000000000.0000)

![Verify 05](https://user-images.githubusercontent.com/60708843/191092847-5a9288a5-6e47-4be8-ad34-f8e8abfd1448.png)

You can check your successful transaction on the [Block Explorer!](https://explorer.apothem.network/txs/0xf9e57c65e3415d661caf09f1bf01ed2b48ab1daf7c45b3eae42cd429804dfe71#overview)

***

For more information about Remix IDE, Please Visit [Remix IDE Documentation](https://remix-ide.readthedocs.io/en/latest/).\
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).\\
