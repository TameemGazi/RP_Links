// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSStorage {
    mapping(address => string[]) public userFiles;

    function StoreFile(string memory ipfsHash) public {
        userFiles[msg.sender].push(ipfsHash);
    }

    function getFiles(address user) public view returns (string[] memory) {
        return userFiles[user];
    }
}
