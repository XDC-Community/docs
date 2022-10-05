import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";

const Content: React.FC = () => {
  const [xdcAddress, setXdcAddress] = useState("");
  const [xdcBalance, setXdcBalance] = useState("");
  const [currentChainId, setCurrentChainId] = useState("");
  const [walletStatus, setWalletStatus] = useState(false);

  const { account, chainId, web3 } = useContext(Web3ModalContext);

  const getBalance = async () => {
    if (web3 && account) {
      const balance = await web3.eth.getBalance(account);
      
      setXdcBalance((Number(balance)/1e18).toString());
    } else {
      setXdcBalance("");
    }
  };

  const getChainId = () => {
    if (web3 && chainId) {
      setCurrentChainId(String(chainId));
    } else {
      setCurrentChainId("");
    }
  };

  const getWalletStatus = () => {
    if (!account) {
      setWalletStatus(false);
    } else {
      setWalletStatus(true);
    }
  };

  const getAddress = () => {
    if (account) {
      setXdcAddress(`xdc${account.slice(2)}`);
    } else {
      setXdcAddress("");
    }
  };

  useEffect(() => {
    getBalance();
    getChainId();
    getWalletStatus();
    getAddress();
  }, [account, chainId, web3]);

  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.interface}>
          <div className={styles.columns} style={{ height: "300px" }}>
              <div className={styles.form}>
                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Address:</label>
                  </div>
                  <input
                    type="text"
                    value={xdcAddress}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>Connected to:</label>
                  </div>
                  <input
                    type="text"
                    value={currentChainId}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Balance:</label>
                  </div>
                  <input
                    type="text"
                    value={xdcBalance}
                  />
                </div>

                <div className={styles.walletStatus}>
                      <div
                        className={styles.ball}
                        style={
                          walletStatus
                            ? { backgroundColor: "lime" }
                            : { backgroundColor: "red" }
                        }
                      />
                      Wallet {walletStatus ? "Connected" : "Disconnected"}
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </section>
  );
};

export default Content;
