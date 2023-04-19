# iOS Swift SDK

### Requirements

#### Installation

There are multiple possibilities to install XDC iOS SDK on your project or machine, depending on your needs and preferences.

XDC3Swift is available through [CocoaPods](https://cocoapods.org/). To install it, simply add the following line to your Podfile:

```
pod 'XDC3Swift'
```

bash

```
$ pod install
```

Ruby

```
pod 'XDC’
```

### Getting Started

Create an instance of XDCAccount with an XDCKeyStorage provider. This provides a wrapper around your key for use.

Swift

```
Import XDC3Swift
```

### Creating an XDC Account&#x20;

```
let keyStorage = XDCKeyLocalStorage()
let account = try? XDCAccount.create(keyStorage: keyStorage, keystorePassword: "MY_PASSWORD")
```

Create an instance of XDCClient. It will provide you access to a set of functions interacting with the blockchain.

```
guard let clientUrl = URL(string: "https://apothem-or-mainnet-url") else { return }
let client = XDCClient(url: clientUrl)
```

You can then interact with the client methods, such as to get the current gas price:

```
client.eth_gasPrice { (error, currentPrice) in
    print("The current gas price is \(currentPrice)")
}
```

### Creating an instance of XRC20

```
let xdcClient = XRC20.init(client: XDCClient(url: clientUrl!))
```

Now, we can interact with the XRC20 read methods.

* `name() → string` Returns the name of the token.

```
xdcClient.name(tokenContract: XDCAddress("Token address")) { (err, name) in
                print("Name of token : \(name!)")
        }
```

Transfer XDC For transferring XDC from one account to another, we must have the private key of the sender's address.

```
let account = try! XDCAccount.init(keyStorage: XDCPrivateKeyStore(privateKey: "privateKey"))
```

We need to create an instance of XDCTransaction with values we want to send to the account.

```
let tx = XDCTransaction(from: nil, to: XDCAddress(xdcAddress), value: BigUInt(value), data: nil, nonce: 3, gasPrice: BigUInt(4000004), gasLimit: BigUInt(50005), chainId: 51)
```

Now, we need to call the eth\_sendRawTransaction method.

```
client.eth_sendRawTransaction(tx, withAccount: self.account!) { (err, tx) in
     print(tx ?? "no tx")
```

We will receive one txHash which will include all data of the transaction.

### Data types <a href="#data-types" id="data-types"></a>

The library provides some types and helpers to make interacting with web3 and Ethereum easier.

* `XDCAddress`: For the representation of addresses, including checksum support.
* `BigInt` and `BigUInt`: Using \[BigInt]\(https://github.com/attaswift/BigInt) library
* `XDCBlock`: Represents the block, either number of RPC-specific definitions like 'Earliest' or 'Latest'
* `XDCTransaction`: Wraps a transaction. Encoders and decoders can work with it to generate proper `data` fields.

### Conversion from and to Foundation types <a href="#conversion-from-and-to-foundation-types" id="conversion-from-and-to-foundation-types"></a>

All extensions are namespaced under `<type>`.web3. So for example, to convert an `Int` to a hex string:`1let str = 100 2let xdcstr = str.web3.xdcString`

#### Supported conversions: <a href="#supported-conversions" id="supported-conversions"></a>

* Convert from hex byte string ("0xabc") to \``Data`\`
* Convert from hex byte string ("0xabc") to \``Int`\`
* Convert from hex byte string ("0xabc") to \``BigUInt`\`
* Convert `String`, `Int`, `BigUInt`, `Data` to a hex byte string ("0xabc")
* Add or remove ‘xdc’ prefixes when working with \`String\`

### XRC20 <a href="#xrc20" id="xrc20"></a>

We support querying XRC20 token data via the \`XRC20\` struct. Calls allow to:

* name()
* symbol()
* decimals()
* totalSupply()
* balanceOf()
* transfer()
* transferFrom()
* approve()
* allowance()

### Dependencies

We built this to be as lightweight as possible. However, there's a couple of reliable C libraries you will find packaged with this framework:

* **keccak-tiny:** An implementation of the FIPS-202-defined SHA-3 and SHAKE functions in 120 cloc (156 lines).
  * [GitHub - coruus/keccak-tiny: A tiny implementation of SHA-3, SHAKE, Keccak, and sha3sum](https://github.com/coruus/keccak-tiny)
* **Tiny AES:** A small and portable implementation of the AES ECB, CTR and CBC encryption algorithms.
  * [GitHub - kokke/tiny-AES-c: Small portable AES128/192/256 in C](https://github.com/kokke/tiny-AES-c)
* **Secp256k1.swift:**
  * [GitHub - Boilertalk/secp256k1.swift: secp256k1 bindings for swift. Cocoapods, Carthage and SPM support. Linux support.](https://github.com/Boilertalk/secp256k1.swift)

We also use Apple's own CommonCrypto (via [GitHub - sergejp/CommonCrypto: CommonCrypto module wrapper project for Xcode 8 and Swift 3](https://github.com/sergejp/CommonCrypto) method) and BigInt ([GitHub - attaswift/BigInt: Arbitrary-precision arithmetic in pure Swift](https://github.com/attaswift/BigInt)) via CocoaPod dependency.

## XRC20 Token Integration

* An XRC20 token is a blockchain-based asset with similar functionalities to ether; it can hold value and be sent and received.
* XRC20 tokens are stored and transferred using XDC addresses and transactions. It uses gas to cover transaction fees.

### XRC20 Token

#### Read methods

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

#### Write methods

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

## **XRC721 Token Integration**

**What is XRC721 Token?**&#x20;

The XRC-721 introduces a standard for NFT. In other words, this type of token is unique and can have a different value than other tokens from the same Smart Contract, which may be due to its age, rarity or even its visual.

All NFTs have a uint256 variable called `tokenId`. So, for any XRC721 contract, the pair contract address and uint256 `tokenId` must be globally unique.

### **Read Methods**

`name() → string`\
Returns the name of the token.

`symbol() → string`\
Returns the symbol of the token, usually a shorter version of the name.

`totalSupply() → uint256`\
Gets the total amount of tokens stored by the contract.

`balanceOf(address account) → uint256`\
Returns the number of NFTs in the owner's account.

`ownerOf(tokenId) → address`\
Returns the owner of the NFT specified by `tokenId`.

`tokenURI(uint256 tokenId) → string`\
Returns the URI for a given `tokenID`. May return an empty string.

`tokenByIndex(uint256 index) → uint256`\
Gets the token ID at a given index of all the tokens in the contract. Reverts if the index is greater or equal to the total number of tokens.

`tokenOfOwnerByIndex(address owner, uint256 index) → uint256`\
Gets the token ID at a given index of the tokens list of the requested owner.

`supportInterface(tokenId) → bool`\
Returns true if the contract implements the interface defined by `interfaceId`.&#x20;

`getApproved(tokenId) → address`\
Gets the approved address for a token ID or zero if no address is set. Reverts if the token ID does not exist.

`isApprovedForAll (address owner, address operator) → bool`\
Tells whether an operator is approved by a given owner.

### **Write methods**

`transferFrom(address from, address to, uint256 tokenId)`\
Transfers the ownership of a given token ID to another address.

`safeTransferFrom(address from, address to, uint256 tokenId)`\
Safely transfers the ownership of a given token ID to another address**.**

`setApprovalForAll(address operator, bool approved)`\
Sets or unsets the approval of a given operator. An operator is allowed to transfer all tokens of the sender on their behalf.

`approve(address to, uint256 tokenId)`\
Approves another address to transfer the given token ID. The zero address indicates there is no approved address. There can only be one approved address per token at a given time. It can only be called by the token owner or an approved operator.

**Every XRC-721 contract must implement the** `XRC721` **and** `XRC165` **interfaces.**

### **XRC721 Standard**

/// @notice Count all NFTs assigned to an owner

/// @dev NFTs assigned to the zero address are considered invalid, and this

/// function throws for queries about the zero address.

/// @param \_owner An address for whom to query the balance

/// @return The number of NFTs owned by `_owner`, possibly zero function balanceOf(address \_owner) external view returns (uint256);

/// @notice Find the owner of an NFT

/// @dev NFTs assigned to zero address are considered invalid, and queries

/// about them do throw.

/// @param \_tokenId The identifier for an NFT

/// @return The address of the owner of the NFT function ownerOf(uint256 \_tokenId) external view returns (address);

/// @notice Transfers the ownership of an NFT from one address to another address

/// @dev Throws unless `msg.sender` is the current owner, an authorized

/// operator, or the approved address for this NFT. Throws if `_from` is

/// not the current owner. Throws if `_to` is the zero address. Throws if

/// `_tokenId` is not a valid NFT. When transfer is complete, this function

/// checks if `_to` is a smart contract (code size > 0). If so, it calls

/// `onERC721Received` on `_to` and throws if the return value is not

///`bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`

/// @param \_from The current owner of the NFT

/// @param \_to The new owner /// @param \_tokenId The NFT to transfer

/// @param data Additional data with no specified format, sent in call to `_to` function safeTransferFrom(address \_from, address \_to, uint256 \_tokenId, bytes data) external payable;

/// @notice Transfers the ownership of an NFT from one address to another address /// @dev This works identically to the other function with an extra data parameter, /// except this function just sets data to "".

/// @param \_from The current owner of the NFT

/// @param \_to The new owner

/// @param \_tokenId The NFT to transfer function safeTransferFrom(address \_from, address \_to, uint256 \_tokenId) external payable;

/// @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE

/// TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE

/// THEY MAY BE PERMANENTLY LOST

/// @dev Throws unless `msg.sender` is the current owner, an authorized

/// operator, or the approved address for this NFT. Throws if `_from` is

/// not the current owner. Throws if `_to` is the zero address. Throws if

/// `_tokenId` is not a valid NFT.

/// @param \_from The current owner of the NFT

/// @param \_to The new owner

/// @param \_tokenId The NFT to transfer function transferFrom(address \_from, address \_to, uint256 \_tokenId) external payable;

/// @notice Change or reaffirm the approved address for an NFT

/// @dev The zero address indicates there is no approved address.

/// Throws unless `msg.sender` is the current NFT owner, or an authorized

/// operator of the current owner.

/// @param \_approved The new approved NFT controller

/// @param \_tokenId The NFT to approve function approve(address \_approved, uint256 \_tokenId) external payable;

/// @notice Enable or disable approval for a third party ("operator") to manage

/// all of `msg.sender`'s assets

/// @dev Emits the ApprovalForAll event. The contract MUST allow

/// multiple operators per owner.

/// @param \_operator Address to add to the set of authorized operators

/// @param \_approved True if the operator is approved, false to revoke approval function setApprovalForAll(address \_operator, bool \_approved) external;

/// @notice Get the approved address for a single NFT

/// @dev Throws if `_tokenId` is not a valid NFT.

/// @param \_tokenId The NFT to find the approved address for

/// @return The approved address for this NFT, or the zero address if there is none function getApproved(uint256 \_tokenId) external view returns (address);

/// @notice Query if an address is an authorized operator for another address

/// @param \_owner The address that owns the NFTs

/// @param \_operator The address that acts on behalf of the owner

/// @return True if `_operator` is an approved operator for `_owner`, false otherwise function isApprovedForAll(address \_owner, address \_operator) external view returns (bool); }

interface XRC165 {

/// @notice Query if a contract implements an interface

/// @param interfaceID The interface identifier, as specified in ERC-165

/// @dev Interface identification is specified in ERC-165. This function

/// uses less than 30,000 gas.

/// @return `true` if the contract implements `interfaceID` and

/// `interfaceID` is not 0xffffffff, `false` otherwisefunction supportsInterface(bytes4 interfaceID) external view returns (bool);

}

### &#x20;**XRC721 Metadata**

@notice An abbreviated name for NFTs in this contract function name() external view returns (string \_name);

@notice A descriptive name for a collection of NFTs in this contract function symbol() external view returns (string \_symbol);

/// @notice A distinct Uniform Resource Identifier (URI) for a given asset.

/// @dev Throws if `_tokenId` is not a valid NFT. URIs are defined in RFC

/// 3986. The URI may point to a JSON file that conforms to the "ERC721

/// Metadata JSON Schema". function tokenURI(uint256 \_tokenId) external view returns (string);

### &#x20;**XRC721 Enumerable**

/// @notice Count NFTs tracked by this contract

/// @return A count of valid NFTs tracked by this contract, where each one of

/// them has an assigned and queryable owner not equal to the zero address function totalSupply() external view returns (uint256);

/// @notice Enumerate valid NFTs

/// @dev Throws if `_index` >= `totalSupply()`.

/// @param \_index A counter less than `totalSupply()`

/// @return The token identifier for the `_index`th NFT,

/// (sort order not specified) function tokenByIndex(uint256 \_index) external view returns (uint256);

/// @notice Enumerate NFTs assigned to an owner

/// @dev Throws if `_index` >= `balanceOf(_owner)` or if

/// `_owner` is the zero address, representing invalid NFTs.

/// @param \_owner An address where we are interested in NFTs owned by them

/// @param \_index A counter less than `balanceOf(_owner)`

/// @return The token identifier for the `_index`th NFT assigned to `_owner`,

/// (sort order not specified) function tokenOfOwnerByIndex(address \_owner, uint256 \_index) external view returns (uint256);

### &#x20;**For calling XRC721 read methods**

```
 var client: XDCClient!
    var xrc721: XRC721!
    var xrc721Metadata : XRC721Metadata!
    var xrc721Enumerable : XRC721Enumerable!
    
    self.client = XDCClient(url: URL(string: "rpc url")!)
    self.xrc721 = XRC721(client: client)
    self.xrc721Metadata = XRC721Metadata(client: client)
    self.xrc721Enumerable = XRC721Enumerable(client: client)
```

* To call the `name` of the token

```
xrc721Metadata.name(contract: address) { (error, name) in print(name) }
```

* To call `totalSupply` of token

```
xrc721Enumerable.totalSupply(contract: address) { (error, supply) in print(supply) }
```

### **For using XRC721 write methods**

We need to have the private key of the owner to perform write methods. We need to create an instance of XDCAccount to use our private key.

```
let account = try! XDCAccount.init(keyStorage: XDCPrivateKeyStore(privateKey: "your private key"))
```

&#x20;`safeTransferFrom`: It will change ownership of the token.

```
let function = XRC721Functions.safeTransferFrom(contract: XDCAddress("tokenAddress"), sender: XDCAddress("senderAddress"), to: XDCAddress("toAddress"), tokenId: tokenId)
        let transaction = try? function.transaction(gasPrice: 3500000, gasLimit: 3000000)
        self.client.eth_sendRawTransaction(transaction!, withAccount: self.account!) { (err, txhash) in
            print(txhash!)
    }
```

It will return a transaction hash that contains the details of the transaction.

#### Author

XDCFoundation, [XFLW@xinfin.org](mailto:XFLW@xinfin.org)

#### License

XDC3Swift is available under the MIT license. See the LICENSE file for more info.
