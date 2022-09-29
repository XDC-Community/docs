import React from "react";
import styles from "./styles.module.scss";

const Header: React.FC = () => {

  function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
  }

  return (
    <nav className={styles.header}>
      <div className={styles.sides}>
        <div className={styles.left}>
        </div>
        <div className={styles.right}>
          <div className={styles.connectButton}><span>NOT CONNECTED</span></div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
