import {ethers} from "ethers";
import abi from '../abis/ABCToken.json'

export const getBalance=async(address: string)=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0xA4eE3dECD52ADfE9B13fB88cb0CBf302a73522CC',abi,provider)
        const balance=await contract.balanceOf(address)
        return balance
    } catch (error) {
        console.log(error,'err in getting balance')
    }
}

export const getSymbol=async()=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0xA4eE3dECD52ADfE9B13fB88cb0CBf302a73522CC',abi,provider)
        const symbol=await contract.symbol();
        return symbol
    } catch (error) {
        console.log(error,'err in getting symbol')
    }
}

export const getGasFee=async(address: string, amount: ethers.BigNumber)=>{
    try {
        //const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0xA4eE3dECD52ADfE9B13fB88cb0CBf302a73522CC',abi,provider)
        const estimation = await contract.estimateGas.transfer(address, amount);
        //console.log(Number(estimation));
        return estimation
    } catch (error) {
        console.log(error,'err in getting fee')
    }
}

export const getHoldersAddress=async()=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0xA4eE3dECD52ADfE9B13fB88cb0CBf302a73522CC',abi,provider)
        const holders=await contract.getHolders();
        console.log(holders);
        return holders
        
    } catch (error) {
        console.log(error,'err in getting symbol')
    }
}

export const getNumberOfHolders=async()=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0xA4eE3dECD52ADfE9B13fB88cb0CBf302a73522CC',abi,provider)
        const noOfholders=await contract.noOfHolders();
        console.log(Number(noOfholders));
        return noOfholders
        
    } catch (error) {
        console.log(error,'err in getting symbol')
    }
}


export const transfer=async(address: string, amount: ethers.BigNumber)=>{
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const signer = provider.getSigner();
        const contract=new ethers.Contract('0xA4eE3dECD52ADfE9B13fB88cb0CBf302a73522CC',abi,signer);
        const res=await contract.transfer(address,amount);
        return res
    } catch (error) {
        console.log(error,'err in getting symbol')
    }
}

