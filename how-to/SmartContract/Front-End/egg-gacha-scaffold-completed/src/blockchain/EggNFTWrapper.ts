import Web3 from 'web3';
import EggNFT from './contracts/EggNFT';
import { EggNFTAddress } from './constants';

export default class EggNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: EggNFT;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        }

        this.Contract = new EggNFT(this.wrapperOptions, EggNFTAddress.Contract[this.chainId]);
    }

    async balanceOf() : Promise<unknown> {
        try {
            const balance = await this.Contract.call("balanceOf", this.account);
            return balance;
        } catch (error) { 
            throw error;
        }
    }

    async buyEgg() : Promise<unknown> {
        try {
            const tx = await this.Contract.send("buyEgg", { from: this.account });
            return tx;
        } catch (error) { 
            throw error;
        }
    }

    async tokenOfOwnerByIndex(index: number) : Promise<unknown> {
        try {
            const tokenId = await this.Contract.call("tokenOfOwnerByIndex", this.account, index);
            return tokenId;
        } catch (error) { 
            throw error;
        }
    }

    async tokenURI(tokenId: number) : Promise<unknown> {
        try {
            const tokenURI = await this.Contract.call("tokenURI", tokenId);
            return tokenURI;
        } catch (error) { 
            throw error;
        }
    }
}