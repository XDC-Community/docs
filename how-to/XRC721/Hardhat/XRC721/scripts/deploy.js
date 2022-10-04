async function main() {
  const [deployer] = await ethers.getSigners();

  const XRC721 = await ethers.getContractFactory("XRC721");
  const myNFT = await XRC721.deploy("MyNFTToken", "myNFT");

  await myNFT.deployed();
  
  console.log("Token Successfully Deployed!");
  console.log("Token address:", myNFT.address);

  const newItemId = await myNFT.mintToken(deployer.address)

  console.log("NFT minted: ", newItemId)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
