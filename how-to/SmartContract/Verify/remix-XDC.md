---
Id: Verify-smart-contract.
Title: Verify smart contract on XDC Network.
Descriotion: How to verify a smart contract on the XDC Network.
Keywords:
   - Documents
   - Verify 
   - Contract
   - Apothem
   - Remix
---

#   Table of contents

   - [Overview](#overview)
   - [What you gonna learn](#what-you-gonna-learn)
   - [What you gonna do](#what-you-gonna-do)
   - [Setting up the development](#setting-up-the-development-environment)
   - [Writing our Smart Contract](#writing-our-smart-contract)
   - [Compile](#compilie)
   - [Deploy](#deploy)
   - [Verify smart contracts on the Block Explorer](#veryfing-smart-contracts-on-the-block-explorer)

##  Overview

[Remix IDE](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.4.26+commit.4563c3fc.js&language=Solidity) is an open source web and desktop application. It fosters a fast development cycle and has a rich set of plugins with intuitive GUIs.

### What you gonna learn

In this tutorial, you will learn how to create create your smart contract on Remix IDE.  And also learn how to Verify a smart contract on Block Explorer .
   
##  What you gonna do

   - Open Remix IDE.
   - Now, write smart contract in it.
   - Compile and Deploy Smart contract.
   - To deply our contract, we need some test XDC tokens. So, Open XDCPay wallet and use faucet for some test XDC tokens.
   - Verify the contract on Block Explorer.

#   Setting up the development environment

Now, open Remix IDE and go to the `Side panel(at the left side)` or`Main panel(in the middle of page)` and there you can see an option of `Create new file` and name that file as you want.

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195331309-b5376d0b-dd21-4029-b760-50fa5b8199b6.png">
</p>

##  Writing our Smart Contract

Lets create a simple contract `erc20.sol` on langauge Solidity, the "erc20" contract should have:

  - a `constructor` where deployer can define Name, Symbol and Decimal.
  - a `totalSupply` method where total supply of token can be determined.
  - a `balaceOf` method of token balance.
  - a `transfer` method of token transfer.
  - a `approve` method of approval of token.
  - a `transferFrom` method from where the token had been transferred.
  - a `allowance` method of allow the token.
  - a `approveAndCall` method where we can approve the called tokens.


Now, we will create a new file named `erc20.sol`:

Click on the option **`Create New File(at the side panel)`** in the File Explorer of Remix IDE <img src="https://user-images.githubusercontent.com/114388943/195348246-0ea3868b-b43e-47af-942d-3944608852a5.png">

Here, we will write the following code of `erc20.sol`:

```solidity
// SPDX-License-Identifieer:MIT
pragma solidity ^0.4.26;
 
//Safe Math Interface
 
contract SafeMath {
 
    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
 
    function safeSub(uint a, uint b) public pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
 
    function safeMul(uint a, uint b) public pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
 
    function safeDiv(uint a, uint b) public pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}
 
 
//ERC Token Standard #20 Interface
 
contract ERC20Interface {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);
 
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}
 
 
//Contract function to receive approval and execute function in one call
 
contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
}
 
//Actual token contract
 
contract QKCToken is ERC20Interface, SafeMath {
    string public symbol;
    string public  name;
    uint8 public decimals;
    uint public _totalSupply;
 
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;
 
    constructor() public {
        symbol = "PS";
        name = "Deep";
        decimals = 2;
        _totalSupply = 100000;
        balances[0x1e636C6adF5AB1fBc447ecfEc0690C7b9e13ac25] = _totalSupply;
        emit Transfer(address(0), 0x1e636C6adF5AB1fBc447ecfEc0690C7b9e13ac25, _totalSupply);
    }
 
    function totalSupply() public constant returns (uint) {
        return _totalSupply  - balances[address(0)];
    }
 
    function balanceOf(address tokenOwner) public constant returns (uint balance) {
        return balances[tokenOwner];
    }
 
    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
 
    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
 
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = safeSub(balances[from], tokens);
        allowed[from][msg.sender] = safeSub(allowed[from][msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(from, to, tokens);
        return true;
    }
 
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }
 
    function approveAndCall(address spender, uint tokens, bytes data) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, this, data);
        return true;
    }
 
    function () public payable {
        revert();
    }
}
```

### Compile

Now, try to compile the contract `erc20.sol`.
   
   - Open the Solidity Compiler in the Icon Panel at left side. <img src="https://user-images.githubusercontent.com/114388943/195362349-f75170f4-2a55-49a1-bf22-1e58d666f714.png">

   1. From the compiler option, select the compiler version **`v0.4.26`**.
   2. Choose language as **`Solidity`**.
   3. Set the EVM version as the **`compiler default`**.
   4. Next, select **`Compile erc20.sol`**.
   
<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195366620-8a92abce-8a57-4a55-a7d3-eb3c5a2fb914.png">
</p>

   - After Successful Compilation, it will show. <img src="https://user-images.githubusercontent.com/114388943/195367397-e9ab8378-d543-4104-8009-504c5ff9cf8b.png">
   
   - Once our contract has been compiled, we can deploy it to the Apothem Test Network.

##  Deploy

To `Deploy` a contract we need some test XDC tokens as a transaction fee of smart contract. 

If you are new then:

  - Download XDCPay Wallet. <img src="https://user-images.githubusercontent.com/114388943/195381215-bc0367e1-2a64-45ee-bdbf-a97711c8180c.png">. 
  - And after this `Accept Terms of Service`. <img src="https://user-images.githubusercontent.com/114388943/195388690-6f2a2654-c189-46f4-a60a-e6d0c842f6bb.png">.
  - Create a strong password. <img src="https://user-images.githubusercontent.com/114388943/195390177-50f019f9-d082-47a4-8f5e-30a932771d02.png">.
  - Keep the `Seed Phrase` Safe. **Don't share with anyone else otherwise you may loss your assets**. <img src="https://user-images.githubusercontent.com/114388943/195393287-03f49a4d-2c4d-4a82-8153-22d47057574b.png">.
  - In this way, we successfully created XDCPay wallet. And look like this, <img src="https://user-images.githubusercontent.com/114388943/195395320-fc61647b-db4d-4899-97c7-89bc8ab14432.png">.

Otherwise, if you have installed XDCPay wallet then open it and copy your `Address` will look like this `xdc1e636c6adf5ab1fbc447ecfec0690c7b9e13ac25`. And in case of Ethereum network the `XDC` will be changed into `Ox`.

  - And now you need some test XDC tokens for transaction to deploy smart contract. So, go to the XDC Faucet(https://faucet.apothem.network/) and ask for some test tokens. <img src="https://user-images.githubusercontent.com/114388943/195511934-771a25bb-0bb3-4083-aaeb-38e58eedc64e.png">.
  - If your request is approved then XDC tokens will be credited to your account, Otherwise confirm that your account is connected to `XDC Apothem Testnet`. <img src="https://user-images.githubusercontent.com/114388943/195514177-c10b76d9-2122-450e-8183-7a527889d6c5.png">.

To deploy our smart contract make sure that you have choose:
   
  1. Environment: `Injected Web3`.
  2. Account: `0x1e636C6adF5AB1fBc447ecfEc0690C7b9e13ac25`.
  3. Gas Limit: As you want(3000000).
  4. Value: 0 and `Wei`.
  5. Contract:  `QKCToken-erc20.sol`.
  
<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195520160-ed4d50ab-ca65-4951-904f-3a29e705381a.png">
</p>

Now, you are ready to `Deploy` the contract. And when you `Click` on the Deploy, a Popup will appear to confirm the trasaction for contract dep;oyment.

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195520975-c17ca576-7d8a-4aef-8c7a-3c2a3e9831ba.png">
</p>

### Verify smart contracts on the Block Explorer

Once your Smart contract successfully deployed to the Blockchain, it will be interesting to verify your contract on Explorer Apothem Network(https://explorer.apothem.network/).

Now go to your wallet and get the most recent transaction details and copy transaction address.

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195566649-7c8385ea-1422-40df-99e7-00c588e4add2.png">
</p>

Next, go to the Explorer Apothem Network(https://explorer.apothem.network/) and paste the contract deployment. <img src="https://user-images.githubusercontent.com/114388943/195579500-9d509c40-bbe6-4468-aff1-6935774beba6.png">.

From there, we need to get the transaction details as well as the To Address where the contract is deployed. <img src="https://user-images.githubusercontent.com/114388943/195580387-a75ba3ad-eecc-4dae-a30a-20e30f960f8c.png">.

Here we have a `erc20` contract deployed  on XDC Apothem Testnet, we can search for our newly deployed contract on Explorer Apothem Network(https://explorer.apothem.network/) <img src="https://user-images.githubusercontent.com/114388943/195588958-9f29c506-dd8d-41c6-a768-204339849ca2.png">.

Now, click on `Verify and Publish` option.
   
   And fill all the entries:
   
   1. Contract Name: `erc20`.
   2. Compiler: check what you have written in solidity file for `compiler version(eg. 0.4.26+commit.4563c3fc)`.
   3. Contract code: Just paste what you have written in `erc20.sol` file.
   4. Now press `Submit` option.

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195590731-179b6278-4c85-47c1-8be7-8d42fcc190d0.png">
</p>

If If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195591122-a5036f15-886d-400d-b260-fea7b441eeef.png">
</p>

In this way we successfully created, deployed and verified our contract



 



  























 








