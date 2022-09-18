const XRC20Token = artifacts.require("XRC20Token");

const NAME = "MyToken";
const SYMBOL = "MTK";
const DECIMALS = 18;
const INITIAL_SUPPLY = 1000;

module.exports = function (deployer) {
    deployer.deploy(XRC20Token, NAME, SYMBOL, DECIMALS, INITIAL_SUPPLY);
}