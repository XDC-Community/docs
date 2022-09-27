---
description: 'Source: https://docs.xdc.org/xdc-tools/xdc-pay'
---

# XDCPay

XDCPay

## Get Started with XDCPay Web3 Extension <a href="#get-started-with-xdcpay-web3-extension" id="get-started-with-xdcpay-web3-extension"></a>

In this tutorial, we'll discuss an essential technology that correlates with the core operation of XDC — Network transactions.

## Understanding XDCPay <a href="#understanding-xdcpay" id="understanding-xdcpay"></a>

XDCPay is a bridge that allows you to visit the distributed web of tomorrow in your browser today. It allows you to run XDC dApps right in your browser without running a full XDC node. While doing transactions on the blockchain network, it uses computing power known as gas cost. To pay the gas cost, you will need a wallet that handles your money and that's where XDCPay comes in. Without further ado, let's jump right into the first question!

## How to install XDCPay? <a href="#how-to-install-xdcpay" id="how-to-install-xdcpay"></a>

XDCPay supports the following browsers:

* Google Chrome
* Mozilla Firefox

If you already have any of the above, you can proceed; otherwise, you should download at least one of the listed browsers, and you're good to go! Go to this [link](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo) and download XDCPay.

You can also download XDCPay on your browser's plugin extension web store, but if you want to be directed automatically to the download page dedicated to your browser, the link is the way to go.&#x20;

Once you're inside, you should see XDCPay's iconic XDC head following your mouse direction. Under it, you'll see the GET CHROME EXTENSION orange button, Click that, and you'll be automatically directed to your browser's store.&#x20;

Google Chrome browser's example:&#x20;

