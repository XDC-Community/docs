# ISO20022 Data Set APIs

In November 2017, 23 countries under the governance of ISO TC68 Financial Services agreed to work together on defining a framework for a standardized API ecosystem. The working group produced technical specifications for web-based API (WAPI) standardization. The document can be bought from the [ISO website](https://www.iso.org/standard/74353.html).

An API is a set of functions and protocols that application software uses to invoke services and provide greater functionality to applications or to websites. Data accessed via an API may be closed, shared or open, however to expose a consistent view of data to an API, it requires the data to be uniformly presented. When APIs are implemented as part of an ecosystem, ISO 20022 can add value by providing the common business process data semantics to be used in those API based exchanges.

There is a huge opportunity to define a consistent approach to be able to build APIs based on the ISO 20022 business model. In 2018, members of the RMG produced a [whitepaper](https://www.iso20022.org/sites/default/files/documents/D7/ISO20022\_API\_JSON\_Whitepaper\_Final\_20180129.pdf) describing how to transform ISO 20022 message level data to JSON syntax. This paper is informative toward the definition of JSON as an alternative syntax compared to ISO 20022 XML which is not the same problem space as defining APIs.

Bringing this work forward, an API WG has been constituted to define a governance and registration process of standardized API resources.  A proof of concept was launched to support this process in the Account Management business area, this proof of concept is based on [BJ 178](https://www.iso20022.org/submission-status/1906/download).

There is an open source repository that allows XDC Network Developers to capture data from ISO20022 compliant services, like ERP and SWIFT, and wraps it under a ISO20022 data set. In the XDC Protocol, we add the transaction hash from private network or it's corresponding hash on the public network and append it to the 'Supplementary' data field in the ISO20022 data set.

You can find a reference code base here: [https://github.com/fairxio/finance-messaging](https://github.com/fairxio/finance-messaging)
