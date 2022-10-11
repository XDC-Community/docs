async function main() {
  const MyCounter = await ethers.getContractFactory("MyCounter");
  const myCounter = await MyCounter.deploy();

  await myCounter.deployed();
  
  console.log("MyCounter Successfully Deployed!");
  console.log("MyCounter address:", myCounter.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
