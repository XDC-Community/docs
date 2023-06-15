# Run a Node

Nodes are computers or servers that run an application software known as clients to perform essential tasks on a blockchain network. These tasks can include transactions, block creation, consensus, network security, and other operational tasks for the network. The tasks and functionalities a node execute depend on the type of node, with each node having different system requirements and deployment processes. This section will provide details and information on how to run and maintain nodes on the XDC Network.

## Masternodes

The XDC Network runs on a globally distributed system of masternodes that participate in a Delegated Proof of Stake (DPoS) consensus mechanism. To enhance network integrity and security, Masternodes are required to complete a KYC process and stake 10,000,000 XDC. Masternodes can be identified as “Validator” or “Standby” Masternodes.

### Validator Masternode

Validator Masternodes operate and participate in XDC Network’s DPoS consensus engine, validating transactions and block creation.&#x20;

### Standby Masternodes

Standby Masternodes (or “Standby Nodes”) are identical in form and function to Validators but do not participate in validating transactions and block creation. These nodes are on standby to fill the role of Validators that drop from network participation.

## Full Node

Full nodes do not participate in block creation or validating transactions like Masternodes so staking and KYC is not required. These nodes can be used to provide the state of the blockchain, transaction history, or as an RPC. A complete state and history can be provided up to the previous 128 blocks, and block header only after the previous 128 blocks to genesis.&#x20;

## Archive Node

This type of node is used to query data, providing everything in the full node plus complete blockchain and state history to genesis. An archive node would be used if details beyond block header are needed, such as account balances and data stored in blocks. These nodes do not have the same functionality or requirements as Masternodes

\


#### &#x20;

\
