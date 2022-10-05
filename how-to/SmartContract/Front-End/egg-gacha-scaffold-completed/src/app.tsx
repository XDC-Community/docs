import React, { useState, useCallback, useEffect } from "react";
import "./app.css";
import { Web3ModalContext } from "./contexts/Web3ModalProvider";

// We will start by importing our newly created BlockchainContext to app.tsx:
import { BlockchainContext } from "./contexts/BlockchainProvider";



const App: React.FC = () => {

// We are not using this state anymore, so we can remove it
// Instead we will use the EGGS state from our BlockchainContext

/*   const EGTS = [
    { image: "blueEgg" },
    { image: "brownEgg" },
    { image: "cyanRedEgg" },
    { image: "darkEgg" },
    { image: "fullGreenEgg" },
    { image: "orangeEgg" },
    { image: "whiteBlackEgg" },
    { image: "whiteGreenEgg" },
    { image: "yellowStripedEgg" },
  ]; */ 

  const [slide, setSlide] = useState(0);

  // Here, we want to import from Web3ModalContext 'web3' and 'chainId'
  // besides 'account', 'connect' and 'disconnect'
  const { web3, account, connect, disconnect, chainId } =
    React.useContext(Web3ModalContext);

  // And we will import from BlockchainContext the 'EGGS' state and our 
  // contract wrappers:
  const {
    eggNFT: eggNFTWrapper,
    eggToken: eggTokenWrapper,
    faucet: faucetWrapper,
    EGGS,
  } = React.useContext(BlockchainContext);


  // We need to create our balance states and gachaAllowance state:
  const [egtTokenBalance, setEgtTokenBalance] = useState("");
  const [egtNftBalance, setEgtNftBalance] = useState("");
  const [gachaAllowance, setGachaAllowance] = useState("");

  // A getBalance function that will get our EGT and EGG token balances
  const getBalances = async () => {
    if (web3 && account && chainId) {
      const _egtBalance = await eggTokenWrapper?.balanceOf();
      const _eggBalance = await eggNFTWrapper?.balanceOf();

      setEgtTokenBalance(String(Number(_egtBalance) / 10 ** 18) || "0");
      setEgtNftBalance(String(_eggBalance) || "0");
    }
  };

  // And a getGachaAllowance function to check whether
  // the EggNFT contract is allowed to spend our EGT tokens
  const getGachaAllowance = async () => {
    if (web3 && account && chainId) {
      const _gachaAllowance = await eggTokenWrapper?.allowance();
      setGachaAllowance(String(Number(_gachaAllowance) / 10 ** 18) || "0");
    }
  };

  // This useEffect will update our balances and allowance
  // so we can update our UI
  useEffect(() => {
    getBalances();
    getGachaAllowance();
  });

  // This function handle the DROP ME MORE EGT! button clicks
  const handleDrop = () => {
    if (web3 && account && chainId) {
      faucetWrapper
        ?.claimTokens()
        .then(() => {
          alert("Claimed 50 EGTS!");
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  // This function handle the MINT NEW EGG! button clicks
  const handleBuyEgg = () => {
    if (web3 && account && chainId) {
      eggNFTWrapper
        ?.buyEgg()
        .then(() => {
          alert("Minted Egg!");
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  // This function handle the APPROVE GACHA! button clicks
  const handleApprove = () => {
    if (web3 && account && chainId) {
      eggTokenWrapper
        ?.approve()
        .then(() => {
          alert("Approved!");
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  // <=== This section of the code is pretty much left unchanged ===>
 
  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  function ellipseAddress(address: string = "", width: number = 4): string {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  }

  // <===============================================================>

  return (
    <main>
      <div className="background">
        <div className="decoration">
          <img src="/images/decorator.svg" alt="Decoration" />
        </div>
        <div className="dragon">
          <img src="/images/dragon.webp" alt="Dragon" />
        </div>
      </div>
      <header>
        {!account ? (
          <div className={"connect"} onClick={handleConnectWallet}>
            CONNECT WALLET
          </div>
        ) : (
          <div className={"connect"} onClick={handleDisconnectWallet}>
            {ellipseAddress(account)}
          </div>
        )}
      </header>
      <div className="app">
        <div className="wrapper">
          <div className="infosContainer">
            <div className="infos">
              {/* Here We Update our UI to show the balances updated in the getBalances() function */}
              <span>MY EGT TOKENS: {egtTokenBalance}</span>
              <span>MY EGGS: {egtNftBalance}</span>
            </div>
              {/* And we want to add a 'handleDrop' function once the DROP ME MORE EGT button is clicked */}
            <div className="infosButton" onClick={handleDrop}>
              DROP ME MORE EGT!
            </div>
          </div>
          <div className="mintContainer">
            <div className="left">
              {slide === EGGS.length ? (
                <img src="/images/leftArrowUncolored.svg" alt="Left Arrow" />
              ) : (
                <img
                  src="/images/leftArrowColored.svg"
                  alt="Left Arrow"
                  onClick={() => setSlide(slide + 1)}
                />
              )}
            </div>

            <div className="center">
              <div className="count">
                {/* Here we change from EGGS.length to EGGS?.length to avoid getting undefined 'EGGS' values*/}
                {slide}/{EGGS?.length} 
              </div>
              <div className="nft">
                {slide === 0 ? (
                  <img src="/images/interrogation.webp" alt="No NFT" />
                ) : (
                  <img 
                    src={
                      // And we change a little bit the way we get the image of the NFT
                      // also to avoid getting undefined values
                      EGGS[0]?.image !== undefined
                        ? `${EGGS[slide - 1]?.image}`
                        : "/images/interrogation.webp"
                    }
                    alt="No NFT"
                  />
                )}
              </div>
              {/* The MINT NEW EGG! button now needs to check a condition "gachaAllowance" 
                  to check if the gacha contract can spend EGT tokens on our behalf...
                  
                  This section of the code means:

                  if (gachaAllowance === 0) so Display the 'APPROVE GACHA!' button
                  else Display the 'MINT NEW EGG!' button
                  */}
              {gachaAllowance === "0" ? (
                <div className="mintButton" onClick={handleApprove}>
                  APPROVE GACHA!
                </div>
              ) : (
                <div className="mintButton" onClick={handleBuyEgg}>
                  MINT NEW EGG!
                </div>
              )}
            </div>
            {/* And by now, we have already changed everything we needed to have a fully functional Front-End*/}
            <div className="right">
              {slide === 0 ? (
                <img src="/images/rightArrowUncolored.svg" alt="Right Arrow" />
              ) : (
                <img
                  src="/images/rightArrowColored.svg"
                  alt="Right Arrow"
                  onClick={() => setSlide(slide - 1)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
