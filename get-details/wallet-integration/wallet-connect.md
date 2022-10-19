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

After having our Dapp ready for XDC Network and our wallet prepared, let's try to connect both together with WalletConnect. Open your app and click on WalletConnect link button:

<p align="center">
  <img width=40% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-walletconnect-dapp-connect.png" alt="How to connect your Dapp to WalletConnect"/>
</p>

A WalletConnect modal should pop-up, here you can connect your wallet by scanner the `QR Code` or just go to `Desktop` tab to choose other connection method:

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

## How to connect a Dapp with WalletConnect

### Example Demo

You can easly test this with a already prepared demo project (full code [here](https://github.com/XDC-Community/docs/tree/main/how-to/walletconnect/walletconnect-dapp-example)). Just download and and install dependencies by running this command on your shell terminal:

```shell
git clone git@github.com:XDC-Community/docs.git
cd docs/how-to/walletconnect/walletconnect-dapp-example
npm install
```

Start and test the example:

```shell
npm run start
```

## Know more

In this guide we cover the Standalone Client, but there are two common ways to integrate WalletConnect: Standalone Client and Web3Model :mag:

If you want to know more about Web3Model or other wallet integrations check [this page](https://docs.xdc.community/get-details/wallet-integration).