# XRC20

## Introduction

XDC-based tokens can represent anything virtually. For example:

* Reputation points in an online platform
* A fiat currency like USD
* Lottery tickets
* Skills of a character in a game
* Financial assets, like shares in a company
* An ounce of gold

XRC20 is a standard that allows developers to build token applications that are interoperable with other products and services.

XRC20 is a standard for fungible tokens, which implements an API for the tokens in smart contracts. Fungible tokens are interchangeable because they are identical to each other and thus equal in value. They can be put to many uses, such as voting, staking, and storing or exchanging value. The XRC20 standard can do much more than perform basic functions, like transferring tokens from one address to another and retrieving token balances. For example, it can determine the number of tokens a third party can spend.

## **Constructing an XRC20 Token Contract**

An XRC20 token can easily be created using contracts.&#x20;

These XRC20 tokens can now be used to track an in-game asset or currency like Diamonds (DMD).

The DMD token might look like this:

```
contract DMDToken is XRC20 {
    constructor(uint256 initialSupply) public XRC20("Diamond", "DMD") {
        _mint(msg.sender, initialSupply);
    }
}
```

For the most part, our contracts are used via inheritance. Here, XRC20 is reused for implementing basic standards and optional extensions such as name, symbol, and decimals.

To query the deployer's balance, once the contract is deployed, run the following code:

```
> DMDToken.balanceOf(deployerAddress)
1000000000000000000000
```

To transfer the tokens to other accounts, run the following code:

```
> DMDToken.transfer(otherAddress, 300000000000000000000)
> DMDToken.balanceOf(otherAddress)
300000000000000000000
> DMDToken.balanceOf(deployerAddress)
700000000000000000000
```

It is important to note that `decimals` is only used to display decimal numbers. The arithmetical operations within the contract are still performed with integers, and the displayed values will need to be adjusted to `decimals` for different user interfaces (exchanges, wallets, etc.). The balance of each account and total token supply are not specified in `DMD`. It is necessary to divide by `10^decimals` to obtain the actual `DMD` amount. When minting or transferring tokens, the actual amount is `num DMD*10^decimals`.

To send five tokens, run the following code:

```
transfer(recipient, 5 * 10^18);
```

| XRC20 Read Methods        | XRC20 Write Methods                         |
| ------------------------- | ------------------------------------------- |
| name()                    | transfer(recipient, amount)                 |
| symbol()                  | approve(spender, amount)                    |
| decimal()                 | transferFrom(sender, recipient, amount)     |
| totalSupply()             | increaseAllowance(spender, addedValue)      |
| balanceOf(account)        | decreaseAllowance(spender, subtractedValue) |
| allowance(owner, spender) |                                             |

### Read methods

`name() → string`\
Returns the name of the token.

`symbol() → string`\
Returns the token symbol, which is usually just an abbreviation of the name.

`decimals() → uint8`\
It gives the number of decimals used. For example, a balance of 705 tokens is displayed to users as 7.05 (705 / 10 \* 2) if `decimals` equals 2.

`totalSupply() → uint256`\
Returns the number of tokens in existence.

`balanceOf(address account) → uint256`\
Provides the number of tokens associated with an account.

`allowance(address owner, address spender) → uint256`\
Gives the number of tokens that the spender will spend on behalf of the owner using`transferFrom`. It is zero by default.

### Write Methods

&#x20;`transfer(address recipient, uint256 amount)`\
Moves tokens from the caller’s account to the recipient.

`approve(address spender, uint256 amount)`\
Sets amount as the spender's allowance over the caller’s tokens.

`transferFrom(address sender, address recipient, uint256 amount)`\
Transfers tokens from sender to receiver through allowance mechanism.

`increaseAllowance(address spender, uint256 addedValue)`\
Increases the allowance provided to the spender by the caller.

`decreaseAllowance(address spender, uint256 addedValue)`\
Decreases the allowance provided to the spender by the caller.

### Usage

When the user wants to use the SDKPHP library he/ she need to follow the below steps

