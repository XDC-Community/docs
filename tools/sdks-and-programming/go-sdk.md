# GO SDK

## XRC20 Token Integration

### How to call functions in Go SDK?

`CreateAccount() → string`\
Returns the Private Key.

`CheckAddress(Private_key string) → string`\
Returns the Address User.

`Name(Token_address string) → string`\
Returns the name of the token.

`Symbol(Token_address string) → string`\
Returns the symbol of the token, usually a shorter version of the name.

`Decimals(Token_address string) → uint8`\
Returns the number of decimals used to get its user representation. For example, if decimals equal 2, a balance of 505 tokens should be displayed to a user as 5,05 (505 / 10 \*\* 2).

Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei.

`Total_supply(Token_address string) → string`\
Returns the number of tokens in existence.

`BalanceOf(Token_address string ,Owner_address string) → string`\
Returns the number of tokens owned by the account.

`Allowance(Token_address string , Owner_address string , Spender_address string) → string`\
Returns the remaining number of tokens that the spender will be allowed to spend on behalf of the owner through `transferFrom`. It is zero by default.

`Approve_(Private_key string, Token_address string,sender_address string,Gas_Price string,Gas_Limit string,Amount string) -> string`\
Pass Private key, Token address, Spender address, Gas Price, Gas Limit. It will return a transaction hash.

`XDCTransfer(Private_key string, To_Address string, Value_ string,gasLimit uint64) -> string`\
Moves XDC from the caller’s account to recipient. It will return a transaction hash.

`TokenTransfer_(Private_key string, Token_address string, sender_address string,Gas_Price string, Gas_Limit string,Tokens_ string) -> string`\
Moves tokens from the caller’s account to the recipient. It will return a transaction hash.

`FromTransfer_(Private_key string, Token_address string,sender_address string,Gas_Price string,Gas_Limit string,Amount string) -> string`\
Pass Private key, Token address, Spender address, Gas Price, Gas Limit and Amount. It will return a transaction hash.

`IncreaseAllowance_(Private_key string, Token_address string,sender_address string,Gas_Price string,Gas_Limit string,Amount string) -> string`\
Automatically increases the allowance granted to spender by the caller.

`DecreaseAllowance_(Private_key string,Token_address string,sender_address string,Gas_Price string, Gas_Limit string, Amount string) -> string`\
Automatically decreases the allowance granted to spender by the caller.

### Example to call functions in Go SDK

Step 1: Clone git repo (go-xdc) in any folder and copy it.

Step 2: Go to that directory where your Golang saves. (go to your go folder).

Step 3: Find SRC in your go folder.

Step 4: Open SRC Folder and pasted your go-xdc.

Use like this in your main package.

