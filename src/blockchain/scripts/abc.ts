import {ethers} from "ethers";
import abi from '../abis/ABCToken.json'

export const getBalance=async(address: string)=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0x2a644d38c8f022AEe9cc7eD72063AEe0C8EA6735',abi,provider)
        const balance=await contract.balanceOf(address)
        return balance
    } catch (error) {
        console.log(error,'err in getting balance')
    }
}

export const getSymbol=async()=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0x2a644d38c8f022AEe9cc7eD72063AEe0C8EA6735',abi,provider)
        const symbol=await contract.symbol();
        return symbol
    } catch (error) {
        console.log(error,'err in getting symbol')
    }
}

export const getGasFee=async(address: string, amount: ethers.BigNumber)=>{
    try {
        //const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const provider = ethers.getDefaultProvider();
        const contract=new ethers.Contract('0x2a644d38c8f022AEe9cc7eD72063AEe0C8EA6735',abi,provider)
        const estimation = await contract.estimateGas.transfer(address, amount);
        console.log(Number(estimation));
        return estimation
    } catch (error) {
        console.log(error,'err in getting fee')
    }
}

export const transfer=async(address: string, amount: ethers.BigNumber)=>{
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const signer = provider.getSigner();
        const contract=new ethers.Contract('0x2a644d38c8f022AEe9cc7eD72063AEe0C8EA6735',abi,signer);
        const res=await contract.transfer(address,amount);
        return res
    } catch (error) {
        console.log(error,'err in getting symbol')
    }
}