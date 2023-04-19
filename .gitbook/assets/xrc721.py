from web3 import Web3
from web3._utils.encoding import (
    hexstr_if_str,
    to_bytes,
)


# xrc721 abi.json
xrc721abi = "[{\"constant\":true,\"inputs\":[{\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"from\",\"type\":\"address\"},{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"owner\",\"type\":\"address\"},{\"name\":\"index\",\"type\":\"uint256\"}],\"name\":\"tokenOfOwnerByIndex\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"from\",\"type\":\"address\"},{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"index\",\"type\":\"uint256\"}],\"name\":\"tokenByIndex\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"from\",\"type\":\"address\"},{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"tokenId\",\"type\":\"uint256\"},{\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom1\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_tokenId\",\"type\":\"uint256\"},{\"name\":\"_uri\",\"type\":\"string\"}],\"name\":\"mint\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"owner\",\"type\":\"address\"},{\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"symbol\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"}]"


# This is a class which consists all the methods as per XRC721 standards.

class XRC721:

    def __init__(self,rpcUrl):
        self.rpcUrl = rpcUrl

    # connection to network.

    def getConnection(self):
        w3 = Web3(Web3.HTTPProvider(self.rpcUrl))
        return w3
    
    # get contract Instance.

    def getContractInstance(self, tokenAddr):
        contractInstance = self.getConnection().eth.contract(address=tokenAddr, abi=xrc721abi)
        return contractInstance

    # Gets the Name of the specified address.
    # token address required as an argument.

    def name(self, tokenAddr):
        result = self.getContractInstance(tokenAddr).functions.name().call()
        return result

    # Gets the Symbol of the specified address.
    # token address required as an argument.

    def symbol(self, tokenAddr):
        result = self.getContractInstance(tokenAddr).functions.symbol().call()
        return result

    # Gets the owner of an NFT.
    # required arguments.
    # token address, token id.

    def ownerOf(self, tokenAddr, tokenId):
        result = self.getContractInstance(tokenAddr).functions.ownerOf(tokenId).call()
        return result

    # Gets the Totalsupply of the specified address.
    # token address required as an argument.
    
    def totalSupply(self, tokenAddr):
        token = Web3.toChecksumAddress(tokenAddr)
        result = self.getContractInstance(tokenAddr).functions.totalSupply().call()
        resultt = str(result)
        return resultt

    # Gets the balance of the specified address.
    # reuired arguments
    # token address, owner address.

    def balanceOf(self, tokenAddr, ownerAddress):
        owner = Web3.toChecksumAddress(ownerAddress)
        result = self.getContractInstance(tokenAddr).functions.balanceOf(owner).call()
        return result

    # A distinct Uniform Resource Identifier (URI) for a given asset.
    # Gets URI of a token.
    # required arguments
    # tokenId The identifier for an NFT.
    # address of the token.
    
    def tokenURI(self, tokenAddr, tokenId):
        result = self.getContractInstance(tokenAddr).functions.tokenURI(tokenId).call()
        return result

    # Enumerate NFTs assigned to an owner.
    # tokenAddress An address for whom to query.
    # IndexNO A counter less than `totalSupply()`.
    # The token identifier for the `index`th NFT assigned to `owner`.

    def tokenByIndex(self, tokenAddr, index):
        token = Web3.toChecksumAddress(tokenAddr)
        result = self.getContractInstance(tokenAddr).functions.tokenByIndex(index).call()
        return result

    # Enumerate NFTs assigned to an owner.
    # The token identifier for the `index`th NFT assigned to `owner`.
    # required arguments.
    # owner address, token address, token index.
    
    def tokenofOwnerByIndex(self, tokenAddr, ownerAddress, index):
        token = Web3.toChecksumAddress(tokenAddr)
        owner = Web3.toChecksumAddress(ownerAddress)
        result = self.getContractInstance(token).functions.tokenOfOwnerByIndex(
            owner, index).call()
        return result

    # Query if a contract implements an interface.
    # tokenAddress An address for whom to query and x_bytes The interface identifier.
    # `true` if the contract implements `interfaceID` andinterfaceID` is not 0xffffffff, `false` otherwise.
    #  required arguments.
    # token address, interface id.

    def supportInterface(self, tokenAddr, interfaceId):
        token = Web3.toChecksumAddress(tokenAddr)
        result = self.getContractInstance(token).functions.supportsInterface(
            interfaceId).call()
        return result

    # The approved address for a token ID, or zero if no address set Reverts if the token ID does not exist.
    # required arguments.
    # token address, tokenId.

    def getApproved(self, tokenAddr, tokenId):
        result = self.getContractInstance(tokenAddr).functions.getApproved(tokenId).call()
        return result

    # Tells whether an operator is approved by a given owner.
    # required arguments.
    # owner address, spender address, token address.

    def isApprovedForAll(self, tokenAddr, ownerAddress, spenderAddress):
        owner = Web3.toChecksumAddress(ownerAddress)
        spender = Web3.toChecksumAddress(spenderAddress)
        result = self.getContractInstance(tokenAddr).functions.isApprovedForAll(
            owner, spender).call()
        return result

    # Change or reaffirm the approved address for an NFT.
    # The zero address indicates there is no approved address.
    # Throws unless `owner` is the current NFT owner, or an authorized.
    # required arguments.
    # tokenAddress, owner address, ownerPrivateKey, spenderAddress, tokenID.

    def approve(self, tokenAddr, ownerAddress, ownerPrivateKey,  spenderAddress, tokenId):

        owner = Web3.toChecksumAddress(ownerAddress)
        spender = Web3.toChecksumAddress(spenderAddress)

        approveData = self.getContractInstance(tokenAddr).functions.approve(spender, tokenId)

        hexData = approveData._encode_transaction_data()

        data = hexstr_if_str(to_bytes, hexData)

        estimateGas = approveData.estimateGas({
            'from': owner,
        })

        nonce = self.getConnection().eth.getTransactionCount(owner)

        gasPrice = self.getConnection().eth.gas_price

        tx = {
            'nonce': nonce,
            'to': tokenAddr,
            'data': data,
            'gas': estimateGas,
            'gasPrice': gasPrice,
        }

        signedTx = self.getConnection().eth.account.signTransaction(tx, ownerPrivateKey)

        txHash = self.getConnection().eth.sendRawTransaction(signedTx.rawTransaction)
        return self.getConnection().toHex(txHash)

    # Enable or disable approval for a third party ("operator") to manage all of `Owner`'s assets
    # Emits the ApprovalForAll event. The contract MUST allow multiple operators per owner.
    # required arguments.
    # token address, owner address, ownerPrivateKey, sepnder address, tokenId.
     
    def setApprovalForAll(self, tokenAddr, ownerAddress, ownerPrivateKey,  spenderAddress, boolValue):

        owner = Web3.toChecksumAddress(ownerAddress)
        spender = Web3.toChecksumAddress(spenderAddress)

        approveData = self.getContractInstance(tokenAddr).functions.setApprovalForAll(
            spender, boolValue)

        hexData = approveData._encode_transaction_data()

        data = hexstr_if_str(to_bytes, hexData)

        estimateGas = approveData.estimateGas({
            'from': owner,
        })

        nonce = self.getConnection().eth.getTransactionCount(owner)

        gasPrice = self.getConnection().eth.gas_price

        tx = {
            'nonce': nonce,
            'to': tokenAddr,
            'data': data,
            'gas': estimateGas,
            'gasPrice': gasPrice,
        }

        signedTx = self.getConnection().eth.account.signTransaction(tx, ownerPrivateKey)

        txHash = self.getConnection().eth.sendRawTransaction(signedTx.rawTransaction)
        return self.getConnection().toHex(txHash)

    # Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
    # to confirm that `reciever Address` is capable of receiving NFTs or else they may be permanently lost.
    # required arguments.
    # token address, owner address, spender address, spenderPrivateKey, receiver address, tokenId.

    def transferFrom(self, tokenAddr, ownerAddress, spenderAddress,  spenderPrivateKey, receiver, tokenId):

        owner = Web3.toChecksumAddress(ownerAddress)
        receiverAddres = Web3.toChecksumAddress(receiver)
        spender = Web3.toChecksumAddress(spenderAddress)

        transferData = self.getContractInstance(tokenAddr).functions.transferFrom(
            owner, receiverAddres, tokenId)

        estimateGas = transferData.estimateGas({
            'from': spender,
        })

        hexData = transferData._encode_transaction_data()

        data = hexstr_if_str(to_bytes, hexData)

        nonce = self.getConnection().eth.getTransactionCount(spender)
        gasPrice = self.getConnection().eth.gas_price

        tx = {
            'nonce': nonce,
            'to': tokenAddr,
            'data': data,
            'gas': estimateGas,
            'gasPrice': gasPrice,
        }
        signedTx = self.getConnection().eth.account.signTransaction(tx, spenderPrivateKey)

        txHash = self.getConnection().eth.sendRawTransaction(signedTx.rawTransaction)
        return self.getConnection().toHex(txHash)

    # Transfers the ownership of an NFT from one address to another address.
    # required arguments.
    # token address, owner address, spender address, spenderPrivateKey, receiver address, tokenId. 

    def safeTransferFrom(self, tokenAddr, ownerAddress, spenderAddress,  spenderPrivateKey, receiver, tokenId):

        owner = Web3.toChecksumAddress(ownerAddress)
        receiverAddres = Web3.toChecksumAddress(receiver)
        spender = Web3.toChecksumAddress(spenderAddress)

        transferData = self.getContractInstance(tokenAddr).functions.safeTransferFrom(
            owner, receiverAddres, tokenId)

        estimateGas = transferData.estimateGas({
            'from': spender,
        })

        hexData = transferData._encode_transaction_data()

        data = hexstr_if_str(to_bytes, hexData)

        nonce = self.getConnection().eth.getTransactionCount(spender)
        gasPrice = self.getConnection().eth.gas_price

        tx = {
            'nonce': nonce,
            'to': tokenAddr,
            'data': data,
            'gas': estimateGas,
            'gasPrice': gasPrice,
        }
        signedTx = self.getConnection().eth.account.signTransaction(tx, spenderPrivateKey)

        txHash = self.getConnection().eth.sendRawTransaction(signedTx.rawTransaction)
        return self.getConnection().toHex(txHash)
