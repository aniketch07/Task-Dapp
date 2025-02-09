import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";

const Navbar = () => {
  const { address } = useAccount();
  const router = useRouter();
  const { disconnect } = useDisconnect();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        background: "#212121",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#FFFFFF",
          display: "flex",
          gap: "2rem",
        }}
      >
        <text
          onClick={() => {
            router.push("/");
          }}
          style={{ cursor: "pointer" }}
        >
          TOKEN DAPP
        </text>
      </div>

      {address ? (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #3FE0B2",
              color: "#FFFFFF",
              background: "#0B0C14",
            }}
          >
            {address.substring(0, 5)}...{address.substring(address.length - 5)}
          </div>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #FF4C4C",
              background: "#FF4C4C",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};

export default Navbar;