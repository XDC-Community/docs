---
description: >-
  This guide will walk you through migrating you current XDC standby/masternode
  from a local machine or cloud provider to another cloud provider.
---

# How to migrate an XDC Node

## Things you will need

You will need the following to be able to migrate you current XDC node:

* The coinbase address from your current node
* The keystore file (file name starts with UTC--)
* SCP tool if using Windows (already built in to terminal if using a Mac)
* Login information for destination cloud provider (IP address and user for that terminal, normally admin, root, or ubuntu).

## Step 1

If you manage your node, log in, navigate to your coinbase.txt file, and copy the XDC address inside it. You can use either Nano or Vi.  For the purpose of this guide and the tool's simplicity, we will be using Nano.&#x20;

{% hint style="info" %}
Note: If your node is being managed by a third party, please get in touch with them for items 1 and 2 above as these two are needed for the following steps.&#x20;
{% endhint %}

## Step 2

Log in to your new server where you are migrating your old XDC node to and navigate to:

```
cd XinFin-Network/mainnet
```

## Step 3

Bring down your node

```
sudo docker-compose -f docker-compose.yml down
```

## Step 4

Paste the command below, you should still be in the "XinFin-Node/mainnet" directory. The command below will open the coinbase.txt file.

```
nano coinbase.txt 
```

Replace the address in the coinbase.txt file with the one from your old node or the one received from your cloud provider. Save and exit the nano tool.&#x20;

Next, we are going to replace the UTC-- file inside the keystore directory. Absolute path:

&#x20;\~/XinFin-Node/mainnet/xdcchain/keystore

## Step 5

On your local machine, open the terminal (Mac users) or cmd prompt (if using Windows).

{% hint style="info" %}
To securely copy (scp) files from a local Mac machine to a remote Ubuntu server, you first need to ensure that you have SSH access to your Ubuntu server.

Once you have SSH access, you can use the scp command from the terminal on your Mac. Here is a general format for the scp command:
{% endhint %}

```
scp /path/to/local/file username@remote-IP:/path/to/remote/directory
```

* `/path/to/local/file`: Replace this with the path to the file on your local machine that you want to copy.
* `username`: Replace this with your username on the remote Linux server.
* `remote-IP`: Replace this with the IP address of the remote Linux server.
* `/path/to/remote/directory`: Replace this with the path on the remote Linux server where you want to copy the file.

For example, if you want to copy a file named "example.txt" from your Desktop to the home directory of your user account (named "myusername") on a remote server with the IP address "192.168.1.1", you would use this command:

```
scp ~/Desktop/example.txt myusername@192.168.1.1:~
```

Remember to replace "myusername" and "192.168.1.1" with your actual username and the IP address of your remote server.

After entering this command, you'll be prompted to enter your password for the remote Ubuntu server. After entering the password, the file will be copied.

Note: You may also need to specify the port number if your SSH server is listening on a non-default port. You can do this by adding `-P port` after the scp command. For example:&#x20;

```
scp -P 2222 ~/Desktop/example.txt myusername@192.168.1.1:~
```

## Step 6

Remove the old UTC file in the keystore directory&#x20;

```
rm UTC--2021-12-27T21-48-18.376753555Z--xdc785076b971F2a90b029b0000000000000000000
```

## Step 7

Bring back node back up&#x20;

```
sudo docker-compose -f docker-compose.yml up -d
```

Check the logs to ensure that everything is working as intended.&#x20;
