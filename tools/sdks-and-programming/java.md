# Java SDK

## JAR File

Add XDCJava SDK to your project:

To add module dependency to your project, follow the steps below :

* Go to file menu — project structure — modules — click ‘+’ — select import Gradle Project — select the sub-module folder (git repo which we create) — select “XDC“ folder — finish.
* You can see the folder in your android/java project.
* Now, we have to add Module Dependency in the application project builg.gradle file.
* Put “implementation project (":xdc\_sdk")“ in dependencies.
* Now, we can access the methods of the XDC-android library in the Android app.

Accessing methods of XRC20 in our project.

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

`name() → string` Returns the name of the token.

`tokenResponse.getName();`

`balanceOf(address token,address account) → uint256` Returns the number of tokens owned by the account.

`tokenResponse.getBalance();`

For write methods, we need to create an instance of XDC Client and need a token owner private key.

`Credentials creds = org.web3j.crypto.Credentials.create(PRIVATE_KEY);`

`transfer(address token, address recipient, uint256 amount) →` Moves tokens from the caller’s account to the recipient. It will return a transaction hash.

`String trasaction_hash = XDCClient.getInstance().TransferXdc(private_key, sender_address, receiver_address, new BigInteger(String.valueOf(token_totransfer), Long.parseLong(gasprice), Long.parseLong(gaslimit;`

`approve(address token, address spender, uint256 amount) →` Sets amount as the allowance of spender over the caller’s tokens. It will return a transaction hash.

`approved_hash = XDCClient.getInstance().approveXRC20Token(Spender_address, privatekey, allownce_spender, value_approve);`

To increase Allowance and decrease Allowance, we need an instance of XRC20 and the private key of the owner:

`decreaseAllowance(XDCAccount account, address token, address owner, address spender, uint256 subtractedValue)`

Automatically decreases the allowance granted to spender by the caller.

It is an alternative to approve.

Emits an Approval event indicating the updated allowance.

`approved_hash = XDCClient.getInstance().decreaseAllowance(decrease_owner, decrease_spender, privatekey, decrease_allowance, Spender_address);`

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
