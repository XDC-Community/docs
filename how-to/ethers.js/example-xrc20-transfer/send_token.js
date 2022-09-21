require('dotenv').config()
const ethers = require('ethers')
const XRC20ABI = require('./XRC20.json')

const testnetProvider = new ethers.providers.JsonRpcProvider(process.env.APOTHEM_NETWORK_URL)
const wallet = new ethers.Wallet(process.env.APOTHEM_PRIVATE_KEY, testnetProvider)
const walletSigner = wallet.connect(testnetProvider)

const recipient_address = wallet.address
const your_xrc20_token_address = process.env.XRC20_TOKEN_ADDRESS
const decimals = 18
const number_of_tokens = ethers.utils.parseUnits('10', decimals)

async function main() {
  const contract = new ethers.Contract(
    your_xrc20_token_address,
    XRC20ABI,
    walletSigner
  )

  const receipt = await contract.transfer(recipient_address, number_of_tokens)

  console.log(receipt.hash)
}

main()
