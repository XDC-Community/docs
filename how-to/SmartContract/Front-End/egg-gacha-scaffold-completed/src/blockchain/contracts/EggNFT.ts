// EggNFT.ts

import Contract from "./Contract";
import Artifacts from "./EggNFT.json";

class EggNFT extends Contract {
    constructor(options, address) {
        super(options, "EggNFT", Artifacts["abi"], address);
    }
}

export default EggNFT;