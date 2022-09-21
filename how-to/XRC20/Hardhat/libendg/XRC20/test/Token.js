const { expect } = require("chai");

describe("Token contract", function () {
  it("Deploy token", async function () {
    const [owner] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("Token");

    // deploying your token in a simulated network
    const myToken = await MyToken.deploy("MyToken", "MY", 18, 1000);
    // getting owners balance
    const ownerBalance = await myToken.balanceOf(owner.address);
    expect(await myToken.name()).to.equal("MyToken");
    expect(await myToken.symbol()).to.equal("MY");
    expect(await myToken.totalSupply()).to.equal(ownerBalance);
  });
});
