# Consensus Mechanism

XDC Delegated Proof of Stake (XDPoS) is amongst the fastest, most efficient, decentralized, and flexible consensus model in use today. XDPoS leverages the power of stakeholders to resolve consensus issues fairly and democratically, and since nominators must satisfy self-KYC requirements, XDPoS is more enterprise-ready and regulatory-compliant than other blockchains.

## **Definitions** <a href="#definitions" id="definitions"></a>

**XDPoS (XDC Delegated Proof of Stake):** A consensus mechanism designed to select network validators by having coin holders delegate their votes. **Validator (usually denoted L):** A node on the network responsible for producing and validating blocks. **Nominator**: A coin holder who stakes or delegates their coins to one or more validators. **Epoch: (usually denoted 𝑁):** Corresponding to 𝐿∈ℕ blocks, the time required for a specific number of blocks to get finalized on the chain.

## **Voting** <a href="#voting" id="voting"></a>

**Staking**

* Users can stake their coins by sending them to the staking contract.
  * The staked amount must be greater than a predetermined minimum (MIN\_STAKE).
  * After staking, users will have to wait for two epochs (epoch N+2) to be eligible to vote for a validator.

**Delegating**

* After staking and waiting two epochs, a nominator can vote for a validator.
  * The vote will be effective in epoch N+2, where N is the current epoch.
  * New votes can only be cast once every two epochs.
  * A single nominator can only vote for a single validator. If users want to delegate to multiple validators, they must divide up their coins among several accounts, registering individually as nominators.

**Withdrawing**

* Nominators can withdraw their staked coins.
  * To do so, they must rescind their vote.
  * After waiting a certain number of epochs (WITHDRAWAL\_PERIOD), the staked coins will be unlocked, and the smart contract will return them to the nominator's wallet.

## **Registering Validators** <a href="#registering-validators" id="registering-validators"></a>

* A certain number of coins (REGISTRATION\_VALUE) must be sent to the smart contract's register function to limit the number of participants. Those coins will be burnt.
* One of the following KYC (Know Your Customer) certificates must be uploaded, as a PDF, when setting up a Masternode. This will ensure the blockchain is enterprise-ready and regulatory-compliant:
  * For individuals, [click here](https://docs.google.com/document/d/1Us9chjXEDYrDOpfuwWITxaQOSEYxYIpJpwWuYK0TyXY/edit).
  * For organizations, [click here](https://docs.google.com/document/d/1eyjFp3DXhrpLscngELocmXFwJ\_Y8H9si6n8Z2SLADhg/edit).
* The KYC certificate, which will be visible to all on the public network, must be signed by any one of the following:
  * Company Secretary
  * Notary Public
  * Chartered Secretary
  * Consulate
  * Lawyer with Seal
* There is a limited number of registered validators (MAX\_REGISTERED\_VALIDATORS).
* Validators will have to wait for two epochs after staking (N+2) to be eligible to vote.
* A validator's staked amount must be greater than a predetermined minimum (MIN\_TOTAL\_STAKE).
* Every epoch, the top validators (by stake) are included in the Active Validator Set, which produces blocks for the following epoch.

## **Choosing Validators** <a href="#choosing-validators" id="choosing-validators"></a>

Choose L validators for a certain epoch N.

### **Balancing the Stakes** <a href="#balancing-the-stakes" id="balancing-the-stakes"></a>

The DPoS contract balances all the stakes by finding the minimum stake for all eligible validators (e.g., take the top 1000 validators) and balancing all the stakes by refunding the users' contributions that overflowed the stake.For instance, we want to balance all stakes to S, where S is the minimum stake. If a validator has S+100 stakes because of three contributions: _𝑆_−10, 5 and 100, then the last nominator will be refunded 95.An epoch would be the maximum number of validators allowed in this model, e.g., 1,001 (+/- an hour on a 4-seconds block time chain).

### **Rewards** <a href="#rewards" id="rewards"></a>

Rewards are allocated via the rewards contract.

* Rewards for active validators are calculated as a percentage of the total stake, `VALIDATOR_REWARD`.
* Nominators are also rewarded as an incentive to stake. Either the rewards contract can pay nominators directly, minus a fee paid to the validator (determiend when registering), or validators can calculate rewards and pay nominators after registering themselves.

### **Forks, Bad Behavior, and Double-Spending** <a href="#forks-bad-behavior-and-double-spending" id="forks-bad-behavior-and-double-spending"></a>

Transactions are re-verified to prevent forks. Therefore, every transaction will have two signatures: two validators, both the block creator and the block verifier, will sign. The block verifier will check for bad behavior or double-spending.

### **Slashing** <a href="#slashing" id="slashing"></a>

For the network to be secure, bad behavior must be swiftly detected and punished.**Off-chain**It is relatively easy to detect bad behavior off-chain. The Validator Set Contract includes a`reportBenign` function to which validators can resort, if necessary. If more than 2/3 of the validators agree that bad behavior occurs, the misbehaving validator will be slashed. Examples of bad behavior include:

* Habitually being late to propagate blocks.
* Being offline for more than 24 hours.

**On-chain**As for detecting bad behavior on-chain, when a validator signs two blocks with the same step (equivocation), the `reportMalicious` function can be called in tandem with the correct data (the validator's two signatures and the signed message, which contain the step of the blocks) and an RLP decoder. Moreover, to detect a validator that hasn't signed any blocks for the past 256 blocks on-chain, one need only to challenge the validator to submit the signed block along with the signature itself.

### **Spurious KYC Certification** <a href="#spurious-kyc-certification" id="spurious-kyc-certification"></a>

Suppose a validator appears to have uploaded a spurious KYC certification when registering. In that case, a validator can call a `reportMalicious` function, which will slash the validator if more than 2/3 of the validators agree that the KYC certification is spurious, and confiscate some or all of the validator's stake.

## **Parameters** <a href="#parameters" id="parameters"></a>

Suggested parameter values:`MIN_STAKE`: 10,000,000`XDC VALIDATOR_REWARD`: 10% xdc (Yearly)`VALIDATOR_SET_SIZE`: 18`REWARDS_TRANSFER`: Every next block of an epoch`WITHDRAWAL_PERIOD`: Set of Epoch ( 1 Epoch = 900 blocks)`MAX_REGISTERED_VALIDATORS`: 5000
