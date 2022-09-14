# PHP SDK

## XRC20 Token Standard

XRC20 is the technical standard for fungible tokens issued on the XDC blockchain. XRC20 tokens have the property that makes each token exactly similar to one another in type and value. These tokens are blockchain-based assets that hold similar value and can easily be sent and received.

### Read Methods

`name() → string`\
Returns the name of the token.

`symbol() → string`\
Returns the symbol of the token, usually a shorter version of the name.

`decimals() → uint8`\
Returns the number of decimals used to get its user representation. For example, if decimal equals 2, a balance of 505 tokens should be displayed to a user as 5,05 (505 / 10 \*\* 2).\
Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei.

`totalSupply() → uint256`\
Returns the number of tokens in existence.

`balanceOf(address account) → uint256`\
Returns the number of tokens owned by the account.

`allowance(address owner, address spender) → uint256`\
Returns the remaining number of tokens that the spender will be allowed to spend on behalf of the owner through `transferFrom`. It is zero by default.

### Write Methods

`approve(address spender, uint256 amount)`\
Sets amount as the allowance of spender over the caller’s tokens.

&#x20;`transfer(address recipient, uint256 amount)`\
Moves tokens from the caller’s account to the recipient.

`transferFrom(address sender, address recipient, uint256 amount)`\
Moves tokens from sender to recipient using the allowance mechanism. The amount is deducted from the caller’s allowance.

`increaseAllowance(address spender, uint256 addedValue)`\
Automatically increases the allowance granted to spender by the caller.

`decreaseAllowance(address spender, uint256 addedValue)`\
Automatically decreases the allowance granted to spender by the caller.

### Installation

1. Install PHP version 7.4.25.
2. Go to the PHP folder in your system and open php.init file. Then, enable gmp and curl extensions. To enable this extension, remove ";" from\
   `;extension=gmp`\
   `;extension=curl`\
   `;curl.cainfo =`
