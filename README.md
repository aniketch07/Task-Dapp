# ABCToken ERC20 Contract and dApp
### Dapp is deployed on :  
# Table of Contents

1. [Project Overview](#project-overview)  
2. [Contract Deployment](#contract-deployment)  
3. [Contract Interaction](#contract-interaction)  
4. [Features](#features)  
   - [ERC20 Contract](#erc20-contract)  
   - [dApp](#dapp)  
5. [ERC20 Contract Details](#erc20-contract-details)  
   - [Requirements](#requirements)  
   - [Implementation Details](#implementation-details)  
   - [Functions](#functions)  
6. [dApp Features](#dapp-features)  
   - [How It Works](#how-it-works)  
7. [Installation](#installation)  
   - [Prerequisites](#prerequisites)  
   - [Steps](#steps)  
8. [Usage](#usage)  
9. [Note](#note)  
10. [Screenshots](#screenshots)  

### project-overview

### Contract Deployment
The contract is deployed on the Holesky testnet at the following address:
```
Contract Address: 0xA4eE3dECD52ADfE9B13fB88cb0CBf302a73522CC
```

### Contract Interaction
- You can interact with the contract from the following link : https://holesky.etherscan.io/address/0xa4ee3decd52adfe9b13fb88cb0cbf302a73522cc


This project consists of two main components:
1. An ERC20 token contract named `ABCToken` with the symbol `ABC`, which manages a list of token holders dynamically.
2. A decentralized application (dApp) that allows users to transfer `ABCToken` after connecting their wallet, with additional features like gas fee estimation and balance validation.
---

## Features

### ERC20 Contract
- Dynamically manages a list of token holders.
- Adds a holder to the list when they receive a balance greater than 0.
- Removes a holder from the list when their balance drops to 0.
- Provides functions to:
  - Get the total number of holders (`noOfHolders`).
  - Retrieve the current list of holders as an array.

### DApp
- Allows users to connect their wallet (e.g., MetaMask).
- Enables transferring `ABCToken` by entering the recipient's address and amount.
- Disables the transfer button if the user has insufficient balance.
- Displays the estimated gas fee in the blockchain's native coin (e.g., ETH for Ethereum).

---

## ERC20 Contract

### Requirements
1. The contract should be named `ABCToken` with the symbol `ABC`.
2. It should support up to 5,000 unique holders.
3. Holders should be added to the list when their balance changes from 0 to a positive value.
4. Holders should be removed from the list when their balance drops to 0.
5. Provide two functions:
   - `noOfHolders()`: Returns the total number of holders.
   - `getHolders()`: Returns an array of current holders.

### Implementation Details
- The contract uses a mapping to track balances and a dynamic array to store holders.
- When a transfer occurs, the contract checks if the sender's balance drops to 0 and removes them from the holders list.
- Similarly, if the recipient's balance increases from 0, they are added to the holders list.

### Functions
```solidity
// Returns the total number of holders
function noOfHolders() public view returns (uint256);

// Returns an array of current holders
function getHolders() public view returns (address[] memory);
```

### Contract
```bash
You can find contract in contracts/ABCToken.sol
```
### Dapp
### dApp Features
- Wallet connection using MetaMask or similar wallets.
- Input fields for recipient address and transfer amount.
- Disables the transfer button if the user has insufficient balance.
- Displays the estimated gas fee for the transaction.

### How It Works
1. The user connects their wallet to the dApp.
2. The dApp fetches the user's ABCToken balance and displays it.
3. The user enters the recipient's address and the amount to transfer.
4. The dApp checks if the user has sufficient balance and estimates the gas fee.
5. If the balance is sufficient, the transfer button is enabled, and the user can initiate the transaction.
6. After the transaction is confirmed, the dApp updates the user's balance and refreshes the UI.


### Installation
### Prerequisites
- Node.js and npm installed.
- MetaMask or a similar wallet installed in your browser.
- Hardhat or Truffle for smart contract development (optional).

Steps:
Clone the repository:

```bash
git clone https://github.com/aniketch07/Task-Dapp.git
cd Task-Dapp
```
Install dependencies:

```bash
npm install
```
Compile and deploy the ABCToken contract:

``` bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network <network-name>
```
Start the dApp:

``` bash
npm run dev
```
### Usage
- Open the dApp in your browser.
- Connect your wallet.
- Enter the recipient's address and the amount to transfer.
- Review the estimated gas fee and click "Transfer" if the button is enabled.
- Confirm the transaction in your wallet.

### Contract Deployment
The contract is deployed on the Holesky testnet at the following address:
```
Contract Address: 0xA4eE3dECD52ADfE9B13fB88cb0CBf302a73522CC
```

### Contract Interaction
- You can interact with the contract from the following link : https://holesky.etherscan.io/address/0xa4ee3decd52adfe9b13fb88cb0cbf302a73522cc

### Note:
- To add Holesky testnet to your metamask follow the following link: https://revoke.cash/learn/wallets/add-network/ethereum-holesky
- And fund your wallet some test ETH from this website: https://cloud.google.com/application/web3/faucet/ethereum/holesky

## Screenshots

### Screenshot 1
![Screenshot 1](screenshots/Screenshot%202025-02-09%20113053.png)

### Screenshot 2
![Screenshot 2](screenshots/Screenshot%202025-02-09%20113108.png)

### Screenshot 3
![Screenshot 3](screenshots/Screenshot%202025-02-09%20113217.png)

### Screenshot 4
![Screenshot 4](screenshots/Screenshot%202025-02-09%20113244.png)

### Screenshot 5
![Screenshot 5](screenshots/Screenshot%202025-02-09%20113304.png)

### Screenshot 6
![Screenshot 6](screenshots/Screenshot%202025-02-09%20113340.png)

### Screenshot 7
![Screenshot 7](screenshots/Screenshot%202025-02-09%20113404.png)

### Screenshot 8
![Screenshot 8](screenshots/Screenshot%202025-02-09%20113418.png)

### Screenshot 9
![Screenshot 9](screenshots/Screenshot%202025-02-09%20113430.png)