Add the plugin extension, and it will install itself on the browser after downloading (in Chrome's case, click the Add to Chrome button). Once installed, a new tab will pop up. It is the XDCPay wallet's welcome page. But you'll get the same interface on the actual wallet, so close it.&#x20;

After creating and confirming your password, go through the terms and agreements; then, you'll be given a secret backup phrase. That phrase is the heart of your account since it is derived from a unique hash associated with your account.&#x20;

<figure><img src="../../.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure>

Although XDCPay is a developers' wallet, you still have to exercise secrecy. (The account shown is for demonstration purposes only). After saving the phrase, you will need to confirm it. Then, it will ask you if you want to deposit, skip or close.

<figure><img src="../../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

Finally, XDCPay is successfully installed and you've made your wallet.

## What can a wallet do?

Here are the basic features of XDCPay necessary for the development of XDC decentralized applications:

* Adding/importing accounts
* Switching accounts
* Switching networks
* Requesting tokens (Testnet Faucet)
* Sending tokens (XDC)
* Adding/Searching for token
* Getting backup seed

## How to use the wallet?

Let's look at the highlighted portion on the top.

<figure><img src="../../.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure>

Below the account's name: Account 1, there's a random character string: Xdc58... It is your account's wallet address. The address is copied onto your clipboard if you click on it.

It is very helpful since you'll use your account a lot on your smart contract development and your dApps as a test account. Next is the one below it, which is your transaction history. Here you will see the state of your transactions, either finished, pending or failed.

Moreover, if you want to switch the value from fiat to dx, you can do that by going to the Settings from the top right three lines button, as shown here:

<figure><img src="../../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

When clicked, a window will show up under it. You can see from the bottom-most part, which is the Settings button with the gear icon. Click that button and it should show this:

<figure><img src="../../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>

The interface shown above will appear initially on the Settings tab. Without scrolling, you'll be able to see the Primary Currency section from the fiat radio button, switch it to XDC. If you go back to your main interface by clicking the head button, it should change to:

<figure><img src="../../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

### Adding/Importing accounts

This is a feature that allows you to add more than one wallet. It can be useful both in development and in real life. Since you'll be making applications, you will need to test one account and get your accounts to interact on a smart contract.

<figure><img src="../../.gitbook/assets/image (5) (1).png" alt=""><figcaption></figcaption></figure>

### Adding accounts

To add an account, go to the highlighted top right button and click it. It will prompt a new window, showing a list of items.

On the top of that window, it'll show the list of accounts that you currently have. As of now, you only have one account, which is Account 1.

To add another, click on Create an account. You'll get redirected to a self-explanatory interface containing an input for the name of your account. Hit the Create button.

When you go back, you'll have your new account created. It also has a unique address.

### Importing accounts

<figure><img src="../../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

If you have an existing account, you can click on Import Account. You will be redirected to an interface where you will have to put a secret backup phrase in the private key string text input of the Private Key category. If you want to import JSON, you can do so by changing it in JSON. The last thing to do is to click the Import button.

### Switching accounts

<figure><img src="../../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>

In the example above, you can see that two accounts are already added: Account 1 and Account 2. Click on the same window as before to switch to Account 2 from the list.

### Switching networks

Switching networks is an important thing about XDCPay. As you have recently seen, we're using the main XDC Network. But that's not the development network; there's another network available for developers.

<figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

As you can see in the picture above, we're on the Main network. Below is the developers' network, XDC Apothem Network. If you're using Remix directly with injected Web3 setting, Localhost: 8545 is for your local XDC network.

Choosing a network is a case-to-case basis, but let's choose Apothem Test Network for common action.

### Request tokens

Transaction processing involves gas. Therefore, tokens are required every time we interact with/test contracts or send tokens.

But all of these are mostly used if you're going to spend and do real transactions on the mainnet. For the developers, however, if you switch to a developer network such as Apothem Network, you will see this:

<figure><img src="../../.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure>

You will see a Test Faucet. By clicking the XDC Apothem Testnet Test Faucet button, you will get free tokens. But these tokens have no real value since it is a testing network.

By clicking the blue button, you'll be able to request XDC. From there, for a short moment, it will take effect and give you tokens that you'll need as gas for testing in the development network. Here is the link to the Testnet Faucet.

<figure><img src="../../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

### Send tokens

Before proceeding, try getting tokens for your account from the Test Faucet on Apothem Network. If you already have tokens, we can now try to send tokens to another account. To see the effect, send it to your other created account.

<figure><img src="../../.gitbook/assets/image (11).png" alt=""><figcaption></figcaption></figure>

The 'Send' button on the Apothem Network will send you to this interface. In the example, Account 1 has 100 XDC, and by hitting the recipient address input text, you'll be able to choose or paste an address.

In your case, use your account that has XDC and send it to your other account. Set the amount on the Amount section and you can set how fast the transaction will be beneath it; it's customizable.

After you set everything, click Next. And you'll be sent to the confirmation interface.

### Confirmation Interface

<figure><img src="../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

It is the exact interface whenever you make transactions on XDC using XDCPay. You'll see a lot of prompting interfaces once you start developing.

From here, you can also edit the gas fee to make your transaction faster. Here, we are sending 0.457 XDC to Account 1. Click Confirm and your transaction will be processed and show up on your Transaction History on the main interface.

### Add/Search tokens

Aside from the XDC token, there are also different kinds of tokens that you can use based on the kind of dApp you use. Usually, when you make a dApp, you also make your cryptocurrency.

### Add tokens

<figure><img src="../../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

From the main interface, go to the top left menu icon beneath the 'Home' button. You can add a token that you made from an XRC20 standard contract, or you can search for someone else's token. Assuming that you have one already, let's go with adding your own first.

<figure><img src="../../.gitbook/assets/image (14).png" alt=""><figcaption></figcaption></figure>

The Custom Token tab is where you can add your own created token. There are three input fields for which you need to enter details.

If you plan to make your token, you can try it on the Custom Token tab. Just click Next and you're good to go. It is added to the list. If you choose one from the list, you can use it for your transactions related to that token.

Now, let's move on to the searching of the token.

### Search tokens

Same as before, if you go to the menu icon again, on the Search tab, you will see this interface:

<figure><img src="../../.gitbook/assets/image (1) (2).png" alt=""><figcaption></figcaption></figure>

As shown above, EURG is a known example of a crypto token. If you have received EURG tokens in an instance, you can search and verify them from here and add them to your token list.

### Get backup seed

If you forgot your secret backup phrase, you can get it from your settings. Go back to settings from the top-right menu button.

<figure><img src="../../.gitbook/assets/image (4) (2).png" alt=""><figcaption></figcaption></figure>

When you get inside Settings, you will find the Reveal Seed Words section if you scroll down in the middle. If you click the Reveal Seed Words button, the secret backup phrase will be shown and you can copy it.&#x20;

Got questions? Join Telegram Channel to get answers: [https://t.me/joinchat/GeOl40UaNJPlFLNwSvu9cQ](https://t.me/joinchat/GeOl40UaNJPlFLNwSvu9cQ)
