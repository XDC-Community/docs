const XRC20Token = artifacts.require("XRC20Token");
const FarmToken = artifacts.require("FarmToken")

const NAME = "MyToken";
const SYMBOL = "MTK";

module.exports = async function (deployer) {
  // Deploy XRC20Token
  await deployer.deploy(XRC20Token, NAME, SYMBOL);
  const myToken = await XRC20Token.deployed()

  // Deploy FarmToken
  await deployer.deploy(FarmToken, myToken.address)
  const farmToken = await FarmToken.deployed()

  console.log('FarmToken deployed:', farmToken.address)
}
