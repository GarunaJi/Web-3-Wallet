import React, { useState } from "react";

export const Sol_Bal = ({ sol_address }) => {
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState(sol_address);

    const handleCheckBalance = async () => {
        if (!address) {
            alert("Please enter a Solana address");
            return;
        }

        // POST request to Solana API
        const url = "https://solana-mainnet.g.alchemy.com/v2/dmXaKuhFP56Ruv0l2iNw8VsvY8zEUiGD"; // Solana API URL
        const body = JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [address]
        });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            });

            const data = await response.json();
            if (data.result) {
                const balanceInSol = data.result / 1e9; // Convert from lamports to SOL
                setBalance(balanceInSol);
            } else {
                console.error("Error fetching balance:", data);
                setBalance("Error");
            }
        } catch (error) {
            console.error("Error:", error);
            setBalance("Error");
        }
    };

    return (
        <div className="balance-container">
            <h2 className="balance-title">Check Solana Balance</h2>
            <div className="balance-item">
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Solana Address"
                    className="address-input"
                />
                <button onClick={handleCheckBalance} className="check-button">Check Balance</button>
            </div>
            <div className="balance-item">
                <span className="balance-label">Balance:</span>
                <span className="balance-value">{balance} SOL</span>
            </div>

            <style jsx>
                {`
                .balance-container  {
                  background-color: #0d1117; /* Dark background */
                    border: 2px   #30363d;
                    border-radius: 12px;
                    padding: 25px;
                    margin-top: 20px;
                    font-family: 'Courier New', Courier, monospace; /* Sleek monospaced font */
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                }
                .balance-title {
                    color: #58a6ff; /* Bright blue for titles */
                    margin-bottom: 20px;
                    text-align: center;
                    text-shadow: 0 0 8px rgba(88, 166, 255, 0.8);
                    font-family: 'Orbitron', sans-serif; /* Match Ethereum style */
                }
                .balance-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                .address-input {
                    padding: 12px;
                    border: none;
                    border-radius: 5px;
                    outline: none;
                    font-size: 16px;
                    color: #c9d1d9;
                    width: 60%;
                    background-color: #161b22; /* Slightly darker than the container */
                    transition: box-shadow 0.3s;
                }
                .address-input:focus {
                    box-shadow: 0 0 12px rgba(88, 166, 255, 0.8);
                }
                .check-button {
                    padding: 12px 25px;
                    border: none;
                    border-radius: 5px;
                    background-color: #21262d;
                    color: #58a6ff;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.3s;
                }
                .check-button:hover {
                    background-color: #30363d;
                    transform: translateY(-2px);
                    box-shadow: 0 0 10px rgba(88, 166, 255, 0.8);
                }
                .balance-label {
                    font-size: 16px;
                    color: #c9d1d9;
                    font-family: 'Orbitron', sans-serif; /* Futuristic font for labels */
                }
                .balance-value {
                    color: #58a6ff;
                    font-size: 20px;
                    text-shadow: 0 0 10px rgba(88, 166, 255, 0.8);
                    font-family: 'Orbitron', sans-serif; /* Futuristic font */
                    animation: glow 1.5s infinite alternate;
                }
                @keyframes glow {
                    from {
                        text-shadow: 0 0 10px rgba(88, 166, 255, 0.8), 0 0 20px rgba(88, 166, 255, 0.6), 0 0 30px rgba(88, 166, 255, 0.4);
                    }
                    to {
                        text-shadow: 0 0 20px rgba(88, 166, 255, 1), 0 0 30px rgba(88, 166, 255, 0.8), 0 0 40px rgba(88, 166, 255, 0.6);
                    }
                }
                `}
            </style>
        </div>
    );
};
