---
id: openZeppelin-flatten-remix
title: Flatten A Smart Contract Using Remix-ide
explation: "Use Remix IDE to deply and Flatten an openZeppelin contract."
Magic formulas:
    -documents
    -remix 
    -apothem
    -openZeppelin
    -flatten  
---
    
    
    
    
# Table of satisfaction:


- [Table of satisfaction](#table-of-satisfaction)
    
    - [Overview](#overview)
        - [What will you learn](#what-will-you-learn)
        - [What will you do](#what-will-you-do)
    - [About OpenZeppelin](#-about-openzepplin)
    - [Setting up the development environment](#-stting-up-the-development-enviroment)
    - [Creating XDCPay Wallet for doing transactions](#_creating-xdcpay-wallet-for-doing-transactions)
    - [Adding XDC Apothem Testnet to wallet](#adding-xdc-apothem-testnet-to-wallet)
    - [Writing our first OpenZeppelin Contract](#writing-our-first-openzeppelin-contract)
    - [Methods](#methods)
    - [Compiling and Deploying](#compiling-and-deploying)
    - [Flattening our first smart contract](#flattening-our-first-smart-contract)
    - [Verifying our contract on Block Explorer](#verifying-our-contract-on-block-explorer)
    - [Interacting our contract on Block Explorer](#interacting-our-contract-on-block-explorer)
    
    
    #  Overview
    [Remix IDE(Integrated Development Environment)]
    (https://remix.xinfin.network/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js) is a web application that can be used to write, debug and deploy Ethereum Smart Contracts.
    
    ##  What you will learn
    In this tutorial, you will learn how to set up Remix IDE and use it to build, test and deploy an OpenZeppelin smart contract on both networks such as XDC Network Mainnet and XDC Apothem Testnet.
    
    ###  What you will do
     - Setup Remix IDE
     - Create new smart contract (eg. OpenZeppelin)
     - Compile the smart contract 
     - Test the smart contract
     - Deploy the smart contract
     - Flatten the smart contract 
     - Verify the smart contract
     - You can check the deployment status on [xinfin.network](https://xinfin.network/#stats)
  
  ##  About Openzeppelin
  
  [OpenZeppelin](https://www.openzeppelin.com/contracts)  is a popular smart contract library that uses high-quality and safe Solidity code to construct a variety of Ethereum network contracts, including tokens and role-based features.
  
  #  Setting up the development environment
  
  [Remix]
  (https://remix.xinfin.network/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7)  is an open source web and desktop application. It fosters a fast development cycle and has a rich set of plugins with intuitive GUIs. Remix is used for the entire journey of contract development with Solidity language as well as a playground for learning and teaching Ethereum.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194699886-5ac59b47-64dc-4bff-8fdb-38c365e3a07e.png" width=1000px>
  </p>
  
  
  ##  Creating XDCPay Wallet for signing transactions
  
  In order to get started deploying new contracts on XDC Mainnet and/or Apothem, we need to have XDCPay wallet to sign our transactions and store XDC tokens.
  
  - First we have to install the chrome extension of [XDCPay](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo).
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194701644-54ba58b0-5fa5-4cfa-a6e7-dedaa0907479.png">
  </p>
  
  - Open the Chrome extension after it has been successfully installed.
  - Accept the Terms of Service

  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194702905-d9df1f04-ad2a-4a43-9f2b-60bc20cb0da0.png">
  </p>
  
  - Create a new XDCPay Wallet by setting up a strong password or use an existing Seed Phrase **`12 or 24-Word Mnemonic Phrase`** to recover your existing wallet here.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194703452-7e55568b-f7e0-4236-9f1d-9919a9c1937a.png">
  </p>
  
  - Keep the seed phrase safe. **Don't share this password with any other person, you may lose your assets**

  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194703895-661333de-05f6-441d-81bd-e3e1450210c9.png">
  </p>
  
  - Verify recovery phrase.
  - Your XDCPay Wallet has been successfully created.


  ###  Adding Testnet XDC to Development Wallet
  
  Now, our created account is empty, so we have to require some XDC tokens to do transactions on blockchain. We will use a faucet to fill our Wallet with Test XDC tokens, these tokens are meaningless, only used for Testnet because to avoid real currency.
  
  - First, we will copy our XDC Wallet Address. Our Wallet address will be like this **`xdce625f2f3b13fe36cd7faaeb2433bfd294ac9f183`**.  These account address are interchangeable with Ethereum network. We can access these accounts on Ethereum network by simply changing the initial `XDC` with `Ox`. 
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194705017-b1b8f091-f249-4b63-aefd-5db7a2a15cbc.png">
  </p>
  
  - Now, we will go to the  [XDC faucet](https://faucet.apothem.network/).
  - Enter your XDC account address and request for Test XDC here.

  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194708622-37ca5643-a0c5-4c90-b836-fb0f1e73403f.png">
  </p>
  
  -  If your request is approved, you will be credited with the XDC in your wallet.
  - If you can't see the XDC in your wallet, make sure you're connected to the XDC Apothem Testnet or the XDC Mainnet.
  - If you are currently connected to the XDC Mainnet, switch to the XDC Apothem Testnet.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194709279-1d4ab4c9-c384-42d6-9af7-709bfa40bff3.png">
  
 #  Writing our first OpenZeppelin Contract
  
  The source code used for OpenZeppelin contract is available in this tutorial. So, we are creating an XRC721 token by using the OpenZeppelin standards.
  
  Lets start by creating the `XRC721.sol` (don't forget to write '.sol') file.
  
  <p align="centre">
    <img scr="https://user-images.githubusercontent.com/114388943/194710086-adedea6e-92b0-4e04-8711-4fee99fe740a.png">
  </p>
  
  So, we write content of our contract here:
  
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.16;
  
  contract XRC721 {
    
  }
  ```
  
  ##  OpenZeppelin
  
  Inside our contract, we would be importing the scripts from **`OpenZeppelin`** Github repository. These form the foundation for our contract which is having all the code of different functions which needs to be implemented in our contract. We are also importing the **`Counters`** from **`OpenZeppelin`** Github repository which is used to keep account of the counter of the current tokenId.

  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
  import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
  
  contract XRC721 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
  }
  ```
  
  ###  Methods
  
  We need to create the `constructor` that is a function called only once when the contract is deployed, where we can parse as arguments information such as the token name and symbol. We would also create another function `createToken` which will take an address and `mint` our created `XRC721 NFT Token` to that address:
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  // import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
  // import "@openzeppelin/contracts/drafts/Counters.sol";
  
  import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
  import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
  
  contract XRC721 is ERC721 {
      using Counters for Counters.Counter;
      Counters.Counter private _tokenIds;
      
      constructor(string memory name, string memory symbol) ERC721(name, symbol) {
      }
      
      function createToken(address tokenOwner) public returns (uint256) {
          _tokenIds.increment();
          uint256 newItemId = _tokenIds.current();
          _mint(tokenOwner, newItemId);
          return newItemId;
      }
  }
  ```
  
  And here we have implemented everything we needed to make our token compliant with the XRC721 Standard. Of course there are more features we can implement to this contract, such as the [SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) library that replace naive mathematical operations for methods that will avoid `underflows` and `overflows`, and supply management methods such as `mint` and `burn`.
  
  #  Compiling and Deploying
  
  Lets try compiling the `XRC721.sol` contract:
  
  - Open the Solidity Compiler in the left side navigation panel <img src="https://user-images.githubusercontent.com/114388943/194712560-e928ba82-4f6c-409b-a645-4e70747cd6bf.png">.

  - From the compiler option, select the compiler version **`v0.8.16`**.
  - Choose Language as **`Solidity`**.
  - Set the EVM version as the **`compiler default`**.
  - Next, select **`Compile XRC721.sol`**.
  - After successful compilation, it will show ![4](https://user-images.githubusercontent.com/114388943/194714013-07b33840-ead3-486f-a27b-4a648d8de6cb.png).

  - Once our contract has been compiled, we can deploy it to the Apothem Test Network.
  
  For  deployment on the XDC Apothem Testnet. In either case, you need to have enough funds to pay for gas fees on the address that is being used for development.

  - Navigate to Deploy and Transactions ![2](https://user-images.githubusercontent.com/114388943/194714331-d979348a-6bbc-44a5-bb70-7da9e3f1f368.png)
  
  - Choose Injected Web3 as the **`environment`**.

  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194715212-77953afd-16e4-4dcb-9f00-5d46a6adc951.png">
  </p>
  
  - Confirm the popup to add the account to Remix IDE now.
  - Next, choose the account to which you want to deploy the contract.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194715762-5dab2917-1472-485e-960b-9afab8d332ca.png">
  </p>
  
  - Chose the contract as you want.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194715881-c95a3266-7819-418f-94ac-21c28fa4eebb.png">
  </p>
  
  - Add Name and Symbol to your token.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194733839-faea0cf4-9114-494e-a05f-bff76e912cfa.png">
  </p>

  - Press the `transact` button and a popup will appear, which we must confirm in order to create the transaction for contract deployment.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194734675-9ae070cf-820e-42a3-a585-f5c0b941027b.png">
  </p>
  
  ##  Flattening our smart contract
  
  Now, we have to `Flatten` our smart contract because by doing this our contract will be easily verified on Block Explorer.
  
  - For this we have to double click on our smart contract file and here we can see an option to `Flatten` our smart contract at the bottom of Menu panel.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194745226-8264255b-7a41-4136-a602-293c439f2095.png">
  </p>
  
  -  Now open the flattener tab and will see the option to select our smart contract which we need to flatten. Here we will select our XRC721.sol smart contract and it will give an option to save the flattened smart contract.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194746322-8416d323-c02e-42ab-9c97-2961dabcfdc7.png">
  </p>
  
  - Now, click on the flatten option which will open a dialog box which we need to accept and a new icon for flatter is added to our left navigation pane.

  <p align="center">
    <img src="https://user-images.githubusercontent.com/114388943/194746560-a9716813-bc75-44f7-b0f7-08f53a82ba2c.png">
  </p>
  
  - After flattening, we had flattened file `XRC721_flat.sol`.
  
  This flattened code would be used further when we are verifying our token.
  
  
  ###  Verifying Contracts on the Block Explorer
  
  Once you have successfully deployed your smart contract to the blockchain, it might be interesting to verify you contract on [XinFin Block Explorer](https://explorer.xinfin.network/).
  
  First lets check the address our contract is deployed. Go to your wallet and get the most recent transaction details, then copy the transaction address. 

  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194747114-09eb5ecc-68db-4870-b28f-0278fdda2848.png">
  </p>
  
  Now, navigate to the [XDC Block explorer](https://explorer.apothem.network/) and paste the transaction hash there.  Note that if you deployed your token to Apothem testnet then you will need to navigate to the [Apothem Explorer](https://explorer.apothem.network/), and if you deployed your token to XDC mainnet then you will need to navigate to the [mainnet explorer](https://explorer.xinfin.network/).
  
  Here, we will require transactions details and the **`To Address`** where the contract is deployed.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194747656-881b3b05-fde7-4ee1-8d1b-509522be9538.png">
  </p>
  
  Here we have a `XRC721` contract deployed on XDC Mainnet at the `0x1e636C6adF5AB1fBc447ecfEc0690C7b9e13ac25`. This address is in the Ethereum standard but we can simply swap the `Ox` prefix for `XDC` and search for our newly deployed contract on [XinFin Block Explorer](https://explorer.xinfin.network/).
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194748684-36ef68dc-68ec-401c-a8ea-2001b78c3d68.png">
  </p>
  
  And click on the `Verify And Publish`.
  
  We will be go to the Contract Verification page where we need to fill out:
  
  - Contract Name: <em>XRC721</em>
  - Compiler: <em> Check your</em> `Remix IDE` <em> for Compiler Version</em>
  - Contract Code: <em> Just paste everything from your</em> `flattened contract` <em> file.</em>

  Once everything is filled out, press Submit!

  <p align="center">
    <img src="https://user-images.githubusercontent.com/114388943/194751633-9fd1f488-1b86-4323-826f-8de30dc96a47.png">
  </p>
  
  If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`.

  <p align="center">
    <img src="https://user-images.githubusercontent.com/114388943/194752136-ce65a85b-c08d-4d31-9101-da29fafc5195.png">
  </p>
  
  ##  Interacting with your contract on the Block Explorer
  
  With your XDCPay wallet, it is possible to interact with verified Smart Contracts on the [XinFin Network Block Explorer](https://explorer.xinfin.network/). You can read from, write to, or simply read the information tied to your Smart Contract on the blockchain.

  For that, we would first copy the address where our contract is deployed on the network.

  After that we would need to go back to the Remix IDE and paste that deployed contract address in the `At Address` button text box and click on that button.

  <p align="center">
    <img src="https://user-images.githubusercontent.com/114388943/194758749-fd2507b5-3000-430a-a324-59efb7591e37.png">
  </p>
  
  This will access the contract and all function to your deployed contract and we can easily play with those functions.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194759081-c091555c-75fa-48f9-9bb7-987c6ef80be0.png">
  </p>
  
  Now, we will mint a new NFT token to our wallet.
  
  Here we will pass to our `wallet address` and then we click on the `createToken` button.
  
  <p align="centre">
    <img src="https://user-images.githubusercontent.com/114388943/194759405-29e14922-f10c-4420-ac55-28e05434a4ad.png">
  </p>
  
 Now, we will go to the XDC testnet and go to the `Add Token`.
 
 <p align="centre">
   <img src="https://user-images.githubusercontent.com/114388943/194759690-f1241c27-70de-4fb4-a932-88c33061d6d1.png">
 </p>
 
 Here, we fill the `Token Address`, `Token Symbol` and also `Decimals of Precision`.
 
 <p align="centre">
   <img src="https://user-images.githubusercontent.com/114388943/194760038-499105e9-397a-4e18-a0f0-0c2be3eb1647.png">
 </p>
 
 So, our newly minted token is available in our wallet.
 
 <p align="centre">
   <img src="https://user-images.githubusercontent.com/114388943/194760198-ea7a61c4-3311-47f9-8568-eb136c80c00c.png">
 </p>
 
 Finally, in this way we successfully learnt about `How to Flatten a smart contract on remix` And also check about transaction on the [Block Explorer](https://www.apothem.network/)
 
 ```
 
 For more information about Remix IDE, Please Visit [Remix IDE Documentation](https://remix-ide.readthedocs.io/en/latest/).<br>
 For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>





  

  


  
  
  


  

  
  


  
  


  



   








  
  
  
  
         
         
         
         
 