3. Now, download the SSL certificate and add the path in php.init file. You can download the SSL certificate [here](https://curl.se/docs/caextract.html).\
   `curl.cainfo = "C:\Users\HP\Downloads\cacert.pem"`
4.  Install OpenSSL in your system by Chocolately.

    Run below command in admin powershell to install OpenSSL.

    `choco install openssl`

All XRC20 methods, including contract file and address calling from apothem file in XDC library inside vendor folder-> xdc3base -> php. In PHPS library inside the vendor folder -> xdc3 -> php, we can find the all calling functions from the XDC library. (e.g., in modules xrc20 folder contains every calling method).

If you want to change the URL, go to vendor -> XDC3 folder -> PHP folder -> .env file.

```
//path configuration include "vendor/xdc3/php/library.php";
//Import classes of XDC20 use XRC721\SDK\XRC20SDK;
//Create objects to call the functions of XRC20 and create a wallet for the user
$obj1 = new XRC20SDK();
$obj3 = new createXDCWallet();

Test.php

<?php
//path configuration
include "vendor/phps/sdkxdc/library.php";

//Import classes of XDC20
use XRC20\SDK\XRC20SDK;

//Create objects to call the functions of XRC20 and create a wallet for the User
$obj1 = new XRC20SDK();
```

Follow the below-mentioned steps to use the PHP SDK library:&#x20;

**Step 1:** Create a folder, e.g. sdk.&#x20;

**Step 2:** Inside the folder, open the command prompt and type composer require xdc3/php.

**Step 3:** Create a file, index.php.&#x20;

**Step 4:** Once the file is created, add the path, import the classes and create the object.

**Step 5:** (optional) If you want to change the URL, go to vendor -> XDC3 folder -> PHP folder -> .env file.

This library provides a simple way to interact with XDC XRC20 & XRC721 tokens.

**Name func:**\
`$obj1->getName($contractAddress);`

**Symbol func:**\
&#x20; `$obj1->getSymbol($contractAddress);`

**Decimal func:**\
`$obj1->getDecimal($contractAddress);`

**TotalSupply func:**\
`$obj1->getTotalSupply($contractAddress);`

**BalanceOf func:**\
`$obj1->getBalanceOf($contractAddress,$ownerAddress);`

**Allowance func:**\
`$obj1->getAllowance($contractAddress,$ownerAddress,$spenderAddress);`

**GetApprove func:**\
`$obj1->getApprove($contractAddress,$ownerAddress,$ownerPrivateKey,$spenderAddress,$tokenAmount);`;

**IncreaseAllowance func:**\
&#x20;   `$obj1->increaseAllowance($contractAddress,$ownerAddress,$ownerPrivateKey,$spenderAddress,$tokenAmount);`

**DecreaseAllowance func:**\
&#x20;   `$obj1->decreaseAllowance($contractAddress,$ownerAddress,$ownerPrivateKey,$spenderAddress,$tokenAmount);`

**TransferFrom func:**\
&#x20;`$obj1->transferFrom($contractAddress,$ownerAddress,$spenderAddress,$spenderPrivateKey,$recieverAddress,$tokenAmount);`

**TransferToken func:**\
`$obj1->transferToken($contractAddress,$senderAddress,$senderPrivateKey,$recieverAddress,$tokenAmount);`

**TransferXdc func:**\
`$obj1->transferXdc($contractAddress,$senderAddress,$senderPrivateKey,$recieverAddress,$xdcAmount);`

**CreateWallet func:**

`$obj3 = new createXDCWallet();`\
`$obj3->createWallet();`\
?>

## XRC721 Token Standard

XRC721 is the token standard for non-fungible tokens. These are unique tokens that hold different values than other tokens in the same smart contract. All NFTs have a uint256 variable called tokenId, so for any XRC-721 Contract, the pair contract address, uint256 tokenId must be globally unique.

Every XRC-721 compliant contract must implement the **** `XRC721` and `XRC165` interfaces.

### Read Methods

`symbol() → string`\
Provides the symbol of the token, mostly just an abbreviation of the name.

`name() → string`\
Provides the name of the token.

`totalSupply() → uint256`\
Returns the total amount of tokens in the contract.

`balanceOf(address account) → uint256`\
Provides the number of non-fungible tokens in the owner's **** account.

`ownerOf(tokenId) → address`\
Returns the NFT owner specified by `tokenId`.

`tokenURI(uint256 tokenId) → string`\
Gives the URI for a `tokenID`.

`tokenOfOwnerByIndex(address owner, uint256 index) → uint256`\
Returns the token ID at a given index of the requested owner.

`tokenByIndex(uint256 index) → uint256`\
Returns the token ID at a given index.

`supportInterface(tokenId) → bool`\
Sets its value true if the contract implements the interface defined by `interfaceId`.&#x20;

`getApproved(tokenId) → address`\
Returns the approved address for a token ID or sets it to zero if no address. If the token ID does not exist, it reverts.

`isApprovedForAll (address owner, address operator) → bool`\
Tells whether a given owner approves an operator.

### Write Methods

`approve(address to, uint256 tokenId)`\
Approves the address that sends the given token ID. It ensures to approve only one address per token at a given time. Only the token owner or an approved operator can call the `approve` method. The zero address means that no approved address exists.

`transferFrom(address from, address to, uint256 tokenId)`\
Provides the ownership of a given token ID to another address.

`safeTransferFrom(address from, address to, uint256 tokenId)`\
Safely provides the ownership of the requested token ID to another address**.**

`setApprovalForAll(address operator, bool approved)`\
`setApprovalForAll`method grants or revokes the approval of a given operator. An operator can send all tokens of the sender on their behalf.

### Installation

1. Install PHP version 7.4.25.
2. Go to the PHP folder in your system and open php.init file. Then, enable gmp and curl extensions. To enable this extension, remove ";" from\
   `;extension=gmp`\
   `;extension=curl`\
   `;curl.cainfo =`
3. Now, download the SSL certificate and add the path in php.init file. You can download the SSL certificate [here](https://curl.se/docs/caextract.html).\
   `curl.cainfo = "C:\Users\HP\Downloads\cacert.pem"`
4.  Install OpenSSL in your system by Chocolately.

    Run below command in admin powershell to install OpenSSL.

    `choco install openssl`

All XRC721 methods, including contract file and address calling from apothem file in XDC library inside vendor folder-> xdc3base -> php. In PHPS library inside the vendor folder -> xdc3 -> php, we can find the all calling functions from the XDC library. (e.g., in modules xrc721 folder contains every calling method).

```
/path configuration
include "vendor/phps/sdkxdc/library.php";
//Import classes of XDC721
use XRC721\SDK\XRC721SDK;

//Create Objects to call the functions of XRC20 and Create a wallet for the User
$obj2 = new XRC721SDK();
```

Follow the below-mentioned steps to use the PHP SDK library:&#x20;

**Step 1:** Create a folder, e.g. sdk.&#x20;

**Step 2:** Inside the folder, open the command prompt and type composer require xdc3/php.

**Step 3:** Create a file, index.php.&#x20;

**Step 4:** Once the file is created, add the path, import the classes and create the object.

If you want to change the URL, go to vendor -> XDC3 folder -> PHP folder -> .env file.

**Name func:**\
`$obj2->getName($contractAddress);`

**Symbol func:**\
&#x20; `$obj2->getSymbol($contractAddress);`

**TotalSupply func:**\
`$obj2->getTotalSupply($contractAddress);`

**BalanceOf func:**\
`$obj2->getBalanceOf($contractAddress,$ownerAddress);`

**SupportsInterface func:**

`$obj2->getSupportInterface($contractAddress,$interfaceId);`

**OwnerOf func:**

`$obj2->getOwnerOf($contractAddress,$tokenId);`

**TokenURI func:**

`$obj2->getTokenURI($contractAddress,$tokenId);`

**TokenByIndex func:**

`$obj2->getTokenByIndex($contractAddress,$index);`

**TokenOfOwnerByIndex func:**

`$obj2->getTokenOfOwnerByIndex($contractAddress,$ownerAddress,$index);`

**GetApprove func:**

`$obj2->getApproved($contractAddress,$tokenId);`

**Approve func:**

`$obj2->approve($contractAddress,$recieverAddress,$tokenId,$privateKey);`

**SetApprovedForAll func:**

`$obj2->setApprovalForAll($contractAddress,$operatorAddress,$approvedStatus,$ownerPrivateKey,$tokenId);`

**IsApprovedForAll func:**

`$obj2->setApprovalForAll($contractAddress,$operatorAddress,$approvedStatus,$ownerPrivateKey,$tokenId);`

**SafeTransferFrom func:**

&#x20;`$obj2->safeTransferFrom($contractAddress,$ownerAddress,$recieverAddress,$tokenId,$approvedPrivateKey);`

**TransferFrom func:**

&#x20;`$obj2->transferFrom($contractAddress,$ownerAddress,$recieverAddress,$tokenId,$approvedPrivateKey);`

**TransferOwnership:**

&#x20;`$obj2->transfer($contractAddress,$ownerAddress,$recieverAddress,$tokenId,$approvedPrivateKey);`
