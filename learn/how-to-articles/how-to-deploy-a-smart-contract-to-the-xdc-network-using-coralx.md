## Overview

[CoralX](https://github.com/Securrency-OSS/CoralX) is a tool released by Securrency for Ethereum smart contract deployment and testing. Besides Ethereum, it also supports the EVM-compatible XDC network, where we are going to deploy a smart contract in this tutorial.

The smart contract we will create is a "Hello, World!" program, which simply outputs a constant string.

## Setting up the environment

You will need to install Node.js on your system. Download and install it from https://nodejs.org/en/, and type these commands in a terminal.

```bash
node -v
npm -v
```

![Node.js versions](https://user-images.githubusercontent.com/14329097/190913383-af9dcd6d-0cd1-47d6-bbc8-4e63c628df4c.png)

If you see version numbers printed after both commands, your Node.js environment is ready.

Now that you have Node.js installed, let's install CoralX:

```bash
npm install -g coral-x-fe
```

CoralX does not have its own init script yet, so we will borrow the scaffolding from Truffle. Install Truffle with:

```bash
npm install -g truffle
```

If both npm install complete without errors, you are almost ready for smart contract development. There is only one thing left: Ganache, which provides a local development blockchain.

![Ganache](https://user-images.githubusercontent.com/14329097/190913376-fe481736-74b1-46c6-a0d1-463259243657.png)

Install it from [here](https://trufflesuite.com/ganache/). Open it and choose Ethereum Quickstart to start a local blockchain server then click the keys icon on the right of the first address to reveal its private key.

![Ganache Quickstart](https://user-images.githubusercontent.com/14329097/191022408-b44a5134-8e56-4977-8d7c-2493335b0c25.png)

Finally, keep Ganache running in the background and save the private key for later use in this tutorial.

## Setting up a smart contract project

Follow these steps to create your first smart contract project!

First, create a new folder and open a terminal there. This folder will be your project folder.

Second, run `truffle init` in the terminal to initialize the directory structure, and remove `.gitkeep` files that are not compatible with CoralX.

```bash
truffle init
rm contracts/.gitkeep migrations/.gitkeep
```

Third, scaffold (i.e. create from template) a contract with the following command.

```bash
truffle create contract Greeting
```

Fourth, create CoralX configuration files. You need to create three files under your project folder, `package.json`, `coralX-config.js` and `coralX-scenarios.js` as follows (skip the first line starting with `//`).

```
// package.json
{
  "name": "my-smart-contract",
  "version": "1.0.0",
  "scripts": {
    "test": "coralX test"
  }
}
```

```js
// coralX-config.js
const fs = require("fs");

module.exports = {
  networks: {
    development: {
      host: "http://127.0.0.1:7545",
      private_key: fs.readFileSync("./privateKey").toString(),
    },
    apothem: {
      host: "https://rpc.apothem.network",
      private_key: fs.readFileSync("./privateKey.apothem").toString(),
      gasPrice: "0x3b9aca00",
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
  scenarios: require("./coralX-scenarios"),
  testsDir: "test",
}
```

```js
// coralX-scenarios.js
module.exports = {
    deployApothem: [
        ['compile'],
        ['execute', '--path', 'migrations', '--network', 'apothem'],
    ],
    migrateAndConfigureForTests: [
        ['compile'],
        ['execute', '--path', 'migrations'],
    ],
}
```

Last, paste the private key from Ganache to `privateKey` in the project folder and change `http://127.0.0.1:7545` to the RPC server URL in Ganache. Make sure there are no newline characters in the file. We also need to create `privateKey.apothem` because it's referenced in `coralX-config.js`.

```bash
touch privateKey.apothem
```

## Writing the smart contract

In this tutorial, we will use the test-driven development (TDD) method, which means to write failing tests first, and then implement the functionality described by the tests.

Open the project folder in your favorite code editor. I'm using [Visual Studio Code](https://code.visualstudio.com) for this demo.

![Project in code editor](https://user-images.githubusercontent.com/14329097/190913447-5d80328f-d2e3-4484-96a1-71ae4d877d0d.png)

Now create a `greeting.test.js` file in the `test` folder:

```js
const GreetingContract = artifacts.require("Greeting");

describe("Greeting", function (/* accounts */) {
  it("should assert true", async function () {
    await GreetingContract.deployed();
    return assert.isTrue(true);
  });
});
```

Try to run this test, which only tests if Greeting is properly deployed to the `development` network. In your project folder, run the following command:

```bash
coralX test
```

You will see the following error, but don't panic. It is the spirit of TDD to write tests that fail at first and implement the missing pieces later on.

```
> Compiled successfully using:
   - solc: 0.8.17+commit.8df45f5f.Emscripten.clang
Error: Error: c version list from solc-bin. Attempt #1
                    Nothing to execute.
                    Directory '/Users/crypto/my-smart-contract/migrations' is empty.
```

Now create the migration script required in the `migrations` folder:

```js
// 1_deploy_greeting.js
const Greeting = artifacts.require("Greeting");

module.exports = async function (deployer) {
  await deployer.deploy(Greeting, { gas: 200000 });
};
```

Try `coralX test` again.

```
  1 passing (4ms)
```

Almost there! You now have a working smart contract - though, as of right now, it does nothing. We do expect it to do something once you write a test case to describe the expected behavior:

```js
  it("should say hello", async function () {
    const deployed = await GreetingContract.deployed();
    const expected = "hello";
    const actual = await deployed.greet();
    return assert.equal(actual, expected);
  });
```

Add this test in the `describe("Greeting")` block and run `coralX test` again.

```
  Greeting
    ✔ should assert true
    1) should say hello


  1 passing (4ms)
  1 failing

  1) Greeting
       should say hello:
     TypeError: deployed.greet is not a function
      at Context.<anonymous> (test/greeting.test.js:12:29)
```

A function is missing, so you should add it in the contract. Open `contracts/Greeting.sol` and implement the function `greet()`:

```
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Greeting {
  constructor() public {
  }

  function greet() external pure returns (string memory) {
    return "hello";
  }
}
```

Run the tests again:

```
  Greeting
    ✔ should assert true
    ✔ should say hellon list from solc-bin. Attempt #1


  2 passing (32ms)
```

You now have a working contract ready to be deployed. But before you attempt to deploy, you must create a wallet on chain.

## Creating an XDC wallet on Apothem Network (TestNet)

In `coralX-config.js`, private keys must be configured to deploy smart contracts on networks. Let's generate a wallet on the Apothem Network, a test network for XDC.

First, open https://wallet.apothem.network/ and click "Create a new wallet". Follow the instructions to generate a software wallet with a keystore file.

> Do not use this wallet in production ("MainNet"). We will put private keys on disk without encryption, which is not safe.

In step 3, click "Access Wallet" and choose software keystore. Select the keystore file you just downloaded and enter your password to log in.

Then, click "View paper wallet" as shown below to reveal address and private key of the wallet.

![Paper Wallet Menu](https://user-images.githubusercontent.com/14329097/190913445-25720718-5450-4bd1-a165-aca08ed72d27.png)

![Paper Wallet Page](https://user-images.githubusercontent.com/14329097/190913435-871061b6-efba-4a4d-96f9-1a926a9938cf.png)

Save the private key verbatim to `privateKey.apothem` in the project folder. If the private key starts with `0x`, only copy the string after it. Beware not to paste any newline characters into the file!

We also need some XDCt (XDC on Apothem Network) to pay the gas fee. Open https://faucet.apothem.network/, type in the wallet address from the paper wallet page, finish the CAPTCHA and click "REQUEST 1000 XDC".

If you can see a faucet transaction by searching your wallet address from https://explorer.apothem.network/, we are ready for deploying a smart contract.

![Block Explorer](https://user-images.githubusercontent.com/14329097/190913368-5d4dbb5b-2676-40ce-9027-75aa5d8f1268.png)

## Deploy the contract

Time for the final steps! Let's deploy your smart contract to a public network. Run the following command:

```bash
coralX scenario --run deployApothem
```

![deploy to Apothem](https://user-images.githubusercontent.com/14329097/191020000-d872b421-0f7a-460b-856c-b6c998227bea.png)

If you see no errors, open https://explorer.apothem.network/ and search for your wallet address:

![Transaction created](https://user-images.githubusercontent.com/14329097/191020023-9ecca3e9-9f39-4fe2-badf-675660a87154.png)

Click the transaction you've just created and navigate to the contract address?

![Contract details](https://user-images.githubusercontent.com/14329097/191020030-cc79f9d9-092b-41aa-b0a8-d77918d57c96.png)

Next, verify the contract source code to enable interactions on the explorer. Choose the compiler version that was printed in your terminal. If you are not sure which version it is, just remove the `build` folder in your project and run `coralX compile` to get it.

After verification, the contract tab should show up and we can see the string `hello` in the return value of the function `greet()`.

![Read Contract](https://user-images.githubusercontent.com/14329097/191020035-96dbdb42-418b-46eb-9490-936fafe0a471.png)

Congratulations! Now that you have successfully deployed a smart contract on the Apothem Network with CoralX, you can start programming and deploying more complex contracts to the XDC Network.
