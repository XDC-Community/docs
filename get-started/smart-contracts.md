# Smart Contracts

## Introduction

A blockchain is a list of records stored on cryptographically interlinked blocks. Each block consists of transaction data, a timestamp, and a hash of the preceding block. With every link in the chain connected to every other link, blockchain data is highly resistant to change or modification. In addition, since a blockchain is a decentralized network, all permitted users can participate as equals. There is no need for intermediaries (middlemen), which saves time and cuts costs. Blockchains are therefore immutable, faster, cheaper and more secure than traditional networks. For this reason, financial institutions and governments all around the world are currently investigating or preparing to adopt the technology.

Now imagine self-executing contracts, converted to computer code, then stored and replicated on a blockchain -- that is a smart contract.&#x20;

## What are Smart Contracts

A smart contract is a computer code running on a blockchain that establishes rules on which two or more parties can agree. If and when the pre-established rules are followed, the agreement is automatically enforced. A smart contract facilitates, verifies and enforces the execution of agreements or transactions between parties with divergent interests, without intermediaries and while eliminating the need for trust, unlike with traditional contract terms where contracting parties will incur the costs and risks of trusting one another or an intermediary while exchanging goods or services.

Here, we have an example of a rudimentary smart contract, where we use Set and Get functions:

`pragma solidity 0.4.0;`\
`// Imagine a big integer that the whole world could share`\
`contract SimpleStorage {`\
`uint storedData;`\
`function set(uint x) public {`\
`storedData = x;`\
`}`\
`function get() constant public returns (uint) {`\
`return storedData;`\
`}`\
`function increment (uint n) public {`\
`storedData = storedData + n;`\
`return;`\
`}`\
`function decrement (uint n) public {`\
`storedData = storedData - n;`\
`return;`\
`}`

## Key Features of Smart Contracts

#### Immutable

Since important documents and data are encrypted on a shared ledger, which serves as a permanent record, nobody can claim they got lost or destroyed.

#### Autonomous

Since the agreement is automatically self-enforcing, there is no need to work with a broker, a lawyer, or other intermediaries. Smart contracts are, for this reason, safe from the dangers of unscrupulous or incompetent third parties.

#### Fast

Since smart contracts are automated, no paperwork is required, and no time is spent resolving errors that often result from manual documents. These transactions, when executed, operate in a scalable environment in real time.&#x20;

#### Cost

Smart contracts cut costs because there is no need to work with a third party, like a broker or a lawyer. A smart contract can be written, automated, and verified to execute functions of a third party at near-zero cost.&#x20;

#### Secure

Cryptographic techniques keep smart contract data safe and secure at all times so that even the most sensitive information can be handled without fear of loss or theft.

## Smart Contract Use Case

#### Digital Identity

Smart contracts give users full ownership and control over their digital identity, i.e., their data, reputation, and assets. At the same time, they give enterprises the ability to know their customers effortlessly by making the process of meeting Know Your customer (KYC) requirements as frictionless as possible.

#### Financial Data Recording

Financial organizations can use smart contracts for accurate and transparent financial data recording. By making financial data uniformly and immediately accessible to multiple organizations at once, smart contracts vastly improve the accuracy of financial reporting and significantly reduce the cost of audits. Smart contracts also support increased market stability since they guarantee data integrity. Finally, because they enable cost-sharing between multiple organizations, they cut accounting costs across the board.

#### Healthcare&#x20;

Personal health records can easily be encoded and stored on the blockchain, where they would be accessible only to pre-approved parties with a private key. Not only would this make personal health records indestructible, confidential, and accessible, blockchain storage would also make it possible for medical research to be conducted in compliance with HIPAA regulations without incurring the prohibitive costs or heavy administrative burdens of doing so. Receipts for medical procedures, like surgeries, can automatically be sent to insurance providers as proof of delivery. The ledger can even serve as a general framework for healthcare management. For instance, drug prescriptions can be supervised, test results can be shared, and healthcare supplies can be inventoried and tracked on the blockchain.&#x20;

#### Real Estate

Currently, to rent or sell real estate, it is necessary to rely on intermediaries at various stages of the process -- first, to list and advertise the property, and then to execute the lease or finalize the sale. This costs time and money. However, the whole process, from listing to signing, can be streamlined by advertising the property on the ledger and using smart contracts to sign-off on the exchange, without involving intermediaries, such as lawyers or real estate agents.

## Conclusion

Smart contracts will become more widely used for business dealings in the future. A smart contract's greatest strength is that it is automatically self-enforcing, thus rendering the onerous, costly task of verifying contract compliance superfluous. They can, for this reason, be processed with unprecedented efficiency, speed, and economy. And, when combined with blockchain technology, smart contracts provide unprecedented safety, security, and transparency as well. As the potential of smart contracts is realized over the coming years and the obstacles to their adoption are overcome, their revolutionary impact will be felt across industries worldwide.

####
