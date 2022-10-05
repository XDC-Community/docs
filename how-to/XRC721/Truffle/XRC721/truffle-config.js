require("dotenv").config();
const { MNEMONIC } = process.env;
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    xinfin: {
      provider: () =>
        new HDWalletProvider(MNEMONIC, "https://erpc.xinfin.network"),
      network_id: 50,
      gasLimit: 6721975,
      confirmation: 2,
    },

    apothem: {
      provider: () =>
        new HDWalletProvider(MNEMONIC, "https://erpc.apothem.network"),
      network_id: 51,
      gasLimit: 6721975,
      confirmation: 2,
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.16",
    },
  },
};
