---
id: xdcpay-integration
title: Integrating XDCPay to a decentralized App.
description:  "Using xdcpay-connect to create a dApp connected to XDC network."
keywords:
  - docs
  - apothem
  - dApp
  - XDCPay
  - web3modal
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
  - [📰 What you will learn](#-what-you-will-learn)
  - [📰 What you will do](#-what-you-will-do)
  - [📰 What you will need](#-what-you-will-need)
- [🚀 Setting up the development environment](#-setting-up-the-development-environment)
  - [⚒️ Creating a Web3Modal Provider](#-creating-a-web3modal-provider)
  - [⚒️ Importing Web3Modal Provider to our React App](#-importing-web3modal-provider-to-our-react-app)
  - [⚒️ Using Web3Modal Functions](#-using-web3modal-functions)
  - [⚒️ Fetching Blockchain Data using Web3Modal](#-fetching-blockchain-data-using-web3modal)

# 📰 Overview
[Truffle](https://trufflesuite.com/) is a blockchain development environment, which you can use to create and test smart contracts by levering an Ethereum Virtual Machine.

### 📰 What you will learn
In this tutorial, you will learn how to integrate XDCPay with a front end application so the application can interact with the XDC Network mainnet and XDC Apothem testnet.

### 📰 What you will do
 - Install and setup XDCPay
 - Create a simple web front end
 - Integrate XDCPay with the front end using web3.js
 - Integrate XDCPay with the front end using web3 modal

### 📰 What you will need

There are a few technical requirements before we start. Please install the following:

- [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
- [Git](https://git-scm.com/)

Plus, we will be using XDCPay to interact with our first dApp on XDC Network. You can download XDCPay at:

- [XDCPay on Chrome Store](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo)

# 🚀 Setting up the development environment

We will be using a XDC-dApp-Scaffold prepared to start integrating, lets start by cloning the dApp to our working directory:

```sh
git clone https://github.com/menezesphill/xdc-dapp-scaffold.git
cd xdc-dapp-scaffold
```

Once we have cloned our dApp Scaffold, lets install all dependencies. You can either use `yarn` or `npm` as a package manager, in this example we will use `npm`:

```sh
npm install
```

When npm finishes installing our dependencies, we can run the `start` script to see if everything is working:

```sh
npm run start
```

You should see the following React App be served at `http://localhost:3000/`:

<p align="center">
  <img width="60%" src="https://user-images.githubusercontent.com/78161484/193106064-639e0425-e743-4849-90e5-b869b1b4a290.png" alt="Step 01"/>
</p>

If you see it, we are ready to move on!

## ⚒ Creating a Web3Modal Provider

Lets start by creating a `contexts` folder on our project:

```sh
mkdir ./src/contexts
```

The touchpoint where our React App access data on the blockchain is through a `Web3Modal` Provider that we will use throughout our App. Lets start by installing the dependencies necessary to create our `Web3Modal`:

```sh
npm install web3modal web3 xdcpay-connect
```

If you get a compability error while installing these packages, try using the `--force` command to enforce dependencie resolution:

```sh
npm install web3modal web3 xdcpay-connect --force
```

With everything is correctly installed, lets create a `Web3ModalProvider.tsx` file:

```sh
touch ./src/contexts/Web3ModalProvider.tsx
```

This `Web3ModalProvider.tsx` will have the following code in it:

```jsx
import { createContext, useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { providerOptions } from "xdcpay-connect";

interface IWeb3ModalContext {
  web3: Web3 | null;
  connect: () => void;
  disconnect: () => void;
  account: string | null;
  chainId: number | null;
  networkId: number | null;
  connected: boolean;
}

export const Web3ModalContext = createContext<IWeb3ModalContext>({
  web3: null,
  connect: () => {},
  disconnect: () => {},
  account: null,
  chainId: null,
  networkId: null,
  connected: false,
});

const Web3ModalProvider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [networkId, setNetworkId] = useState<number | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const _web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
      disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });

    setWeb3Modal(_web3Modal);
  }, []);

  const createWeb3 = (provider) => {
    var realProvider;

    if (typeof provider === "string") {
      if (provider.includes("wss")) {
        realProvider = new Web3.providers.WebsocketProvider(provider);
      } else {
        realProvider = new Web3.providers.HttpProvider(provider);
      }
    } else {
      realProvider = provider;
    }

    return new Web3(realProvider);
  };

  const resetWeb3 = useCallback(() => {
    setWeb3(null);
    setAccount(null);
    setChainId(null);
    setNetworkId(null);
    setConnected(false);
  }, []);

  const subscribeProvider = useCallback(
    async (_provider: any, _web3: Web3) => {
      if (!_provider.on) return;

      _provider.on("close", () => {
        resetWeb3();
      });
      _provider.on("accountsChanged", async (accounts: string[]) => {
        setAccount(_web3.utils.toChecksumAddress(accounts[0]));
      });
      _provider.on("chainChanged", async (chainId: number) => {
        console.log("Chain changed: ", chainId);
        const networkId = await _web3.eth.net.getId();
        setChainId(Number(chainId));
        setNetworkId(Number(networkId));
      });

      _provider.on("networkChanged", async (networkId: number) => {
        const chainId = await _web3.eth.getChainId();
        setChainId(Number(chainId));
        setNetworkId(Number(networkId));
      });
    },
    [resetWeb3]
  );

  const connect = useCallback(async () => {
    if (!web3Modal) return;

    const _provider = await web3Modal.connect();
    if (_provider === null) return;

    const _web3 = createWeb3(_provider);
    setWeb3(_web3);

    await subscribeProvider(_provider, _web3);

    const accounts = await _web3.eth.getAccounts();
    const _account = _web3.utils.toChecksumAddress(accounts[0]);
    const _networkId = await _web3.eth.net.getId();
    const _chainId = await _web3.eth.getChainId();

    setAccount(_account);
    setNetworkId(Number(_networkId));
    setChainId(Number(_chainId));
    setConnected(true);
  }, [web3Modal, subscribeProvider]);

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [web3Modal, connect]);

  const disconnect = useCallback(async () => {
    if (web3 && web3.currentProvider) {
      const _provider: any = web3.currentProvider;
      if (_provider.close) await _provider.close();
    }
    if (web3Modal) {
      await web3Modal.clearCachedProvider();
    }
    resetWeb3();
  }, [web3Modal, web3, resetWeb3]);

  return (
    <Web3ModalContext.Provider
      value={{
        web3,
        connect,
        disconnect,
        account,
        networkId,
        chainId,
        connected,
      }}
    >
      {children}
    </Web3ModalContext.Provider>
  );
};

export default Web3ModalProvider;
```

This Provider will provide the following list of features to our React App:

 - A `web3` object;
 - A `connect` method;
 - A `disconnect` method;
 - An `account` variable;
 - An `networkId` variable;
 - An `chainId` variable;
 - A `connected` boolean variable;

Our folder should look like this:

<p align="center">
  <img src="https://user-images.githubusercontent.com/78161484/193114982-4cc2f444-79ea-466d-967c-1d576ce01f3a.png" alt="Folder 01"/>
</p>

## ⚒ Importing Web3Modal Provider to our React App

We will now edit our `App.tsx` file located at `./src/global/`, this file should look like this:

```jsx
import React from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import styles from "./styles.module.scss";

const App: React.FC = () => {
  return (
      <div className={styles.app}>
        <Header />
        <Content />
      </div>
  );
};

export default App;
```

We will import our Provider and add that provider to our React Components provider list:

```jsx
import React from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import styles from "./styles.module.scss";
import Web3ModalProvider from "../contexts/Web3ModalProvider";

const App: React.FC = () => {
  return (
      <div className={styles.app}>
        <Web3ModalProvider>
        <Header />
        <Content />
        </Web3ModalProvider>
      </div>
  );
};

export default App;
```

## ⚒ Using Web3Modal Functions

The first thing we will import from our Web3Modal provider are the `connect` and `disconnect` methods, and our `account` variable, in this way, we can connect to our XDCPay wallet, and show the user what address we are connected to.

Lets move to our `./src/components/Header` folder and open the `index.tsx` file:

```jsx
import React from "react";
import styles from "./styles.module.scss";

const Header: React.FC = () => {

  function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
  }

  return (
    <nav className={styles.header}>
      <div className={styles.sides}>
        <div className={styles.left}>
        </div>
        <div className={styles.right}>
          <div className={styles.connectButton}><span>NOT CONNECTED</span></div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
```

Here we will create a `Web3ModalContext` and use React's `useContext` to have access to our web3 methods. We also need to implement the `connect/disconnect` logic on our component and to show whether we are connected or not. Lets write the following changes to our `index.tsx` file:

```jsx
import React, { useContext, useCallback } from "react";
import styles from "./styles.module.scss";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";

const Header: React.FC = () => {

  function ellipseAddress(
    address: string | null,
    width: number = 4
  ): string {
    return `${address?.slice(0, width + 2)}...${address?.slice(-width)}`;
  }

  const { account, connect, disconnect } = useContext(Web3ModalContext);

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <nav className={styles.header}>
      <div className={styles.sides}>
        <div className={styles.left}>
        </div>
        <div className={styles.right}>
          <div className={styles.connectButton}>
            <span>
            {!account ? (
              <div className={styles.button} onClick={handleConnectWallet}>
                NOT CONNECTED
              </div>
            ) : (
              <div className={styles.button} onClick={handleDisconnectWallet}>{ellipseAddress(account)}</div>
            )}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
```

If everything is ok, you should be able to connect your XDCPay wallet to the dApp like in the video:

[Screencast from 29-09-2022 16:46:20.webm](https://user-images.githubusercontent.com/78161484/193127759-55fba05c-d4d3-40e8-bba2-bad556c07974.webm)

## ⚒ Fetching Blockchain Data using Web3Modal

Now lets get some blockchain data and show it on our dApp. Lets move to the `./src/components/Content` folder and open the `index.tsx` file. It should look as follow:

```jsx
import React, { useState } from "react";
import styles from "./styles.module.scss";

const Content: React.FC = () => {
  const [inputData, setInputData] = useState("");
  const [walletStatus, setWalletStatus] = useState(false);

  function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  }

  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.interface}>
          <div className={styles.columns} style={{ height: "300px" }}>
              <div className={styles.form}>
                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Address:</label>
                  </div>
                  <input
                    type="text"
                    value={inputData}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>Connected to:</label>
                  </div>
                  <input
                    type="text"
                    value={inputData}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Balance:</label>
                  </div>
                  <input
                    type="text"
                    value={inputData}
                  />
                </div>

                <div className={styles.walletStatus}>
                      <div
                        className={styles.ball}
                        style={
                          walletStatus
                            ? { backgroundColor: "lime" }
                            : { backgroundColor: "red" }
                        }
                      />
                      Wallet {walletStatus ? "Connected" : "Disconnected"}
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </section>
  );
};

export default Content;
```

In this file we want to create the logic to:

 - Get my XDC Address;
 - Get the chain ID I am connected to;
 - Get my XDC Balance;
 - Check if my wallet is currently connected to the dApp or not;

In order to do that, we will make the following changes to the code:

```jsx
import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";

const Content: React.FC = () => {
  const [xdcAddress, setXdcAddress] = useState("");
  const [xdcBalance, setXdcBalance] = useState("");
  const [currentChainId, setCurrentChainId] = useState("");
  const [walletStatus, setWalletStatus] = useState(false);

  const { account, chainId, web3 } = useContext(Web3ModalContext);

  const getBalance = async () => {
    if (web3 && account) {
      const balance = await web3.eth.getBalance(account);
      
      setXdcBalance((Number(balance)/1e18).toString());
    } else {
      setXdcBalance("");
    }
  };

  const getChainId = () => {
    if (web3 && chainId) {
      setCurrentChainId(String(chainId));
    } else {
      setCurrentChainId("");
    }
  };

  const getWalletStatus = () => {
    if (!account) {
      setWalletStatus(false);
    } else {
      setWalletStatus(true);
    }
  };

  const getAddress = () => {
    if (account) {
      setXdcAddress(`xdc${account.slice(2)}`);
    } else {
      setXdcAddress("");
    }
  };

  useEffect(() => {
    getBalance();
    getChainId();
    getWalletStatus();
    getAddress();
  }, [account, chainId, web3]);

  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.interface}>
          <div className={styles.columns} style={{ height: "300px" }}>
              <div className={styles.form}>
                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Address:</label>
                  </div>
                  <input
                    type="text"
                    value={xdcAddress}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>Connected to:</label>
                  </div>
                  <input
                    type="text"
                    value={currentChainId}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Balance:</label>
                  </div>
                  <input
                    type="text"
                    value={xdcBalance}
                  />
                </div>

                <div className={styles.walletStatus}>
                      <div
                        className={styles.ball}
                        style={
                          walletStatus
                            ? { backgroundColor: "lime" }
                            : { backgroundColor: "red" }
                        }
                      />
                      Wallet {walletStatus ? "Connected" : "Disconnected"}
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </section>
  );
};

export default Content;
```

If there are no erros, the next time you would connect to XDCPay on the Dapp you should see the following:

[Screencast from 29-09-2022 17:07:45.webm](https://user-images.githubusercontent.com/78161484/193131773-cfbf0baa-b92d-40b4-965e-826c48fba26a.webm)

With that you have created your first DApp on XDC Network using XDCPay! 🎉🥳

---

This Dapp Scaffold is available in the [xdc-dapp-scaffold folder](https://github.com/menezesphill/docs/tree/main/how-to/XDCPay/Integration/xdc-dapp-scaffold).<br>
This Dapp completed version (fully functional) is also available in the [xdc-dapp-scaffold-completed folder](https://github.com/menezesphill/docs/tree/main/how-to/XDCPay/Integration/xdc-dapp-scaffold-completed).<br>
For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>





