1. Create a folder User convient (eg : sdk)
2. Inside the folder open the command prompt and type composer require xdc3/php
3. Create a file according to  User convient (eg : index.php) Step4 :- After creating user need to add the path , import the classes and create the obj
4. After creating user need to add the path , import the classes and create the object
5. (Optional) If user wants to change the URL Goto vendor -> XDC3 folder -> PHP folder -> .env file

#### Important

This library provides simple way to interact with XDC XRC20 & XRC721 tokens.  Before Installing This Library

1. Install php version 7.4.25 in the System
2. Go to PHP Folder in the system, open php.ini file, then enable gmp and curl extensions
   1. You will see ";extension=curl", just remove ";" to enable this extension.
3. Enable ";curl.cainfo =" and add ssl certificatepath after the "="
   1. To download the certificate go to https://curl.se/docs/caextract.html then click on cacert.pem on the top, then copy the path of the certificate and paste it in the php.ini file
      1. ex: curl.cainfo = "C:\Users\HP\Downloads\cacert.pem"
4. Install openssl in the system by chocolately
   1. Run the following command in admin powershell to install openssl, "choco install openssl"
5. In XDC library inside the vendor folder -> xdc3base -> php we can find the all called functions of the XRC20 methods . (including contract file , address calling from apothem file etc)
6. In the PHPS library inside the vendor folder -> xdc3 -> php we can find all the calling functions from the XDC libarary. (ex : in modules xrc20 folder contains every calling methods)

#### Folder Info

In XDC library inside the vendor folder -> xdc3base -> php we can find the all called functions of the XRC20 methods . (including contract file , address calling from apothem file etc).  If you want to change the URL Goto vendor -> XDC3 folder -> PHP folder -> .env file.

```
:-//path configurationinclude "vendor/xdc3/php/library.php";//Import classes of XDC20 use XRC721\SDK\XRC20SDK;
```

Do the following if you want to create objects to call XRC20 functions and create a wallet for the user

```
User$obj1 = new XRC20SDK();$obj3 = new createXDCWallet();
```

### Example

```
//path configuration
include "vendor/phps/sdkxdc/library.php";
//Import classes of XDC20
use XRC721\SDK\XRC20SDK;
//Creating a Objects to call the functions of XRC20 and Create a wallet for the User
$obj1 = new XRC20SDK();
$obj3 = new createXDCWallet();
Test.php
<?php
//path configuration
include "vendor/phps/sdkxdc/library.php";
//Import classes of XDC20 use XRC20\SDK\XRC20SDK;
//Creating a Objects to call the functions of XRC20 and Create a wallet for the User
$obj1 = new XRC20SDK();
Name func :-
$obj1->getName($contractAddress);
 
Symbol func :-
$obj1->getSymbol($contractAddress);
Decimal func :-
$obj1->getDecimal($contractAddress);
TotalSupply func :-
$obj1->getTotalSupply($contractAddress);
BalanceOf func :-
$obj1->getBalanceOf($contractAddress,$ownerAddress);
Allowance func:-
$obj1->getAllowance($contractAddress,$ownerAddress,$spenderAddress);
GetApprove func:-
$obj1->getApprove($contractAddress,$ownerAddress,$ownerPrivateKey,$spenderAddress,$tokenAmount);;
IncreaseAllowance func :-
$obj1-

>increaseAllowance($contractAddress,$ownerAddress,$ownerPrivateKey,$spenderAddress,$tokenAmount);
DecreaseAllowance func :-
$obj1->decreaseAllowance($contractAddress,$ownerAddress,$ownerPrivateKey,$spenderAddress,$tokenAmount);
TransferFrom func :-
$obj1->transferFrom ($contractAddress,$ownerAddress,$spenderAddress,$spenderPrivateKey,$recieverAddress,$tokenAmount);
TransferToken func :-
$obj1->transferToken($contractAddress,$senderAddress,$senderPrivateKey,$recieverAddress,$tokenAmount);
TransferXdc func :-
$obj1->transferXdc($contractAddress,$senderAddress,$senderPrivateKey,$recieverAddress,$xdcAmount);
CreateWallet func:-

$obj3 = new createXDCWallet();
$obj3->createWallet();
?>

```
