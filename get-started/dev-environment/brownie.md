Brownie is Python-Based framework for developing custom smart contracts on the Blockchain, we will be deploying XRC20 to XDC Network using brownie

Things we need:
  - Python > 3.8
  - eth-brownie

  ##### Brownie works well with Python above 3.8
  
 ```code
  python -m pip install eth-brownie
  python -m pip install -r requirements.txt
  ```
  Will get you the latest eth-brownie version from pypi packages

  ![powershell_j6ZGJ6csen](https://user-images.githubusercontent.com/41552663/197033638-5698520b-0c45-46e4-99c7-c40bd584f23b.gif)

  ![powershell_2yD7EobabD](https://user-images.githubusercontent.com/41552663/197037734-13540079-1cbb-4a99-8485-a51e05d72d40.gif)

#### Connecting to XDC Network Using Brownie

Using a suitable RPC address we will be connecting to a node on XDC Network to be use on brownie

We will connect to Testnet using RPC https://apothemxdcpayrpc.blocksscan.io/


  
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