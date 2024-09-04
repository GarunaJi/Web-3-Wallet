import { useState, useEffect, useRef } from "react";
import "./App.css";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./Sol";
import { EthWallet } from "./Eth";
import { Eth_Bal } from "./Eth_Bal";
import { Sol_Bal } from "./Sol_Bal";
import CryptoPrices from "./CryptoPrices";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [theme, setTheme] = useState("dark");

  // Refs to clear addresses
  const ethWalletRef = useRef();
  const solWalletRef = useRef();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleClick = async () => {
    const mn = generateMnemonic();
    setMnemonic(mn);

    // Clear previous addresses in wallets
    ethWalletRef.current.clearAddresses();
    solWalletRef.current.clearWallets();
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        <div className="toggle-switch"></div>
        <div className="theme-label">
          {theme === "dark" ? "🌞" : "🌙"}
        </div>
      </div>
      <div className="app-container">
        <CryptoPrices />
        <h1>Generate Web3 Wallet</h1>
        <button onClick={handleClick} className="generate-button">
          Create Seed Phrase
        </button>

        {mnemonic && (
          <input
            type="text"
            value={mnemonic}
            readOnly
            className="mnemonic-input"
          />
        )}

        {mnemonic && <SolanaWallet ref={solWalletRef} mnemonic={mnemonic} />}
        {mnemonic && <EthWallet ref={ethWalletRef} mnemonic={mnemonic} />}
        <h1>Check Balances</h1>
        <Sol_Bal />
        <Eth_Bal />
      </div>

      <footer className="app-footer">
        <p>made by Garuna_Ji</p>
      </footer>
    </div>
  );
}

export default App;
