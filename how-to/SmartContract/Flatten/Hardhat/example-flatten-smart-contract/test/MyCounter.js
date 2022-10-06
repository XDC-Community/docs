const { expect } = require("chai");

describe("MyCounter contract", function () {
  it("should deploy MyCounter", async () => {
    const [owner] = await ethers.getSigners();
    const MyCounter = await ethers.getContractFactory("MyCounter");

    const myCounterInstance = await MyCounter.deploy();
    const current = await myCounterInstance.current();

    expect(current.valueOf()).to.equal(0)
  });
  it("should increment and decrement MyCounter and show current count", async () => {
    const [owner] = await ethers.getSigners();
    const MyCounter = await ethers.getContractFactory("MyCounter");

    const myCounterInstance = await MyCounter.deploy();

    await myCounterInstance.increment()
    await myCounterInstance.increment()
    await myCounterInstance.decrement()

    const current = await myCounterInstance.current();

    expect(current.valueOf()).to.equal(1)
  });
});
