---
Id: To-Hardhat-For-XDC-Network-Development.
Title: To Hardhat For XDC Network Development.
Description: "An Introduction To Hardhat For XDC Network Development".
Keywords:
   - Documents
   - Apothem
   - Hardhat
   - Contract
   - Verify
---

#   Overview
XDC Network now supports development environments like Hardhat(https://hardhat.org/), making it easier to work with smart contracts and Ethereum nodes. They provide tools to write seamlessly, test, and deploy smart contracts. In this guide, we’ll create a hello world smart contract and deploy it using hardhat.

##  What you gonna learn
In this tutorial, you will learn about Hardhat used for XDC Network Development.

###  What you gonna do

   - Node.js(https://nodejs.org/en/download/) installed on your system.
   - Use CLI/Terminal.
   - Text Editor.
   - Verify your deployment.


###  What is Hardhat?
    
   Hardhat(https://hardhat.org/) is a development environment that helps developers compile, deploy, test, and debug their Ethereum applications. It has some of the cleanest, most detailed documentation. Hardhat also provides console.log() functionality, similar to javascript for debugging purposes. Hardhat also has many Plugins(https://hardhat.org/hardhat-runner/plugins), which further increases its functionality.
   
   Hardhat Runner is the main component you interact with when using Hardhat. It's a flexible and extensible task runner that helps you manage and automate the recurring tasks inherent to developing smart contracts and dApps.

   Hardhat Runner is designed around the concepts of tasks and plugins. Every time you're running Hardhat from the command-line, you're running a task. For example, npx hardhat compile runs the built-in compile task. Tasks can call other tasks, allowing complex workflows to be defined. Users and plugins can override existing tasks, making those workflows customizable and extendable.

   This guide will take you through the installation of our recommended setup, but as most of Hardhat's functionality comes from plugins, you are free to customize it or choose a completely different path.
   
   
   
  Installing hardhat and other dependencies:
  
   - We’ll install hardhat using npm(https://www.npmjs.com/package/hardhat).

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195759196-ae8c9618-8317-4ec1-b6a1-8912741327e0.png">
</p>

   - When we install Hardhat using npm, which comes with node.js(https://nodejs.org/en/download/).

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195759620-972a3d5e-5953-4b6e-a9d1-9eb2968d94ba.png">
</p>

###  How does Hardhat work

It runs as either an in-process or stand-alone daemon, servicing JSON-RPC and WebSocket requests.

By default, it mines a block with each transaction that it receives, in order and with no delay.

It's backed by the `@ethereumjs/vm` EVM implementation, the same one used by ganache, Remix and Ethereum Studio.

### How can you use it

By default, if you're using Hardhat, then you're already using Hardhat Network.

When Hardhat executes your tests, scripts or tasks, an in-process Hardhat Network node is started automatically, and all of Hardhat's plugins (ethers.js, web3.js, Waffle, Truffle, etc) will connect directly to this node's provider.

There's no need to make any changes to your tests or scripts.

Hardhat Network is simply another network. If you wanted to be explicit, you could run, for example, `npx hardhat run --network hardhat scripts/my-script.js`.


#- Running stand-alone in order to support wallets and other software

Alternatively, Hardhat Network can run in a stand-alone fashion so that external clients can connect to it. This could be MetaMask, your Dapp front-end, or a script. To run Hardhat Network in this way, run:

     $ npx hardhat node
      Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

      Accounts
      ========
      Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
      Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

      Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)
      Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
      ... 
      

This will start Hardhat Network, and expose it as a JSON-RPC and WebSocket server.

Then, just connect your wallet or application to `http://127.0.0.1:8545`.

If you want to connect Hardhat to this node, you just need to run using `--network localhost`.

**`WARNING`** 
   Do not send mainnet Ether to the account addresses shown by `hardhat node`. Those addresses and private keys are deterministic: they are the same for all Hardhat users. Accordingly, those private keys are well known, so there are probably bots monitoring these addresses on mainnet, waiting to withdraw any funds sent to them. If you add any of those accounts to a wallet (eg Metamask), be very careful to avoid sending any mainnet Ether to them: consider naming the account something like "Hardhat - Unsafe" in order to prevent any mistakes.

###   Why would I want to use it?

`Solidity stack traces`

  Hardhat Network has first-class Solidity support. It always knows which smart contracts are being run, what they do exactly and why they fail.

  If a transaction or call fails, Hardhat Network will throw an exception. This exception will have a combined JavaScript and Solidity stack trace: stack traces that start in JavaScript/TypeScript up to your call to the contract, and continue with the full Solidity call stack.

  This is an example of a Hardhat Network exception using TruffleContract:
  
     Error: Transaction reverted: function selector was not recognized and there's no fallback function
       at ERC721Mock.<unrecognized-selector> (contracts/mocks/ERC721Mock.sol:9)
       at ERC721Mock._checkOnERC721Received (contracts/token/ERC721/ERC721.sol:334)
       at ERC721Mock._safeTransferFrom (contracts/token/ERC721/ERC721.sol:196)
       at ERC721Mock.safeTransferFrom (contracts/token/ERC721/ERC721.sol:179)
       at ERC721Mock.safeTransferFrom (contracts/token/ERC721/ERC721.sol:162)
       at TruffleContract.safeTransferFrom (node_modules/@nomiclabs/truffle-contract/lib/execute.js:157:24)
       at Context.<anonymous> (test/token/ERC721/ERC721.behavior.js:321:26)

The last two lines correspond to the JavaScript test code that executed a failing transaction. The rest is the Solidity stack trace. This way you know exactly why your tests aren't passing.

### Creating a new project

For this, create a new project directory and cd into it. Feel free to use your own names here instead:

     mkdir HardhatTutorial
   
     cd HardhatTutorial
   
Open terminal/cmd in your project directory and type the following.

   `npm install -d hardhat`
   
<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195763747-3a263ed4-ea84-4568-b4c1-6ba3440b2f62.png">
</p>

Now that we have the hardhat installed let’s start a new hardhat project. We’ll use npx to do so. Npx helps process node.js executables.

   `npx hardhat`
   
You’ll be greeted with a CLI hardhat interface. Select the third option, “Create an empty hardhat.config.js”, and press enter.

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195764650-d58a68dc-aaa3-47f1-8937-396a1db63d0f.png">
</p>

Now, let’s install other dependencies required to work with hardhat.

    npm install — save-dev @nomiclabs/hardhat-ethers ethers
   
    @nomiclabs/hardhat-waffle ethereum-waffle chai
                   
We need these dependencies to write automated tests for contracts.

The most common issue while installing packages with npm can be an internal failure with `node-gyp`. You can follow the node-gyp installation instructions here(https://github.com/nodejs/node-gyp#installation).

Note: If you encounter the node-gyp issue, you will need to have your python version match one of the compatible versions listed in the instructions above.

Another common issue is a stale cache. Clear your npm cache by simply typing the below into your terminal:We need these dependencies to write automated tests for contracts.

The most common issue while installing packages with npm can be an internal failure with `node-gyp`. You can follow the node-gyp installation instructions here.

Note: If you encounter the node-gyp issue, you will need to have your python version match one of the compatible versions listed in the instructions above.

Another common issue is a stale cache. Clear your npm cache by simply typing the below into your terminal:  
 
   `npm cache clean`
   
Now, let’s get a private key for our wallet and some XDC tokens for gas fees which will be used for the deployment.

Getting the private key

We’ll need an XDC wallet/address to sign the smart contract deployment transaction. To set up the wallet, get its private key and add it to the config file of the hardhat.

You can also get a private key from your XDCPay(https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo) wallet or XinFin Web Wallet(https://wallet.xinfin.network/).

Setting up the config file

Open the hardhat.config.js file and paste the following into it:
    
     require(“@nomiclabs/hardhat-waffle”);
     /**
     * @type import(‘hardhat/config’).HardhatUserConfig
     */
     const Private_Key = “ADD_YOUR_PRIVATE_KEY_HERE”
     module.exports = {
     solidity: “0.7.3”,
     networks: {
     xinfin: {
     url: `ADD_YOUR_RPC_ ENDPOINT_HERE`,
     accounts: [`0x${Private_Key}`]
     }
     }
     }; 

Replace ADD_YOUR_PRIVATE_KEY_HERE with the private key we obtained in the previous step, and replace ADD_YOUR_RPC_ENDPOINT_HERE with the (https://erpc.xinfin.network)

Explanation of the code above:

Line 1: Importing the hardhat-waffle package.

Line 7: Storing our private key in the Private_Key variable.

Line 9–17: Mentioning Solidity version, network type, node URL, and accounts where we are supplying the private key and adding 0x as a prefix.

Save the file.

Creating contract

Now, for our contract, create a new directory “contracts” and place a new file “helloworld.sol” inside.

Copy-paste the following into your solidity script file:
   
     // SPDX-License-Identifier: MIT
     pragma solidity ^0.7.3;
     contract HelloWorld {
     string saySomething;
     constructor() {
     saySomething = “Hello World!”;
     }
     function speak() public view returns(string memory) {
     return saySomething;
     }
     }

Explanation of the code above:

Line 1: Specifying SPDX license type, which is an addition after Solidity ^0.6.8.

Line 2: Declaring the solidity version.

Line 4: Starting our contract named HelloWorld.

Line 6: Creating a variable saySomething of type string.

Line 8–10: Initiating the constructor and storing the string “Hello World!” in the saySomething variable.

Line 12–14: Creating a function called to speak of type public will return the string stored in the saySomething variable.

Save the file and compile the contract using the following hardhat command.

   `npx hardhat compile`
   
If your contract compiles successfully, it will give an output like this:

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195766433-a11c1da4-358d-4ca5-ac4a-fd9d1c2c5277.png">
</p>

Deploying contract

Now to deploy our contract, let’s create a deploy.js file in a new directory named scripts.

Copy-paste the following into your deploy.js file:

    async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(
    “Deploying contracts with the account:”,
    deployer.address
    );
    console.log(“Account balance:”, (await deployer.getBalance()).toString());
    const HelloWorld = await ethers.getContractFactory(“HelloWorld”);
    const contract = await HelloWorld.deploy();
    console.log(“Contract deployed at:”, contract.address);
    }
    main() 
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
    });

 Explanation of the code above.

Line 1: Starting an async function.

Line 3: Getting the XDC address to sign the transaction and storing it in the deployer address.

Line 5–8: Printing the XDC address along with a string to the console.

Line 10: Printing the balance of the Ethereum address in wei to console. Wei is the smallest unit of ether, one Wei = 10^−18 ETH.

Line 12: Calling the ethers.js method ContractFactory. This will look for the “HelloWorld.sol” file, and return an instance that we can use ContractFactory methods on.

Line 13: Calling deploy on ContractFactory to deploy the contract.

Line 15: Printing the address of the deployed contract to the console.

Line 18: Invoking the function “main”.

Line 19–22: Checking for error, printing if any error, and exiting the process.

Save the file and run the following to deploy the contract.

   `npx hardhat run scripts/deploy.js — network xinfin`
   
On the successful deployment of the contract you will see an output containing the deployed contract’s address.

<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195767005-39e48892-7892-4a9b-ad3d-0c7d0f1bd722.png">
</p>

We can verify the deployment by copying and pasting the deployed contract’s address with xdc prefix address in Explorer Apothem Network(https://explorer.apothem.network/) . This will display information about the deployed contract.


<p align="centre">
  <img src="https://user-images.githubusercontent.com/114388943/195771645-15b6f950-0728-4c97-b982-027ae54b8db0.png">            
</p>

Here we saw how to work with hardhat. Using hardhat, you can write tests for your contracts and debug them without sweating too much. Refer to hardhat’s official documentation(https://hardhat.org/hardhat-runner/docs/getting-started#overview) for more information.

So, this is all about "An Introduction To Hardhat For XDC Network Development:.



