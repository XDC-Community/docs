const MyCounter = artifacts.require("MyCounter");

contract("MyCounter", (accounts) => {
  it("should deploy MyCounter", async () => {
    const myCounterInstance = await MyCounter.deployed();
    const current = await myCounterInstance.current();

    assert.equal(current.valueOf(), 0, "0 is not the current count");
  });
  it("should increment and decrement MyCounter and show current count", async () => {
    const myCounterInstance = await MyCounter.deployed();

    await myCounterInstance.increment()
    await myCounterInstance.increment()
    await myCounterInstance.decrement()

    const current = await myCounterInstance.current();

    assert.equal(
      current.valueOf(),
      1,
      "1 is not the current count"
    );
  });
});
