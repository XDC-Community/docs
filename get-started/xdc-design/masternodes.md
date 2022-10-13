# Masternodes

The XDC Network’s operation relies on Masternodes which are operated by third parties.  Some operators have set up multiple Masternodes; XinFin Fintech operates three Masternodes which it set up originally to run the Network at inception, whereas XDC Foundation does not operate any Masternodes.  Each Masternode falls into one of three subcategories:  Validator, Standby, or Archival.

&#x20;

Validator and Standby Masternodes require the operator stake 10 million XDC and comply with KYC procedures.  The staked XDC is locked in a smart contract and can be released only after a 30-day cooling off period following the operator’s resignation of the Masternode.  The Validator and Standby Masternode operators are incentivized to maintain the Network—and ensure the Masternodes do not act maliciously against the network—since any loss of trust in the Network may result in a reduction in the value of the staked XDC which cannot be immediately disposed of.

&#x20;

There are 108 Validator Masternodes (or simply “**Validators**”) on the Network.  Validators operate pursuant to the XDPoS consensus mechanism to validate blocks before they are recorded on the Network blockchain.  Only Validators propose and validate new blocks.  During each validation cycle, Validators are selected in a random round-robin process to propose and to validate new blocks.  Except with regard to the three Validators operated by XinFin Fintech, the Project Team has no control over the operation of the 108 Validators and does not control or necessarily know where the nodes are set up geographically.

&#x20;

Changes to the Network protocol are safeguarded and decentralized through two distinct processes.  A change to the underlying code must be proposed through the XIP process whereby it is discussed and carefully vetted by the community.  Once consensus is reached in the XIP process, the code is edited and becomes available as an update to the local copy of the code which is run on each Validator.  However, that update can be either accepted or refused by each Validator operator individually and does not become effective until adopted—by updating the local instance of the code—by two thirds of the Validator operators.

&#x20;

Standby Masternodes (or “**Standby Nodes**”) are identical in form and function to Validators but do not participate in the validation process.  Rather, as the name implies, Standby Nodes are on standby and are called into action only when the number of Validators drops below 108.  As of September 26, 2022, there are 100 Standby Nodes on the Network out of a total available 192 (i.e. only 92 more Standby Nodes can be created).  As with most Validators, all Standby Nodes are owned by independent third parties.

&#x20;

Archival Masternodes (or “**Archival Nodes**”) do not require any XDC be staked and serve a different purpose than Validators and Standby Nodes.  Archival Nodes contain the same Network blockchain data and history that are tracked by Validators and Standby Nodes but lack validating functionality (meaning that even if all current 208 Validator and Standby Nodes unexpectedly went offline, no Archival Nodes could be promoted).  Anyone can set up an Archival Node and parties have various reasons for doing so.  A common reason for creating an Archival Node is to maintain a local copy of the Network blockchain which may be efficiently accessed by a third party’s other programs via API or otherwise.

&#x20;

To date, there is and has been a significant distinction between the roles of Masternode operators and the community members at large.  Validator and Standby Node operators (many of whom, but not all, are active community members) don't have voting power per se.  They stake 10M XDC to establish their Masternode after which their instance of XDPoS "participates" in the Network protocol (the on-chain governance).  The only conscious decision the operators make is to update their software (or not) with XDPoS revisions if and when they are released.
