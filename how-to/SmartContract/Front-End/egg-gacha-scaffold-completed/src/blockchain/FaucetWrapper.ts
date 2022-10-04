import Web3 from 'web3';
import Faucet from './contracts/Faucet';
import { FaucetAddress } from './constants';

export default class Faucetrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: Faucet;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        }

        this.Contract = new Faucet(this.wrapperOptions, FaucetAddress.Contract[this.chainId]);
    }

    async claimTokens() {
        try {
            const tx = await this.Contract.send("claimTokens", {from: this.account});
            console.log(tx);
        } catch (error) {
            throw error;
        }
    }
}