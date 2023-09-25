# GitHub: python SDK for XDC

### XDC3PYTHON

XDC3PYTHON SDK with support for smart contracts, XRC20 & XRC721.

### Usage

**pip install XDC3PYTHON**

#### This SDK supports the following Read & Write operations:-

* xrc20 methods.
  * Read methods.
    * name(), balanceOf(account), totalSupply(), symbol(), decimals(), allowance(pwner, spender).
  * Write methods.
    * transferXDC(owner,receiver), approve(spender,amount), transferToken(receiver,amount), increaseAllowance(spender, addedValue), decreaseAllowance(spender, subtractedValue), transferFrom(sender, receiver, amount).
* xrc721 methods.
  * Read methods.
    * name(), symbol(), totalsupply(), balanceOf(ownerAddr), ownerOf(tokenId), tokenURI(tokenId), tokenByIndex(index), tokenOfOwnerByIndex(ownerAddress,index), supportInterface(interfaceId), getApproved(tokenId), isApprovedForAll(ownerAddress,spenderAddress).
  * Write methods.
    * setApprovalForAll(spenderAddress, booleanValue), approve(sepnderAddress , tokenId), transferFrom(recipient, tokenId), safeTransferFrom(spender, tokenId).

#### Example for XRC20.

```
from XDC3PYTHON.xrc20 import XRC20

if __name__=="__main__":

    NETWORK_URL = "Your endpoint Url"

    obj = XRC20(NETWORK_URL)

    tokenAddr = input('Enter Token Address: ')
  
    tokenSymbol = obj.name(tokenAddr)
    print(tokenSymbol) 
```

This example returns the name of the specified address.

#### Example for XRC721.

```
from XDC3PYTHON.xrc721 import XRC721

if __name__=="__main__":

    NETWORK_URL = "Your endpoint Url"

    obj = XRC721(NETWORK_URL)

    tokenAddr = input('Enter Token Address: ')
  
    tokenSymbol = obj.name(tokenAddr)
    print(tokenSymbol) 
```

This example returns the symbol of the specified address.

### Transports

**HTTP transport**

### Required Data Types

**Token Address** - `str type` **Account Address** - `str type` **amount** & **tokenId** - `int type`

#### Author

[XDCFoundation](broken-reference)