```
package main
import(
	"go-xdc/xdcsdk"
	"fmt"
)
func main(){
	Private_key := "8a32103448a851b2fed3e95d2b4fbaa5e564f3b8cc42eac0d3be15a96311f355"
	Token_address := "0xba9d6a36fbc194f5d1aa48a2892ae4bdf6939cb9"
	Owner_address := "0xd7813e7cfdf83d6fa3469d7411b52a50ed2b867f"
	Spender_address := "0xedb472070566e072f3bdaa50cfa076e772135f33"
	Gas_limit :="3000000"
	Gas_Price:= "3500000"
	var Gaslimit_In_Uint uint64
	Gaslimit_In_Uint=3000000

// for account creation
CreateAccount1:=xdcsdk.CreateAccount()
fmt.Println("CreateAccount Private key :",CreateAccount1)

// for check address
CheckAddress1:=xdcsdk.CheckAddress(CreateAccount1)
fmt.Println("User Address :",CheckAddress1)

// for Name
Name1:=xdcsdk.Name(Token_address)
fmt.Println("name :",Name1)

// for Symbol
Symbol1:=xdcsdk.Symbol(Token_address)
fmt.Println("symbol: ",Symbol1)

// for decimal
Decimals1:=xdcsdk.Decimals(Token_address)
fmt.Println("Decimals: ",Decimals1)

// for totalsupply
Total_supply1:=xdcsdk.Total_supply(Token_address)
fmt.Println("Total_supply: ",Total_supply1)

// for Balanceoff
BalanceOf1:=xdcsdk.BalanceOf(Token_address,Owner_address)
fmt.Println("BalanceOf: ",BalanceOf1)

// for Allowance
Allowance1:=xdcsdk.Allowance(Token_address,Owner_address,Spender_address)
fmt.Println("Allowance: ",Allowance1)

// for Approve
Approve_1:=xdcsdk.Approve_(Private_key,Token_address,Spender_address,Gas_Price,Gas_limit,"3")
fmt.Println("Approve_: ",Approve_1)

// for XDC Transfer
XDCTransfer1:=xdcsdk.XDCTransfer(Private_key,Spender_address,"1",Gaslimit_In_Uint)
fmt.Println("XDCTransfer: ",XDCTransfer1)

// for Token Transfer
TokenTransfer_1:=xdcsdk.TokenTransfer_(Private_key,Token_address,Spender_address,Gas_Price,Gas_limit,"5")
fmt.Println("TokenTransfer_: ",TokenTransfer_1)

// for From Transfer
FromTransfer_1:=xdcsdk.FromTransfer_(Private_key,Token_address,Spender_address,Gas_Price,Gas_limit,"1")
fmt.Println("FromTransfer_: ",FromTransfer_1)

// for Increase Allowance
IncreaseAllowance_1:=xdcsdk.IncreaseAllowance_(Private_key,Token_address,Spender_address,Gas_Price,Gas_limit,"1")
fmt.Println("IncreaseAllowance_1: ",IncreaseAllowance_1)

// for Decrease Allowance
DecreaseAllowance_1:=xdcsdk.DecreaseAllowance_(Private_key,Token_address,Spender_address,Gas_Price,Gas_limit,"1")
fmt.Println("DecreaseAllowance_: ",DecreaseAllowance_1)

}
```

## **XRC721 Token Integration**

### **How to call functions in Go SDK?**

`OwnerOff_(tokenAddress string , TokenID string) → common.Address`\
Returns the owner's address.

`IsApprovedForAll_(tokenAddress string ,owneraddress string, operatoraddress string) → bool`\
Returns the True or false.

`Name_(tokenAddress string) → string`\
Returns the name of the token.

`Symbol_(tokenAddress string) → string`\
Returns the symbol of the token, usually a shorter version of the name.

`TokenURI_(tokenAddress string, TokenID string) → string`\
Return the Token URL.

`TokenOfOwnerByIndex_(tokenAddress string, IndexNO string, OwnerAddress string) → string`\
Returns the symbol of the token, usually a shorter version of the name.

`GetApproved_(tokenAddress string, TokenID string) → common.Address`\
Return True or False.

`TotalSupply_(tokenAddress string) → string`\
Returns the number of tokens in existence.

`BalanceOff_(tokenAddress string , Owneraddress string) → string`\
Returns the number of tokens owned by the account.

`SupportInterface_(tokenAddress string, InterfaceID int) → bool`\
Return True or False.

`Approve_(Private_key string , Token_address string,sender_address string,Gas_Price string,Gas_Limit string,TokenId string ) -> string`\
Pass Private key, Token address, Sender address, Gas Price, Gas Limit and Token id. It will return a transaction hash.

`SafeTransfer_(Private_key string,Token_address string ,sender_address string ,Gas_Price string ,Gas_Limit string , TokenId string) -> string`\
Used for the safe transfer of token ownership.

`TransferFrom_(Private_key string ,Token_address string ,sender_address string, Gas_Price string,Gas_Limit string ,TokenId string) -> string`\
Used to transfer token ownership.

`Setapprovalforall_(Private_key string ,Token_address string,sender_address string,Gas_Price string,Gas_Limit string,boolvalue string) -> string`\
Pass Private key, Token address, Sender address, Gas Price, Gas Limit and Bool value. It will return a transaction hash.

**NOTE** - pass boolvalue in only 0 or 1.

0- False

1-True

### **Example to call functions in Go SDK**

Step1: Clone git repo (XDC) in any folder and copy it.

