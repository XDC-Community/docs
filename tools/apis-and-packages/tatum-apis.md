# Tatum APIs

## Table of contents

- [What is Tatum](#-what-is-hardhat)
- [What is used for](#-what-is-used-for)
- [How to use Tatum](#-how-to-use-tatum)


## What is Tatum?

Tatum offers a flexible framework to build, run, and scale blockchain apps fast. To learn more about the Tatum blockchain development framework, visit our website.
The Tatum API features powerful endpoints that simplify a complex blockchain into single API requests. Code for all supported blockchains using unified API calls.

## What is used for? 

  Tatum API is used for many things like build scalable blockchain apps in a lot of networks. They offer a lot of endpoints to make an easier way to build a dapp.
  
  With Tatum APIs you can: 
  
   - Connect with networks nodes. 
   - Create wallets, account address and public keys. 
   - Get Blocks from hashes, balances, transactions. 
   - Send ERC20 tokens from an account to account, invoke smart contract methods, broadcast signed transaction.

## How to use Tatum: 

 ### Register for a x-API-key in [Tatum](https://dashboard.tatum.io/sign-up) 
 
 ![Screenshot_1](https://user-images.githubusercontent.com/34518489/195771020-ed18af47-c9cb-42ac-a185-53da97d62a0d.png)
 
 After registering and logging in, you need to create an API key choose the free plan in this test

![Screenshot_2](https://user-images.githubusercontent.com/34518489/195771446-d1e17649-5eb4-4835-a26c-6ee1f46c631c.png)

After the api key is created you can watch it clicking `Show` button
![Screenshot_4](https://user-images.githubusercontent.com/34518489/195771820-a95b7316-834b-4fbb-a4e8-232c27a77b69.png)

Now that you have your API key copy it and let's try it in the [API docs Tatum](https://apidoc.tatum.io/tag/XinFin)

![Screenshot_5](https://user-images.githubusercontent.com/34518489/195772207-cbbfaca3-7a57-4927-b95b-535ae2992c69.png)

At this point you can see in list on left side all the endpoints that Tatum offers to build in xinfin network and the many programming lenguages. 

Let's generate a wallet and an address, be sure to have your API Key, click in the try it button and paste your x-api-key then click send. 

![Screenshot_6](https://user-images.githubusercontent.com/34518489/195772789-7d508a67-da32-4d3c-8a5e-bba00aa34238.png)

You most to receive a `200 OK STATUS` copy your x-pub and mnemonic phrase.

Paste the xpub in the required field and the index should be the number 0. 

After that you'll receive your address. 

![Screenshot_8](https://user-images.githubusercontent.com/34518489/195773333-09264ec9-926e-4622-8f04-f3930c7a91b2.png)

Now let's generate our private key you will see your the fields already filled with the right information: 

![Screenshot_9](https://user-images.githubusercontent.com/34518489/195773970-c0a75622-3954-45d1-8d7c-177d9a77fbbc.png)

Keep save all the information provided, you can use it to develop with Tatum. 

Now gonna try to get the balance for this account: 

![Screenshot_10](https://user-images.githubusercontent.com/34518489/195774275-44ecb2e2-d817-422a-9b2f-9ee6debf5efa.png)

![Screenshot_11](https://user-images.githubusercontent.com/34518489/195774361-5804420b-7cfe-430b-88dc-196354f4f628.png)

Gonna try to send xdc tokens from my [XDC Pay Wallet](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo) to the wallet generated with Tatum you can ask for tokens in tesnet with this faucet [Apothem network](https://faucet.apothem.network/). 

![Screenshot_12](https://user-images.githubusercontent.com/34518489/195776054-6986d38b-b0f7-40d3-b742-f26b7bf5634a.png)

Opening Extension.

![Screenshot_13](https://user-images.githubusercontent.com/34518489/195776184-1e0d8666-219b-45d3-836b-a84e248d7c87.png)


![Screenshot_22](https://user-images.githubusercontent.com/34518489/195777082-ec92aa70-4d35-4d32-8b64-8123c7872119.png)


![Screenshot_23](https://user-images.githubusercontent.com/34518489/195776982-36e8890d-0edc-49aa-a7c9-ebfe56ab9ffc.png)

![Screenshot_24](https://user-images.githubusercontent.com/34518489/195777338-74334e61-6a6f-4a90-80dd-b5459486897a.png)

Check the transaction in BlockScan

![Screenshot_20](https://user-images.githubusercontent.com/34518489/195776393-6cec9110-3b1a-4695-ae64-85ca73a940ee.png)

Check the balance again in the Tatum Api page:

![Screenshot_19](https://user-images.githubusercontent.com/34518489/195776382-3303ac84-4af9-4707-a1a7-86a19bfc776c.png)

You can Build with a lot of programming languages like php, java, python, javascript, c# and Go. In the API Tatum page you can copy the code and paste it in your editor or IDE: 

![Screenshot_24](https://user-images.githubusercontent.com/34518489/195778991-5f100287-13e1-445d-875a-06b1e44b32f8.png)

Here is a javascript code to get the account balance copied from Tatum's page

```jsx
const address = 'xdca7673161cbfe0116a4de9e341f8465940c2211d4';
const resp = await fetch(
  `https://api-eu1.tatum.io/v3/xdc/account/balance/${address}`,
  {
    method: 'GET',
    headers: {
      'x-api-key': 'YOUR-API-KEY'
    }
  }
);

const data = await resp.text();
console.log(data);
```
