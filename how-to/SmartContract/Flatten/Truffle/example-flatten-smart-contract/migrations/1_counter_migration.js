const MyCounter = artifacts.require("MyCounter");

module.exports = function (deployer) {
    deployer.deploy(MyCounter);
}