Step2: Go to that directory where your Golang is saved (go to your Go folder).

Step3: Find SRC in your Go folder.

Step4: Open SRC Folder and paste your XDC.

Use it in your main package as:

```
package main
import (
	"fmt"
	"XDC/XRC721"
)
func main(){
	tokenAddress := "0x8af9e0c04f1a14d4c2d13c577d81d86b3035783c"
	Token_ID:= "21"
	OwnerAddress:= "0x517b6Be05e5C50df6876906909c23ad130476Cc7"
	OperatorAddress:= "0xd7813e7cfdf83d6fa3469d7411b52a50ed2b867f"
	Indexno:= "0"
	var Interface_id int 
	Interface_id=0x80ac58cd
	
//	Owner OFF

OwnerOff__:=XRC721.OwnerOff_(tokenAddress,Token_ID)
fmt.Println("Owner OFF method : ",OwnerOff__)

//IsApprovedForAll

IsApprovedForAll__:=XRC721.IsApprovedForAll_(tokenAddress,OwnerAddress,OperatorAddress)
fmt.Println("Is approval for all :",IsApprovedForAll__)

// Name

Name__:=XRC721.Name_(tokenAddress)
fmt.Println("Name :",Name__)

//Symbol

Symbol__:=XRC721.Symbol_(tokenAddress)
fmt.Println("Symbol :", Symbol__)

//TokenURI

TokenURI__:=XRC721.TokenURI_(tokenAddress,Token_ID)
fmt.Println("Token URI :",TokenURI__)

//TokenOfOwnerByIndex

TokenOfOwnerByIndex__:=XRC721.TokenOfOwnerByIndex_(tokenAddress,Indexno,OwnerAddress)
fmt.Println("TokenOfOwnerByIndex :",TokenOfOwnerByIndex__)

//GetApproved

GetApproved__:=XRC721.GetApproved_(tokenAddress,Token_ID)
fmt.Println("GetApproved :",GetApproved__)

//TotalSupply

TotalSupply__:=XRC721.TotalSupply_(tokenAddress)
fmt.Println("TotalSupply :",TotalSupply__)

//BalanceOff

BalanceOff__:=XRC721.BalanceOff_(tokenAddress,OwnerAddress)
fmt.Println("BalanceOff :",BalanceOff__)

//SupportInterface

SupportInterface__:=XRC721.SupportInterface_(tokenAddress,Interface_id)
fmt.Println("SupportInterface_ :",SupportInterface__)

//---------------------------------------------------------------------------------

// Write Methods

Private_key:="07d2fb9a1f3a912000bbf9215ee0815a969b1d49e7e4c5ec94600ae2dfcfa4ce"
Spender_address_for_Write_op:="0xd7813e7cfdf83d6fa3469d7411b52a50ed2b867f"
Token_address_for_write_op:="0x301815025bd43513ec36b6c6159ebaa8dff5e36d"
Token_id_for_write_op:="21"
Gas_Limit:="3000000"
Gas_Price:="3500000"
Set_approval:="0"

// Approve 

Approve__:=XRC721.Approve_(Private_key,Token_address_for_write_op,Spender_address_for_Write_op,Gas_Price,Gas_Limit,Token_id_for_write_op)
fmt.Println("Approve_ :",Approve__)

//SafeTransfer

SafeTransfer__:=XRC721.SafeTransfer_(Private_key,Token_address_for_write_op,Spender_address_for_Write_op,Gas_Price,Gas_Limit,Token_id_for_write_op)
fmt.Println("SafeTransfer_: ",SafeTransfer__)

//TransferFrom

TransferFrom__:=XRC721.TransferFrom_(Private_key,Token_address_for_write_op,Spender_address_for_Write_op,Gas_Price,Gas_Limit,Token_id_for_write_op)
fmt.Println("TransferFrom_ :",TransferFrom__)

//setapproovalforall

Setapprovalforall__:=XRC721.Setapprovalforall_(Private_key,Token_address_for_write_op,Spender_address_for_Write_op,Gas_Price,Gas_Limit,Set_approval)
fmt.Println("setappforall__",Setapprovalforall__)

}
```
