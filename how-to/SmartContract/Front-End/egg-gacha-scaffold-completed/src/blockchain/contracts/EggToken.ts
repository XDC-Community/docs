// EggToken.ts

import Contract from "./Contract";
import Artifacts from "./EggToken.json";

class EggToken extends Contract {
    constructor(options, address) {
        super(options, "EggToken", Artifacts["abi"], address);
    }
}

export default EggToken;