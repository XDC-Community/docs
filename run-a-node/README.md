# Run a Node

The XDC Network is a KYC-enforced Enterprise-grade hybrid blockchain network with many advantages. The network consists of many computers around the globe running special software (the XDC client) which allows them to perform their functions for the XDC blockchain. Computers running this special software are referred to as "Nodes".

## Types of Nodes

A "Full Node" is a Node that keeps a complete copy of the XDC blockchain. Anyone can run a Full Node.

Full-Nodes can be broken down into:

* **Master Nodes** - these participate in consensus (they validate transactions). There are a maximum of 108 of these and they require the Owner of the Node to be identified through a KYC process in addition to staking 10M XDC.

* **Standby Nodes** - these keep an up-to-date copy of the XDC blockchain and do not normally participate in consensus (i.e they don't normally validate transactions on the network). The exception to this however, is that if a Master Node goes offline (or is slashed for any reason), then a Standby Node will be temporarily elevated to Master Node status and will perform the functions of a Master Node until the original Master Node comes back online, at which point the Standby Node resumes its Standby Node status. There are a maximum of 192 Standby Nodes and these also require the Owner of the Node to be identified through the same KYC process as for Master Nodes in addition to also being required to stake 10M XDC.

* **Non-Validator Full Nodes** - these do not participate in consensus. There are a maximum of 4700 of these and anyone can run one without requiring KYC or staking any XDC. The utility of this is so users can maintain a copy of the blockchain to run local queries on.

## How the XDC Network Identifies and Pays Nodes

The XDC Network uses 2 addresses on the network to identify and pay each node. These are known as the "Coinbase address" (just a jargon term, not related to Coinbase the company) and the "Masternode-owner's address". Each of these addresses is just a standard wallet address on the XDC Network.

The XDC client running on your computer identifies your machine to the network by presenting its Coinbase address. The XDC client keeps a record of its own Coinbase address by keeping a "keystore file" (also known as a UTC file), which is essentially just a normal XDC wallet keystore file, but in this case it has no password (or rather the password field is blank). No XDC coins are ever sent to this address and it is not used for any transactions. The Coinbase address is used solely by your XDC client to identify your Node to the network.

The Masternode-owner's address is also a standard XDC wallet address. This however is the address from which you send your 10M XDC to register your node, and importantly, it is also the address to which your Node's payments are sent. YOU SHOULD NEVER EVER EVER EVER put the keystore file for your Masternode-owner's address onto your Node computer. If an attacker obtains both of the keystore files (and your Masternode-owner's address password), they could not only compromise the funds in the wallet of the Masternode-owner's address, but also potentially resign the node and collect the 10M XDC refund. So… IMPORTANT! - DON'T PUT YOUR MASTERNODE OWNER'S ADDRESS KEYSTORE FILE ANYWHERE NEAR YOUR NODE.

At the time that the KYC is done and the Node is registered, you are essentially registering and linking both of these addresses to each other. The XDC Network then knows which Masternode-owner's address owns which Coinbase address, or rather, it knows which wallet to pay for the computing contribution provided by which Node.

_Just as an aside, you will also see the Coinbase address referred by some as the "Masternode address" (as distinct from the "Masternode OWNERS address")._
