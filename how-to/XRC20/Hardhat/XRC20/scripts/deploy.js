async function main() {
  const XRC20 = await ethers.getContractFactory("XRC20Token");
  const myToken = await XRC20.deploy("MyToken", "MTK", 18, 1000);

  await myToken.deployed();

  console.log("Token Successfully Deployed!");
  console.log("Token address:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
