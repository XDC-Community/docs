# Account Details

An XDC account is an entity with an XDC balance able to send transactions on the XDC network. Accounts can either be deployed as smart contracts or controlled by users.

### Account Types

XDC has two account types:

* Externally owned: Anyone with private keys can control these accounts.
* Contract: A smart contract controlled by code and deployed on the network.

Both account types can receive, hold, and send XDC tokens, on the one hand, and interact with deployed smart contracts, on the other.

### Key Differences

**Externally owned accounts:**

* Transactions can be sent directly from the account.
* Transactions consist solely of XDC transfers.
* Creating an account costs nothing.

**Contracts:**

* Creating a contract incurs costs since network storage is used in the process.
* Transactions can only be sent in response to received transactions.
* Transactions received by a contract account from an external account trigger a code to run different actions, such as creating a new contract or transferring tokens.

## An Account Examined

XDC accounts have four fields:

* `balance`: The number of tokens owned by the address.
* `nonce`: It shows the number of transactions created and sent from the account and ensures that transactions are processed only once.
* `codeHash`: The code for an account. Contract accounts have programmed code fragments that can perform different operations. Unlike the other account fields, this code, which can never be modified, gets executed if the account receives a message call. All the code fragments are stored under their corresponding hashes in the state database for later retrieval. The hash value is named as a `codeHash`. The codeHash field is the hash of an empty string for externally owned accounts.
* `storageRoot`: Also named as a storage hash. It is a 256-bit hash of the root node that points to the root node in account storage trie.

## Externally Owned Accounts and Key Pairs

An account includes a cryptographic pair of keys: public and private. These keys prevent fraud by ensuring that the authorized sender, and the authorized sender alone, signed a transaction. Since the private key signs transactions, it grants custody over the funds in the associated account. Ownership of cryptocurrency is, at the bottom, just ownership of an account's private key—the funds themselves reside on the ledger.

If, for example, Ana wants to send XDC from her account to Ben’s account, Ana must first create a transaction request and send it to the network for verification. XDC’s reliance on public-key cryptography enables Ana to prove that she originally created the transaction request. In the absence of any cryptographic mechanisms, a bad actor, say, Ernest, can publicly broadcast a request like “transfer10 XDC from Ana’s account to Ernest’s,” and there would be no way to verify the source of the request.

## Creating an XDC Account&#x20;

```
let keyStorage = XDCKeyLocalStorage()
let account = try? XDCAccount.create(keyStorage: keyStorage, keystorePassword: "MY_PASSWORD")
```

Create an instance of XDCClient, which will provide access to a set of functions interacting with the blockchain.

```
guard let clientUrl = URL(string: "https://apothem-or-mainnet-url") else { return }
let client = XDCClient(url: clientUrl)
```

Now, you can interact with the client methods. For example, to get the current gas price, run the following code:

```
client.xdc_gasPrice { (error, currentPrice) in
    print("The current gas price is \(currentPrice)")
}
```

