const hre = require("hardhat");

async function main() {
  // make sure to change the name of your contract
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();

  await myToken.deployed();

  console.log("My token contract address:", myToken.address);
  //My token contract address: 0xc8Ac88d77b9870D289806F54AfF9057f170bAb21
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
