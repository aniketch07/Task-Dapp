import { getBalance, getSymbol, transfer,getGasFee } from "@/blockchain/scripts/abc";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount , useWaitForTransactionReceipt} from "wagmi";
import { useCallback } from "react";
const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [gasFee, setGasFee] = useState("");
  const router = useRouter();
  const { address, isConnected } = useAccount();
  getGasFee("0x4A1d9be621F93A51d12a10fcef34F6CA321391Ff",ethers.utils.parseUnits(String(200), 18));
  useEffect(() => {
  
    const fetchBalance = async () => {
      if (!address) return;

      try {
        const res = await getBalance(address);
        const symbol = await getSymbol();
        const balanceInEther = ethers.utils.formatUnits(res, 18);

        setSymbol(symbol);
        setBalance(balanceInEther);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [address]);


  

  // Inside the Dashboard component
  const handleTransfer = useCallback(async () => {
    if (!address || isLoading) return;
  
    if (!ethers.utils.isAddress(recipient.trim())) {
      setStatus("Invalid recipient address.");
      return;
    }
  
    if (parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(balance)) {
      setStatus("Invalid transfer amount.");
      return;
    }
  
    setIsLoading(true);
    setStatus("");
  
    try {
      const parsedAmount = ethers.utils.parseUnits(amount, 18);
      await transfer(recipient, parsedAmount);
  
      setStatus("✅ Transfer successful!");
      setRecipient("");
      setAmount("");
  
      const updatedBalance = await getBalance(address);
      setBalance(ethers.utils.formatUnits(updatedBalance, 18));
    } catch (error) {
      console.error("❌ Transfer failed:", error);
      setStatus("🚨 Transfer failed. Please try again.");
    }
  
    setIsLoading(false);
  }, [address, recipient, amount, balance, isLoading]);

  return (
    <div
      style={{
        margin: "2rem auto",
        padding: "2rem",
        maxWidth: "600px",
        backgroundColor: "#1E1E1E",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
        textAlign: "center",
        color: "#E0E0E0",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#FFFFFF", marginBottom:"1rem" }}>
        Custom Token Dashboard
      </h1>

      {isConnected ? (
        <>
          <div
            style={{
              backgroundColor: "#242424",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
              marginBottom: "1.5rem",
              transition: "transform 0.3s ease",
            }}
          >
            <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              Available Balance:
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#03DAC6" }}>
              {balance} {symbol}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              style={{
                padding: "0.75rem",
                borderRadius: "10px",
                border: "1px solid #444",
                backgroundColor: "#2C2C2C",
                color: "#FFF",
                outline: "none",
                transition: "border 0.3s ease",
              }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                padding: "0.75rem",
                borderRadius: "10px",
                border: "1px solid #444",
                backgroundColor: "#2C2C2C",
                color: "#FFF",
                outline: "none",
                transition: "border 0.3s ease",
              }}
            />
            
            <button
              onClick={handleTransfer}
              disabled={isLoading || parseFloat(balance) === 0}
              style={{
                padding: "0.75rem",
                backgroundColor: isLoading ? "#555" : "#BB86FC",
                color: "#FFF",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background 0.3s ease, transform 0.2s ease",
                transform: isLoading ? "scale(0.98)" : "scale(1)",
              }}
            >
              {isLoading ? "Sending..." : "Send Tokens"}
            </button>
          </div>
        </>
      ) : (
        <div style={{ color: "#CF6679" }}>Please connect your wallet to view your dashboard.</div>
      )}

      {status && (
        <div
          style={{
            marginTop: "1rem",
            backgroundColor: "#333",
            padding: "0.75rem",
            borderRadius: "8px",
            color: "#FF6B6B",
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default Dashboard;