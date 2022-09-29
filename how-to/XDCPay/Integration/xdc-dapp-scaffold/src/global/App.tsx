import React from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import styles from "./styles.module.scss";

const App: React.FC = () => {
  return (
      <div className={styles.app}>
        <Header />
        <Content />
      </div>
  );
};

export default App;
