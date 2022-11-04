---
id: xrc20-token-brownie
title: XRC20 using Brownie
description:  "Use Brownie to deploy an XRC20 Token."
keywords:
  - docs
  - apothem
  - token
  - XRC20
  - brownie
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
    - [What you will learn](#what-you-will-learn)
    - [What you will do](#what-you-will-do)
  - [📰 About XRC20 Tokens](#-about-xrc20-tokens)
- [⚒ Starting a new Brownie Project](#-starting-a-new-brownie-project)
    - [Installing Brownie](#installing-brownie)
  - [⚒ Configuring XDC Mainnet and Apothem Testnet on Brownie](#-configuring-xdc-mainnet-and-apothem-testnet-on-brownie)
  - [⚒ Adding Testnet XDC to Development Wallet](#-adding-testnet-xdc-to-development-wallet)
- [💵 Writing your first XRC20 Token](#-writing-our-first-xrc20-token)
  - [💵 Constants](#-constants)
  - [💵 Events](#-events)
  - [💵 Methods](#-methods)
  - [💵 Compiling and Deploying](#-compiling-and-deploying)
- [🔍 Veryfing Contracts on the Block Explorer](#-veryfing-contracts-on-the-block-explorer)
  - [🔍 Interacting with your contract on the Block Explorer](#-interacting-with-your-contract-on-the-block-explorer)

# 📰 Overview

<p align="center">
  <img width=20% src="https://avatars.githubusercontent.com/u/55654090" alt="brownie"/>
</p>

[Brownie](https://eth-brownie.readthedocs.io/en/stable/index.html) Python-based is a development environment to compile, deploy, test, and debug your Ethereum software.

### What you will learn
In this tutorial, you will learn how to set up Brownie and use it to build, test, and deploy a XRC20 Token on both the XDC Network mainnet and XDC Apothem testnet.

### What you will do
- Install and setup Brownie
- Create an XRC20 token
- Compile the XRC20 token
- Deploy the XRC20 token
- Interact with the XRC20 token
- Check the deployment status on [xinfin.network](https://xinfin.network/#stats)

## 📰 About XRC20 Tokens

XRC20 is a set of rules to standardize assets on the XDC Network. Every XRC20 Token must be able to execute the following methods:

- `totalSupply()`
- `balanceOf(address account)` 
- `allowance(address owner, address spender)`
- `transfer(address recipient, uint amount)`
- `approve(address spender, uint amount)`
- `transferFrom(address sender, address recipient, uint amount)`

These are the minimum required methods that allow an asset on the XinFin network to be called an XRC20 token. Also, an XRC20 token must be able to emit the following `Events` on the blockchain:

- `Approval(address indexed tokenOwner, address indexed spender,
 uint tokens)`
 - `Transfer(address indexed from, address indexed to,
 uint tokens)`
 
Events come in handy for the exhaustive labor of indexing state changes, and they are essential to off-chain applications to find relevant data on the blockchain. By mapping all `Transfer` events, for example, we can fetch all the historic data on token transfers more easily.

Last but not least, a few contract constants that are public that are also very important to have are:

- `name`
- `symbol`
- `decimals`

Without these public constants, it would be impossible to label tokens on block explorers, for example. In this tutorial we will deploy a XRC20 token that have all the `Methods`, `Events` and `Constants` mentioned above.

# ⚒ Starting a new Brownie Project

There are a few technical requirements before you start. Please install the following:

- [Python 3.7 or greater](https://www.python.org/downloads/release/python-3910/)
- [Git](https://git-scm.com/)
- [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)

### Installing Brownie

The recommended way to install Brownie is using `pipx`. `pipx` is a tool to install and run packages similar to Javascript's `npx`.

To install `pipx`, run:

```sh
python3 -m pip install --user pipx
python3 -m pipx ensurepath
```

Now install `eth-brownie` using `pipx`:

```sh
pipx install eth-brownie
```

Also, install `ganache-cli` for Brownie:

```sh
npm install ganache --global
```

You can start by setting up your folder. As we are creating a project called `XRC20`, you should create a new `XRC20` folder by running the following on terminal:

```bash
mkdir XRC20 && cd XRC20
```

You can initialize an empty Brownie project by running:

```bash
brownie init
```

The following message should show on your console:

```sh
Brownie v1.19.2 - Python development framework for Ethereum

SUCCESS: A new Brownie project has been initialized at /your/project/path
```

Your folder files will look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/102393474/197048486-9ab59b84-3e79-41e1-813c-5c908659ea0b.png" alt="brownie folder"/>
</p>

By default, Brownie is not creating `brownie-config.yaml`, so create it by yourself by pasting this:

```yaml
compiler:
    solc:
        version: "0.8.16"
        optimizer:
            enabled: true
            runs: 200
        remappings: null
```

## ⚒ Configuring XDC Mainnet and Apothem Testnet on Brownie

To add the XDC Network to Brownie, run:

```
brownie networks add XDC xinfin-xdc chainid=50 explorer=https://explorer.xinfin.network/ host=https://erpc.xinfin.network  name="Mainnet"
```

```sh
SUCCESS: A new network 'Mainnet' has been added
  └─Mainnet
    ├─id: xinfin-xdc
    ├─chainid: 50
    ├─explorer: https://explorer.xinfin.network/
    └─host: https://erpc.xinfin.network
```

Similar to this, add the Apothem Testnet:

```
brownie networks add XDC apothem-xdc chainid=51 explorer=https://explorer.apothem.network/ host=https://erpc.apothem.network  name="Testnet"
```

```sh
SUCCESS: A new network 'Testnet' has been added
  └─Testnet
    ├─id: apothem-xdc
    ├─chainid: 51
    ├─explorer: https://explorer.apothem.network/
    └─host: https://erpc.apothem.network
```

Run Brownie console on Apothem Network:

```sh
brownie console --network apothem-xdc
```

Run the following to create a new account:

```
brownie account new xrc20
```

It will ask for a private key for an account you will use for development.

After you enter private key and password (you can keep it blank), you will see something like this:

```
Enter the private key you wish to add: 202e3c9d30bbeca38d6578659919d4c3dc989ae18c16756690877fdc4dfa607f
Enter the password to encrypt this account with: 
SUCCESS: A new account '0xA4e66f4Cc17752f331eaC6A20C00756156719519' has been generated with the id 'xrc20'
```

## ⚒ Adding Testnet XDC to Development Wallet

Now, you can check your Signer's Address on Brownie by listing accounts:

```sh
brownie accounts list
```

This will display all added accounts:

```sh
Found 1 account:
 └─xrc20: 0xA4e66f4Cc17752f331eaC6A20C00756156719519
```


This account is on the Ethereum standard format starting with `0x`, but we can simply switch `0x` for `xdc`. In this example, our signer wallet address is: `xdcA4e66f4Cc17752f331eaC6A20C00756156719519`.

With this account in hand, we can head to the [Apothem Faucet](https://faucet.apothem.network/) and claim some TXDC for development purposes:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/189952656-eb7793cc-7dee-4307-88fc-7c351a75cec7.png" alt="Step 02"/>
</p>

# 💵 Writing our first XRC20 Token

The source code for the XRC20 Token used in this tutorial is available here: [XRC20 Contract Folder](./XRC20/contracts/XRC20.sol). But we will address all `Events`, `Methods` and `Constants` mentioned in the section [📰 About XRC20 Tokens](#-about-xrc20-tokens).

Lets start by creating the `XRC20.sol` file:

```sh
touch ./contracts/XRC20.sol
```


Next, write the shell of your smart contract by writing:

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

## 💵 Constants

Inside your `contract XRC20Token`, you will instantiate `name`, `symbol` and `decimals` as public variables, a private `_totalSupply` that will be used on our `totalSupply()` method later on. You'll also instatiate two mapping variables, `balances` and `allowances`, that are key/value variables that map user balances and approved spending allowances:

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

## 💵 Events

As mentioned in [📰 About XRC20 Tokens](#-about-xrc20-tokens), events are very important part of a Smart Contract logic. Events have `indexed` variables that can be filtered by off-chain interfaces. You might be tempted to index all the variables that are tied to an on-chain event, however Solidity has a _maximum of 3 indexed variable_ limitation for Events. You will write both `Approval` and `Transfer` events:

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

## 💵 Methods

You'll need to create the six methods mentioned in [📰 About XRC20 Tokens](#-about-xrc20-tokens) (`totalSupply`, `balanceOf`, `allowance`, `transfer`, `approve` and `transferFrom`) and a `constructor` that is a function called only once when the contract is deployed. Here, you can attach information such as the token name, decimals and/or initial token supply:

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

Now you have implemented everything you need to make your token compliant with the XRC20 Standard. Of course, there are more features we can implement to this contract, such as the [SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) library that replace naive mathematical operations for methods that will avoid `underflows` and `overflows`, and supply management methods such as `mint` and `burn`.

## 💵 Compiling and Deploying

You can now compile your `XRC20.sol` by running:

```sh
brownie compile
```

If everything is correctly configured and there is no errors, you should see the following message on your console:

```sh
solc 0.8.16 successfully installed at: /user/path/.solcx/solc-v0.8.16
Compiling contracts...
  Solc version: 0.8.16
  Optimizer: Enabled  Runs: 200
  EVM Version: Istanbul
Generating build data...
 - XRC20Token

Project has been compiled. Build artifacts saved at /your/brownie/project/build/contracts
```

Your folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/102393474/197048954-9627b9fe-ff72-436e-8279-bf3f72ac0649.png" alt="Folder 02"/>
</p>

In order to deploy your newly compiled contract artifacts to the blockchain, you'll need to create a deployment script into the script folder:

```sh
touch ./scripts/deploy.py
```

Next, write the following script to the `deploy.py` file:

```python
#!/usr/bin/python3

from brownie import XRC20Token, accounts


def main():
    acct = accounts.load('xrc20')
    return XRC20Token.deploy("MyToken", "MTK", 18, 1e21, {'from': acct})
```

If the deployment script has no errors, we can go ahead and run the follow command for deployment on the XDC mainnet:

```sh
brownie run deploy.py --network xinfin-xdc
```

Or the following command for deployment on the XDC Apothem Testnet:

```sh
brownie run deploy.py --network apothem-xdc
```

In either case, you must have enough funds to pay for gas fees on the address that is being used for development.

If the deployment is sucessful, the console should log the following message after migrations complete processing:

```
Xrc20ExampleProject is the active project.

Running 'scripts/deploy.py::main'...
Enter password for "xrc20": 
Transaction sent: 0x9c0fee04a700e10e783ce28b5936adeb4758b86493ce0610097c20bd3f9ce92f
  Gas price: 0.25 gwei   Gas limit: 711874   Nonce: 152
  XRC20Token.constructor confirmed   Block: 40334271   Gas used: 647159 (90.91%)
  XRC20Token deployed at: 0xfFEbCDd7A826B1DE3F512B1d7C4249d98B47B0e4
```


# 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [XinFin Block Explorer](https://explorer.xinfin.network/).

Grab the `XRC20.sol` address from the previous step: this address is in the Ethereum standard but we can simply swap the `0x` prefix for `xdc` and search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/):

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190875518-828c0061-71de-42c2-b222-0b8427852d01.png" alt="Verify 01"/>
</p>

Now click in the `Verify And Publish` option.

You will be redirected to the contract verification page, where you'll need to fill out:

- Contract Name: <em>XRC20Token</em>
- Compiler: <em> Check your</em> `brownie-config.yaml` <em>file for Compiler Version</em>
- Contract Code: <em> Just paste everything from your</em> `XRC20.sol` <em>file</em>

Once everything is filled out, press Submit!

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190875635-f6d3aa36-47b2-4b09-ad6a-fe6df3fb11f1.png" alt="Verify 02"/>
</p>

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190875780-6223b4b0-fecc-4e79-83bc-c810c5b0351c.png" alt="Verify 03"/>
</p>

## 🔍 Interacting with your contract on the Block Explorer

With your XDCPay wallet, it is possible to interact with verified smart contracts on the [XinFin Network Block Explorer](https://explorer.xinfin.network/). You can read from, write to, or simply read the information tied to your Smart Contract on the blockchain.

Head to the `Contract` tab on the explorer, choose `Write Contract` and click in `Connect to Web3` to connect your XDCPay wallet.

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190876289-57de5994-809a-4307-b68d-6bb37e3601af.png" alt="Verify 04"/>
</p>

Now try transfering `500 MTK` tokens that you have just created to a new wallet `xdc0431d52fe37f3839895018272dfa3ba189fce07e`. Fill out the `recipient` field with the new wallet address, and fill out the `amout` field with `500 * 10 ^ 18`. Remember that your token has 18 decimals. When you write numbers with decimals to the blockchain, you must account for these decimals as the Virtual Machine does not understand floating numbers the way we humans do:

<p align="center">
  <img width=70% src="https://user-images.githubusercontent.com/78161484/190876402-32e800d4-b456-499d-8255-ba10aa35c0af.png" alt="Verify 05"/>
</p>

After clicking on `Write`, you need to confirm the transaction on the XDCPay wallet:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/190876653-eb8e558b-2b09-4c0f-ad5f-a3d17a54bf30.png" alt="Verify 05"/>
</p>

You can check our successful transaction on the [Block Explorer!](https://explorer.xinfin.network/txs/0xa365a7edea3af9ed22c6dffb2f24987f1941f21dbd4d9bbb13b11022439de96a#overview)

---

For more information about Brownie, Please Visit [Brownie Documentation](https://eth-brownie.readthedocs.io/en/stable/).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
Resources used during the deployment of the XRC20 Token can be found at [XRC20 Contract Folder](./xrc20-examples).

