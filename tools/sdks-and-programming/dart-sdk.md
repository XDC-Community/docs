# DART SDK

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

### Usage

Add XDC3DART = "1.0.0" to your `pubspec.yaml`:

Run the following command to install all the packages and dependencies:

```
dart pub get
```

**Create an instance of XRC20**

```
const String rpcUrl = 'https://rpc.apothem.network/';
const String wsUrl = 'wss://ws.apothem.network/';

final client = Web3Client(rpcUrl, Client(), socketConnector: () {
  return IOWebSocketChannel.connect(wsUrl).cast<String>();
});
```

Now, you can interact with the XRC20 read methods.

* `name() → string` Returns the name of the token.

```
final tokenName = contract.function('name');
    final name =
        await client.call(contract: contract, function: tokenName, params: []);
```

* `balanceOf(address token,address account) → BigInt` Returns the amount of tokens owned by `account`.

```
final tokenBalanceOf = contract.function('balanceOf');
          final balanceOf = await client.call(
                 contract: contract, function: tokenBalanceOf, params: [ownerAddress]);

```

For write methods:

* `transfer(address token, address recipient, BigInt amount)` → Moves amount tokens from the caller’s account to recipient. It will return a transaction hash.

```
final transfer = await Transaction.callContract(
        contract: contract,
        function: tokenTransfer,
        parameters: [receiver,transfer_value]);

    final transferDetails = await client.sendTransaction(credentials, transfer,
        chainId: null, fetchChainIdFromNetworkId: true);
```

* `approve(address token, address spender, BigInt amount)` → Sets amount as the allowance of spender over the caller’s tokens. It will return a transaction hash.

```
final approve = await Transaction.callContract(
        contract: contract,
        function: tokenApprove,
        parameters: [spender, BigInt.from(approve_value)]);
    final approvel = await client.sendTransaction(credentials, approve,
        chainId: null, fetchChainIdFromNetworkId: true);
```

For `increaseAllowance` we need an instance of XRC20 and the private key of the owner

`increaseAllowance(XifninAccount account, address token, address owner, address spender, BigInt increase_amount)`

For `decreaseAllowance` we need an instance of XRC20 and the private key of the owner

`decreaseAllowance(XifninAccount account, address token, address owner, address spender, BigInt decrease_amount)`
