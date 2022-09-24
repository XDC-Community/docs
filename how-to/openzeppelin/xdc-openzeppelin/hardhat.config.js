require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const XINFIN_NETWORK_URL = process.env.XINFIN_NETWORK_URL;
const APOTHEM_NETWORK_URL = process.env.APOTHEM_NETWORK_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    xinfin: {
      url: XINFIN_NETWORK_URL,
      accounts: [PRIVATE_KEY],
    },
    apothem: {
      url: APOTHEM_NETWORK_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
