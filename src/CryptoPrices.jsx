import React, { useEffect, useState } from 'react';

const CryptoPrices = () => {
    const [prices, setPrices] = useState({ bitcoin: null, ethereum: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPrices = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPrices({
                bitcoin: data.bitcoin.usd,
                ethereum: data.ethereum.usd,
            });
        } catch (error) {
            setError("Api ne apni aukaat dikha di");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 60000);
        return () => clearInterval(interval);
    }, []);

    if (error) {
        return (
            <div className="crypto-error">
                <strong>Error:</strong>
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="crypto-prices">
            <div className="crypto-header">
                <h2>Crypto Prices</h2>
                <button 
                    onClick={fetchPrices} 
                    disabled={loading}
                    className="refresh-button"
                >
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>
            <div className="crypto-grid">
                <div className="crypto-item">
                    <span className="crypto-name">Bitcoin</span>
                    <span className="crypto-value">
                        {loading ? '...' : `$${prices.bitcoin?.toLocaleString()}`}
                    </span>
                </div>
                <div className="crypto-item">
                    <span className="crypto-name">Ethereum</span>
                    <span className="crypto-value">
                        {loading ? '...' : `$${prices.ethereum?.toLocaleString()}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CryptoPrices;