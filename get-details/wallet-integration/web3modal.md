---
description: 'This article will teach you what Web3Modal is, what Web3Modal is used for, and how to connect Web3Modal to the XDC Network.'
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
  - web3modal
---

# Web3Modal

![Web3Modal logo](https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-web3modal-header.webp)

Your on-ramp to web3 multichain. [Web3Modal](https://docs.walletconnect.com/quick-start/dapps/web3modal) is a versatile library that makes it super easy to connect users with your Dapp and start interacting with the blockchain.

---

## Get Started

What is Web3Modal and for what is used? Web3Modal is an easy-to-use library to help developers add support for multiple providers in their apps with a simple customizable configuration.

## How to Use it

To connect a Dapp and a Web3 wallet with Web3Modal, open the app and prepare your wallet. Click on connect button:

<p align="center">
  <img width=30% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-web3modal-open.webp" alt="How to connect your Dapp to Web3Modal"/>
</p>

A Web3Modal modal should pop-up:

<p align="center">
  <img width=70% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-web3modal-modal.webp" alt="How to connect your Dapp to Web3Modal"/>
</p>

With Web3Modal we have multiple options to interact with. With modal opened, we can choose any wallet connection method, either be **mobile** or **desktop**:

<p align="center">
  <img width=40% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-web3modal-modalqr.webp" alt="How to connect your Dapp to Web3Modal"/> <img width=40% src="https://raw.githubusercontent.com/XDC-Community/docs/main/.gitbook/assets/example-web3modal-modaldesktop.webp" alt="How to connect your Dapp to Web3Modal"/>
</p>

After choosing a method, and approving the request you have your app and wallet connected :rocket:

## Prepared Demo

You can easly test Web3Modal a minimal demo project (find the code [here](https://github.com/XDC-Community/docs/tree/main/how-to/web3modal/web3modal-example-dapp)).

> :information_source: The demo was made base on `Node.js v18.X` and `Web3Modal v2` version.

In order to run it, download and install dependencies by running this commands on terminal:

```shell
git clone git@github.com:XDC-Community/docs.git
cd docs/how-to/web3modal/web3modal-example-dapp
npm install
```

Head over to [`cloud.walletconnect.com`](https://cloud.walletconnect.com/) to sign up and generate your **projectId**, which will be required to allow interactions with our explorer api, optional WalletConnect rpc provider and more v2 protocol features in the future. Duplicate environment [`.env.local.example`](../../how-to/web3modal/web3modal-example-dapp/.env.local.example) file to a `.env.local`, and edit `NEXT_PUBLIC_PROJECT_ID` value to your projectId you create.

> :art: Optional: To customize colors on this example go to [`src/pages/_app.tsx`](https://github.com/XDC-Community/docs/blob/main/how-to/web3modal/web3modal-example-dapp/src/pages/_app.tsx#L14-L15) file, and edit `modalConfig` values: **theme**, and **accentColor**.

Now we just need to start the web app by running ```npm run dev```. With your browser opened, visit the [`http://localhost:3000/`](http://localhost:3000/) url :test_tube: