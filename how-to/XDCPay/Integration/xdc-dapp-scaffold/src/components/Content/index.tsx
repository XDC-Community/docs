import React, { useState } from "react";
import styles from "./styles.module.scss";

const Content: React.FC = () => {
  const [inputData, setInputData] = useState("");
  const [walletStatus, setWalletStatus] = useState(false);

  function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
  }

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
                    value={inputData}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>Connected to:</label>
                  </div>
                  <input
                    type="text"
                    value={inputData}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Balance:</label>
                  </div>
                  <input
                    type="text"
                    value={inputData}
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
