# XIP Proposals

## XIPs

XDC Network Improvement Proposals (XIPs) describe standards for the XDC platform, including core protocol specifications, client APIs, and contract standards. Network upgrades are discussed separately.

### Contributing

First review XIP-1. Then clone the repository and add your XIP to it. There is a [template XIP here](https://github.com/XDC-Community/XIPs.github.io/blob/main/XIPS/xip-template.md). Then submit a Pull Request to XDC Community's [XIPs repository](https://github.com/XDC-Community/XIPs.github.io/pulls).

### XIP status terms

* **Idea** - An idea that is pre-draft. This is not tracked within the XIP Repository.
* **Draft** - The first formally tracked stage of an XIP in development. An XIP is merged by an XIP Editor into the XIP repository when properly formatted.
* **Review** - An XIP Author marks an XIP as ready for and requesting Peer Review.
* **Last Call** - This is the final review window for an XIP before moving to FINAL. An XIP editor will assign Last Call status and set a review end date (\`last-call-deadline\`), typically 14 days later. If this period results in necessary normative changes it will revert the XIP to Review.
* **Final** - This XIP represents the final standard. A Final XIP exists in a state of finality and should only be updated to correct errata and add non-normative clarifications.
* **Stagnant** - Any XIP in Draft or Review if inactive for a period of 6 months or greater is moved to Stagnant. An XIP may be resurrected from this state by Authors or XIP Editors through moving it back to Draft.
* **Withdrawn** - The XIP Author(s) have withdrawn the proposed XIP. This state has finality and can no longer be resurrected using this XIP number. If the idea is pursued at later date it is considered a new proposal.
* **Living** - A special status for XIPs that are designed to be continually updated and not reach a state of finality. This includes most notably XIP-1.

### XIP Types

XIPs are separated into a number of types, and each has its own list of XIPs.

#### Standard Track

Describes any change that affects most or all Ethereum implementations, such as a change to the network protocol, a change in block or transaction validity rules, proposed application standards/conventions, or any change or addition that affects the interoperability of applications using Ethereum. Furthermore Standard XIPs can be broken down into the following categories.

**Core**

Improvements requiring a consensus fork, as well as changes that are not necessarily consensus critical but may be relevant to “core dev” discussions.

**Networking**

Includes improvements around devp2p, as well as proposed improvements to network protocol specifications.

**Interface**

Includes improvements around client API/RPC specifications and standards, and also certain language-level standards like method names and contract ABIs. The label “interface” aligns with the interfaces repo and discussion should primarily occur in that repository before an XIP is submitted to the XIPs repository.

**XRC**

Application-level standards and conventions, including contract standards such as token standards, name registries, URI schemes, library/package formats, and wallet formats.

#### Meta

Describes a process surrounding XDC Network or proposes a change to (or an event in) a process. Process XIPs are like Standards Track XIPs but apply to areas other than the XDPoS protocol itself. They may propose an implementation, but not to XDPoS's codebase; they often require community consensus; unlike Informational XIPs, they are more than recommendations, and users are typically not free to ignore them. Examples include procedures, guidelines, changes to the decision-making process, and changes to the tools or environment used in XDC Network development. Any meta-XIP is also considered a Process XIP.

#### Informational

Describes a XDC Network design issue, or provides general guidelines or information to the XDC community, but does not propose a new feature. Informational XIPs do not necessarily represent XDC community consensus or a recommendation, so users and implementers are free to ignore Informational XIPs or follow their advice.
