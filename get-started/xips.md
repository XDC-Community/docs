# XIPs

## What is an XIP?

XIP stands for XDC Network Improvement Proposal. An XIP is a design document providing information to the XDC community, or describing a new feature for XDC or its processes or environment. The XIP should provide a concise technical specification of the feature and a rationale for the feature. The XIP author is responsible for building consensus within the community and documenting dissenting opinions.

## XIP Rationale

We intend XIPs to be the primary mechanisms for proposing new features, for collecting community technical input on an issue, and for documenting the design decisions that have gone into the XDC Network. Because the XIPs are maintained as text files in a versioned repository, their revision history is the historical record of the feature proposal.

For XDC implementers, XIPs are a convenient way to track the progress of their implementation. Ideally each implementation maintainer would list the XIPs that they have implemented. This will give end users a convenient way to know the current status of a given implementation or library.

## XIP Types

There are three types of XIP:

* A **Standards Track XIP** describes any change that affects most or all XDC Network implementations, such as—a change to the network protocol, a change in block or transaction validity rules, proposed application standards/conventions, or any change or addition that affects the interoperability of applications using XDC. Standards Track XIPs consist of three parts—a design document, an implementation, and (if warranted) an update to the [formal specification](https://github.com/XinFinOrg/XDPoSChain). Furthermore, Standards Track XIPs can be broken down into the following categories:
  * **Core**: improvements requiring a consensus fork, as well as changes that are not necessarily consensus critical but may be relevant to “core dev” discussions.
  * **Networking**: includes improvements around devp2p, as well as proposed improvements to network protocol specifications.
  * **Interface**: includes improvements around client [API/RPC](https://github.com/XDC-Community) specifications and standards, and also certain language-level standards like method names and [contract ABIs](https://github.com/XDC-Community). The label “interface” aligns with the \[interfaces repo] and discussion should primarily occur in that repository before an XIP is submitted to the XIPs repository.
  * **XRC**: application-level standards and conventions, including contract standards such as token standards, name registries, URI schemes, library/package formats, and wallet formats.
* A **Meta XIP** describes a process surrounding the XDC Network or proposes a change to (or an event in) a process. Process XIPs are like Standards Track XIPs but apply to areas other than the XDPoS protocol itself. They may propose an implementation, but not to XDPoS's codebase; they often require community consensus; unlike Informational XIPs, they are more than recommendations, and users are typically not free to ignore them. Examples include procedures, guidelines, changes to the decision-making process, and changes to the tools or environment used in XDC Network development. Any meta-XIP is also considered a Process XIP.
* An **Informational XIP** describes an XDC Network design issue, or provides general guidelines or information to the XDC community, but does not propose a new feature. Informational XIPs do not necessarily represent XDC community consensus or a recommendation, so users and implementers are free to ignore Informational XIPs or follow their advice.

It is highly recommended that a single XIP contain a single key proposal or new idea. The more focused the XIP, the more successful it tends to be. A change to one client doesn't require an XIP; a change that affects multiple clients, or defines a standard for multiple apps to use, does.

An XIP must meet certain minimum criteria. It must be a clear and complete description of the proposed enhancement. The enhancement must represent a net improvement. The proposed implementation, if applicable, must be solid and must not complicate the protocol unduly.

### Special Requirements for Core XIPs

If a **Core** XIP mentions or proposes changes to the EVM (Ethereum Virtual Machine), an [EIP](https://eips.ethereum.org/) should be created that addresses the desired changes to the EVM.

## Creating an XIP

### Contributing

First review XIP-1. Then clone the repository and add your XIP to it. There is a [template XIP here](https://github.com/XDC-Community/XIPs.github.io/blob/main/XIPS/xip-template.md). Then submit a Pull Request to XDC Community's [XIPs repository](https://github.com/XDC-Community/XIPs.github.io/pulls).

**Each XIP should have the following parts:**

* Preamble - RFC 822 style headers containing metadata about the XIP, including the XIP number, a short descriptive title (limited to a maximum of 44 characters), a description (limited to a maximum of 140 characters), and the author details. Irrespective of the category, the title and description should not include XIP number. See [below](XIP-1.md#XIP-header-preamble) for details.
* Abstract - Abstract is a multi-sentence (short paragraph) technical summary. This should be a very terse and human-readable version of the specification section. Someone should be able to read only the abstract to get the gist of what this specification does.
* Motivation _(optional)_ - A motivation section is critical for XIPs that want to change the XDPoS protocol. It should clearly explain why the existing protocol specification is inadequate to address the problem that the XIP solves. This section may be omitted if the motivation is evident.
* Specification - The technical specification should describe the syntax and semantics of any new feature. The specification should be detailed enough to allow competing, interoperable implementations for any of the current XDC Network platforms.
* Rationale - The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work, e.g. how the feature is supported in other languages. The rationale should discuss important objections or concerns raised during discussion around the XIP.
* Backwards Compatibility _(optional)_ - All XIPs that introduce backwards incompatibilities must include a section describing these incompatibilities and their consequences. The XIP must explain how the author proposes to deal with these incompatibilities. This section may be omitted if the proposal does not introduce any backwards incompatibilities, but this section must be included if backward incompatibilities exist.
* Test Cases _(optional)_ - Test cases for an implementation are mandatory for XIPs that are affecting consensus changes. Tests should either be inlined in the XIP as data (such as input/expected output pairs, or included in `../assets/XIP-###/<filename>`. This section may be omitted for non-Core proposals.
* Reference Implementation _(optional)_ - An optional section that contains a reference/example implementation that people can use to assist in understanding or implementing this specification. This section may be omitted for all XIPs.
* Security Considerations - All XIPs must contain a section that discusses the security implications/considerations relevant to the proposed change. Include information that might be important for security discussions, surfaces risks and can be used throughout the life-cycle of the proposal. E.g. include security-relevant design decisions, concerns, important discussions, implementation-specific guidance and pitfalls, an outline of threats and risks and how they are being addressed. XIP submissions missing the "Security Considerations" section will be rejected. An XIP cannot proceed to status "Final" without a Security Considerations discussion deemed sufficient by the reviewers.
* Copyright Waiver - All XIPs must be in the public domain. The copyright waiver MUST link to the license file and use the following wording: `Copyright and related rights waived via [CC0](../LICENSE.md).`

### XIPs formats and templates

XIPs should be written in [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) format. There is a [template](https://github.com/XDC-Community/XIPs.github.io/blob/main/XIPS/xip-template.md) to follow.

### Header and Preamble

Each XIP must begin with an [RFC 822](https://www.ietf.org/rfc/rfc822.txt) style header preamble, preceded and followed by three hyphens (`---`). This header is also termed ["front matter" by Jekyll](https://jekyllrb.com/docs/front-matter/). The headers must appear in the following order.

`XIP`: _XIP number_ (this is determined by the XIP editor)

`title`: _The XIP title is a few words, not a complete sentence_

`description`: _Description is one full (short) sentence_

`author`: _The list of the author's or authors' name(s) and/or username(s), or name(s) and email(s). Details are below._

`discussions-to`: _The url pointing to the official discussion thread_

`status`: _Draft, Review, Last Call, Final, Stagnant, Withdrawn, Living_

`last-call-deadline`: _The date last call period ends on_ (Optional field, only needed when status is `Last Call`)

`type`: _One of `Standards Track`, `Meta`, or `Informational`_

`category`: _One of `Core`, `Networking`, `Interface`, or `XRC`_ (Optional field, only needed for `Standards Track` XIPs)

`created`: _Date the XIP was created on_

`requires`: _XIP number(s)_ (Optional field)

`withdrawal-reason`: _A sentence explaining why the XIP was withdrawn._ (Optional field, only needed when status is `Withdrawn`)

Headers that permit lists must separate elements with commas.

Headers requiring dates will always do so in the format of ISO 8601 (yyyy-mm-dd).

#### `author` header

The `author` header lists the names, email addresses or usernames of the authors/owners of the XIP. Those who prefer anonymity may use a username only, or a first name and a username. The format of the `author` header value must be:

> Random J. User \<address@dom.ain> or

> Random J. User (@username) if the email address or GitHub username is included, and

> Random J. User if the email address is not given.

It is not possible to use both an email and a GitHub username at the same time. If important to include both, one could include their name twice, once with the GitHub username, and once with the email.

At least one author must use a GitHub username, in order to get notified on change requests and have the capability to approve or reject them.

#### `discussions-to` header

While an XIP is a draft, a `discussions-to` header will indicate the URL where the XIP is being discussed.

The preferred discussion URL is a topic on [XDC.dev](https://xdc.dev/). The URL cannot point to Github pull requests, any URL which is ephemeral, and any URL which can get locked over time (i.e. Reddit topics).

#### `type` header

The `type` header specifies the type of XIP: Standards Track, Meta, or Informational. If the track is Standards please include the subcategory (core, networking, interface, or XRC).

#### `category` header

The `category` header specifies the XIP's category. This is required for standards-track XIPs only.

#### `created` header

The `created` header records the date that the XIP was assigned a number. Both headers should be in yyyy-mm-dd format, e.g. 2001-08-14.

#### `requires` header

XIPs may have a `requires` header, indicating the XIP numbers that this XIP depends on.

## XIP Work Flow

### Shepherding an XIP

Parties involved in the process are you, the champion or _XIP author_, the [_XIP editors_](xips.md#XIP-editors), and the [_XDC Core Developers_](https://github.com/XDC-Community).

Before you begin writing a formal XIP, you should vet your idea. Ask the XDC community first if an idea is original to avoid wasting time on something that will be rejected based on prior research. It is thus recommended to open a discussion thread on [XDC.dev](https://xdc.dev) to do this.

Once the idea has been vetted, your next responsibility will be to present (by means of an XIP) the idea to the reviewers and all interested parties, invite editors, developers, and the community to give feedback on the aforementioned channels. You should try and gauge whether the interest in your XIP is commensurate with both the work involved in implementing it and how many parties will have to conform to it. For example, the work required for implementing a Core XIP will be much greater than for an XRC and the XIP will need sufficient interest from the XDC Network client teams. Negative community feedback will be taken into consideration and may prevent your XIP from moving past the Draft stage.

### Core XIPs

For Core XIPs, given that they require client implementations to be considered **Final** (see "XIPs Process" below), you will need to either provide an implementation for clients or convince clients to implement your XIP.

The best way to get client implementers to review your XIP is to present it on an AllCoreDevs call. You can request to do so by posting a comment linking your XIP on an [AllCoreDevs agenda GitHub Issue](https://github.com/XDC-Community).

The AllCoreDevs call serves as a way for client implementers to do three things. First, to discuss the technical merits of XIPs. Second, to gauge what other clients will be implementing. Third, to coordinate XIP implementation for network upgrades.

These calls generally result in a "rough consensus" around what XIPs should be implemented. This "rough consensus" rests on the assumptions that XIPs are not contentious enough to cause a network split and that they are technically sound.

:warning: The XIPs process and AllCoreDevs call were not designed to address contentious non-technical issues, but, due to the lack of other ways to address these, often end up entangled in them. This puts the burden on client implementers to try and gauge community sentiment, which hinders the technical coordination function of XIPs and AllCoreDevs calls. If you are shepherding an XIP, you can make the process of building community consensus easier by making sure that [the XDC.dev](https://xdc.dev) thread for your XIP includes or links to as much of the community discussion as possible and that various stakeholders are well-represented.

_In short, your role as the champion is to write the XIP using the style and format described below, shepherd the discussions in the appropriate forums, and build community consensus around the idea._

### XIP Process

The following is the standardization process for all XIPs in all tracks:![](../.gitbook/assets/XIP-process-update.jpg)

**Idea** - An idea that is pre-draft. This is not tracked within the XIP Repository.

**Draft** - The first formally tracked stage of an XIP in development. An XIP is merged by an XIP Editor into the XIP repository when properly formatted.

**Review** - An XIP Author marks an XIP as ready for and requesting Peer Review.

**Last Call** - This is the final review window for an XIP before moving to `Final`. An XIP editor will assign `Last Call` status and set a review end date (`last-call-deadline`), typically 14 days later.

If this period results in necessary normative changes it will revert the XIP to `Review`.

**Final** - This XIP represents the final standard. A Final XIP exists in a state of finality and should only be updated to correct errata and add non-normative clarifications.

**Stagnant** - Any XIP in `Draft` or `Review` or `Last Call` if inactive for a period of 6 months or greater is moved to `Stagnant`. An XIP may be resurrected from this state by Authors or XIP Editors through moving it back to `Draft` or it's earlier status. If not resurrected, a proposal may stay forever in this status.

> _XIP Authors are notified of any algorithmic change to the status of their XIP_

**Withdrawn** - The XIP Author(s) have withdrawn the proposed XIP. This state has finality and can no longer be resurrected using this XIP number. If the idea is pursued at later date it is considered a new proposal.

**Living** - A special status for XIPs that are designed to be continually updated and not reach a state of finality. This includes most notably XIP-1.

## Linking to External Resources

Links to external resources **SHOULD NOT** be included. External resources may disappear, move, or change unexpectedly.

## Linking to other XIPs

References to other XIPs should follow the format `XIP-N` where `N` is the XIP number you are referring to. Each XIP that is referenced in an XIP **MUST** be accompanied by a relative markdown link the first time it is referenced, and **MAY** be accompanied by a link on subsequent references. The link **MUST** always be done via relative paths so that the links work in this GitHub repository, forks of this repository, the main XIPs site, mirrors of the main XIP site, etc. For example, you would link to this XIP with `[XIP-1](./XIP-1.md)`.

## Auxiliary Files

Images, diagrams and auxiliary files should be included in a subdirectory of the `assets` folder for that XIP as follows: `assets/XIP-N` (where **N** is to be replaced with the XIP number). When linking to an image in the XIP, use relative links such as `../assets/XIP-1/image.png`.

## Transferring XIP Ownership

It occasionally becomes necessary to transfer ownership of XIPs to a new champion. In general, we'd like to retain the original author as a co-author of the transferred XIP, but that's really up to the original author. A good reason to transfer ownership is because the original author no longer has the time or interest in updating it or following through with the XIP process, or has fallen off the face of the 'net (i.e. is unreachable or isn't responding to email). A bad reason to transfer ownership is because you don't agree with the direction of the XIP. We try to build consensus around an XIP, but if that's not possible, you can always submit a competing XIP.

If you are interested in assuming ownership of an XIP, send a message asking to take over, addressed to both the original author and the XIP editor. If the original author doesn't respond to the email in a timely manner, the XIP editor will make a unilateral decision (it's not like such decisions can't be reversed :)).

## XIP Editors

The current XIP editors are

* Jon McBee (@walterblueu)
* Fisher Yu (@fishermanymc)
* Phillipe Menezes&#x20;

Emeritus XIP editors are

If you would like to become an XIP editor, please check [the XIP Editor Handbook](https://www.xdc.community/docs/xip-editor-handbook/).

## XIP Editor Responsibilities

For each new XIP that comes in, an editor does the following:

* Read the XIP to check if it is ready: sound and complete. The ideas must make technical sense, even if they don't seem likely to get to final status.
* The title should accurately describe the content.
* Check the XIP for language (spelling, grammar, sentence structure, etc.), markup (GitHub flavored Markdown), code style

If the XIP isn't ready, the editor will send it back to the author for revision, with specific instructions.

Once the XIP is ready for the repository, the XIP editor will:

* Assign an XIP number (generally the PR number, but the decision is with the editors)
* Merge the corresponding [pull request](https://github.com/XDC-Community/XIPs.github.io/pulls)
* Send a message back to the XIP author with the next step.

Many XIPs are written and maintained by developers with write access to the XDPoS codebase. The XIP editors monitor XIP changes, and correct any structure, grammar, spelling, or markup mistakes we see.

The editors don't pass judgment on XIPs. We merely do the administrative & editorial part.

## Style Guide

### Titles

The `title` field in the preamble:

* Should not include the word "standard" or any variation thereof; and
* Should not include the XIP's number.

### Descriptions

The `description` field in the preamble:

* Should not include the word "standard" or any variation thereof; and
* Should not include the XIP's number.

### XIP numbers

When referring to an XIP by number, it should be written in the hyphenated form `XIP-X` where `X` is the XIP's assigned number.

### RFC 2119

XIPs are encouraged to follow [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt) for terminology and to insert the following at the beginning of the Specification section:

> The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.



## History

This document was derived heavily from [Ethereum's EIP-1](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md) written by Martin Becze, Hudson Jameson, et al. which in turn was derived from [Bitcoin's BIP-0001](https://github.com/bitcoin/bips) written by Amir Taaki which in turn was derived from [Python's PEP-0001](https://www.python.org/dev/peps/). In many places text was simply copied and modified. Although the PEP-0001 text was written by Barry Warsaw, Jeremy Hylton, and David Goodger, they are not responsible for its use in the XDC Network Improvement Process, and should not be bothered with technical questions specific to the XDC Network or the XIP. Please direct all comments to the XIP editors.
