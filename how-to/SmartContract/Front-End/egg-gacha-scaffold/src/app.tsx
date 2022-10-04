import React, { useState, useCallback } from "react";
import "./app.css";
import { Web3ModalContext } from "./contexts/Web3ModalProvider";

const App: React.FC = () => {
  const EGTS = [
    { image: "blueEgg" },
    { image: "brownEgg" },
    { image: "cyanRedEgg" },
    { image: "darkEgg" },
    { image: "fullGreenEgg" },
    { image: "orangeEgg" },
    { image: "whiteBlackEgg" },
    { image: "whiteGreenEgg" },
    { image: "yellowStripedEgg" },
  ];

  const [slide, setSlide] = useState(0);
  const { account, connect, disconnect } = React.useContext(Web3ModalContext);

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  }

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
              <div className={"connect"} onClick={handleDisconnectWallet}>{ellipseAddress(account)}</div>
            )}
            
      </header>
      <div className="app">
        <div className="wrapper">
          <div className="infosContainer">
            <div className="infos">
              <span>MY EGT TOKENS: 0</span>
              <span>MY EGGS: 0</span>
            </div>
            <div className="infosButton">DROP ME MORE EGT!</div>
          </div>
          <div className="mintContainer">
            <div className="left">
              {slide === EGTS.length ? (
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
                {slide}/{EGTS.length}
              </div>
              <div className="nft">
                {slide === 0 ? (
                  <img src="/images/interrogation.webp" alt="No NFT" />
                ) : (
                  <img
                    src={`/images/Eggs/${EGTS[slide - 1].image}.webp`}
                    alt="No NFT"
                  />
                )}
              </div>
              <div className="mintButton">MINT NEW EGG!</div>
            </div>

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
