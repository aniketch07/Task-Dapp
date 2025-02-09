import { ethers } from "ethers";
import abi from '../abis/ABCToken.json';

const provider = new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn');
const contractAddress = '0xA4eE3dECD52ADfE9B13fB88cb0CBf302a73522CC';

export const getBalance = async (address: string) => {
    try {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const balance = await contract.balanceOf(address);
        return balance;
    } catch (error) {
        console.error(error, 'Error in getting balance');
    }
};

export const getSymbol = async () => {
    try {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const symbol = await contract.symbol();
        return symbol;
    } catch (error) {
        console.error(error, 'Error in getting symbol');
    }
};

export const getGasFee = async (recipient: string, amount: string) => {
    try {
        if (!window.ethereum) throw new Error("MetaMask is not installed.");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const gasLimit = await contract.estimateGas.transfer(recipient, ethers.utils.parseUnits(amount, 18));
        const gasPrice = await provider.getGasPrice();

        const fee = ethers.utils.formatUnits(gasLimit.mul(gasPrice), 18);
        return fee;
    } catch (error) {
        console.error(error, 'Error in calculating gas fee');
    }
};

export const getHoldersAddress = async () => {
    try {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const holders = await contract.getHolders();
        return holders;
    } catch (error) {
        console.error(error, 'Error in getting holders address');
    }
};

export const getNumberOfHolders = async () => {
    try {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const holders = await contract.noOfHolders();
        console.log(Number(holders));
        return holders;
    } catch (error) {
        console.error(error, 'Error in getting number of holders');
    }
};

export const transfer = async (address: string, amount: ethers.BigNumber) => {
    try {
        if (!window.ethereum) throw new Error("MetaMask is not installed.");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.transfer(address, amount);
        await tx.wait();  // Wait for confirmation
        return tx;
    } catch (error) {
        console.error(error, 'Error in transferring tokens');
    }
};
