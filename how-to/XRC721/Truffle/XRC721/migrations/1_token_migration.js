const XRC721Token = artifacts.require("XRC721");

const NAME = "MyToken";
const SYMBOL = "MTK";

module.exports = function (deployer) {
  deployer.deploy(XRC721Token, NAME, SYMBOL);
};
