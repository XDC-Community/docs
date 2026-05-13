# Deploying a Smart Contract on the XDC Network Using XDC Remix

## Overview

The **XDC Network** (XinFin) is an enterprise-focused, EVM-compatible blockchain designed for trade finance and decentralized applications. It combines the speed and low cost of Ethereum-style smart contracts with a unique Proof of Authority (PoA) consensus mechanism called **XDPoS**, making it ideal for high-throughput, low-latency use cases.

Deploying smart contracts on the XDC Network offers several advantages:

- **Near-instant finality** (3-second block times).
- **Low gas fees**, making it cost-effective for development and production.
- **Full EVM compatibility**, meaning Solidity contracts written for Ethereum deploy to XDC with minimal modifications.
- **Apothem Testnet**, a dedicated test network for developers to experiment risk-free.
- **Growing ecosystem** for DeFi, NFTs, and real-world asset tokenization.

XDC Remix is the official browser-based IDE (at [https://remix.xinfin.network/](https://remix.xinfin.network/)) forked from the popular Remix IDE and configured with XDC Network RPC endpoints out of the box.

---

## What You Will Learn

By completing this tutorial, you will be able to:

1. Set up and navigate the XDC Remix development environment.
2. Write a Solidity smart contract from scratch.
3. Compile the contract within XDC Remix.
4. Configure an injected Web3 provider (MetaMask or XDCPay) for wallet connectivity.
5. Deploy the smart contract to the **XDC Apothem Testnet**.
6. Interact with the deployed contract through XDC Remix.

---

## Prerequisites

Before you begin, ensure you have the following:

### 1. A Web3 Wallet

You need a wallet that can connect to the XDC Network. Recommended options:

- **XDCPay** — Official XDC browser extension wallet: [Chrome Web Store](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo)
- **MetaMask** — With XDC Network manually added (see below).
- **Any WalletConnect-compatible wallet** that supports custom RPC endpoints.

#### Adding XDC Apothem Testnet to MetaMask

If you are using MetaMask instead of XDCPay, add the XDC Apothem Testnet network manually:

| Parameter              | Value                                          |
|-----------------------|------------------------------------------------|
| Network Name           | XDC Apothem Testnet                            |
| New RPC URL           | `https://apothem.xdc.network`                  |
| Chain ID               | `51`                                           |
| Currency Symbol        | `XDC`                                          |
| Block Explorer URL     | `https://explorer.apothem.network`             |

[Image: Screenshot of MetaMask network settings showing XDC Apothem Testnet configuration]

### 2. Testnet XDC Tokens

To pay for gas fees on the Apothem Testnet, you need testnet XDC tokens:

1. Copy your wallet address (it will start with `xdc` or `0x`).
2. Visit the [XDC Apothem Faucet](https://faucet.apothem.network/).
3. Paste your wallet address and request testnet tokens.
4. Wait for the transaction to be confirmed (typically a few minutes).

[Image: Screenshot of the XDC Apothem faucet page with a submitted request]

### 3. Basic Solidity Knowledge

Familiarity with Solidity syntax, contract structure, and basic EVM concepts will help you follow along.

---

## Step 1: Opening XDC Remix

1. Navigate to [https://remix.xinfin.network/](https://remix.xinfin.network/).
2. The IDE will load with the default workspace. You should see a file explorer on the left, a code editor in the center, and utility panels.

[Image: Full screenshot of the XDC Remix IDE homepage showing the default dashboard]

The interface contains several key areas:

- **File Explorer** (left panel): Manage your contract files, scripts, and tests.
- **Editor** (center): Write and edit Solidity code.
- **Solidity Compiler** (left panel icon): Compile your contracts.
- **Deploy & Run Transactions** (left panel icon): Deploy and interact with contracts.

---

## Step 2: Creating a Smart Contract

We will create a simple **storage contract** that allows setting and retrieving a single number. This is sufficient to demonstrate the full deploy-and-interact workflow.

1. In the **File Explorer** panel on the left, navigate to the `contracts` folder.
2. Click the **`+`** (New File) button or the **`New File`** option in the dropdown.
3. Name the file `SimpleStorage.sol`.

[Image: Screenshot of the File Explorer panel showing the creation of a new file named SimpleStorage.sol]

4. Paste the following Solidity code into `SimpleStorage.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SimpleStorage
 * @dev A minimal smart contract demonstrating storage, getter, and setter functionality.
 */
contract SimpleStorage {
    uint256 private storedValue;

    event ValueUpdated(uint256 oldValue, uint256 newValue, address indexed updatedBy);

    /**
     * @dev Constructor initializes storedValue to the provided initial value.
     * @param _initialValue The initial value to set.
     */
    constructor(uint256 _initialValue) {
        storedValue = _initialValue;
        emit ValueUpdated(0, _initialValue, msg.sender);
    }

    /**
     * @dev Returns the current stored value.
     * @return The stored value.
     */
    function getValue() public view returns (uint256) {
        return storedValue;
    }

    /**
     * @dev Updates the stored value to a new number.
     * @param _newValue The new value to store.
     */
    function setValue(uint256 _newValue) public {
        uint256 oldValue = storedValue;
        storedValue = _newValue;
        emit ValueUpdated(oldValue, _newValue, msg.sender);
    }

    /**
     * @dev Returns the contract owner (deployer).
     * @return The address of the deployer.
     */
    function owner() public view returns (address) {
        return owner_;
    }

    address public immutable owner_;

    /**
     * @dev Sets a new initial value, only callable by the deployer.
     * @param _newValue The new value to set.
     */
    function setByOwner(uint256 _newValue) public {
        require(msg.sender == owner_, "Only owner can call this function");
        storedValue = _newValue;
        emit ValueUpdated(oldValue, _newValue, msg.sender);
    }
}
```

[Image: Screenshot of the SimpleStorage.sol file fully written in the XDC Remix editor]

### Code Explanation

- **SPDX License Identifier**: `// SPDX-License-Identifier: MIT` declares the MIT license for the contract.
- **Pragma**: `pragma solidity ^0.8.20;` specifies that the contract requires Solidity compiler version 0.8.20 or above (within the 0.8.x range).
- **State Variable**: `storedValue` holds the number that the contract manages.
- **Event**: `ValueUpdated` is emitted whenever the stored value changes, providing an auditable log on-chain.
- **Constructor**: Called once at deployment time. Accepts an initial value parameter.
- **`getValue()`**: A `view` function that reads the stored value without modifying state.
- **`setValue()`**: A state-modifying function that updates the stored value and emits an event.
- **`owner()` and `setByOwner()`**: Demonstrates basic access control — only the deployer can call `setByOwner`.

---

## Step 3: Compiling the Contract

1. Click the **Solidity Compiler** icon in the left sidebar (it looks like a compilation/build icon).

[Image: Screenshot showing the Solidity Compiler icon in the left sidebar of XDC Remix]

2. In the compiler panel:
   - Ensure the **compiler version** is set to **`v0.8.20`** (or the latest 0.8.x version available). If v0.8.20 is not listed, select **`v0.8.19`** or the closest available version (the `^0.8.20` pragma accepts any 0.8.x version).
   - The language should already be set to **`Solidity`**.
   - The EVM version can remain at the **`Default`** setting.

[Image: Screenshot of the compiler settings panel with the version set to v0.8.20]

3. Click the **`Compile SimpleStorage.sol`** button.

4. Wait for the compilation to complete. A green checkmark or the text **"Compilation successful"** indicates a successful build.

[Image: Screenshot showing the green "Compilation successful" confirmation message]

If compilation fails:
- Check the error messages at the bottom of the compiler panel.
- Verify that the Solidity code matches the version selected in the compiler.
- Ensure there are no typos and that the pragma version is compatible.

---

## Step 4: Configuring the Deploy Environment

1. Click the **Deploy & Run Transactions** icon in the left sidebar (it looks like a plug or deploy icon).

[Image: Screenshot showing the Deploy & Run Transactions icon in the left sidebar]

2. In the **Environment** dropdown, select **`Injected Provider - XDC Apothem`**.

[Image: Screenshot of the Environment dropdown with "Injected Provider - XDC Apothem" selected]

3. Your wallet extension (XDCPay or MetaMask) will pop up requesting account access. Click **`Connect`** to authorize XDC Remix to read your account details.

[Image: Screenshot of the wallet (XDCPay / MetaMask) connection confirmation popup]

4. After connecting, your wallet address should appear in the **Account** field within the Deploy panel. Ensure the account shown is the one that holds testnet XDC.

[Image: Screenshot of the Deploy panel showing the connected wallet address in the Account field]

---

## Step 5: Deploying the Contract

1. In the Deploy & Run Transactions panel, locate the **`Contracts`** dropdown.
2. Select **`SimpleStorage: SimpleStorage`** from the list of compiled contracts.

[Image: Screenshot of the Contracts dropdown with "SimpleStorage: SimpleStorage" selected]

3. You will see the constructor parameter input field. Enter an initial value for `_initialValue`, for example: **`42`**.

[Image: Screenshot showing the constructor parameter input field with _initialValue set to 42]

4. Click the **`Transact`** button to initiate the deployment transaction.

5. Your wallet extension will pop up with a transaction confirmation. Review the details and click **`Confirm`**.

[Image: Screenshot of the wallet transaction confirmation showing gas estimation and network as XDC Apothem]

6. Wait for the transaction to be mined on the XDC Apothem Testnet. Once confirmed, the Deploy panel will display the deployed contract instance under the **`Deployed Contracts`** section, with the contract address and an expandable arrow.

[Image: Screenshot of the Deployed Contracts section showing the successfully deployed SimpleStorage instance with its on-chain address]

The deployed contract is now live on the XDC Apothem Testnet. You can click on the contract address link to view it on the [XDC Apothem Block Explorer](https://explorer.apothem.network/).

---

## Step 6: Interacting with the Deployed Contract

With the contract deployed, you can interact with it directly through the Deploy & Run Transactions panel.

### Reading the Stored Value

1. Expand the deployed contract instance by clicking the arrow next to **`SimpleStorage at <address>`**.
2. Locate the **`getValue`** function.
3. Click **`getValue`** to read the current stored value.

[Image: Screenshot showing the getValue button and its returned value of 42]

The returned value should be **`42`**, matching the initial value set during deployment.

### Updating the Stored Value

1. Locate the **`setValue`** function in the deployed contract section.
2. Enter a new number in the input field, for example: **`123`**.
3. Click **`Transact`**.
4. Confirm the transaction in your wallet popup.

[Image: Screenshot showing the setValue function with input 123 and the Transact button]

5. After the transaction is mined, click **`getValue`** again to verify the value has been updated to **`123`**.

[Image: Screenshot showing the getValue function returning 123 after the setValue transaction]

### Exploring Events

1. In the **`Logs`** section at the bottom of the Deploy & Run Transactions panel, you can view the emitted `ValueUpdated` events.
2. Expanding each log entry will reveal the old value, new value, and the address that triggered the update.

[Image: Screenshot of the Logs panel showing ValueUpdated events with old and new values]

---

## Step 7: Verifying the Contract on XDC Block Explorer

While XDC Remix allows direct interaction, verifying your contract on the block explorer makes it publicly inspectable.

1. In the Deploy & Run panel, copy the deployed contract address (right-click and copy the address under Deployed Contracts).

[Image: Screenshot showing the deployed contract address highlighted in the Deployed Contracts section]

2. Navigate to the [XDC Apothem Block Explorer](https://explorer.apothem.network/).
3. Paste the contract address into the search bar and press Enter.
4. Click the **`Contract`** tab, then click **`Verify And Publish`**.
5. Fill in the verification form:
   - **Contract Name**: `SimpleStorage`
   - **Compiler Type**: `Standard JSON Compiler Input` or `Single File`
   - **Compiler Version**: Select the same version you used in XDC Remix (e.g., `v0.8.20`).
   - **Contract Code**: Paste the full source code of `SimpleStorage.sol`.
6. Click **`Submit`**.

[Image: Screenshot of the block explorer's "Verify And Publish" form filled with contract details]

Once verified, the Contract tab will display the source code, ABI, and allow anyone to read/write to the contract through the explorer interface.

[Image: Screenshot of the verified contract page on the XDC Apothem Block Explorer showing the source code and Read/Write tabs]

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **"No account detected"** | Ensure your wallet is connected to the XDC Apothem Testnet (Chain ID 51) and is unlocked. |
| **"Insufficient funds for gas"** | Request more testnet XDC from [faucet.apothem.network](https://faucet.apothem.network/). |
| **Compilation errors** | Check the compiler version matches the pragma in your code. Fix any syntax errors shown in the error logs. |
| **Transaction pending for a long time** | XDC blocks are fast (~3 seconds). If a transaction is stuck for more than a minute, check the block explorer for its status. |
| **Wallet popup not appearing** | Try refreshing XDC Remix. Ensure no other browser window has the wallet locked. |

---

## Summary

In this tutorial, you:

- Opened **XDC Remix** at [https://remix.xinfin.network/](https://remix.xinfin.network/).
- Created a `SimpleStorage.sol` smart contract with getter, setter, event, and access-control functionality.
- Compiled the contract using the Solidity compiler within XDC Remix.
- Connected your wallet to the **XDC Apothem Testnet** via an injected Web3 provider.
- Deployed the contract with a constructor argument.
- Interacted with the deployed contract by reading and writing values.
- Verified the contract on the XDC Apothem Block Explorer for public transparency.

With these fundamentals, you can expand to more complex contracts such as ERC-20 (XRC20) tokens, NFTs (XRC721), and full decentralized applications on the XDC Network.

---

## Further Reading

- [XDC Network Documentation](https://docs.xdc.org/)
- [XDC Apothem Testnet Details](https://docs.xdc.org/networks/apothem)
- [Remix IDE Documentation](https://remix-ide.readthedocs.io/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [XDCPay Wallet Documentation](https://docs.xdc.org/developer-guides/wallet/xdcpay)
