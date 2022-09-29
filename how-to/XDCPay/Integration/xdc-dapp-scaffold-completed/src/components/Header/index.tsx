import React, { useContext, useCallback } from "react";
import styles from "./styles.module.scss";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";

const Header: React.FC = () => {

  function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  }

  const { account, connect, disconnect } = useContext(Web3ModalContext);

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <nav className={styles.header}>
      <div className={styles.sides}>
        <div className={styles.left}>
        </div>
        <div className={styles.right}>
          <div className={styles.connectButton}>
            <span>
            {!account ? (
              <div className={styles.button} onClick={handleConnectWallet}>
                NOT CONNECTED
              </div>
            ) : (
              <div className={styles.button} onClick={handleDisconnectWallet}>{ellipseAddress(account)}</div>
            )}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
