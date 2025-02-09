// SPDX-License-Identifier: MIT
//contract deployed on address :0xA4eE3dECD52ADfE9B13fB88cb0CBf302a73522CC
//https://holesky.etherscan.io/address/0xa4ee3decd52adfe9b13fb88cb0cbf302a73522cc
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ABCToken is ERC20 {
    address[] private holders;
    mapping(address => bool) private isHolder;
    mapping(address => uint256) private holderIndex;

    // Events
    event HolderAdded(address indexed account);
    event HolderRemoved(address indexed account);
    event TransferCompleted(address indexed from, address indexed to, uint256 amount);

    
    constructor(uint256 initialSupply) ERC20("ABCToken", "ABC") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
        _addHolder(msg.sender);
    }

    function _addHolder(address account) private {
        if (!isHolder[account] && balanceOf(account) > 0) {
            isHolder[account] = true;
            holderIndex[account] = holders.length;
            holders.push(account);
            emit HolderAdded(account);
        }
    }

    function _removeHolder(address account) private {
        if (isHolder[account] && balanceOf(account) == 0) {
            isHolder[account] = false;

            uint256 index = holderIndex[account];
            address lastHolder = holders[holders.length - 1];

            holders[index] = lastHolder; // Move the last holder to the removed spot
            holderIndex[lastHolder] = index; // Update the index for the moved holder

            holders.pop(); // Remove the last element
            delete holderIndex[account]; // Clean up the mapping

            emit HolderRemoved(account);
        }
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(recipient != address(0), "Transfer to the zero address is not allowed");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance for transfer");

        address sender = msg.sender;
        bool success = super.transfer(recipient, amount);
        if (success) {
            _addHolder(recipient);
            _removeHolder(sender);
            emit TransferCompleted(sender, recipient, amount);
        }
        return success;
    }

    function noOfHolders() public view returns (uint256) {
        return holders.length;
    }

    function getHolders() public view returns (address[] memory) {
        return holders;
    }
} 
