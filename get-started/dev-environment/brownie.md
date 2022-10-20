Brownie is Python-Based framework for developing custom smart contracts on the Blockchain, we will be deploying XRC20 to
XDC Network using brownie

Things we need:
  - Python > 3.8
  - eth-brownie
  
  '''code''
  python -m pip install eth-brownie

  ![powershell_j6ZGJ6csen](https://user-images.githubusercontent.com/41552663/197033638-5698520b-0c45-46e4-99c7-c40bd584f23b.gif)
  
  python -m pip install -r requirements.txt
  
  Brownie configuration
  
  We will be deploying the following XRC20
  ```solidity
  contract XRC is ERC20 {
      address owner;
	  
	  constructor() {
	    _mint() XRC20
	  }
  }
 ``` 