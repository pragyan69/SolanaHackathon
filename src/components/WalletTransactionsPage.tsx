// src/components/WalletTransactionsPage.tsx
"use client"

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { PublicKey, ConfirmedSignatureInfo } from '@solana/web3.js';

const WalletTransactionsPage = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<ConfirmedSignatureInfo[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (publicKey) {
        const fetchedTransactions = await connection.getConfirmedSignaturesForAddress2(
          new PublicKey(publicKey),
          { limit: 10 }                                                                  
        );
        setTransactions(fetchedTransactions);
      }
    };

    fetchTransactions();
  }, [publicKey, connection]);

 console.log(publicKey)
 console.log(connection)

  return (
    <div className="bg-gray-800 p-5 rounded-lg">
    <h2 className="text-white text-3xl font-bold mb-4">Recent Transactions</h2>
  
    {publicKey && transactions.map((tx, index) => (
      <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-3">
        <div className="flex-1 text-gray-800 text-lg overflow-hidden overflow-ellipsis">{tx.signature}</div>
        <a href={`https://solscan.io/tx/${tx.signature}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out">
          View on SolScan
        </a>
      </div>
    ))}
  </div>
  


  
  );
};

export default WalletTransactionsPage;
