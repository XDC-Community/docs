# How to Create an XRC20 Token Using an XRC20 Factory Smart Contract

## OVERVIEW

* In this article we will show you how to make an XRC-20 token without doing any coding, and to verify this XRC-20 token on Block Explorer .
* You will use a factory smart contract that is deployed in [XDC MAINNET](https://explorer.xinfin.network/address/xdc5bf48d73498e7b7299749c466025af54ce98628b#readContract) and [TESTNET](https://explorer.apothem.network/address/xdc3a339ba624d0a496c181714ca4a9148f106255d6#readContract).
* Smart contract address mainnet **'xdc5bf48D73498E7B7299749C466025af54CE98628b'** testnet **'xdc3A339BA624D0A496C181714ca4a9148f106255D6'** .

## Follow these Steps :-

### Making your own XRC20 Token

* [Click here](https://explorer.xinfin.network/address/xdc5bf48d73498e7b7299749c466025af54ce98628b#readContract) for Mainnet and [Click here](https://explorer.apothem.network/address/xdc3a339ba624d0a496c181714ca4a9148f106255d6#readContract) for Testnet.

![](https://user-images.githubusercontent.com/114102465/192290495-5667a79e-7482-430a-8229-718993cc3b2f.png)

1. Click on Write Contract
2. Click on Connect to Web3 (If you do not installed XDCPay on your device check [this](https://github.com/mogithehurt/docs/blob/main/how-to/xdcpay.md#%EF%B8%8F-set-up-xdcpay-wallet))
3. Next, click on DeployNewXRC20Token it will extend.

![](https://user-images.githubusercontent.com/114102465/192291190-81586d16-6516-4873-876a-7d85f08c6cd4.png)

1. Name of your token
2. Symbol for your token
3. Decimals, XRC20 uses a value of 18 for decimals
4. InitalSupply, how many tokens you'd like to mint.

![](https://user-images.githubusercontent.com/114102465/192293631-d9bfc598-cd54-461c-afbc-05761de088ec.png)

* After clicking on "write", there will be a popup for transaction confirmation.

![](https://user-images.githubusercontent.com/114102465/192294412-d0cf81b6-18d3-453b-ac35-258bced57d09.png)

* Congratulations, you've created your own XRC-20 token.
* In next steps, you will verify your contract and also add it to XDCPay wallet.
* Click on the transaction hash ID

### Adding to XDCPay wallet

![](https://user-images.githubusercontent.com/114102465/192295545-50bbbc28-e1ff-4a54-808f-de82deb93b52.png)

* Next, click the token symbol

![](https://user-images.githubusercontent.com/114102465/192296412-112fd3f3-3dc2-409f-9c84-890194f96ed0.png)

* On this page, you can see all details related to your XRC-20 token. Please click on the smart contract address.

![](https://user-images.githubusercontent.com/114102465/192297955-3fddc455-1dab-42a1-b514-ae81bf37adba.png)

* Copy the smart contract address to add it on our XDCPay wallet.

![XRC20-8](https://user-images.githubusercontent.com/114102465/192300111-a98d2858-7db2-4645-b88e-672e03806db2.png)

* Now open your XDCPay wallet in a different tab.

![XRC20-9](https://user-images.githubusercontent.com/114102465/192300768-42f0df22-d913-4f76-b7e8-f24ffdcc4235.png)

1. Click on Tokens.
2. Click on Add Token.

![XRC20-10](https://user-images.githubusercontent.com/114102465/192301547-a05b0298-bbdc-4918-9204-ee3b9f89fd40.png)

1. Paste your contract address in Token Address field.
2. Click on Add.

![XRC20-11](https://user-images.githubusercontent.com/114102465/192302743-b86391c1-2752-46fd-8b68-45ad80bb57f7.png)

* You've now added your token in the XDCPay wallet.

### Verify and Publish

* Now you will verify your token. Go back to the previous tab and click on Verify and Publish.

![XRC20-12](https://user-images.githubusercontent.com/114102465/192303803-13bc199a-5b7a-4b05-b11d-bd7291c04d48.png)

1. The contract address will be automatically filled in. If not, you'll have to paste your token contract address.
2. Paste this **'XRC20Token'** in Contract name.
3. Set compiler to 0.8.5+
4. Set Optimization to NO.
5. Next, open [this link](https://explorer.xinfin.network/tokens/xdc75d5edfae0495777d23da10c47551477eaeea374#readContract) in new tab and copy source code smart contract.

![](https://user-images.githubusercontent.com/114102465/192307603-c840f43e-bb92-4e3a-a989-7e4a143a0131.png)

1. Paste the copied code in this box.
2. Next, click on submit.

![](https://user-images.githubusercontent.com/114102465/192304937-38b9fd75-2d57-47b0-9176-c3be7207e847.png)

![XRC20-15](https://user-images.githubusercontent.com/114102465/192310033-012cc700-b70a-48ef-b056-3c192537acff.png)
