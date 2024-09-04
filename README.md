# Crypto Wallet Generator and Balance Checker

This JavaScript project allows you to generate mnemonic phrases, create Ethereum and Solana wallets, and check the balance for both Ethereum and Solana addresses.

## Features

- **Generate Mnemonic**: Creates a mnemonic phrase for wallet generation.
- **Ethereum Wallet**: Generates an Ethereum wallet address and private key.
- **Solana Wallet**: Generates a Solana wallet address and private key.
- **Check Ethereum Balance**: Retrieves the balance of an Ethereum address.
- **Check Solana Balance**: Retrieves the balance of a Solana address.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/crypto-wallet-generator.git
    cd crypto-wallet-generator
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

1. **Generate a Mnemonic Phrase**:
    ```javascript
    const mnemonic = generateMnemonic();
    console.log(`Mnemonic: ${mnemonic}`);
    ```

2. **Create an Ethereum Wallet**:
    ```javascript
    const ethWallet = createEthWallet(mnemonic);
    console.log(`Ethereum Address: ${ethWallet.address}`);
    console.log(`Ethereum Private Key: ${ethWallet.privateKey}`);
    ```

3. **Create a Solana Wallet**:
    ```javascript
    const solanaWallet = createSolanaWallet(mnemonic);
    console.log(`Solana Address: ${solanaWallet.address}`);
    console.log(`Solana Private Key: ${solanaWallet.privateKey}`);
    ```

4. **Check Ethereum Balance**:
    ```javascript
    const balance = await getEthBalance(ethWallet.address);
    console.log(`Ethereum Balance: ${balance} ETH`);
    ```

5. **Check Solana Balance**:
    ```javascript
    const balance = await getSolanaBalance(solanaWallet.address);
    console.log(`Solana Balance: ${balance} SOL`);
    ```

## Dependencies

- `bip39`: Used for generating mnemonic phrases.
- `ethereumjs-wallet`: Used for creating Ethereum wallets.
- `@solana/web3.js`: Used for creating Solana wallets and checking balances.
- `web3`: Used for interacting with the Ethereum blockchain.


