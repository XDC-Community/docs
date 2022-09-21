async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployer address:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const MyToken = await ethers.getContractFactory("Token");
  const myToken = await MyToken.deploy("MyToken", "MY", 18, 1000);

  console.log("Token address:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
