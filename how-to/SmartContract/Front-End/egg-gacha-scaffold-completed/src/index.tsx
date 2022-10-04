import ReactDOM from "react-dom/client";
import Web3ModalProvider from "./contexts/Web3ModalProvider";
import BlockchainProvider from "./contexts/BlockchainProvider";
import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Web3ModalProvider>
    <BlockchainProvider>
      <App />
    </BlockchainProvider>
  </Web3ModalProvider>
);
