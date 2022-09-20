# Testing & Deploying An XRC20 Token Using Hardhat

## Overview
Hardhat is a development environment for Ethereum software for testing, compiling, debugging and deploying your smart contracts and dApps.

In this tutorial we will go through a process of creating XRC20 token and deploying in on a XDC network.

## XDC Wallet
For this tutorial we will be using [XDCPay](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo) wallet extension.

## Setting up the environment

Before continuing with the rest of a guide make sure you have Node.js installed. You can download it from here https://nodejs.org/en/download/

For this tutorial we will be using the following configuration.

```sh
node -v
v18.9.0
npm -v 
8.19.1
```

Now we can initialize a new project
```sh
npm init
```
> Tip: to generate project without any questions you can use `npm init -y`

and install `hardhat` dependency
```sh
npm install --save-dev hardhat
```
now run:
```sh
npx hardhat
```
and select `Create a JavaScript project`
```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.11.2

? What do you want to do? … 
▸ Create a JavaScript project
  Create a TypeScript project
  Create an empty hardhat.config.js
  Quit
```

- Now pass hardhat project root or just press enter for default
- Enter `y` for adding `.gitignore`
- Press enter for `Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)?`

You setting up project should have the following folder structure:

As you can see, hardhat also created some template files, but we will ignore them for this tutorial.

## Adding XDC Testnet and Mainnet to hardhat

### `.env` file

We will store our network configuration in `.env` file and tell hardhat to read it from there.

You can use `.env.example` as a template.

Your `.env` file should look like this: 

```
XINFIN_NETWORK_URL=https://erpc.xinfin.network
APOTHEM_NETWORK_URL=https://erpc.apothem.network
XINFIN_PRIVATE_KEY=0xyourprivatekey
APOTHEM_PRIVATE_KEY=0xyourprivatekey
```

> Tip: never commit files containing your seed phrase or private key to a git

Now, we need to install `dotenv` dependency:

```sh
npm install dotenv
```

After that, in `hardhat.config.js` add the following line at the very beginning:

```javascript
require('dotenv').config();
```

Next, add `networks` like this:

```javascript
// hardhat.config.js
...

module.exports = {
  ...
  networks: {
    xinfin: {
      url: process.env.XINFIN_NETWORK_URL,
      accounts: [process.env.XINFIN_PRIVATE_KEY]
    },
    apothem: {
      url: process.env.APOTHEM_NETWORK_URL,
      accounts: [process.env.APOTHEM_PRIVATE_KEY]
    }
  }
};
```

You should have something similar to this
```javascript
require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    xinfin: {
      url: process.env.XINFIN_NETWORK_URL,
      accounts: [process.env.XINFIN_PRIVATE_KEY]
    },
    apothem: {
      url: process.env.APOTHEM_NETWORK_URL,
      accounts: [process.env.APOTHEM_PRIVATE_KEY]
    }
  }
};
```

## How to get private key

Here is how you can get your private key using XDCPay wallet extension

Finally, we can request some testnet funds for deploying and testing our token.

Go to https://faucet.apothem.network/ and paste your address and press `Request 1000 XDC`

## Writing XRC20 token smart contract

XRC20 is a standard which defines set of `methods` as well as `events` to be implemented which allows easier integration with other smart contracts, decentralized exchanges and wallets.

### Methods

Methods are used to set or read on-chain data, like getting an account balance or transferring funds.

XRC20 defines following methods:

```solidity
// get total amount of tokens in circulation
function totalSupply() public view returns (uint256);
// get balance of a particular address 
function balanceOf(address tokenOwner) public view returns (uint);
// get number of tokens approved for withdrawal
function allowance(address tokenOwner, address spender)
public view returns (uint);
// transfer tokens to another account
function transfer(address to, uint tokens) public returns (bool);
// set withdrawal limit for delegate
function approve(address spender, uint tokens) public returns (bool);
// transfer tokens by delegate
function transferFrom(address from, address to, uint tokens) public returns (bool);
```

