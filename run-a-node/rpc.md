---
description: How to deploy a full-node RPC
---

# RPC

A Remote Procedure Call (RPC) allows programs that run on one device, or network, to execute functions and procedures on another. The primary purpose of an RPC is to enable communication and cooperation between distributed components of a system, allowing developers to create applications that leverage the functionality of remote devices or services. To enable a software application to engage with the XDC blockchain, whether it involves accessing blockchain data, smart contract executions, interacting with the network, or executing transactions, it needs to establish a connection with an XDC node. These RPC nodes are deployed on the network, however, they do not participate in validation or consensus.&#x20;

JSON-RPC is a streamlined and efficient remote procedure call (RPC) protocol that operates without maintaining a state. It outlines various data structures and their corresponding processing rules. This protocol remains adaptable to different transport mechanisms, such as within the same process, over sockets, over HTTP, or across various message-passing environments.&#x20;

## How to deploy RPC

**Requirements and prerequisites:**&#x20;

* A server or cloud instance with at least 16 GB of RAM and 512 GB of storage.
* Ubuntu 22.04 LTS or higher operating system (Recommended)
* Basic knowledge of the Linux command line.

**Step 1:** Setting up the full node with docker\
\
_Clone repository_

```
git clone https://github.com/XinFinOrg/XinFin-Node.git
```

_Enter XinFin-Node directory_

```
cd XinFin-Node
```

_Install docker & docker-compose_

```
sudo ./setup/install_docker.sh
```

Update the .env file with details:

* Create a .env file by using the sample — .env.example
* Enter either your company or product name in the INSTANCE\_NAME field.
* Enter your email address in the CONTACT\_DETAILS field.

```
cd mainnet
cp env.example .env
nano .env
```

_Start your Node_

```
cd mainnet
sudo docker-compose -f docker-compose.yml up -d
```

_To stop the node, or if you encounter, any issues use_

```
sudo docker-compose -f docker-compose.yml down
```

_Attach XDC Console:_

```
cd mainnet
sudo bash xdc-attach.sh
```

You can check the status of your full node on the stats page at

* [https://stats.xdc.org](https://stats.xdc.org)
* [https://stats1.xinfin.network](https://stats1.xinfin.network/)&#x20;

If you want your full node to sync faster, you can download the latest Mainet snapshot from:&#x20;

* [https://download.xinfin.network/xdcchain.tar](https://download.xinfin.network/xdcchain.tar)

_**Follow the below steps to unpack and restore the snapshot. This will synchronize the node faster since there will very less blocks to catchup on:**_

1. sudo docker-compose -f docker-compose.yml down
2. wget [https://download.xinfin.network/xdcchain.tar](https://download.xinfin.network/xdcchain.tar)
3. tar -xvzf xdcchain.tar
4. rm -rf xdcchain/XDC
5. mv XDC xdcchain/XDC
6. sudo docker-compose -f docker-compose.yml up -d

After downloading the snapshot, monitor your node on the stats page mentioned above. Once your node is fully synced, you can start using the dedicated RPC.       &#x20;

To access RPC on your newly configured node use the below format:

&#x20;http://_x.x.x.x:8989_, where **x.x.x.x** is your public or private IP address for the node.

Similarly you can access the webSockets on your newly configured node by using the below sample URL:

wss://x.x.x.x:8888, where **x.x.x.x** is your public or private IP address for the node.

### XDC and 0x prefix

The XDC Network uses an XDC prefix instead of the 0x prefix used by some EVM-compatible networks, however, 0x can still be used when interacting with the network by using an XDC and 0x compatible RPC. The 0x prefix is not enabled by default and needs to be enabled manually by editing and updating startnode.sh file and passing a flag.

To enable the 0x prefix RPC Endpoint, you can add the flag “— enable-0x-prefix” to your “startnode.sh” script. This will allow the RPC Endpoint to recognize and process 0x-prefixed&#x20;
