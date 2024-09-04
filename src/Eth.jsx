import React, { useState, forwardRef, useImperativeHandle } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { Eye, EyeOff, Copy, Key } from "lucide-react";

export const EthWallet = forwardRef(({ mnemonic }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);
    const [showPrivateKey, setShowPrivateKey] = useState({});

    useImperativeHandle(ref, () => ({
        clearAddresses: () => {
            setWallets([]);
            setCurrentIndex(0);
        }
    }));

    const addEthWallet = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        setCurrentIndex(currentIndex + 1);
        setWallets([...wallets, { address: wallet.address, privateKey }]);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!");
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    const togglePrivateKey = (index) => {
        setShowPrivateKey(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div className="eth-wallet-container">
            <h2 className="wallet-title">Ethereum Wallet</h2>
            <button onClick={addEthWallet} className="add-wallet-btn">
                Add ETH Wallet
            </button>
            <div className="wallets-container">
                {wallets.map((wallet, index) => (
                    <div key={wallet.address} className="wallet-item">
                        <div className="wallet-info">
                            <div className="wallet-header">
                                <span className="wallet-index">#{index + 1}</span>
                                <div className="key-container">
                                    <div className="key-label">
                                        <Key size={16} />
                                        <span>Public Key</span>
                                    </div>
                                    <div className="key-value">
                                        <span className="wallet-address">{wallet.address}</span>
                                        <button onClick={() => copyToClipboard(wallet.address)} className="copy-btn">
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="wallet-private-key">
                                <div className="key-container">
                                    <div className="key-label">
                                        <Key size={16} />
                                        <span>Private Key</span>
                                        <button onClick={() => togglePrivateKey(index)} className="toggle-btn">
                                            {showPrivateKey[index] ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {showPrivateKey[index] && (
                                        <div className="key-value">
                                            <span>{wallet.privateKey}</span>
                                            <button onClick={() => copyToClipboard(wallet.privateKey)} className="copy-btn">
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .eth-wallet-container {
                    background-color: var(--dark-app-container);
                    border-radius: 8px;
                    padding: 20px;
                    margin-top: 20px;
                    font-family: 'Roboto', sans-serif;
                }
                .wallet-title {
                    color: var(--primary-color);
                    margin-bottom: 15px;
                }
                .add-wallet-btn {
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s;
                }
                .add-wallet-btn:hover {
                    background-color: var(--button-hover-color);
                }
                .wallets-container {
                    margin-top: 15px;
                }
                .wallet-item {
                    background-color: var(--dark-crypto-item-bg);
                    border-radius: 5px;
                    padding: 15px;
                    margin-bottom: 15px;
                }
                .wallet-header {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 10px;
                }
                .wallet-index {
                    background-color: var(--primary-color);
                    color: white;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    flex-shrink: 0;
                    margin-right: 10px;
                }
                .key-container {
                    flex-grow: 1;
                }
                .key-label {
                    display: flex;
                    align-items: center;
                    color: var(--secondary-color);
                    font-size: 14px;
                    margin-bottom: 5px;
                }
                .key-label svg {
                    margin-right: 5px;
                }
                .key-value {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: var(--key-background);
                    padding: 8px;
                    border-radius: 4px;
                }
                .wallet-address, .wallet-private-key span {
                    color: var(--dark-text);
                    font-family: monospace;
                    word-break: break-all;
                    flex-grow: 1;
                    margin-right: 10px;
                }
                .wallet-private-key {
                    margin-top: 10px;
                }
                .copy-btn, .toggle-btn {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--secondary-color);
                    transition: color 0.3s;
                }
                .copy-btn:hover, .toggle-btn:hover {
                    color: var(--button-hover-color);
                }
            `}</style>
        </div>
    );
});