Brownie is Python-Based framework for developing custom smart contracts on the Blockchain, we will be deploying XRC20 to XDC Network using brownie

Things we need:
  - Python > 3.8
  - eth-brownie

  ##### Brownie works well with Python above 3.8
  
 ```code
  python -m pip install eth-brownie
  python -m pip install -r requirements.txt
  ```
  ![powershell_j6ZGJ6csen](https://user-images.githubusercontent.com/41552663/197033638-5698520b-0c45-46e4-99c7-c40bd584f23b.gif)

  ![powershell_2yD7EobabD](https://user-images.githubusercontent.com/41552663/197037734-13540079-1cbb-4a99-8485-a51e05d72d40.gif)
  
  Will get you the latest eth-brownie version from pypi packages
  
  After installation eth-brownie should be in your terminal enviroment as *brownie*

  Fire up a terminal and type *brownie --help* to make sure everything is good

  ![powershell_i3TJBhkko9](https://user-images.githubusercontent.com/41552663/197038983-2df3513b-6015-47be-b0c9-a7ee2db9aea3.gif)

#### Connecting to XDC Network Using Brownie

Using a suitable RPC address we will be connecting to a node on XDC Network to be use on brownie

We will connect to Testnet using RPC https://apothemxdcpayrpc.blocksscan.io/

```brownie network list``` will print a list of network that we have available and ready to use yet we need to add XDC since it does not come by default in brownie 

To easily connect to XDC Network when using brownie we will be adding it as default in our Brownie Networks enviroment type the following:

```brownie networks add xdc testnet host=https://apothemxdcpayrpc.blocksscan.io/ chainid=51```

![powershell_sCPO8SxO9k](https://user-images.githubusercontent.com/41552663/197041710-8f88be4c-9271-4404-aa64-f7f4126284b7.gif)

### Interacting with XDC Network using Brownie

We our network already added on our brownie list we will proceed to interact with it

Lighting up a terminal type ```brownie console --network tesnet```

![Code_0emPCIYoOP](https://user-images.githubusercontent.com/41552663/197043395-d71887d1-fac6-4cfe-95b5-11a1bef7acbf.gif)

```chain.id``` print us ```51``` letting us know that are already connected to XDC

### Querying Account balances

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

![Code_HfFpNWKCbB](https://user-images.githubusercontent.com/41552663/197049220-d3af6794-59df-4000-97aa-cf01b84c16a4.gif)

Our balance in fact:

![chrome_mT1p7EHfaU](https://user-images.githubusercontent.com/41552663/197049576-0e41dd28-d5be-4635-84e7-a2d1c63f27c0.gif)




  
 Initializing a new Brownie Project

```
brownie init
```

  We will be deploying the following XRC20
  ```solidity
  contract XRC is ERC20 {
      address owner;
	  
	  constructor() {
	    _mint() XRC20
	  }
  }
 ``` 