### Events

Events are used to log data so it can be read off-chain. They allow off-chain applications to see what happens within your smart contract.

Those are two basic events: 

```solidity
// log when approval limit is changed
event Approval(address indexed tokenOwner, address indexed spender,
 uint tokens);
// log when tokens sent from one account to another
event Transfer(address indexed from, address indexed to,
 uint tokens);
```

### Contract data

Besides implementing the interface methods, smart contracts usually need store some data within the blockchain.

For XRC20 contract we need to store following data:

```solidity
// name of our token
string public name;
// token symbol, like ETH
string public symbol;
// how divisable token can be
uint8 public decimals;

// total amount of tokens in circulation
uint256 private _totalSupply;
    
// mapping(...) as a key/value map. For each address we store its balance
mapping(address => uint) private balances;
// withdrawal allowance by a delegate
mapping(address => mapping(address => uint)) private allowances;
```

### Packing it up

In the end we should have something like this

```solidity
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Token {
    // name of our token
    string public name;
    // token symbol, like ETH
    string public symbol;
    // how divisable token can be
    uint8 public decimals;

    // total amount of tokens in circulation
    uint256 private _totalSupply;

    // mapping(...) as a key/value map. For each address we store its balance
    mapping(address => uint256) private balances;
    // withdrawal allowance by a delegate
    mapping(address => mapping(address => uint256)) private allowances;

    // log when approval limit is changed
    event Approval(
        address indexed tokenOwner,
        address indexed spender,
        uint256 tokens
    );
    // log when tokens sent from one account to another
    event Transfer(address indexed from, address indexed to, uint256 tokens);

    // Contract initialization.
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;

        _totalSupply += _initialSupply * 10**decimals;
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

Now save it as a `Token.sol` in `contracts/` folder.

## Compiling and Testing

First, lets compile our contract to see that everything works fine.

```sh
npx hardhat compile
```
output should be:
```
Downloading compiler 0.8.17
Compiled 2 Solidity files successfully
```

Ok, now lets do some tests in a simulated environment before deploying it anywhere. It is recommended that you do tests for every contract you create because it will save you time and gas tokens.

Create file `Token.js` in `test/` folder and parse following code:

```javascript
const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("Token");

    // deploying your token in a simulated network
    const myToken = await MyToken.deploy("MyToken", "MY", 18, 1000);
    // getting owners balance
    const ownerBalance = await myToken.balanceOf(owner.address);
    expect(await myToken.name()).to.equal("MyToken");
    expect(await myToken.symbol()).to.equal("MY");
    expect(await myToken.totalSupply()).to.equal(ownerBalance);
  });
});
```

Here we creating a test case to check if we can deploy our token without any errors.

Now we can run
```sh
npx hardhat test
```
and you should get this:
```


  Token contract
    ✔ Deploy token (772ms)


  1 passing (775ms)

```

So now our token can be deployed on a testnet without any problems!

## Deploying

Finally, the last step is deploying our token on a live network.
Lets create `deployToken.js` file in `scripts/` folder and put this code into it:

```javascript
// deployToken.js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployer address:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const MyToken = await ethers.getContractFactory("Token");
  const myToken = await MyToken.deploy("MyToken", "MY", 18, 1000);

  console.log("Token address:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Here we get our deployer account from a private key we provided earlier.
```javascript
const [deployer] = await ethers.getSigners();
```

And then we pull our smart contract and deploy it with our parameters
```javascript
const MyToken = await ethers.getContractFactory("Token");
const myToken = await MyToken.deploy("MyToken", "MY", 18, 1000);
```

All that is left now is to run:
```sh
npx hardhat run scripts/deployToken.js --network apothem
```

Now we can copy our token address and check it on https://explorer.apothem.network

> Tip: To deploy it on a mainnet, simply change network to `xinfin`

### Congratulations 🥳! Now you know how to deploy our own XRC20 token!