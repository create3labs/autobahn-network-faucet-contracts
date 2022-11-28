// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Faucet is Ownable {
    uint256 public gasAmount;
    mapping(address => uint256) public hasReceivedGas;

    event GasReceived(address indexed from, uint256 indexed amount);
    event GasSent(address indexed to, uint256 indexed amount);

    constructor(uint256 _gasAmount) {
        gasAmount = _gasAmount;
    }

    function sendGas(address payable to) external onlyOwner {
        hasReceivedGas[to] += gasAmount;
        to.transfer(gasAmount);
        emit GasSent(to, gasAmount);
    }

    function setGasAmount(uint256 _gasAmount) external onlyOwner {
        gasAmount = _gasAmount;
    }

    fallback() external payable {
        emit GasReceived(msg.sender, msg.value);
    }
}
