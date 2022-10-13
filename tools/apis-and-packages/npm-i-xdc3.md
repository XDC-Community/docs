# Web3 Modal

An XDC Network compatible Web3 Modal library for XDCPay can be found here: [https://www.npmjs.com/package/xdcpay-web3modal](https://www.npmjs.com/package/xdcpay-web3modal)

## xdcpay-web3modal

> A custom xdcpay provider for web3modal

[![NPM](https://camo.githubusercontent.com/8501bda5508b63218e78d5dde0055bce8ab13eece5f871c820e9f5298265e90b/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7864637061792d776562336d6f64616c2e737667)](https://www.npmjs.com/package/xdcpay-web3modal) [![JavaScript Style Guide](https://camo.githubusercontent.com/bde227e3207c7143032c0feb73889ffbda8eb1ef234b820b915ccaf74f9c66d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d7374616e646172642d627269676874677265656e2e737667)](https://standardjs.com/)

### Install

```
npm install --save xdcpay-web3modal
```

### Usage

```
import React, { Component } from 'react'
import Web3Modal from 'web3modal';
import { getXdcModal } from 'xdcpay-web3modal'
import WalletConnect from "@walletconnect/web3-provider";


const App = () => {
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    disableInjectedProvider: false,
    providerOptions: {
      walletconnect: {
        package: WalletConnect, // required
        options: {
          infuraId: "223f20f418c34a758240a7f416435110", // Required
          network: "mainnet",
          qrcodeModalOptions: {
            mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
          }
        }
      },
      'custom-xdc': getXdcModal, // Add One line for  xdc pay web3modal provider
    }
  });
  //REST of your code
}
```

### License

MIT © [jurjees23](https://github.com/jurjees23)
