const express = require('express');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const upload =require('express-fileupload')
const {Web3} = require('web3');
require('dotenv').config();

const app = express();

const ROOT_DIR = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PINATA_API_KEY = process.env['pinata_api_key']
const PINATA_SECRET_API_KEY =process.env['pinata_secret_api_key'] 
const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';


const CONTRACT_ADDRESS = process.env['contract_address'] 
const ABI =[
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "name": "StoreFile",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getFiles",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "userFiles",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

app.use(upload())

const createApp1 = () => {


// Serve the main HTML file
app.get("/", (req, res) => {  
    const filepath = path.join(ROOT_DIR,'src','index.html');
    res.sendFile(filepath);
});

// Handle file uploads
app.post('/', async (req, res) => {
    if (req.files && req.files.file) {
        console.log(req.files);
        const fileuploaded =req.files.file
        const ipfsUrl = await uploadToIPFS(fileuploaded);
        console.log(ipfsUrl);
		// Interact with the smart contract to store the IPFS hash
		await storeFileOnBlockchain(ipfsUrl);
        // res.json({ ipfsUrl });
    } else {
        res.status(400).send('No file uploaded.');
    }
})

app.post('/getFiles', async (req, res) => {
    if (req.body && req.body.userAddress) {
        try {
            const userAddress = req.body.userAddress;
            console.log('Fetching files for address:', userAddress);

            const ipfsLinks = await getFilesFromBlockchain(userAddress);
            res.json({ ipfsLinks });
        } catch (error) {
            console.error('Error fetching files:', error);
            res.status(500).send('Failed to retrieve files.');
        }
    } else {
        res.status(400).send('No user address provided.');
    }
});

const uploadToIPFS = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file.data, file.name);

        const pinataResponse = await axios.post(PINATA_API_URL, formData, {
            headers: {
                ...formData.getHeaders(),
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_SECRET_API_KEY
            }
        });

        return `https://gateway.pinata.cloud/ipfs/${pinataResponse.data.IpfsHash}`;
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw error;
    }
}

const storeFileOnBlockchain = async (ipfsHash) => {
  try {
      const web3 = new Web3('https://aia-dataseed1-testnet.aiachain.org');
      const privateKey = process.env['PRIVATE_KEY']; // Ensure this is set in your .env file
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);

      web3.eth.accounts.wallet.add(account);
      web3.eth.defaultAccount = account.address;

      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

      const gasPrice = await web3.eth.getGasPrice(); // Fetch the current gas price

      await contract.methods.StoreFile(ipfsHash).send({
          from: account.address,
          gas: 300000,  // Adjust if necessary
          gasPrice: gasPrice  // Legacy transaction model
      });

      console.log('IPFS hash stored on blockchain:', ipfsHash);
  } catch (error) {
      console.error('Error interacting with smart contract:', error);
      throw error;
  }
}


const getFilesFromBlockchain = async (userAddress) => {
    try {
        const web3 = new Web3('https://aia-dataseed1-testnet.aiachain.org');
        const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

        const ipfsHashes = await contract.methods.getFiles(userAddress).call();
        const ipfsLinks = ipfsHashes.map(hash => `${hash}`);

        return ipfsLinks;
    } catch (error) {
        console.error('Error fetching files from blockchain:', error);
        throw error;
    }
}

// Serve static files like CSS, JavaScript, images, etc.
app.use(express.static("src"));

return app;
};


module.exports = { createApp1 };