---
description: 'This article will teach you what WalletConnect is, what WalletConnect is used for, and how to connect WalletConnect to the XDC Network.'
keywords:
  - docs
  - how to
  - howto
  - tutorial
  - xdc
  - xdc network
  - xdcnetwork
  - dapp
  - provider
  - walletconnect
---

# WalletConnect

![WalletConnect logo](https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-walletconnect-header.png)

The communications protocol for web3. [WalletConnect](https://walletconnect.com/) brings the ecosystem together by enabling wallets and apps to securely connect and interact. Opening up a whole world of Dapps that were once only available to specific wallets.

---

## For What is Used

What is WalletConnect and for what is used? Is an open source **protocol** to communicate securely between Wallets and Dapps (Web3 Apps) using end-to-end encryption.

The user can interact with any Dapp without comprising their private keys and will be notified to sign any transaction requests on their wallet. There are official libraries for Web, iOS and Android to easly integration, check [here](https://explorer.walletconnect.com/) a full list of integrations.

## How to Use it

To connect a Dapp on XDC Network and a Web3 wallet with WalletConnect, just open the app, and prepare your wallet. Click on WalletConnect link:

<p align="center">
  <img width=40% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-walletconnect-dapp-connect.png" alt="How to connect your Dapp to WalletConnect"/>
</p>

A WalletConnect modal should pop-up, here you can connect your wallet by scanning the `QR Code` or going to `Desktop` tab, and choose another connection method:

<p align="center">
  <img width=45% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-walletconnect-modal-qrcode.png" alt="How to connect your Dapp to WalletConnect"/> <img width=45% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-walletconnect-modal-desktop.png" alt="How to connect your Dapp to WalletConnect"/>
</p>

After connecting and approving the connection on your wallet, now you have access to your Dapp:

<p align="center">
  <img width=80% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-walletconnect-dapp-use.png" alt="How to connect your Dapp to WalletConnect"/>
</p>

On your Dapp, try to click on a action button to trigger a wallet request, for example `eth_sign (standard)`:

<p align="center">
  <img width=30% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-walletconnect-dapp-actions.png" alt="How to connect your Dapp to WalletConnect"/>
</p>

<p align="center">
  <img width=70% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-walletconnect-dapp-pending.png" alt="How to connect your Dapp to WalletConnect"/>
</p>

After approving the action on your wallet you will see a success message on Dapp :rocket:

<p align="center">
  <img width=70% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-walletconnect-dapp-approved.png" alt="How to connect your Dapp to WalletConnect"/>
</p>

## Understanding WalletConnect

**How does it work**? It's based on a websocket JSON-RPC channel, WalletConnect is a simple infrastructure that can be setup by any developer. Using a Bridge server to relay the messages without having access to any of its contents.

<p align="center">
  <img width=85% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-walletconnect-diagram.png" alt="How to connect your Dapp to WalletConnect"/>
</p>

WalletConnect is an protocol for connecting Dapps to Wallets by scanning a QR code, the protocol establishes a remote connection between two apps and/or devices using a Bridge server to relay payloads. These payloads are symmetrically encrypted through a shared key between the two peers.

The connection is initiated by one peer displaying a QR Code or deep link with a standard WalletConnect URI and is established when the counter-party approves this connection request. It also includes an optional Push server to allow Native applications to notify the user of incoming payloads for established connections.

## Example Demo

You can easly test this with a prepared demo project (full code [here](https://github.com/XDC-Community/docs/tree/main/how-to/walletconnect/walletconnect-example-dapp)). Just download and and install dependencies by running this commands on terminal:

> :information_source: The demo was made base on `Node.js v16.X` version.

```shell
git clone git@github.com:XDC-Community/docs.git
cd docs/how-to/walletconnect/walletconnect-example-dapp
npm install
```

Now we just need to start the web app by running ```npm run start```. With your browser opened, visit the [`http://localhost:3000/`](http://localhost:3000/) url :rocket:

## How to connect a web Dapp with WalletConnect

If you already have a project and want to integrate with users's wallets, add WalletConnect integration by firstly install the necessary dependencies:

```shell
npm install --save @walletconnect/client @walletconnect/qrcode-modal
```

This code will initiate a WalletConnect session and integrate user's wallet, copy and paste this in your Javascript/Typescript project:

> :information_source: Syntax shown below is Javascript ES6 which requires bundling and transpiling to run in web browsers. If unfamiliar we recommend setting up an environment using [Webpack Starter](https://github.com/wbkd/webpack-starter) or [Create React App](https://github.com/facebook/create-react-app)

```javascript
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// Create a connector
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: QRCodeModal,
});

// Check if connection is already established
if (!connector.connected) {
  // create new session
  connector.createSession();
}

// Subscribe to connection events
connector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get provided accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

connector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get updated accounts and chainId
  const { accounts, chainId } = payload.params[0];
});
```

Somewhere in your project, you will request some actions to user wallet, try this to sign a simply `Hello World` message:

```javascript
// Message Parameters
const message = "Hello World";

const msgParams = [
  "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",
  keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))
];

// Sign message
connector
  .signMessage(msgParams)
  .then((result) => {
    // Returns signature.
    console.log(result)
  })
  .catch(error => {
    // Error returned when rejected
    console.error(error);
  })
```

Optionally you can add a [Web3 provider](https://docs.walletconnect.com/quick-start/dapps/web3-provider) on top of WalletConnect, to do so install the dependencies with npm:

```shell
npm install --save web3 @walletconnect/web3-provider
```

First, instantiate your WalletConnect web3-provider using the following options: Infura or Custom RPC mapping

<p>
<details><summary>Infura</summary>
<p>

```javascript
import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
});

//  Enable session (triggers QR Code modal)
await provider.enable();
```

</p>
</details>

<details><summary>Custom RPC</summary>
<p>

```javascript
import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  rpc: {
    1: "https://rpc.ankr.com/eth",
    3: "https://rpc.ankr.com/eth_ropsten",
    50: "https://rpc.xinfin.network",
    51: "https://rpc.apothem.network",
    // ...
  },
});

//  Enable session (triggers QR Code modal)
await provider.enable();
```

</p>
</details>
</p>

Then you can integrate your dapp using your favorite Ethereum library: ethers.js or web3.js

<p>
<details><summary>ethers.js</summary>
<p>

```javascript
import { providers } from "ethers";

//  Wrap with Web3Provider from ethers.js
const web3Provider = new providers.Web3Provider(provider);
```

</p>
</details>

<details><summary>web3.js</summary>
<p>

```javascript
import Web3 from "web3";

//  Create Web3 instance
const web3 = new Web3(provider);
```

</p>
</details>
</p>

After setting up your provider you should listen to EIP-1193 events to detect accounts and chain change and also disconnection.

```javascript
// Subscribe to accounts change
provider.on("accountsChanged", (accounts: string[]) => {
  console.log(accounts);
});

// Subscribe to chainId change
provider.on("chainChanged", (chainId: number) => {
  console.log(chainId);
});

// Subscribe to session disconnection
provider.on("disconnect", (code: number, reason: string) => {
  console.log(code, reason);
});
```

Now you can use the provider for whatever you want:

> Note that are some options could be more advanced and you should check the official documentation [here](https://docs.walletconnect.com/quick-start/dapps/web3-provider#provider-options).

```javascript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

// Send JSON RPC requests
const result = await provider.request(payload: RequestArguments);

// Close provider session
await provider.disconnect()

//  Get Accounts
const accounts = await web3.eth.getAccounts();
```

## Know more

In this guide we cover the **standalone client**, but there are two common ways to integrate WalletConnect: standalone client and Web3Modal :mag:

If you want to know more about Web3Modal or other wallet integrations check [this page](https://docs.xdc.community/get-details/wallet-integration).