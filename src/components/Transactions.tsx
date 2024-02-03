"use client"
import { useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, ConfirmedSignatureInfo } from '@solana/web3.js';

const Transactions = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // New state to hold error messages
  const { connection } = useConnection();
  const [transactions, setTransactions] = useState<ConfirmedSignatureInfo[]>([]);

  const isBase58 = (str) => {
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
    return base58Regex.test(str);
  }

  const fetchTransactions = async () => {
    if (!walletAddress) {
      setError('Wallet address is required.');
      return;
    }
    if (!isBase58(walletAddress)) {
      setError('Invalid wallet address format. Please enter a valid Base58 address.');
      return;
    }

    setLoading(true);
    setError(''); // Clear any previous errors
    try {
      const fetchedTransactions = await connection.getConfirmedSignaturesForAddress2(
        new PublicKey(walletAddress),
        { limit: 10 }
      );
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setError('Failed to fetch transactions. Please try again.');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-lg text-white">
  <input
    type="text"
    value={walletAddress}
    onChange={(e) => { setWalletAddress(e.target.value); setError(''); }}
    placeholder="Enter Wallet Address"
    className="mx-6 p-4 text-black border-2 border-gray-300 rounded-lg w-full md:w-1/2 lg:w-1/3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-200 ease-in-out"
    style={{ backgroundColor: 'white' }} // Ensuring the background is white for better contrast
  />

  <button
    onClick={fetchTransactions}
    disabled={loading || !walletAddress.trim()}
    className="mx-6 mt-4 py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition duration-200 ease-in-out"
  >
    {loading ? 'Loading...' : 'Get Transactions'}
  </button>

  {error && <p style={{ color: 'red' }}>{error}</p>}

  <div>
    {transactions.length > 0 ? (
      <ul>
        {transactions.map((tx, index) => (
          <li key={index} className="bg-white text-gray-800 p-4 rounded-lg shadow-md mb-3">
            <div className="flex justify-between items-center">
              <div className="flex-1 overflow-hidden overflow-ellipsis">{tx.signature}</div>
              <a href={`https://solscan.io/tx/${tx.signature}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out">
                View on SolScan
              </a>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="mx-6 my-5 text-white">No transactions found or yet to fetch.</p>
    )}
  </div>
</div>

  );
};

export default Transactions;
