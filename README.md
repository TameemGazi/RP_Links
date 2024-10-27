## Idea
Research Repository on blockchain

## Description	
A repository for academic research papers, ensuring immutability and accessibility.

## Detailed Intro
The Academic Research Repository is a decentralized platform designed to store, access, and share academic research papers, ensuring long-term immutability and open accessibility for researchers, students, and the public. Built on IPFS and blockchain technology, the repository safeguards academic knowledge by providing a secure, transparent, and verifiable record of uploaded research.

Key Features and Benefits
Immutable Recordkeeping: Every research paper uploaded to the repository is permanently stored on the InterPlanetary File System (IPFS), a decentralized storage network that assigns a unique, tamper-proof hash to each file. This hash is recorded on the blockchain, guaranteeing that the content remains unchanged and accessible indefinitely, preventing any alteration or loss of critical research information.

Blockchain-Verified Ownership: Each uploaded paper is tied to the author's or institution’s blockchain address, establishing a transparent and verifiable record of authorship and timestamping on the blockchain. This enables researchers to securely publish their work with proof of ownership and originality, bolstering intellectual property protection.

Global Accessibility: The decentralized nature of IPFS and blockchain allows unrestricted access to research papers from anywhere in the world. Users can retrieve papers through their unique IPFS hashes or the author’s blockchain address, bypassing traditional access barriers and creating an inclusive, democratized platform for knowledge sharing.

Enhanced Collaboration and Citation: By providing each paper with a blockchain-backed link, researchers can share, cite, and reference their work directly on the blockchain. This feature fosters transparent and traceable academic collaboration, as each paper can be accurately cited, linked, and tracked through immutable records.

Transparency and Data Security: Blockchain’s inherent transparency offers users a verifiable record of each paper’s upload date, ownership, and content integrity. The platform’s decentralized architecture eliminates reliance on centralized databases, ensuring that academic data remains secure, resilient against tampering, and free from any single point of failure.

Public Research Visibility: The repository offers a searchable, on-chain index of research papers, making it easier for users to discover relevant studies in various fields. Researchers benefit from increased visibility as their work is preserved within a global academic repository, fostering knowledge dissemination and collaboration on a larger scale.

Use Cases and Community Impact
Research Integrity: By leveraging blockchain to verify authorship and originality, the repository discourages plagiarism and enhances research credibility.
Long-Term Preservation: Scholars and institutions can trust that their work will remain accessible to future generations, immune to deletion, censorship, or loss.
Open Access Advocacy: This platform supports the open-access movement by removing paywalls and other barriers to knowledge sharing, promoting a truly open and decentralized academic landscape.
The Academic Research Repository redefines digital research storage by combining blockchain’s transparency with IPFS’s secure storage. It stands as a vital tool for academia, ensuring that knowledge remains a universally accessible and immutable resource.

## Execution
Using [PINATA](https://www.pinata.cloud/), I am storing the research paper on IPFS for this project. After that, it was kept in the EDU chain for everyone to access and maintain immutability.

## Packages
```sh
    npm install 
    'axios' 
    'dotenv' 
    'express' 
    'express-fileupload'
    'form-data' 
    'path' 
    'web3'
```
## Usage

To start the application, run:
```sh
node server.js
```

Open your browser and navigate to `http://localhost:5500` to access RP_Links
