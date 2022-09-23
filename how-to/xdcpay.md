---
id: xdcpay
title: How-to add a custom tokens on XDCPay
description:  "how to add custom XRC20, XRC721, and XRC1155 tokens on XDCPay."
keywords:
  - docs
  - apothem
  - token
  - XRC20
  - XRC721
  - XRC1155
---

# 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [📰 Overview](#-overview)
- [⚒️ Set up XDCPay wallet](#%EF%B8%8F-set-up-xdcpay-wallet)  
- [✅ Explain Token address, Token symbol and Decimal of precision](#-explain-token-address-token-symbol-and-decimal-of-precision)
- [💵 Add custom XRC20 Token](#-add-custom-xrc20-token)
- [💵 Add custom XRC721 Token](#-add-custom-xrc721-token)
- [💵 Add custom XRC1155 Token](#-add-custom-xrc1155-token)

# 📰 Overview
[XDCPay](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo)  is an extension for accessing XDC's XDPoS enabled distributed applications, or "Dapps" in your browser! 

### What you will learn
In this tutorial, you will learn how to add custom XRC20, XRC721, and XRC1155 tokens on XDCPay. This way you will be able to see all the tokens held within your wallet.


# ⚒️ Set up XDCPay wallet

In order to add custom XRC20, XRC721, and XRC1155 tokens, we need to have XDCPay wallet to sign our transactions and store XDC tokens.

- First we have to install the chrome extension of [XDCPay](https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo).

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190068514-7beac72f-ea99-49c9-ada7-7e88dc8cbf3e.png">
</p>

- Open the Chrome extension after it has been successfully installed.
- Agree to the Terms of Service. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190069353-3214410d-0526-41c9-9c1c-1170a10840c6.png">
</p>

- Create a new XDCPay wallet by setting up a strong password or use an existing Seed Phrase **`12 or 24-Word Mnemonic Phrase`** to recover your existing wallet here.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190121441-7b972e85-8ec0-47c2-adae-4e6c3fb01528.png">
</p>

- Keep the seed phrase safe. 🚨 **Do not share the seed phrase with anyone or you can risk losing your assets and/or the ownership of your smart contracts!** 🚨

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190071788-c134a5bc-599a-4a6d-a481-e7cf62e75a51.png">
</p>

- Verify recovery phrase
- Your XDCPay wallet has been successfully created.

-These account address are interchangeable with Ethereum network. We can access these accounts on Ethereum network by simply changing the initial `xdc` with `0x`. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/60708843/190086617-07b3e4a8-4b4e-4e08-affa-97cce7b1f192.png">
</p>

- If you are currently connected to the XDC Apothem Testnet, switch to the XDC Mainnet.

# ✅ Explain Token address, Token symbol and Decimal of precision

## Token address
- Token Contract Address refers to the address location of the actual token contract that manages the logic for the tokens. It does not refer to the address that holds your own personal tokens.

## Token symbol
- The symbol of the token contract is the symbol by which the token contract should be known, for example “MYT”. It is broadly equivalent to a stock ticker, and although it has no restriction on its size it is usually 3 or 4 characters in length

## Decimal of precision
- Decimal refers to how divisible a token can be, from 0 (not at all divisible) to 18 (pretty much continuous) and even higher if required. 

# 💵 Add custom XRC20 Token
- If you want to make own XRC20 Token check out this [guide](https://github.com/XDC-Community/docs/blob/main/how-to/XRC20/Remix/how-to.md#-interacting-with-your-contract-on-the-block-explorer) 
- Here, We are adding a XRC20 stablecoin xUSDT .We need xUSDT token smart contract address is **'xdcD4B5f10D61916Bd6E0860144a91Ac658dE8a1437'** . Best way to find top XRC20 token is XDC Explorer [link](https://explorer.xinfin.network/tokens/xrc20)

<p align="center">
  <img src="https://github.com/mogithehurt/test/blob/86eaa6fa908b7ac2536f2f276061538bd8c44673/Screenshot%202022-09-23%20150635.png">
</p>

- Step 1:- Click on Tokens
- Step 2:- Click on Add Token

<p align="center">
  <img src="https://github.com/mogithehurt/test/blob/86eaa6fa908b7ac2536f2f276061538bd8c44673/Screenshot%202022-09-23%20150535.png">
</p>

- Step 3:-Paste copied smart contract address (Token symbol and Decimal of precision feilds will automatically updated)
- Step 4:-Click on Add 

<p align="center">
  <img src="https://github.com/mogithehurt/test/blob/062ecc1b487b1dd6bb3ae43fe0c0925c0c173ff8/Screenshot%202022-09-23%20150718.png">
</p>

- We added a XRC20 token successfully.

# 💵 Add custom XRC721 Token

- If you want to make own XRC721 NFT check out [XDsea](https://www.xdsea.com/create-nft). Quick guide for minting [NFT](https://www.xdsea.com/how-to-start) 
- Here, We are adding a XDSea Marketplace NFT. XDSea Marketplace NFT contract address is **'xdc85d216d87C993c250A7725aF8f6C161d0504c32B'** . 
- You can find top NFTs contract [here](https://explorer.xinfin.network/tokens/nft)

<p align="center">
  <img src="https://github.com/mogithehurt/test/blob/c1b451055cea6af536c0e4f260e1189955e42155/Screenshot%202022-09-23%20175400.png">
</p>

- Step 1:-Click on Add Token.

<p align="center">
  <img src="https://github.com/mogithehurt/test/blob/c1b451055cea6af536c0e4f260e1189955e42155/Screenshot%202022-09-23%20175439.png">
</p>

- Step 2:-Paste copied NFTs smart contract address (Token symbol  will automatically updated and set Decimal of precision feilds value to 0).
- Step 3:-Click on Add.

<p align="center">
  <img src="https://github.com/mogithehurt/test/blob/c1b451055cea6af536c0e4f260e1189955e42155/Screenshot%202022-09-23%20175459.png">
</p>

- We added a XRC721 NFT token successfully.

# 💵 Add custom XRC1155 Token

- Here, We are adding a XDCNFT XRC1155 NFT. XDCNFT XRC1155 NFT contract address is **'xdc89A8CcE3F9a84Ac434A6d5a8D92aCA45b8c3729b'** . 
- You can find top XRC1155 NFTs contract [here](https://explorer.xinfin.network/tokens/nft1155) 

<p align="center">
  <img src="https://github.com/mogithehurt/test/blob/1d112e71a6de9eb65b5bc87c6f2edfa0723e9ea9/Screenshot%202022-09-23%20193922.png">
</p>

- Step 1:-Click on Add Token

<p align="center">
  <img src="https://github.com/mogithehurt/test/blob/1d112e71a6de9eb65b5bc87c6f2edfa0723e9ea9/Screenshot%202022-09-23%20193950.png">
</p>

- Step 2:-Paste copied XRC1155 NFTs smart contract address (Token symbol  will automatically updated and set Decimal of precision feilds value to 0)
- Step 3:-Click on Add.

<p align="center">
  <img src="https://github.com/mogithehurt/test/blob/1d112e71a6de9eb65b5bc87c6f2edfa0723e9ea9/Screenshot%202022-09-23%20194010.png">
</p>

- We added a XRC1155 NFT token successfully.

---

For more information about XinFin Network, Please Visit [XDC Network Documentation on GitBook](https://docs.xdc.org/).<br>
