# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
  - [What you will learn](#what-you-will-learn)
- [🛠 Prerequisites](#-prerequisites)
- [📝 Smart contract code](#-smart-contract-code)
- [💻 Flattening the Smart Contract](#-flattening-the-smart-contract)
  - [Flatten your smart contract using Hardhat](#flatten-your-smart-contract-using-hardhat)
  - [Flatten your smart contract using Truffle](#flatten-your-smart-contract-using-truffle)
  - [Flatten your smart contract using Remix](#flatten-your-smart-contract-using-remix)
- [🔍 Veryfing Contracts on the Block Explorer](#-veryfing-contracts-on-the-block-explorer)

# 📰 Overview

[Smart Contracts](https://ethereum.org/en/developers/docs/smart-contracts/) are build for decentralized apps which are trustless, but, users should somehow have trust with the code that they are interacting with. To deal with that issue, the verification of smart contracts came into the picture.

Verifying a smart contract means the putting the code out there for other users and developers to verify it.

After verification of the smart contract, the blockscanner would have the following:

- Contract Source Code
- Contract ABI
- ByteCode.

### What you will learn

In this tutorial, you will learn how to verify a smart contract deployed using [hardhat](https://hardhat.org/) / [truffle](https://trufflesuite.com/) / [remix](https://remix.ethereum.org/) on XDC Network mainnet or XDC Apotherm testnet.

## 🛠 Prerequisites
For this tutorial you will need a address of the smart contract deployed on XDC mainnet or apothem testnet using [hardhat](https://hardhat.org/) / [truffle](https://trufflesuite.com/) / [remix](https://remix.ethereum.org/)

## 📝 Smart contract code
The smart contract code used in this tutorial:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// inherit ERC20 from openzeppelin by simply adding 'is ERC20'
contract MyToken is ERC20 {
    address public owner;
     constructor() ERC20("MyToken", "MTK") {
        owner = msg.sender;
        // premint 1000 tokens to the owner of the contract.
        _mint(msg.sender, 1000 * 10 ** decimals());
     }

    function mint(address to, uint256 amount) public {
        require(owner == msg.sender, "Only owner can mint the token!");
        _mint(to, amount);
    }
}
```

## 💻 Flattening the Smart Contract

> NOTE: This step only needs to be done, if you are using any third-party libraries(like openzeppelin) in your code.

When importing third-party libraries like openzeppelin, it becomes necessary to flatten you smart contract and then verify it on the blockscan, because blockscan doesn't have access to the openzeppelin's code. When we flatten the code, the openzeppelin's code (or any third party's contract code) gets included in the same file as your samrt contract.

### Flatten your smart contract using Hardhat

To flatten the contract using hardhat, write the following in the terminal

```bash
npx hardhat flatten ./path-to-file/contractName.sol > flattenedContractName.sol
```

In this case, we will write

```bash
npx hardhat flatten ./contracts/MyToken.sol > flattenedMyToken.sol
```

### Flatten your smart contract using Truffle

To flatten the contract using Truffle, we need to install `truffle-flattener`.

```bash
yarn add truffle-flattener -g
```

Or using `npm`

```bash
npm install truffle-flattener -g
```

Now lets flatten our contract, write the following in the terminal to create a new file `flattenedMyToken.sol`

```bash
truffle-flattener contracts/MyToken.sol > flattenedMyToken.sol
```

### Flatten your smart contract using Remix

Right click on our smart contract file and here we would see an option to flatten our smart contracts on the bottom of menu pane.

<p align="center"><img width="365" alt="Screenshot 2022-10-07 at 1 04 41 AM" src="https://user-images.githubusercontent.com/35517007/194407723-0660b6e7-c9f3-4f8c-9a1d-a0289bd755b4.png"></p>


Clicking on the flatten button will open a dialog box which we need to accept and a new icon for flatter is added to our left navigation pane.

<p align="center"><img width="501" alt="Screenshot 2022-10-07 at 1 04 57 AM" src="https://user-images.githubusercontent.com/35517007/194408126-8ca5646b-2a11-4060-a26a-31cf41bf214d.png"></p>


After that we move to the flattener tab and will see the option to select our smart contract which we need to flatten. Here we will select our MyToken.sol smart contract and it will give an option to save the flattened smart contract.

<p align="center"><img width="368" alt="Screenshot 2022-10-07 at 1 05 41 AM" src="https://user-images.githubusercontent.com/35517007/194408452-379be29a-15c2-4ca9-9846-99ac3e776588.png"></p>


After flattening, we will be having the flattened file `MyToken_flat.sol`.

<p align="center"><img width="365" alt="Screenshot 2022-10-07 at 1 06 31 AM" src="https://user-images.githubusercontent.com/35517007/194408621-2071d0c7-ac81-49ab-af3e-f325eaafe1ea.png"></p>


## 🔍 Veryfing Contracts on the Block Explorer

Once you have successfully deployed your smart contract, you will have an address for your smart contract.

In this case, I wrote a minting contract called `MyToken.sol` and have deployed it.

```sh
My token contract address: 0x802555081f6AAcE51559d0650Bf15f242aBe7fd7
```

If you have deployed it on XDC mainnet, you can go to [XinFin Block Explorer](https://explorer.xinfin.network/) OR
for apothem testnet, go to [Apothem Block Explorer](https://explorer.apothem.network/) and search your contract address.

<p align="center">
  
<img width="1674" alt="Screenshot 2022-10-05 at 11 26 10 AM" src="https://user-images.githubusercontent.com/35517007/194009497-9deffaf8-dc30-482a-a143-f4cb972e1a53.png" alt="Verify 01" />

</p>

And click in the `Verify And Publish` Option.

We will be redirected to the Contract verification page where we need to fill out:

- Contract Name: <em>MyToken</em>
- Compiler: <em> Check your</em> `config file` <em>file for Compiler Version</em>
- Contract Code: <em> Just paste everything from your `flatten code file`. In my case </em> `flattenedMyToken.sol` <em>file</em>

Once everything is filled out, press Submit!

<p align="center">
  <img width="1671" alt="Screenshot 2022-10-05 at 11 28 46 AM" src="https://user-images.githubusercontent.com/35517007/194009622-ea5966ba-aa15-4f81-ba94-bd2da2ca7dbf.png" alt="Verify 02"/>

</p>

If everything is correctly filled out, your contract page on the block explorer should display a new tab called `Contract`:

<p align="center">
  
<img width="1676" alt="Screenshot 2022-10-05 at 11 35 12 AM" src="https://user-images.githubusercontent.com/35517007/194009732-96bdc2be-cb9a-4fff-895c-9bcb7a1feb10.png" alt="Verify 03"/>

</p>

In this page you can Read from, Write to, or simply read the information tied to your Smart Contract on the blockchain:

<p align="center">
  <img width="1675" alt="Screenshot 2022-10-05 at 1 28 22 PM" src="https://user-images.githubusercontent.com/35517007/194010105-908c60ed-1261-4eac-b752-6b1f6feb8cc9.png" alt="Verify 04" />
</p>

---

For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/)
