# Brownie

Brownie is Python-Based framework for developing custom smart contracts on the Blockchain, we will be deploying XRC20 to XDC Network using brownie

Things we need:

* Python > 3.8
* eth-brownie

**Brownie works well with Python above 3.8**

```
 python -m pip install eth-brownie
```

![powershell\_j6ZGJ6csen](https://user-images.githubusercontent.com/41552663/197033638-5698520b-0c45-46e4-99c7-c40bd584f23b.gif)

![powershell\_2yD7EobabD](https://user-images.githubusercontent.com/41552663/197037734-13540079-1cbb-4a99-8485-a51e05d72d40.gif)

Will get you the latest eth-brownie version from pypi packages

After installation eth-brownie should be in your terminal enviroment as _brownie_

Fire up a terminal and type _brownie --help_ to make sure everything is good

![powershell\_i3TJBhkko9](https://user-images.githubusercontent.com/41552663/197038983-2df3513b-6015-47be-b0c9-a7ee2db9aea3.gif)

**Connecting to XDC Network Using Brownie**

Using a suitable RPC address we will be connecting to a node on XDC Network to be use on brownie

We will connect to Testnet using RPC https://apothemxdcpayrpc.blocksscan.io/

`brownie network list` will print a list of network that we have available and ready to use yet we need to add XDC since it does not come by default in brownie

To easily connect to XDC Network when using brownie we will be adding it as default in our Brownie Networks enviroment type the following:

`brownie networks add xdc testnet host=https://apothemxdcpayrpc.blocksscan.io/ chainid=51`

![powershell\_sCPO8SxO9k](https://user-images.githubusercontent.com/41552663/197041710-8f88be4c-9271-4404-aa64-f7f4126284b7.gif)

#### Interacting with XDC Network using Brownie

We our network already added on our brownie list we will proceed to interact with it

Lighting up a terminal type `brownie console --network tesnet`

![Code\_0emPCIYoOP](https://user-images.githubusercontent.com/41552663/197043395-d71887d1-fac6-4cfe-95b5-11a1bef7acbf.gif)

`chain.id` print us `51` letting us know that are already connected to XDC

#### Querying Account balances

We will add an account to query the balance we have available on XDC

```
>>> from web3 import Account
>>> account = accounts.add(Account.create().key)
>>> account.address
'0x4D0928Df315D816d9a6540CF79D7c547C5294eA8'
>>> account.balance()
100000000000000000000
>>>
```

![Code\_HfFpNWKCbB](https://user-images.githubusercontent.com/41552663/197049220-d3af6794-59df-4000-97aa-cf01b84c16a4.gif)

Our balance in fact:

![chrome\_mT1p7EHfaU](https://user-images.githubusercontent.com/41552663/197049576-0e41dd28-d5be-4635-84e7-a2d1c63f27c0.gif)

### Initializing a new Brownie Project

Using `brownie init` will output us a project structure containing folder to initialize our new project (tokens, etc)

![Code\_jgK7UqBOBb](https://user-images.githubusercontent.com/41552663/197054279-45eb9155-7582-4619-956c-f956b56aae3c.gif)

**Transfering XDC between Accounts using Brownie**

below we are transfering some XDC main token between accounts using browning

![Code\_XJR9qIggCn](https://user-images.githubusercontent.com/41552663/197057983-92494e80-e1a1-413f-8332-e9e92c5e9d26.gif)

![chrome\_elStq0tBGn](https://user-images.githubusercontent.com/41552663/197058096-ea984de5-dec7-4fe8-896d-b0458988001d.gif)

#### Compiling a XRC20 & deploying to the network

We will be deploying the following XRC20

```solidity
pragma solidity >=0.8.0 <0.9.0;
import "./XRC20.sol";
address constant owner = 0x4D0928Df315D816d9a6540CF79D7c547C5294eA8;
contract BlastToken is XRC20Token {
  constructor() XRC20Token('Blaster Token', 'Blast', 18, 1000*10**18) {}
}
```

![Code\_2zkYkM5fdW](https://user-images.githubusercontent.com/41552663/197070060-13cd5b75-3159-42dc-8088-3dc3c49c828d.png)

![Code\_tZNY8mdGRn](https://user-images.githubusercontent.com/41552663/197070549-10b2103e-c70e-42dc-b452-c279623accba.gif)

Deployed Token

![chrome\_hHyRarZ9m5](https://user-images.githubusercontent.com/41552663/197072906-23aa7bc4-e090-4b1c-8c82-74e906920e3c.png)

After deployment the we can see "Blast Token" on-chain https://explorer.apothem.network/tokens/xdcaccf490aea9a2c17d60a62672ee519e61b5a1ec5

#### Adding the token to XDC Pay & transfering

![chrome\_pZKaMfMkQ0](https://user-images.githubusercontent.com/41552663/197070978-70267fc6-ed58-4118-bacd-4264eea7abc1.gif)

![chrome\_5QXMaeYvoG](https://user-images.githubusercontent.com/41552663/197072620-fb1c9fa0-1055-4048-b298-175ad079ca3e.gif)

### Some transactions done

https://explorer.apothem.network/txs/0x23bbf8d8f84bbfdc85cce7493cb388e968f0aed3715b95fa81d3ac7c1614d004#overview

https://explorer.apothem.network/txs/0x2acf5757d236580c98b0c7e4ec864f700964ffa0cf3fcf7fe6130fe2a77a8d0c#overview
