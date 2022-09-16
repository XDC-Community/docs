# How To deploy your first smart contract on the XDC Network using Remix

[Video Documentation](https://youtu.be/IA\_X01NWifk)

## Overview

We would build an online storage system to store an integer on the XDC Network, which could then be updated and retrieved from the network. The contracts would be created and deployed using the [XDC Remix IDE](https://remix.xinfin.network/#optimize=false\&runs=200\&evmVersion=null\&version=soljson-v0.8.7+commit.e28d00a7.js) over [Apothem test network](https://www.apothem.network/).

Remix is an online IDE for creating, compiling, and deploying Solidity code on the XDC Network. We will learn how to create a simple storage smart contract on the XDC network for storing an integer on the blockchain. We'd also be retrieving that integer from the blockchain and carrying out transactions with it.

## What you will learn

We will learn how to use Remix IDE to create, compile, and deploy Solidity code on the Apothem Test Network, as well as how to use faucets to obtain free Testnet XDC to deploy our contract over Testnet.

## What you will do

* Set up Remix
* Create a simple smart contract
* Compile contract
* Test contract
* Deploy contract
* Pay the Gas Fees

## Setting Up Remix Environment

Remix is an online solidity IDE for compiling and deploying solidity code to EVM compatible blockchains. To begin working on a new smart contract, we must first create a new file in the contracts folder on the left side of the view pane.

![](https://user-images.githubusercontent.com/60708843/190065372-1e43e443-f13b-463a-abb6-7497ae7c8b8c.png)

## Create a simple smart contract

Now, copy and paste the code below into a new file called **`SimpleStorage.sol`**.

```solidity
// SPDX-License-Identifier: MIT

// Specifies that the source code is for a version
// of Solidity greater than 0.8.0
pragma solidity ^0.8.0;

// A contract is a collection of functions and data (its state)
// that resides at a specific address on the Ethereum blockchain.
contract SimpleStorage {

    // Create an unsigned integer variable of name store.
    uint store;

    // A publicly accessible function that takes an uint integer as a parameter
    // and updates `store`
    function setStore(uint _store) public {
        store = _store;
    }

    // A publicly accessible function that takes returns a value of type uint
    function getStore() public view returns (uint) {
        return store;
    }
}
```

The first line of code **`// SPDX-License-Identifier: MIT`** specifies the License Permissions. This line is required for error-free compilation.

The line **`pragma solidity ^0.8.0;`** specifies the version used to write the solidity code. As we all know, Solidity is a rapidly evolving language, and there may be changes that will not work with a newer version of the Solidity compiler. As a result, we include this line to compile the code with a specific version. [Pragmas](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragmas) are common instructions for compilers about how to treat the source code (e.g., pragma once).

The line **`contract SimpleStorage {}`** is used in our smart contract to create a Solidity contract. Contracts in Solidity are similar to classes in object-oriented languages. A Solidity contract is a collection of code (its functions) and data (its state) that is stored at a specific address on the Ethereum blockchain. The line **`uint store`** declares a state variable of type uint called store.

Then we create a function **`setStorage`** that takes an uint variable and stores its value in the **`store`** variable. We also have a function called **`getStorage`** that is of [view](https://docs.soliditylang.org/en/latest/contracts.html?highlight=view#view-functions) type and returns an uint value. Both of these functions have a [public](https://docs.soliditylang.org/en/latest/contracts.html?highlight=public#state-variable-visibility) property that allows you to access the current value of the state variable from outside of the contract. Other contracts cannot access the variable without this keyword.

## Compile Contract

* Open the Solidity Compiler ![](https://user-images.githubusercontent.com/60708843/190066438-b1816a19-3051-4d04-87d2-a2b1ade198f4.png) in the left side navigation pane.
* From the compiler option, select the compiler version **`v0.8.7+commit.e28d00a7`**.
* Choose Language as **`Solidity`**.
* Set the EVM version as the **`compiler default`**.
* Next, select **`Compile SimpleStorage.sol`**.
* After Successful Compilation, it will show ![](https://user-images.githubusercontent.com/60708843/190067983-4451282c-348c-4872-a57d-b2e698b59cad.png).
* Once our contract has been compiled, we can deploy it to the Apothem Test Network. We'd need the XDCPay wallet extension and some test XDC tokens for this. ![](https://user-images.githubusercontent.com/60708843/190067640-a9fea4c3-383a-4478-befd-01149b26433e.png)

## Creating XDCPay Wallet

* Click this [link](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo) or search XDCPay in the Chrome Web Store to install the extension.

![alt](https://user-images.githubusercontent.com/60708843/190068514-7beac72f-ea99-49c9-ada7-7e88dc8cbf3e.png)

* Open the Chrome extension after it has been successfully installed.
* Agree to the Terms of Service.

![alt](https://user-images.githubusercontent.com/60708843/190069353-3214410d-0526-41c9-9c1c-1170a10840c6.png)

* Using the seed phrase, create a new Wallet or import an existing XDCPay wallet. The Seed Phrase is a 12-24 word string that stores our wallet's information. It is always recommended not to share your secret phrase with anyone, as doing so may result in the loss of your cryptocurrency.
* Make a new password and the wallet will be created for you or use your existing seed phrase by clicking on import wallet.

![Wallet](https://user-images.githubusercontent.com/60708843/190121441-7b972e85-8ec0-47c2-adae-4e6c3fb01528.png)

* Keep the seed phrase safe.

![alt](https://user-images.githubusercontent.com/60708843/190071788-c134a5bc-599a-4a6d-a481-e7cf62e75a51.png).

* Verify recovery phrase
* Your XDCPay wallet has been successfully created.

## Adding Test XDC Tokens from faucet

Initially, our account would be empty, and we would require some XDC tokens to initiate blockchain transactions. We would use a faucet to fill our wallet with test XDC tokens for this. These tokens are worthless in and of themselves. They are simply used to test your contracts on the testnet in order to avoid losing your real money.

* First, make a copy of your wallet address. Your wallet address would look like **`xdc057ac7de8ad6f21c7bb0dcc6a389ff9161b3b943`**.

![alt](https://user-images.githubusercontent.com/60708843/190072656-cf4a819b-92e1-4eb3-948b-7c6dbc8bafc1.png)

* After that, navigate to the [XDC faucet](https://faucet.apothem.network/).
* Enter your XDC account address and request for Test XDC here.

![alt](https://user-images.githubusercontent.com/60708843/190073022-1d893bce-5f21-494d-8e28-20cdb9b91299.png)

* If your request is approved, you will be credited with the XDC in your wallet.
* If you can't see the XDC in your wallet, make sure you're connected to the XDC Apothem Testnet or the XDC Mainnet.

![Connect to TestNet](https://user-images.githubusercontent.com/60708843/190086617-07b3e4a8-4b4e-4e08-affa-97cce7b1f192.png)

* If you are currently connected to the XDC Mainnet, switch to the XDC Apothem Testnet.

## Deploy Contract

We can deploy our smart contract to the blockchain after compiling our contracts and filling our wallets with XDC.

* Navigate to Deploy and Transactions ![alt](https://user-images.githubusercontent.com/60708843/190074569-0f6cccdb-08d6-41e9-8c54-9ac9c648a283.png).

![alt](https://user-images.githubusercontent.com/60708843/190075329-676cc9e6-170d-46f3-92eb-8d023c24d608.png)

* Choose Injected Web3 as the Environment.

![select environment](https://user-images.githubusercontent.com/60708843/190122488-9f142cda-4f48-4cb0-a8b5-888695c12e18.png)

* Confirm the popup to add the account to Remix IDE now.
* Next, choose the account to which you want to deploy the contract.

![choose account](https://user-images.githubusercontent.com/60708843/190123093-c5979b6a-6026-491b-ab8f-1ae7c34b84ec.png)

* Choose the contract you want to use.
* A popup will appear, which we must confirm in order to create the transaction for contract deployment.

![alt](https://user-images.githubusercontent.com/60708843/190075747-c7d1f7a6-2737-49ac-bd72-681a84bd95b0.png)

* Following confirmation, we would be shown a message indicating that our transaction had been successful.

## Validating Smart Contract

After we deploy the contract, we can validate whether the transaction was successful or not, as well as what different transactions occurred on the contract.

* First, go to your wallet and get the most recent transaction details, then copy the transaction address.

![alt](https://user-images.githubusercontent.com/60708843/190076901-179e4fac-d4e8-43c7-a657-ea525a4e3883.png)

* Next, navigate to the [XDC Block explorer](https://explorer.apothem.network/) and paste the transaction hash there.
* From there, we need to get the transaction details as well as the To Address where the contract is deployed.

![alt](https://user-images.githubusercontent.com/60708843/190077393-8aeddc44-b374-47c6-bb52-2d957c140519.png)

* Using that address, we can see what transactions occurred with the contract.

## Testing Smart Contract

We can easily test our contract with the help of that contract address.

* Return to the Remix IDE.
* Navigate to the deploy section, paste the contract address, and then click the At Address Button.

![alt](https://user-images.githubusercontent.com/60708843/190077815-03dae243-ce9e-4b4f-892f-995b494e7fbb.png)

* We would then be shown all of the different functions and variables that were available for us to see and use.
* When we click that button after adding an integer to setStore, a transaction is started and the value is stored on the network.

![alt](https://user-images.githubusercontent.com/60708843/190078140-9cba86b1-40e7-46e2-b492-730db149d7fa.png)

* The integer that we earlier saved would then be returned to us when we click the getStore button the following time.
