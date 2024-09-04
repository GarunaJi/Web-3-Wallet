import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Keypair } from "@solana/web3.js";
import { Eye, EyeOff, Copy, Key } from "lucide-react";

export const SolanaWallet = forwardRef((props, ref) => {
    const [wallets, setWallets] = useState([]);
    const [showPrivateKey, setShowPrivateKey] = useState({});

    useImperativeHandle(ref, () => ({
        clearWallets: () => {
            setWallets([]);
        }
    }));

    const addSolanaWallet = () => {
        const newKeypair = Keypair.generate();
        const publicKey = newKeypair.publicKey.toBase58();
        const privateKey = Buffer.from(newKeypair.secretKey).toString('hex');
        setWallets([...wallets, { publicKey, privateKey }]);
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
        <div className="solana-wallet-container">
            <h2 className="wallet-title">Solana Wallet</h2>
            <button onClick={addSolanaWallet} className="add-wallet-btn">
                Add SOL Wallet
            </button>
            <div className="wallets-container">
                {wallets.map((wallet, index) => (
                    <div key={wallet.publicKey} className="wallet-item">
                        <div className="wallet-info">
                            <div className="wallet-header">
                                <span className="wallet-index">#{index + 1}</span>
                                <div className="key-container">
                                    <div className="key-label">
                                        <Key size={16} />
                                        <span>Public Key</span>
                                    </div>
                                    <div className="key-value">
                                        <span className="wallet-address">{wallet.publicKey}</span>
                                        <button onClick={() => copyToClipboard(wallet.publicKey)} className="copy-btn">
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
                .solana-wallet-container {
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
