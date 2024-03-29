# Android SDK

## XRC20 Token Integration

* An XRC20 token is a blockchain-based asset with similar functionalities to ether; it can hold value and can be sent and received.
* XRC20 tokens are stored and transferred using XDC addresses and transactions. It uses gas to cover transaction fees.

### Read methods

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

### Write methods

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

### AAR/JAR file&#x20;

Add XDC\_SDK to your project:

To add module dependency to your project, follow the steps below :

* Go to file menu — project structure — modules — click ‘+’ — select import Gradle Project — select the sub-module folder (git repo which we create) — select “XDC-sdk“ folder — finish.
* You can see the folder in your android project.
* Now, we have to add Module Dependency in the application project builg.gradle file.
* Put “`implementation project(":xdc_sdk")`“ in dependencies.
* Now, we can access the methods of the XDC-android library in the Android app.

**Accessing methods of XRC20 in our project**

```
XDCClient.getInstance().getTokenInfo(token_address, new TokenDetailCallback() {
                
                @Override
                    public void success(TokenDetailsResponse tokenDetailsResponse)
                    {
                       // you can proceed as you like after getting success response.
                    }
                
                @Override
                public void failure(Throwable t)
                {
                    Toast.makeText(MainActivity.this,t.getMessage(),Toast.LENGTH_LONG).show();
                }

                @Override
                public void failure(String message)
                {
                    Toast.makeText(MainActivity.this,message,Toast.LENGTH_LONG).show();
                }
            });
```

Now, we can interact with the XRC20 read methods.

* `name() → string` Returns the name of the token.

`tokenResponse.getName();`

* &#x20;`balanceOf(address token,address account) → uint256` Returns the number of tokens owned by `account`.

`tokenResponse.getBalance();`

**For write methods, we need to create an instance of XDC and need a token owner private key.**

`Credentials creds = org.web3j.crypto.Credentials.create(PRIVATE_KEY);`

* `transfer(address token, address recipient, uint256 amount)` → Moves tokens from the caller’s account to the recipient. It will return a transaction hash.

`String trasaction_hash = XDCClient.getInstance().TransferXdc(private_key, sender_address, receiver_address, new BigInteger(String.valueOf(token_totransfer), Long.parseLong(gasprice), Long.parseLong(gaslimit;`

* `approve(address token, address spender, uint256 amount)` → Sets amount as the allowance of spender over the caller’s tokens. It will return a transaction hash.

`approved_hash = XDCClient.getInstance().approveXRC20Token(Spender_address, privatekey, allownce_spender, value_approve);`

**To increase Allowance and decrease Allowance, we need an instance of XRC20 and the private key of the owner:**&#x20;

`decreaseAllowance(XDCAccount account, address token, address owner, address spender, uint256 subtractedValue)`\
Automatically decreases the allowance granted to spender by the caller.

It is an alternative to approve.

Emits an Approval event indicating the updated allowance.`approved_hash = XDCClient.getInstance().decreaseAllowance(decrease_owner, decrease_spender, privatekey, decrease_allowance, Spender_address);`

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

### AAR/JAR file

Add XDC\_SDK to your project:

To add module dependency in your project, follow the steps below:

* Go to file menu — project structure — modules — click ‘+’ — select import Gradle Project — select the sub-module folder (git repo which we create) — select “XDC-sdk“ folder — finish.
* You can see the folder in your android project.
* Now, we have to add Module Dependency in the application project builg.gradle file.
* Put “`implementation project(":xdc_sdk")`“ in dependencies.
* Now, we can access the methods of the XDC-android library in the Android app.

**Accessing methods of XRC721 in our project**

```
 XDC721Client.getInstance().getTokenInfo(token_address, new Token721DetailCallback() {
                        @Override
                        public void success(Token721DetailsResponse tokenDetailsResponse) {
                            // success
                        }

                        @Override
                        public void failure(Throwable t) {

                        }

                        @Override
                        public void failure(String message) {
                        // error message

                        }
                    });
                }
                else
                {
                  // error message
                }
            }
        });
```

Now, we can interact with the XRC721 read methods.

* `name() → string` Returns the name of the token.\
  `tokenResponse.getName();`
* `balanceOf(address token,address account) → uint256` Returns the number of tokens owned by `account`.\
  `String balance = XDC721Client.getInstance().getBalance(tokenAddress, ownerAddress);`

**For write methods, we need to create an instance of XDC and we need a token owner private key.**

`Credentials creds = org.web3j.crypto.Credentials.create(PRIVATE_KEY);`

* `transferFrom(address from, address to, uint256 tokenId)` → Transfers the ownership of a given token ID to another address.\
  `String transferFrom = XDC721Client.getInstance().transferfrom(tokenAddress, privatekey, receiverAddress, tokenid);`
* `approve(address to, uint256 tokenId)` → Approves another address to transfer the given token ID The zero address indicates there is no approved address. There can only be one approved address per token at a given time. Can only be called by the token owner or an approved operator.\
  `String approve = XDC721Client.getInstance().approve(tokenAddress, privatekey,String tokenid, receiverAddress);`
* `safetransferFrom(address from, address to, uint256 tokenId)` → Safely transfers the ownership of a given token ID to another address.\
  `String safeTransferFrom = XDC721Client.getInstance().safeTransferfrom(tokenAddress, privatekey, receiverAddress, tokenid);`
* `setApprovalForAll(address to, uint256 tokenId)` → Sets or unsets the approval of a given operator An operator is allowed to transfer all tokens of the sender on their behalf.\
  `String setapproveforall = XDC721Client.getInstance().setApprovalForAll(tokenAddress, privatekey, OperatorAddress, booleanvalue);`
