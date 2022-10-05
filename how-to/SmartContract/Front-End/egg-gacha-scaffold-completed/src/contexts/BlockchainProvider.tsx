import EggNFTWrapper from "../blockchain/EggNFTWrapper";
import EggTokenWrapper from "../blockchain/EggTokenWrapper";
import Faucetrapper from "../blockchain/FaucetWrapper";
import { createContext, useEffect, useState, useContext } from "react";
import { Web3ModalContext } from "./Web3ModalProvider";

interface IBlockchainContext {
    eggNFT: EggNFTWrapper | null;
    eggToken: EggTokenWrapper | null;
    faucet: Faucetrapper | null;
    EGGS: EGGScontent[];
}

type EGGScontent = {
    image : string,
  }

export const BlockchainContext = createContext<IBlockchainContext>({
    eggNFT: null,
    eggToken: null,
    faucet: null,
    EGGS : [],
});

export const BlockchainProvider = ({ children }) => {

    const { web3, chainId, account } = useContext(Web3ModalContext);
    const [ eggNFT, setEggNft ] = useState<EggNFTWrapper | null>(null);
    const [ eggToken, setEggToken ] = useState<EggTokenWrapper | null>(null);
    const [ faucet, setFaucet ] = useState<Faucetrapper | null>(null);
    const [ EGGS, setEGGS] = useState<EGGScontent[]>([]);

    useEffect(() => {
        if (web3 && chainId && account) {
            try{
                const _eggNFT = new EggNFTWrapper(web3, chainId, account);
                const _eggToken = new EggTokenWrapper(web3, chainId, account);
                const _faucet = new Faucetrapper(web3, chainId, account);
                setEggNft(_eggNFT);
                setEggToken(_eggToken);
                setFaucet(_faucet);
            } catch (e) {
                console.log(e);
            }
        } else {
            setEggNft(null);
            setEggToken(null);
            setFaucet(null);
        }
    } , [web3, chainId, account]);

    useEffect(() => {
        
            eggNFT?.balanceOf().then((res) => {
                let _EGGS : EGGScontent[] = [];
                let zeros = "000"
                for (let i = 0; i < Number(res); i++) {
                    eggNFT?.tokenOfOwnerByIndex(i).then((res) => {
                      _EGGS.push( { image : `https://gateway.pinata.cloud/ipfs/Qmdvr95JsHCnuKVEdAX784qcYDK9HndbpPMT7FDopdF8eQ/eggo${zeros.slice((String(res).length))}${res}.png`})
                    });
                  }
                  setEGGS(_EGGS);
                  // console.log(EGGS);
            });
        
      }, [chainId, account]);


    return (
        <BlockchainContext.Provider value={{ eggNFT, eggToken, faucet, EGGS }}>
            {children}
        </BlockchainContext.Provider>
    );
}

export default BlockchainProvider;