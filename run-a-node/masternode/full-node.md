# Full Node (Docker version)

We are going to follow these steps to set up an XDC Masternode.&#x20;

## Setting up XDC Network Masternode Docker version

The server or VPS used for the masternode should be facing the internet directly with a public IP and without NAT.&#x20;

There are written steps starting from step 1, or you can watch the video tutorials:

### Setting up an XDC Network Masternode via Docker

{% embed url="https://youtu.be/1A20eVTJYvs" %}

## Step 1

Clone repository

```
// git clone https://github.com/XinFinOrg/XinFin-Node.git
```

## Step 2&#x20;

Then we change the directory to XinFin-Node

```
// cd XinFin-Node
```



## Step 3&#x20;

We need to install Docker and Docker-Compose by running the following command:

```
// sudo ./setup/install_docker.sh
```

## Step 4

We need to create a new .env file and copy the env.example file that exist in teh mainnet directory. We will ensure we are in the "mainnet" directory by &#x20;

```
// cd mainnet
cp env.example .env
nano .env
```

## Step 5

### Start your Node

#### For Mainnet run the following commands:

```
// cd mainnet
sudo docker-compose -f docker-compose.yml up -d
```

At this point you should be able to see your masternode on the list of nodes [here](https://xinfin.network/#stats) or as shown below:

<figure><img src="../../.gitbook/assets/image (20).png" alt=""><figcaption><p>Node syncing up to the network</p></figcaption></figure>

For Testnet run the following commands:&#x20;

```
// cd testnet
sudo docker-compose -f apothem-network.yml up -d
```

You should be able to see your node listed on the \[Apothem Network] page. Select **"Switch to LiveNet"** to check **LiveNetwork** Stats and Select **"Switch to TestNet"** for **TestNetwork.**

Your coinbase address can be found in xdcchain/coinbase.txt file.

For troubleshooting purposes, you can stop the node by using the following command on either Mainnet or Testnet:

```
// sudo docker-compose -f apothem-network.yml down
```

## Downloading a Network Snapshot&#x20;

The following steps are to expedite the syncing process of your node with the XDC Network.  If you followed the steps above, your node will take 3-4 days to sync up with the network fully.  You can reduce that time by downloading a network snapshot and bringing your node back up after the chain has been downloaded and unpacked.&#x20;

{% embed url="https://youtu.be/ZQF3f0Zd6-k" %}

### First safely bring down your node:&#x20;

```
// sudo docker-compose -f docker-compose.yml down
```

### Then remove the old xdchain file from the server

```
// rm -rf xdcchain.tar
```

### Download the snapshot&#x20;

```
// wget https://download.xinfin.network/xdcchain.tar
```

### Unpack the xdcchain.tar  file

```
// tar -xvzf xdcchain.tar
```

### The unpacking will take some time, and it will look like this:&#x20;

<figure><img src="../../.gitbook/assets/image (19).png" alt=""><figcaption></figcaption></figure>

### The following command will move the xdcchain/XDC to xdcchain/XDC\_backup

```
// mv  xdcchain/XDC xdcchain/XDC_backup
```

```
// mv XDC xdcchain
```

### Then we are going to remove the old "nodekey" file

```
// rm -rf xdcchain/XDC/nodekey
```

### The last step is to run the bash upgrade.sh command

```
// bash upgrade.sh
```

This command will bring your node up and it will start syncing to the network. Once up and running, your node will be synced to the network in just a few minutes.&#x20;

<figure><img src="../../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

###
