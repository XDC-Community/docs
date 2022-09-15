const Pizza = artifacts.require("Pizza");

// Constructor variables can be declared here
const SLICES = 8;  

module.exports = function (deployer) {
    deployer.deploy(Pizza, [SLICES]);
}