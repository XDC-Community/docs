const hre = require("hardhat");

async function main() {
  // make sure to change the name of your contract
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();

  await myToken.deployed();

  console.log("My token contract address:", myToken.address);
  //My token contract address: 0x802555081f6AAcE51559d0650Bf15f242aBe7fd7
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
