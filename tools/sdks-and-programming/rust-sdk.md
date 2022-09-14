# Rust SDK

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

Add web3 = "0.17.0" to your `Cargo.toml`:

```
cargo init
```

```
cargo run
```

**Create an instance of XRC20**

```
let websocket = web3::transports::WebSocket::new(&env::var("APOTHEM_ADDRESS").unwrap()).await?;
//APOTHEM_ADDRESS= wss://ws.xinfin.network
```

Now, you can interact with the XRC20 read methods.

* `name() → string` Returns the name of the token.

```
let token_name: String = token_contract.query("name", (), None, Options::default(), None)
        .await
        .unwrap();
```

* `balanceOf(address token,address account) → uint256` Returns the amount of tokens owned by `account`.

```
let balanceof: U256 = token_contract.query("balanceOf", owner_addr, None, Options::default(), None)
        .await
        .unwrap();
```

For write methods, we need to create an instance of XDC-Client and token owner's private key.

```
let websocket = web3::transports::WebSocket::new(&env::var("APOTHEM_ADDRESS").unwrap()).await?;
//APOTHEM_ADDRESS= wss://ws.xinfin.network
let signed_transaction = web3s.accounts().sign_transaction(transact_obj, &private_key)
        .await
        .unwrap();
```

* `transfer(address token, address recipient, uint256 amount)` → Moves amount tokens from the caller’s account to recipient. It will return a transaction hash.

```
let transact_obj = TransactionParameters {nonce: Some(nonce),
        to: Some(contract_addr),
        gas_price: Some(gas_price),
        gas: out_gas_estimate,
        data: Bytes(data),
        ..Default::default()
```

* `approve(address token, address spender, uint256 amount)` → Sets amount as the allowance of spender over the caller’s tokens. It will return a transaction hash.

```
let transact_obj = TransactionParameters {nonce: Some(nonce),to: Some(contract_addr),gas_price: Some(gas_price),
        gas: out_gas_estimate,
        data: Bytes(data),..Default::default()};
    // println!("transact_obj {:?}", transact_obj);
    let private_key = SecretKey::from_str(&env::var("private_key").unwrap()).unwrap();
    let signed_transaction = web3s.accounts().sign_transaction(transact_obj, &private_key)
        .await
        .unwrap();
```

For `increaseAllowance` and `decreaseAllowance` we need an instance of XRC20 and private key of owner:

`decreaseAllowance(XifninAccount account, address token, address owner, address spender, uint256 subtractedValue)`\
Automatically decreases the allowance granted to spender by the caller. This is an alternative to approve.

Emits an Approval event indicating the updated allowance.

```
let result = web3s.eth().send_raw_transaction(signed_transaction.raw_transaction)
        .await
        .unwrap();
```
