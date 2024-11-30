# How to make a XRC-20 Royalty Token with Foundry.
This tutorial’s purpose is to create an XRC-20 token with foundry that will return a royalty amount (of that XRC-20 token) to the original creator of the contract.

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
    - [What you will learn](#what-you-will-learn)
    - [What you will do](#what-you-will-do)
- [The Tools We're Using](#the-tools-were-using)
- [Set up Foundry](#set-up-foundry)
- [environment SetUp](#environment-setup)
- [Smart Contract Development](#smart-contract-development)
- [Testing Our Smart Contract](#testing-our-smart-contract)
- [Deploying Our Smart Contract To The Blockchain](#deploying-our-smart-contract-to-the-blockchain)
- [Veryfing Contracts on the Block Explorer](#veryfing-contracts-on-the-block-explorer)


# 📰 Overview

![image](https://user-images.githubusercontent.com/114102465/203121145-7cc2a09d-4b2d-4606-90a7-8531c036afd4.png)


[Foundry](https://book.getfoundry.sh/) is a smart contract development toolchain.

Foundry manages your dependencies, compiles your project, runs tests, deploys, and lets you interact with the chain from the command-line and via Solidity scripts.

### What you will learn
In this tutorial, you will learn how to set up Foundry and use it to build, test and deploy a XRC20 Royalty Token on both the XDC Network mainnet and XDC Apothem testnet.

### What you will do
- Install and setup Foundry
- Create an XRC20 Royalty token
- Compile the Contract
- Deploy the Contract
- Interact with the XRC20 Royalty token
- Check the deployment status on [XDC Mainnet](https://explorer.xinfin.network/) and [XDC Testnet](https://apothem.blocksscan.io/)

# The Tools We're Using
- [Foundry](https://book.getfoundry.sh/) : a fast Solidity development toolkit that enables developers to write their tests in Solidity.
- [Solmate](https://github.com/Rari-Capital/solmate) : a library that contains gas-optimized contracts such as ERC20, ERC721, and more.
- [Visual Studio Code](https://code.visualstudio.com/) : a source-code editor made by Microsoft with the Electron Framework, for Windows, Linux and macOS.
- [XDC Testnet explorer](https://explorer.xinfin.network/)
- [Testnet XDC Faucet](https://faucet.apothem.network/) : a faucet that gives 1000 XDC for test.
- [XDCPay](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo) :  is an extension for accessing XDC's XDPoS enabled distributed applications, or "Dapps" in your browser.

# Set up Foundry
Before we can start writing some code, we need to set up our environment. We're going to be writing our contracts and testing them in Foundry.

### Installing Foundry For MacOS / Linux:

Open-up terminal and type in the command:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

Afterward type:
```bash
foundryup
```
Foundry should now be installed and ready to go!

### Installing Foundry For Windows:

If using Windows, you need to install Foundry from the source. First, install [Rust](https://rustup.rs/) with the [official documentation](https://book.getfoundry.sh/getting-started/installation).

Then, open the command prompt and type in the command:
```bash
cargo install --git https://github.com/foundry-rs/foundry foundry-cli anvil --bins --locked
```
To update from source, run the same command again.

# environment SetUp

Now that we've installed Foundry, it's time to set up our folder where we will write our smart contract. From the same terminal window that you installed Foundry, type the following commands:

1. Make our folder where will we initialize our project. Then navigate into that folder with the following commands:
```bash
mkdir XRC20_Royalty && cd XRC20_Royalty
```
2. Initialize our Foundry project within our XRC20_Royalty folder:
```bash
forge init
```
3. Install Solmate into our Foundry project:
```bash
forge install rari-capital/solmate
```
4. Create a remappings.txt file for the Solmate library we just added:
```bash
touch remappings.txt
```
5. Open up your project in your IDE. For this tutorial, we’ll be using VSCode with this Solidity plugin:
```bash
code .
```
Here’s what our IDE looks like.

![image](https://user-images.githubusercontent.com/114102465/203061766-76fbddb4-35c4-40d7-82fb-c985eed36e70.png)


6. Add these lines to remappings.txt so we can easily call the Solmate library in our contract:
```bash
solmate/=lib/solmate/src/
forge-std=lib/forge-std/src/
```
Now that our environment and libraries are set up, we'll move into developing our smart contract!

# Smart Contract Development

We will make a contract that passes tokens to the original contract creator whenever a token is transferred between wallets!

1. In your IDE, navigate to `src/Counter.sol` and rename the file to `RoyaltyToken.sol`.

2. Import the Solmate ERC20 library in `RoyaltyToken.sol` and change the name of the contract. Under `pragma solidity ^0.8.14;`, add the following lines of code:
```bash
import { ERC20 } from "solmate/tokens/ERC20.sol";

contract RoyaltyToken is ERC20 {}
```
3. Add in our state variables for the royalties. In the contract, add an address `royaltyAddress` variable and uint256 `royaltyFeePercentage` variable:
```bash
contract RoyaltyToken is ERC20 {
    address public royaltyAddress;
  uint256 public royaltyFeePercentage;
}
```
4. Make a constructor for the token. A constructor is what creates our token from the imported Solmate template.

Add the following variables to the constructor:

1. `string memory _name`
2. `string memory _token`
3. `uint8 _decimals`
4. `uint256 _royaltyFeePercentage`
5. `uint256 _initialSupply`
Directly after we’ve added these variables and closed the `()`, add `ERC20(_name, _symbol, _decimals)`.

After that add brackets `{}` and inside the brackets set the following variables:

Set `royaltyAddress` variable as the wallet address of the creator of the contract: `royaltyAddress = msg.sender;`
The `RoyaltyFeePercentage` as the constructor variable: `royaltyFeePercentage = _royaltyFeePercentage;`
Mint the tokens to the creator of the contract and pass in the `_initialSupply` variable: `_mint(msg.sender, _initialSupply);`
Our constructor should now look like the following:
```bash
contract RoyaltyToken is ERC20 {
    address public royaltyAddress;
    uint256 public royaltyFeePercentage;

    constructor(
        string memory _name, 
        string memory _symbol, 
        uint8 _decimals,
        uint256 _royaltyFeePercentage,
        uint256 _initialSupply
    ) ERC20(_name, _symbol, _decimals) {
        royaltyAddress = msg.sender;
        royaltyFeePercentage = _royaltyFeePercentage;
        _mint(msg.sender, _initialSupply);
    }
}
```
5. Next, override the transfer function.
```bash
function transfer(address to, uint256 amount) public virtual returns (bool) {
        balanceOf[msg.sender] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(msg.sender, to, amount);

        return true;
    }
```    

Our contract now looks like this:

```bash
pragma solidity ^0.8.14;

import { ERC20 } from "solmate/tokens/ERC20.sol";

contract RoyaltyToken is ERC20 {
    address public royaltyAddress;
    uint256 public royaltyFeePercentage;

    constructor(
        string memory _name, 
        string memory _symbol, 
        uint8 _decimals,
        uint256 _royaltyFeePercentage,
        uint256 _initialSupply
    ) ERC20(_name, _symbol, _decimals) {
        royaltyAddress = msg.sender;
        royaltyFeePercentage = _royaltyFeePercentage;
        _mint(msg.sender, _initialSupply);
    }

    function transfer(address to, uint256 amount) public virtual returns (bool) {
        balanceOf[msg.sender] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(msg.sender, to, amount);

        return true;
    }
}
```
Add override after virtual in the function declaration:


`function transfer(address to, uint256 amount) public virtual override returns (bool) {
...
} `
Inside of the `transfer` function, create a uint256 called `royaltyAmount` and set it equal to the amount in the function parameters multiplied by the `royaltyFeePercentage` divided by `100`. This calculates the royalty amount that we will be sending to our `royaltyAddress`.
```bash
uint256 royaltyAmount = amount * royaltyFeePercentage / 100;
```
```bash
function transfer(address to, uint256 amount) public virtual returns (bool) {
        uint256 royaltyAmount = amount * royaltyFeePercentage / 100;
    balanceOf[msg.sender] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(msg.sender, to, amount);

        return true;
    }
```
In the `unchecked {}` for the `balanceOf[to]`, subtract the amount by the `royaltyAmount` and add an additional `balanceOf[royaltyAddress]` where we add the `royaltyAmount`:

```bash
function transfer(address to, uint256 amount) public virtual returns (bool) {
        uint256 royaltyAmount = amount * royaltyFeePercentage / 100;
                balanceOf[msg.sender] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
                        //subtract the amount by the royalty amount
            balanceOf[to] += amount - royaltyAmount;
                        //add to the royaltyAddress wallet the royaltyAmount
                        balanceOf[royaltyAddress] += royaltyAmount;
        }

        emit Transfer(msg.sender, to, amount);

        return true;
    }
```
Add an additional emit Transfer where we send the royaltyAddress the royaltyAmount. Additionally, subtract the original emit Transfer amount by the royaltyAmount:

```bash
function transfer(address to, uint256 amount) public virtual override returns (bool) {
        uint256 royaltyAmount = amount * royaltyFeePercentage / 100;
        
                balanceOf[msg.sender] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.

        unchecked {
                        //subtract the amount by the royalty amount
            balanceOf[to] += amount - royaltyAmount;
                        //add to the royaltyAddress wallet the royaltyAmount
            balanceOf[royaltyAddress] += royaltyAmount;
        }
        //transfer to the royalty address
        emit Transfer(msg.sender, royaltyAddress, royaltyAmount);
        //transfer to the original address
        emit Transfer(msg.sender, to, amount - royaltyAmount);

        return true;
    }
```
6. Our contract is now finished! In total it should look like this:

```bash
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import { ERC20 } from "solmate/tokens/ERC20.sol";

contract RoyaltyToken is ERC20 {
    
    address public royaltyAddress;
    uint256 public royaltyFeePercentage;

    constructor(
        string memory _name, 
        string memory _symbol, 
        uint8 _decimals,
        uint256 _royaltyFeePercentage,
        uint256 _initialSupply
    ) ERC20(_name, _symbol, _decimals) {
        royaltyAddress = msg.sender;
        royaltyFeePercentage = _royaltyFeePercentage;
        _mint(msg.sender, _initialSupply);
    }

    function transferWithRoyalty (address to, uint256 amount) public returns (bool) {
        uint256 royaltyAmount = amount * royaltyFeePercentage / 100;

        transfer(royaltyAddress, royaltyAmount);

        transfer(to, amount - royaltyAmount);

        return true;
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        uint256 royaltyAmount = amount * royaltyFeePercentage / 100;
        
        balanceOf[msg.sender] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            balanceOf[to] += amount - royaltyAmount;
            balanceOf[royaltyAddress] += royaltyAmount;
        }
        //transfer to the royalty address
        emit Transfer(msg.sender, royaltyAddress, royaltyAmount);
        //transfer to the original address
        emit Transfer(msg.sender, to, amount - royaltyAmount);

        return true;
    }
}
```

# Testing Our Smart Contract
Thanks to Foundry, we can test our new `RoyaltyToken.sol` contract in Solidity!

Set up your test contract

1. In your IDE, head to `test/Counter.t.sol` and rename the file to `RoyaltyToken.t.sol`.

2. Delete everything in the original body of `RoyaltyToken.t.sol`.

3. Add our solidity version to the top: `pragma solidity ^0.8.14;`.

4. Import the RoyaltyToken from `royaltyToken.sol`. Add `import {RoyaltyToken} from "src//RoyaltyToken.sol";` to the top of your contract.

5. Import forge testing tools: `import "forge-std/Test.sol";`.

6. Make a new contract called `RoyaltyTokenTest` and set it to a `Test`. Our contract should look like this.

```bash
pragma solidity ^0.8.14;

import {RoyaltyToken} from "src//RoyaltyToken.sol";

import "forge-std/Test.sol";

contract RoyaltyTokenTest is Test {}
```
### Create your test contract
1. Create your `RoyaltyToken`, `RoyaltyFeePercentage`, and `InitialSupply` arguments. For this test, we will be using `2%` for the fee and `10,000` initial tokens:

```bash
pragma solidity ^0.8.14;

import {RoyaltyToken} from "src//RoyaltyToken.sol";

import "forge-std/Test.sol";

contract RoyaltyTokenTest is Test {
    RoyaltyToken public token;
  uint256 public royaltyFeePercentage = 2;
  uint256 public initialSupply = 10 ** 4;
}
```
2. Create a `setUp()` function that constructs our `RoyaltyToken`.
```bash
pragma solidity ^0.8.14;

import {RoyaltyToken} from "src//RoyaltyToken.sol";

import "forge-std/Test.sol";

contract RoyaltyTokenTest is Test {
    RoyaltyToken public token;
  uint256 public royaltyFeePercentage = 2;
  uint256 public initialSupply = 10 ** 4;
    
    function setUp() public {
       token = new RoyaltyToken("RoyaltyToken", "ROYT", 18, royaltyFeePercentage, initialSupply);
    }

}
```
3. Create a `testTransfer()` function that makes two dummy addresses and transfers funds between them. We will transfer 1,000 of the 10,000 tokens we created to an address. We're then going to check whether the address received 980 of those 1,000 tokens and whether our original contract address received the other 20. Afterward, we will initiate a transfer of 100 tokens between the newly created address and another wallet. We'll then check whether all 3 of the wallets have the correct amounts.
```bash
function testTransfer() public {
        address alice = address(1);
        address bob = address(2);
        
        token.transfer(alice, 1000);
        
        assertEq(token.balanceOf(alice), 980);
        assertEq(token.balanceOf(address(this)), 9020);

        hoax(alice);
        token.transfer(bob, 100);

        assertEq(token.balanceOf(alice), 880);
        assertEq(token.balanceOf(bob), 98);
        assertEq(token.balanceOf(address(this)), 9022);
    }
```
4. Our entire contract should look like this:
```bash
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import {RoyaltyToken} from "src//RoyaltyToken.sol";

import "forge-std/Test.sol";

contract RoyaltyTokenTest is Test {
    RoyaltyToken public token;
    uint256 public royaltyFeePercentage = 2;
    uint256 public initialSupply = 10 ** 4;


    function setUp() public {
       token = new RoyaltyToken("RoyaltyToken", "ROYT", 18, royaltyFeePercentage, initialSupply);
    }

    function testTransfer() public {
        address alice = address(1);
        address bob = address(2);
        
        token.transfer(alice, 1000);
        
        assertEq(token.balanceOf(alice), 980);
        assertEq(token.balanceOf(address(this)), 9020);

        hoax(alice);
        token.transfer(bob, 100);

        assertEq(token.balanceOf(alice), 880);
        assertEq(token.balanceOf(bob), 98);
        assertEq(token.balanceOf(address(this)), 9022);
    }
}
```
5. Now, let’s compile our contract. Open up that terminal window we used earlier and type the command `forge build` .
```bash
forge build
```

`Compiling...
[⠰] Compiling 19 files with 0.8.14
[⠒] Solc 0.8.14 finished in 2.00s
Compiler run successful`

Our smart contract is finished and is correctly compiling! Now let's test our smart contract to make sure it's actually doing what we want it to do.

6. Open up terminal and run `forge test`. This runs our tests and helps us understand whether or not they passed.
```bash
forge test
```

`Compiling...
No files changed, compilation skipped

Running 1 test for test/RoyaltyToken.t.sol:RoyaltyTokenTest
[PASS] testTransfer() (gas: 78242)
Test result: ok. 1 passed; 0 failed; finished in 1.45ms`

If all goes well, you've just successfully made a smart contract in foundry, overrode the original transfer function, and ran some successful tests! Now, it's time to deploy the contract.

# Deploying Our Smart Contract To The Blockchain
It's time for us to deploy our smart contract to the blockchain.

1. Open up terminal and run `cast wallet new` - Create a new random keypair.
```bash 
cast wallet new
```

`Successfully created new keypair.
Address: 0x80B75825D86a005453A08cD1a6Bd44C24d73A41d
Private Key: 0x4159ae5d34bb48367f9773c48de0e0effb2082681a69cd95f4e613246720af24`

2. Now Copy the address and go to XDC faucet for [test XDC](https://faucet.apothem.network/), And replace `0x` by xdc.Click on request 1000 XDC.

![image](https://user-images.githubusercontent.com/114102465/203102902-22b85584-271c-4755-8fc1-975955cecd80.png)

We've got everything we need to deploy our contract to the blockchain now.

### Deploying Our Contract
Head back to your terminal window to complete deployment.

1. Open up the terminal and type the following command, replacing [PASTE YOUR PRIVATE KEY HERE]
```bash
forge create --rpc-url https://erpc.apothem.network --private-key [PASTE YOUR PRIVATE KEY HERE] src/RoyaltyToken.sol:RoyaltyToken --constructor-args "RoyaltyToken" "ROYT" 18 2 10000000000000000000000 --legacy
```

`Compiling...
No files changed, compilation skipped
Deployer: 0x80B75825D86a005453A08cD1a6Bd44C24d73A41d
Deployed to: 0x27f4D21150640df0856fF6CB5d57eB4447CC59AD
Transaction hash: 0x89f0edbf4755e93b8d25857e5a0fa0f7cae414cefac42e6ec9cb02930a932d41`


We can now see that our contract is deployed to the blockchain. If I copy the address in Deployed to, we can view the contract on [explorer](https://apothem.blocksscan.io/address/xdc27f4D21150640df0856fF6CB5d57eB4447CC59AD#transactions).

![image](https://user-images.githubusercontent.com/114102465/203111916-f92d40c2-20d6-4e20-ae21-1e547f5d5d94.png)

# Veryfing Contracts on the Block Explorer
Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [Apothem Block Explorer](https://apothem.blocksscan.io/address/xdc27f4D21150640df0856fF6CB5d57eB4447CC59AD#transactions).
1. Flatten our smart contract, Open up the terminal and type the following command 
```bash
forge flatten --output src/Contract.flattened.sol src/RoyaltyToken.sol
```
`Flattened file written at src/Contract.flattened.sol`
Now open the `Contract.flattened.sol` file and copy all source code, go to the [block explorer](https://apothem.blocksscan.io/address/xdc27f4D21150640df0856fF6CB5d57eB4447CC59AD#transactions) and click on Verify and Publish.
![image](https://user-images.githubusercontent.com/114102465/203114917-29ec08e6-3810-45ef-995a-771c52ea967c.png)

![image](https://user-images.githubusercontent.com/114102465/203115094-9e3dbfc4-5f85-41d7-8bd4-c6ef3705bf65.png)

![image](https://user-images.githubusercontent.com/114102465/203115311-5c360ae2-381b-49f6-bc89-da87ded7818a.png)

![image](https://user-images.githubusercontent.com/114102465/203115584-93e90371-8560-460d-8758-a5024d51e4d6.png)

If everything is correctly filled out, your contract page on the block explorer should display a new tab called Contract.

---
For more information about XDC Network, Please Visit [XDC Network Documention](https://docs.xdc.org/).<br>
For more information about Foundry, Please Visit [Foundry Book](https://book.getfoundry.sh/).<br>
XDC Network [Disocrd](https://discord.gg/RBRx2HvbMr).<br>















































