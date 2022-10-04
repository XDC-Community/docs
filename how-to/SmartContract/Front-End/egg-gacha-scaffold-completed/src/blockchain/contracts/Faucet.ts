// Faucet.ts

import Contract from "./Contract";
import Artifacts from "./Faucet.json";

class Faucet extends Contract {
    constructor(options, address) {
        super(options, "Faucet", Artifacts["abi"], address);
    }
}

export default Faucet;