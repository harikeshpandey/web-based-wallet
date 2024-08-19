import "./App.css";
import { EthWallet } from "./components/Eth";
import Mneumonic from "./components/Mneumonics";
import { SolanaWallet } from "./components/solana";

function App() {
  return (
    <>
      <Mneumonic />
      <SolanaWallet />
      <EthWallet />
    </>
  );
}

export default App;
