# Smart Contract Details

A blockchain is a list of records stored on cryptographically interlinked blocks. Each block consists of transaction data, a timestamp, and a hash of the preceding block. With every link in the chain connected to every other link, blockchain data is highly resistant to change or modification. In addition, since a blockchain is a decentralized network, all permitted users can participate as equals. There is no need for intermediaries (middlemen), which saves time and cuts costs. Blockchains are therefore immutable, faster, cheaper and more secure than traditional networks. For this reason, financial institutions and governments all around the world are currently investigating or preparing to adopt the technology.

Now imagine self-executing contracts, converted to computer code, then stored and replicated on a blockchain -- that is a smart contract.&#x20;

## **What Are Smart Contracts?**

A smart contract is a computer code running on a blockchain that establishes rules on which two or more parties can agree. If and when the pre-established rules are followed, the agreement is automatically enforced. A smart contract facilitates, verifies and enforces the execution of agreements or transactions between parties with divergent interests, without intermediaries and while eliminating the need for trust, unlike with traditional contract terms where contracting parties will incur the costs and risks of trusting one another or an intermediary while exchanging goods or services.

Bitcoin was the first blockchain to support basic smart contracts. Its network of nodes only validated transactions if certain conditions were met. Here, we have an example of a rudimentary smart contract, where we use Set and Get functions:

```solidity
pragma solidity 0.4.0;

// Imagine a big integer that the whole world could share
contract SimpleStorage {
    uint storedData;
    
    function set(uint x) public {
        storedData = x;
    }

    function get() constant public returns (uint) {
        return storedData;
    }

    function increment (uint n) public {
        storedData = storedData + n;
        return;
    }

    function decrement (uint n) public {
        storedData = storedData - n;
        return;
    }
}
```

## **Key Features of Smart Contracts**

#### Immutable

Since important documents and data are encrypted on a shared ledger, which serves as a permanent record, nobody can claim they got lost or destroyed.

#### Transparent

Smart contracts limit the risk of disputes arising from miscommunication between the contracting parties by making the agreement terms open to all.

#### Autonomous

Since the agreement is automatically self-enforcing, there is no need to work with a broker, a lawyer, or other intermediaries. Smart contracts are, for this reason, safe from the dangers of unscrupulous or incompetent third parties.

#### Fast

Since smart contracts are automated, no paperwork is required, and no time is spent resolving errors that often result from manual documents.

#### Cheap

Smart contracts cut costs because there is no need to work with a third party, like a broker or a lawyer. The code is the law.

#### Secure

Cryptographic techniques keep smart contract data safe and secure at all times so that even the most sensitive information can be handled without fear of loss or theft.

## **Obstacles to Adoption**

**Inflexibility**

Smart contracts, once in effect, cannot be upgraded or replaced. If done, it will result in the loss of the smart contract's binding terms from the blockchain.

**Complexity of Contract Writing**

Writing smart contracts is no small task. Doing so perfectly assumes Turing-complete context, which is hard to achieve and analyze. It is a bit like proving that a computer program is entirely free from bugs.

**Oracles**

Oracles are third-party services that provide off-chain data or external information to a smart contract on the blockchain. However, one drawback to oracles is they are run and operated by a third party, which tends to centralize smart contracts, depriving them of their trustlessness.

## **Overcoming the Obstacles to Adoption**

**Upgradeable Smart Contracts**

Several problems with smart contracts, such as their inability to upgrade, can be solved using modular smart contracts. If building on XDC, _modular.sol_ files can be easily upgraded without losing information.

When using Delegatecall-based proxies for contract upgrading, logic data are kept in separate contracts, while the data contract (the proxy) calls the logic contract through Delegatecall. The proxy pattern requires that memory layouts remain consistent between contract and compiler upgrades. However, applying the Delegatecall-based proxy pattern is not easy. A developer insufficiently familiar with EVM internals can inadvertently introduce critical bugs during an upgrade.

**Contract Writing**

Smart contracts need not be Turing-complete to be usable in high-stakes settings.

**Consensus Protocols**

Oracles can be supplemented or replaced by community-based consensus protocols, which give governing members a window into the outside world.

## **Applications of Smart Contracts**

#### Digital Identity

Smart contracts give users full ownership and control over their digital identity, i.e., their data, reputation, and assets. At the same time, they give enterprises the ability to know their customers effortlessly by making the process of meeting Know Your customer (KYC) requirements as frictionless as possible.

#### Financial Data Recording

Financial organizations can use smart contracts for accurate and transparent financial data recording. By making financial data uniformly and immediately accessible to multiple organizations at once, smart contracts vastly improve the accuracy of financial reporting and significantly reduce the cost of audits. Smart contracts also support increased market stability since they guarantee data integrity. Finally, because they enable cost-sharing between multiple organizations, they cut accounting costs across the board.

#### Healthcare

Personal health records can easily be encoded and stored on the blockchain, where they would be accessible only to pre-approved parties with a private key. Not only would this make personal health records indestructible, confidential, and accessible, blockchain storage would also make it possible for medical research to be conducted in compliance with HIPAA regulations without incurring the prohibitive costs or heavy administrative burdens of doing so. Receipts for medical procedures, like surgeries, can automatically be sent to insurance providers as proof of delivery. The ledger can even serve as a general framework for healthcare management. For instance, drug prescriptions can be supervised, test results can be shared, and healthcare supplies can be inventoried and tracked on the blockchain.&#x20;

#### Real Estate

Currently, to rent or sell real estate, it is necessary to rely on intermediaries at various stages of the process -- first, to list and advertise the property, and then to execute the lease or finalize the sale. This costs time and money. However, the whole process, from listing to signing, can be streamlined by advertising the property on the ledger and using smart contracts to sign-off on the exchange, without involving intermediaries, such as lawyers or real estate agents.

## **Conclusion**

Smart contracts will become more widely used for business dealings in the future. A smart contract's greatest strength is that it is automatically self-enforcing, thus rendering the onerous, costly task of verifying contract compliance superfluous. They can, for this reason, be processed with unprecedented efficiency, speed, and economy. And, when combined with blockchain technology, smart contracts provide unprecedented safety, security, and transparency as well. As the potential of smart contracts is realized over the coming years and the obstacles to their adoption are overcome, their revolutionary impact will be felt across industries worldwide.
