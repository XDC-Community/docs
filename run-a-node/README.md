# Run a Node

The XDC Network is a KYC-enforced Enterprise-grade hybrid blockchain network with many advantages. The network consists of many computers around the globe running special software (the XDC client) which allows them to perform their functions for the XDC blockchain. Computers running this special software are referred to as "Nodes".

## Types of Nodes

A "Full Node" is a Node that keeps a complete copy of the XDC blockchain. Anyone can run a Full Node.

Full-Nodes can be broken down into:

* **Master Nodes** - these participate in consensus (they validate transactions). There are a maximum of 108 of these and they require the Owner of the Node to be identified through a KYC process in addition to staking 10M XDC.

* **Standby Nodes** - these keep an up-to-date copy of the XDC blockchain and do not normally participate in consensus (i.e they don't normally validate transactions on the network). The exception to this however, is that if a Master Node goes offline (or is slashed for any reason), then a Standby Node will be temporarily elevated to Master Node status and will perform the functions of a Master Node until the original Master Node comes back online, at which point the Standby Node resumes its Standby Node status. There are a maximum of 192 Standby Nodes and these also require the Owner of the Node to be identified through the same KYC process as for Master Nodes in addition to also being required to stake 10M XDC.

* **Non-Validator Full Nodes** - these do not participate in consensus. There are a maximum of 4700 of these and anyone can run one without requiring KYC or staking any XDC. The utility of this is so users can maintain a copy of the blockchain to run local queries on.
