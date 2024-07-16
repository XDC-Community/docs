# Migrating from EVM to XDC

Migrating a Solidity contract from Ethereum to the XDC network with Truffle involves several steps. The XDC network is a public blockchain that is EVM-compatible and designed to support enterprise-level applications. Truffle is a popular development framework for creating and deploying Solidity contracts.

Step 1: Install Truffle

The first step is to install the XDC network and Truffle. This can be done by following the installation instructions provided by XDC and Truffle.

{% embed url="https://trufflesuite.com/docs/truffle/how-to/install/" %}

Step 2: Configure Truffle for XDC

Next, Truffle needs to be configured to work with the XDC network. This involves creating a new Truffle project and configuring the Truffle config file to connect to the XDC network by using a public RPC connected to the XDC network.

{% embed url="https://trufflesuite.com/docs/truffle/reference/configuration/" %}

Step 3: Compile the Contract

After updating the Solidity contract, it needs to be compiled for the XDC network. This involves using the Truffle compiler to create a bytecode file that can be deployed on the XDC network.

{% embed url="https://trufflesuite.com/docs/truffle/how-to/compile-contracts/" %}

Step 4: Deploy the Contract

The next step is to deploy the updated contract on the XDC network. This can be done using Truffle's deployment commands. It is important to ensure that the contract is deployed correctly and securely.



Step 5: Test the Contract

After deploying the contract, it is important to thoroughly test it on the XDC network. This includes testing all functions and features, as well as testing for security vulnerabilities. You can write tests in Truffle using Javascript to build debug and test contracts ready to be deployed onto the network

{% embed url="https://trufflesuite.com/docs/truffle/how-to/debug-test/write-tests-in-javascript/" %}

Step 6: Update Clients and Interfaces

Once the contract has been migrated and tested, any clients or interfaces that interact with the contract must be updated to be compatible with the XDC network by having them point to the appropriate RPCs on the xdc network.





For a How-To guide showing migration of a dApp from Ethereum to the XDC Network please go to [this link](https://docs.xdc.community/learn/how-to-articles/how-to-migrate-a-dapp-from-ethereum-to-the-xdc-network-using-truffle).
