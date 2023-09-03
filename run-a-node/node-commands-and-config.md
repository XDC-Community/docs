
As the XDC blockchain continues to gain further momentum as a scalable and secure ecosystem for decentralized applications and cross-chain interoperability, optimizing the deployment and management of XDC nodes remains crucial. In this article, we delve into the realm of XDC Client commands and also explore the wide array of configuration options available to streamline their deployment and operation. Whether you are an experienced blockchain developer or just beginning your journey with XDC, mastering commands and configuration for XDC nodes will empower you to leverage the full potential of this cutting-edge blockchain network, ensuring seamless scalability, robust security, and unwavering reliability.

---

The XDC client software runs as a containerized application in Docker. This ensures a standardized and efficient environment for running XDC nodes. Let's start by examining this client software.

To obtain a comprehensive list of available commands and options, we can use the following command with the XDC Client:
```
sudo docker exec -it mainnet_xinfinnetwork_1 XDC --help
```
By executing this command, we gain access to the XDC client within the Docker container named _mainnet_xinfinnetwork_1_. The inclusion of the _--help_ flag prompts the client to display its usage information, presenting an extensive list of commands and their respective options. The first page of output is shown here:

![XDC Client Commands and Configuration Options](https://www.xdc.dev/uploads/articles/zhh0nfafvuslqm5zl3wj.png)

From the output, we can observe that the appropriate formatting for commands and options within the XDC client's Docker container is as follows:

```
XDC [options] command [command options] [arguments...]
```

By adhering to this structure, we can pass commands and options to Docker when running within the container. Consequently, the appropriate command structure from our external command line also becomes clear:

```
sudo docker exec -it mainnet_xinfinnetwork_1 XDC [options] command [command options] [arguments...]
```
Now, let's proceed to explore each command and option individually, based on the output obtained when using the _--help_ flag.

---

<center><h1>COMMANDS</h1></center>

## account

Manage accounts, list all existing accounts, import a private key into a new account, create a new account or update an existing account.

It supports interactive mode, when you are prompted for password as well as non-interactive mode where passwords are supplied via a given password file. Non-interactive mode is only meant for scripted use on test networks or known safe environments.

Make sure you remember the password you gave when creating a new account (with either new or import). Without it you are not able to unlock your account.

Note that exporting your key in unencrypted format is NOT supported.

Keys are stored under <DATADIR>/keystore.

It is safe to transfer the entire directory or the individual keys therein between XDC nodes by simply copying.

Make sure you backup your keys regularly.

### USAGE:

```
XDC account command [command options] [arguments...]
```

<center>
</center>

### account COMMANDS:

#### <u>list _[command options] [arguments...]_</u>

```
XDC account list
```

Print a short summary of all accounts

##### XDPoSChain OPTIONS:
  - _--datadir "/root/.XDC"_ Data directory for the databases and keystore
  - _--keystore_ Directory for the keystore (default = inside the datadir)

<center>
</center>

#### <u>new [command options] [arguments...]</u>

```
XDC account new
```
Creates a new account and prints the address.

The account is saved in encrypted format, you are prompted for a passphrase.

You must remember this passphrase to unlock your account in the future.

For non-interactive use the passphrase can be specified with the --password flag.

Note, this is meant to be used for testing only, it is a bad idea to save your password to file or expose in any other way.

##### XDPoSChain OPTIONS:
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore
- _--keystore_ Directory for the keystore (default = inside the datadir)

##### ACCOUNT OPTIONS:
- _--password value_ Password file to use for non-interactive password input

##### MISC OPTIONS:
- _--lightkdf_ Reduce key-derivation RAM & CPU usage at some expense of KDF strength

<center>
</center>

#### <u>update [command options] [arguments...]</u>

```
XDC account update [options] <address>
```
Update an existing account.

The account is saved in the newest version in encrypted format, you are prompted for a passphrase to unlock the account and another to save the updated file.

This same command can therefore be used to migrate an account of a deprecated format to the newest format or change the password for an account.

For non-interactive use the passphrase can be specified with the --password flag.

Since only one password can be given, only format update can be performed, changing your password is only possible interactively.

##### XDPoSChain OPTIONS:
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore
- _--keystore_ Directory for the keystore (default = inside the datadir)

##### MISC OPTIONS:
- _--lightkdf_ Reduce key-derivation RAM & CPU usage at some expense of KDF strength

<center>
</center>

#### <u>import [command options] [arguments...]</u>

```
XDC account import [options] <keyfile>
```

Imports an unencrypted private key from <keyfile> and creates a new account. Prints the address.

The keyfile is assumed to contain an unencrypted private key in hexadecimal format.

The account is saved in encrypted format, you are prompted for a passphrase.

You must remember this passphrase to unlock your account in the future.

For non-interactive use the passphrase can be specified with the --password flag

Note: As you can directly copy your encrypted accounts to another XDC instance, this import mechanism is not needed when you transfer an account between nodes.

##### XDPoSChain OPTIONS:
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore
- _--keystore_ Directory for the keystore (default = inside the datadir)

##### ACCOUNT OPTIONS:
- _--password value_ Password file to use for non-interactive password input

##### MISC OPTIONS:
- _--lightkdf_ Reduce key-derivation RAM & CPU usage at some expense of KDF strength

---

## attach

The XDC console is an interactive shell for the JavaScript runtime environment which exposes a node admin interface as well as the Ðapp JavaScript API.

See https://github.com/XinFinOrg/XDPoSChain/wiki/JavaScript-Console.

This command allows to open a console on a running XDC node.

### USAGE:

```
XDC attach [command options] [arguments...]
```

##### XDPoSChain OPTIONS:
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore

##### API AND CONSOLE OPTIONS:
- _--jspath loadScript_ JavaScript root path for loadScript (default: ".")
- _--exec value_ Execute JavaScript statement
- _--preload value_ Comma separated list of JavaScript files to preload into the console

---

## console

The XDC console is an interactive shell for the JavaScript runtime environment which exposes a node admin interface as well as the Ðapp JavaScript API.
See https://github.com/XinFinOrg/XDPoSChain/wiki/JavaScript-Console.

### USAGE:

```
XDC console [command options] [arguments...]
```

##### XDPoSChain OPTIONS:
- _--identity value_ Custom node name
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore
- _--keystore_ Directory for the keystore (default = inside the datadir)
- _--syncmode "full"_ Blockchain sync mode ("fast", "full", or "light")
- _--gcmode value_ Blockchain garbage collection mode ("full", "archive") (default: "full")
- _--networkid value_ Network identifier (integer, 89=XDPoSChain) (default: 88)
- _--ethstats value_ Reporting URL of a ethstats service (nodename:secret@host:port)
- _--config value_ TOML configuration file

##### ACCOUNT OPTIONS:
- _--unlock value_ Comma separated list of accounts to unlock
- _--password value_ Password file to use for non-interactive password input

##### API AND CONSOLE OPTIONS:
- _--rpccorsdomain value_ Comma separated list of domains from which to accept cross origin requests (browser enforced)
- _--rpcvhosts value_ Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
- _--rpc_ Enable the HTTP-RPC server
- _--rpcaddr value_ HTTP-RPC server listening interface (default: "localhost")
- _--rpcport value_ HTTP-RPC server listening port (default: 8545). _See Appendix A at the base of this page for port clarification._
- _--rpcapi value_ API's offered over the HTTP-RPC interface
- _--ws_ Enable the WS-RPC server
- _--wsaddr value_ WS-RPC server listening interface (default: "localhost")
- _--wsport value_ WS-RPC server listening port (default: 8546). _See Appendix A at the base of this page for port clarification._
- _--wsapi value_ API's offered over the WS-RPC interface
- _--wsorigins value_ Origins from which to accept websockets requests
- _--ipcdisable_ Disable the IPC-RPC server
- _--ipcpath_ Filename for IPC socket/pipe within the datadir (explicit paths escape it)
- _--jspath loadScript_ JavaScript root path for loadScript (default: ".")
- _--exec value_ Execute JavaScript statement
- _--preload value_ Comma separated list of JavaScript files to preload into the console

##### NETWORKING OPTIONS:
- _--bootnodes value_ Comma separated enode URLs for P2P discovery bootstrap (set v4+v5 instead for light servers)
- _--bootnodesv4 value_ Comma separated enode URLs for P2P v4 discovery bootstrap (light server, full nodes)
- _--bootnodesv5 value_ Comma separated enode URLs for P2P v5 discovery bootstrap (light server, light nodes)
- _--port value_ Network listening port (default: 30303)
- _--maxpeers value_ Maximum number of network peers (network disabled if set to 0) (default: 25)
- _--maxpendpeers value_ Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)
- _--nat value_ NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")
- _--nodiscover_ Disables the peer discovery mechanism (manual peer addition)
- _--nodekey value_ P2P node key file
- _--nodekeyhex value_ P2P node key as hex (for testing)

##### STAKER OPTIONS:
- _--etherbase value_ Public address for block mining rewards (default = first account created) (default: "0")
- _--gasprice "250000000"_ Minimal gas price to accept for mining a transactions
- _--minerthreads value_ Number of CPU threads to use for staking (default: 8)
- _--mine_ Enable staking
- _--targetgaslimit value_ Target gas limit sets the artificial target gas floor for the blocks to mine (default: 84000000)

##### LOGGING AND DEBUGGING OPTIONS:
- _--metrics_ Enable metrics collection and reporting

##### DEPRECATED OPTIONS:
- _--fast_ Enable fast syncing through state downloads
- _--light_ Enable light client mode

##### MISC OPTIONS:
- _--XDCx_ Enable the XDCX protocol
- _--XDCx.datadir "/root/.XDC/XDCx"_ Data directory for the XDCX databases
- _--XDCx.dbengine value_ Database engine for XDCX (leveldb, mongodb) (default: "leveldb")
- _--XDCx.dbConnectionUrl value_ ConnectionUrl to database if dbEngine is mongodb. Host:port. If there are multiple instances, separated by comma. Eg: localhost:27017,localhost:27018 (default: "localhost:27017")
- _--XDCx.dbReplicaSetName value_ ReplicaSetName if Master-Slave is setup
- _--XDCx.dbName value_ Database name for XDCX (default: "XDCdex")
- _--txpool.nolocals_ Disables price exemptions for locally submitted transactions
- _--txpool.journal value_ Disk journal for local transaction to survive node restarts (default: "transactions.rlp")
- _--txpool.rejournal value_ Time interval to regenerate the local transaction journal (default: 1h0m0s)
- _--txpool.pricelimit value_ Minimum gas price limit to enforce for acceptance into the pool (default: 1)
- _--txpool.pricebump value_ Price bump percentage to replace an already existing transaction (default: 10)
- _--txpool.accountslots value_ Minimum number of executable transaction slots guaranteed per account (default: 16)
- _--txpool.globalslots value_ Maximum number of executable transaction slots for all accounts (default: 4096)
- _--txpool.accountqueue value_ Maximum number of non-executable transaction slots permitted per account (default: 64)
- _--txpool.globalqueue value_ Maximum number of non-executable transaction slots for all accounts (default: 1024)
- _--txpool.lifetime value_ Maximum amount of time non-executable transaction are queued (default: 3h0m0s)
- _--apothem_ XDC Apothem Network
- _--enable-0x-prefix_ Address use 0x-prefix (default = false)
- _--rewound value_ Rewound blocks (default: 0)
- _--announce-txs_ Always commit transactions
- _--store-reward_ Store reward to file
- _--rollback value_ Rollback chain at hash
- _--slave_ Enable slave mode
- _--shh_ Enable Whisper
- _--shh.maxmessagesize value_ Max message size accepted (default: 1048576)
- _--shh.pow value_ Minimum POW accepted (default: 0.2)


---

## dump

Dump a specific block from storage

The arguments are interpreted as block numbers or hashes.
Use "XDC dump 0" to dump the genesis block.

### USAGE:

```
XDC dump [command options] [arguments...]
```

##### XDPoSChain OPTIONS:
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore

##### DEPRECATED OPTIONS:
- _--light_ Enable light client mode

##### MISC OPTIONS:
- _--cache value_ Megabytes of memory allocated to internal caching (default: 1024)

---

## dumpconfig

The dumpconfig command shows configuration values.

### USAGE:

```
XDC dumpconfig [command options] [arguments...]
```

##### XDPoSChain OPTIONS:
- _--identity value_ Custom node name
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore
- _--keystore_ Directory for the keystore (default = inside the datadir)
- _--syncmode "full"_ Blockchain sync mode ("fast", "full", or "light")
- _--gcmode value_ Blockchain garbage collection mode ("full", "archive") (default: "full")
- _--networkid value_ Network identifier (integer, 89=XDPoSChain) (default: 88)
- _--ethstats value_ Reporting URL of a ethstats service (nodename:secret@host:port)
- _--config value_ TOML configuration file

##### ACCOUNT OPTIONS:
- _--unlock value_ Comma separated list of accounts to unlock
- _--password value_ Password file to use for non-interactive password input

##### API AND CONSOLE OPTIONS:
- _--rpccorsdomain value_ Comma separated list of domains from which to accept cross origin requests (browser enforced)
- _--rpcvhosts value_ Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
- _--rpc_ Enable the HTTP-RPC server
- _--rpcaddr value_ HTTP-RPC server listening interface (default: "localhost")
- _--rpcport value_ HTTP-RPC server listening port (default: 8545). _See Appendix A at the base of this page for port clarification._
- _--rpcapi value_ API's offered over the HTTP-RPC interface
- _--ws_ Enable the WS-RPC server
- _--wsaddr value_ WS-RPC server listening interface (default: "localhost")
- _--wsport value_ WS-RPC server listening port (default: 8546). _See Appendix A at the base of this page for port clarification._
- _--wsapi value_ API's offered over the WS-RPC interface
- _--wsorigins value_ Origins from which to accept websockets requests
- _--ipcdisable_ Disable the IPC-RPC server
- _--ipcpath_ Filename for IPC socket/pipe within the datadir (explicit paths escape it)

##### NETWORKING OPTIONS:
- _--bootnodes value_ Comma separated enode URLs for P2P discovery bootstrap (set v4+v5 instead for light servers)
- _--bootnodesv4 value_ Comma separated enode URLs for P2P v4 discovery bootstrap (light server, full nodes)
- _--bootnodesv5 value_ Comma separated enode URLs for P2P v5 discovery bootstrap (light server, light nodes)
- _--port value_ Network listening port (default: 30303)
- _--maxpeers value_ Maximum number of network peers (network disabled if set to 0) (default: 25)
- _--maxpendpeers value_ Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)
- _--nat value_ NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")
- _--nodiscover_ Disables the peer discovery mechanism (manual peer addition)
- _--nodekey value_ P2P node key file
- _--nodekeyhex value_ P2P node key as hex (for testing)

##### STAKER OPTIONS:
- _--etherbase value_ Public address for block mining rewards (default = first account created) (default: "0")
- _--gasprice "250000000"_ Minimal gas price to accept for mining a transactions
- _--minerthreads value_ Number of CPU threads to use for staking (default: 8)
- _--mine_ Enable staking
- _--targetgaslimit value_ Target gas limit sets the artificial target gas floor for the blocks to mine (default: 84000000)

##### LOGGING AND DEBUGGING OPTIONS:
- _--metrics_ Enable metrics collection and reporting

##### DEPRECATED OPTIONS:
- _--fast_ Enable fast syncing through state downloads
- _--light_ Enable light client mode

##### MISC OPTIONS:
- _--XDCx_ Enable the XDCX protocol
- _--XDCx.datadir "/root/.XDC/XDCx"_ Data directory for the XDCX databases
- _--XDCx.dbengine value_ Database engine for XDCX (leveldb, mongodb) (default: "leveldb")
- _--XDCx.dbConnectionUrl value_ ConnectionUrl to database if dbEngine is mongodb. Host:port. If there are multiple instances, separated by comma. Eg: localhost:27017,localhost:27018 (default: "localhost:27017")
- _--XDCx.dbReplicaSetName value_ ReplicaSetName if Master-Slave is setup
- _--XDCx.dbName value_ Database name for XDCX (default: "XDCdex")
- _--txpool.nolocals_ Disables price exemptions for locally submitted transactions
- _--txpool.journal value_ Disk journal for local transaction to survive node restarts (default: "transactions.rlp")
- _--txpool.rejournal value_ Time interval to regenerate the local transaction journal (default: 1h0m0s)
- _--txpool.pricelimit value_ Minimum gas price limit to enforce for acceptance into the pool (default: 1)
- _--txpool.pricebump value_ Price bump percentage to replace an already existing transaction (default: 10)
- _--txpool.accountslots value_ Minimum number of executable transaction slots guaranteed per account (default: 16)
- _--txpool.globalslots value_ Maximum number of executable transaction slots for all accounts (default: 4096)
- _--txpool.accountqueue value_ Maximum number of non-executable transaction slots permitted per account (default: 64)
- _--txpool.globalqueue value_ Maximum number of non-executable transaction slots for all accounts (default: 1024)
- _--txpool.lifetime value_ Maximum amount of time non-executable transaction are queued (default: 3h0m0s)
- _--apothem_ XDC Apothem Network
- _--enable-0x-prefix_ Address use 0x-prefix (default = false)
- _--rewound value_ Rewound blocks (default: 0)
- _--announce-txs_ Always commit transactions
- _--store-reward_ Store reward to file
- _--rollback value_ Rollback chain at hash
- _--slave_ Enable slave mode
- _--shh_ Enable Whisper
- _--shh.maxmessagesize value_ Max message size accepted (default: 1048576)
- _--shh.pow value_ Minimum POW accepted (default: 0.2)

---

## export

Export blockchain into file

Requires a first argument of the file to write to.
Optional second and third arguments control the first and last block to write. In this mode, the file will be appended if already existing.

### USAGE:

```
XDC export [command options] [arguments...]
```

##### XDPoSChain OPTIONS:
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore

##### DEPRECATED OPTIONS:
- _--light_ Enable light client mode

##### MISC OPTIONS:
- _--cache value_ Megabytes of memory allocated to internal caching (default: 1024)


---

## import

Import a blockchain file

The import command imports blocks from an RLP-encoded form. The form can be one file with several RLP-encoded blocks, or several files can be used.

If only one file is used, import error will result in failure. If several files are used, processing will proceed even if an individual RLP-file import failure occurs.

### USAGE:

```
XDC import [command options] [arguments...]
```

##### XDPoSChain OPTIONS:
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore
- _--gcmode value_ Blockchain garbage collection mode ("full", "archive") (default: "full")

##### DEPRECATED OPTIONS:
- _--light_ Enable light client mode

##### MISC OPTIONS:
- _--cache value_ Megabytes of memory allocated to internal caching (default: 1024)
- _--cache.database value_ Percentage of cache memory allowance to use for database io (default: 75)
- _--cache.gc value_ Percentage of cache memory allowance to use for trie pruning (default: 25)

---

## init

Bootstrap and initialize a new genesis block

The init command initializes a new genesis block and definition for the network. This is a destructive action and changes the network in which you will be participating.

It expects the genesis file as argument.

### USAGE:

```
XDC init [command options] [arguments...]
```

##### XDPoSChain OPTIONS:
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore

##### DEPRECATED OPTIONS:
- _--light_ Enable light client mode

---

## js

Execute the specified JavaScript files

The JavaScript VM exposes a node admin interface as well as the Ðapp JavaScript API. See https://github.com/XinFinOrg/XDPoSChain/wiki/JavaScript-Console

### USAGE:

```
XDC js [command options] [arguments...]
```

##### XDPoSChain OPTIONS:
- _--identity value_ Custom node name
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore
- _--keystore_ Directory for the keystore (default = inside the datadir)
- _--syncmode "full"_ Blockchain sync mode ("fast", "full", or "light")
- _--gcmode value_ Blockchain garbage collection mode ("full", "archive") (default: "full")
- _--networkid value_ Network identifier (integer, 89=XDPoSChain) (default: 88)
- _--ethstats value_ Reporting URL of a ethstats service (nodename:secret@host:port)
- _--config value_ TOML configuration file

##### ACCOUNT OPTIONS:
- _--unlock value_ Comma separated list of accounts to unlock
- _--password value_ Password file to use for non-interactive password input

##### API AND CONSOLE OPTIONS:
- _--rpccorsdomain value_ Comma separated list of domains from which to accept cross origin requests (browser enforced)
- _--rpcvhosts value_ Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
- _--jspath loadScript_ JavaScript root path for loadScript (default: ".")
- _--exec value_ Execute JavaScript statement
- _--preload value_ Comma separated list of JavaScript files to preload into the console

##### NETWORKING OPTIONS:
- _--bootnodes value_ Comma separated enode URLs for P2P discovery bootstrap (set v4+v5 instead for light servers)
- _--bootnodesv4 value_ Comma separated enode URLs for P2P v4 discovery bootstrap (light server, full nodes)
- _--bootnodesv5 value_ Comma separated enode URLs for P2P v5 discovery bootstrap (light server, light nodes)
- _--port value_ Network listening port (default: 30303)
- _--maxpeers value_ Maximum number of network peers (network disabled if set to 0) (default: 25)
- _--maxpendpeers value_ Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)
- _--nat value_ NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")
- _--nodiscover_ Disables the peer discovery mechanism (manual peer addition)
- _--nodekey value_ P2P node key file
- _--nodekeyhex value_ P2P node key as hex (for testing)

##### STAKER OPTIONS:
- _--etherbase value_ Public address for block mining rewards (default = first account created) (default: "0")
- _--gasprice "250000000"_ Minimal gas price to accept for mining a transactions
- _--minerthreads value_ Number of CPU threads to use for staking (default: 8)
- _--mine_ Enable staking
- _--targetgaslimit value_ Target gas limit sets the artificial target gas floor for the blocks to mine (default: 84000000)

##### LOGGING AND DEBUGGING OPTIONS:
- _--metrics_ Enable metrics collection and reporting

##### DEPRECATED OPTIONS:
- _--fast_ Enable fast syncing through state downloads
- _--light_ Enable light client mode

##### MISC OPTIONS:
- _--XDCx_ Enable the XDCX protocol
- _--XDCx.datadir "/root/.XDC/XDCx"_ Data directory for the XDCX databases
- _--XDCx.dbengine value_ Database engine for XDCX (leveldb, mongodb) (default: "leveldb")
- _--XDCx.dbConnectionUrl value_ ConnectionUrl to database if dbEngine is mongodb. Host:port. If there are multiple instances, separated by comma. Eg: localhost:27017,localhost:27018 (default: "localhost:27017")
- _--XDCx.dbReplicaSetName value_ ReplicaSetName if Master-Slave is setup
- _--XDCx.dbName value_ Database name for XDCX (default: "XDCdex")
- _--txpool.nolocals_ Disables price exemptions for locally submitted transactions
- _--txpool.journal value_ Disk journal for local transaction to survive node restarts (default: "transactions.rlp")
- _--txpool.rejournal value_ Time interval to regenerate the local transaction journal (default: 1h0m0s)
- _--txpool.pricelimit value_ Minimum gas price limit to enforce for acceptance into the pool (default: 1)
- _--txpool.pricebump value_ Price bump percentage to replace an already existing transaction (default: 10)
- _--txpool.accountslots value_ Minimum number of executable transaction slots guaranteed per account (default: 16)
- _--txpool.globalslots value_ Maximum number of executable transaction slots for all accounts (default: 4096)
- _--txpool.accountqueue value_ Maximum number of non-executable transaction slots permitted per account (default: 64)
- _--txpool.globalqueue value_ Maximum number of non-executable transaction slots for all accounts (default: 1024)
- _--txpool.lifetime value_ Maximum amount of time non-executable transaction are queued (default: 3h0m0s)
- _--apothem_ XDC Apothem Network
- _--enable-0x-prefix_ Address use 0x-prefix (default = false)
- _--rewound value_ Rewound blocks (default: 0)
- _--announce-txs_ Always commit transactions
- _--store-reward_ Store reward to file
- _--rollback value_ Rollback chain at hash
- _--slave_ Enable slave mode

---

### removedb

Remove blockchain and state databases.

### USAGE:

```
XDC removedb [command options] [arguments...]
```

##### XDPoSChain OPTIONS:
- _--datadir "/root/.XDC"_ Data directory for the databases and keystore

##### DEPRECATED OPTIONS:
- _--light_ Enable light client mode

---

### version

Print version numbers.

The output of this command is supposed to be machine-readable.

### USAGE:

```
XDC version [arguments...]
```

---

### wallet

Manage XDPoSChain wallets.

This will prompt for your password and imports your XDC account. It can be used non-interactively with the --password option taking a passwordfile as argument containing the wallet password in plaintext.

### USAGE:

```
XDC wallet command [command options] [arguments...]
```

##### COMMANDS (ACCOUNT COMMANDS):
- _import_ Import XDPoSChain wallet

##### OPTIONS:
- _--help, -h_ Show help


---

### help, h

Shows a list of commands or help for one command.

### USAGE:

```
XDC help [arguments...]
```

---

<center><h1>XDPoSChain OPTIONS</h1></center>

### --config _value_
TOML configuration file

---

### --datadir _"/root/.XDC"_
Data directory for the databases and keystore

---

### --keystore
Directory for the keystore (default = inside the datadir)

---

### --networkid _value_
Network identifier (integer, 89=XDPoSChain) (default: 88)

---

### --syncmode _"full"_
Blockchain sync mode ("fast", "full", or "light")

---

### --gcmode _value_
Blockchain garbage collection mode ("full", "archive") (default: "full")

---

### --ethstats _value_
Reporting URL of a ethstats service (nodename:secret@host:port)

---

### --identity _value_
Custom node name

---

<center><h1>ACCOUNT OPTIONS</h1></center>

### --unlock _value_
Comma separated list of accounts to unlock

---

### --password _value_
Password file to use for non-interactive password input

---

<center><h1>API AND CONSOLE OPTIONS</h1></center>

### --rpc
Enable the HTTP-RPC server

---

### --rpcaddr _value_
HTTP-RPC server listening interface (default: "localhost")

---

### --rpcport _value_
HTTP-RPC server listening port (default: 8545). _See Appendix A at the base of this page for port clarification._

---

### --rpcapi _value_
API's offered over the HTTP-RPC interface

---

### --ws
Enable the WS-RPC server

---

### --wsaddr _value_
WS-RPC server listening interface (default: "localhost")

---

### --wsport _value_
WS-RPC server listening port (default: 8546). _See Appendix A at the base of this page for port clarification._

---

### --wsapi _value_
API's offered over the WS-RPC interface

---

### --wsorigins _value_
Origins from which to accept websockets requests

---

### --ipcdisable
Disable the IPC-RPC server

---

### --ipcpath
Filename for IPC socket/pipe within the datadir (explicit paths escape it)

---

### --rpccorsdomain _value_
Comma separated list of domains from which to accept cross origin requests (browser enforced)

---

### --rpcvhosts _value_
Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")

---

### --jspath _loadScript_
JavaScript root path for loadScript (default: ".")

---

### --exec _value_
Execute JavaScript statement

---

### --preload _value_
Comma separated list of JavaScript files to preload into the console

---

<center><h1>NETWORKING OPTIONS</h1></center>

### --bootnodes _value_
Comma separated enode URLs for P2P discovery bootstrap (set v4+v5 instead for light servers)

---

### --bootnodesv4 _value_
Comma separated enode URLs for P2P v4 discovery bootstrap (light server, full nodes)

---

### --bootnodesv5 _value_
Comma separated enode URLs for P2P v5 discovery bootstrap (light server, light nodes)

---

### --port _value_
Network listening port (default: 30303)

---

### --maxpeers _value_
Maximum number of network peers (network disabled if set to 0) (default: 25)

---

### --maxpendpeers _value_
Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)

---

### --nat _value_
NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")

---

### --nodiscover
Disables the peer discovery mechanism (manual peer addition)

---

### --nodekey _value_
P2P node key file

---

### --nodekeyhex _value_
P2P node key as hex (for testing)

---

<center><h1>STAKER OPTIONS</h1></center>

### --mine
Enable staking

---

### --minerthreads _value_
Number of CPU threads to use for staking (default: 8)

---

### --etherbase _value_
Public address for block mining rewards (default = first account created) (default: "0")

---

### --targetgaslimit _value_
Target gas limit sets the artificial target gas floor for the blocks to mine (default: 84000000)

---

### --gasprice _"250000000"_
Minimal gas price to accept for mining a transactions

---

### --extradata _value_
Block extra data set by the miner (default = client version)

---

<center><h1>LOGGING AND DEBUGGING OPTIONS</h1></center>

### --metrics
Enable metrics collection and reporting

---

### --verbosity _value_
Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail (default: 3)

---

### --cpuprofile _value_
Write CPU profile to the given file

---

<center><h1>DEPRECATED OPTIONS</h1></center>

### --fast
Enable fast syncing through state downloads

---

### --light
Enable light client mode

---

<center><h1>MISC OPTIONS</h1></center>

### --XDCx
Enable the XDCX protocol

---

### --XDCx.datadir _"/root/.XDC/XDCx"_
Data directory for the XDCX databases

---

### --XDCx.dbengine _value_
Database engine for XDCX (leveldb, mongodb) (default: "leveldb")

---

### --XDCx.dbConnectionUrl _value_
ConnectionUrl to database if dbEngine is mongodb. Host:port. If there are multiple instances, separated by comma. Eg: localhost:27017,localhost:27018 (default: "localhost:27017")

---

### --XDCx.dbReplicaSetName _value_
ReplicaSetName if Master-Slave is setup

---

### --XDCx.dbName _value_
Database name for XDCX (default: "XDCdex")

---

### --txpool.nolocals
Disables price exemptions for locally submitted transactions

---

### --txpool.journal _value_
Disk journal for local transaction to survive node restarts (default: "transactions.rlp")

---

### --txpool.rejournal _value_
Time interval to regenerate the local transaction journal (default: 1h0m0s)

---

### --txpool.pricelimit _value_
Minimum gas price limit to enforce for acceptance into the pool (default: 1)

---

### --txpool.pricebump _value_
Price bump percentage to replace an already existing transaction (default: 10)

---

### --txpool.accountslots _value_
Minimum number of executable transaction slots guaranteed per account (default: 16)

---

### --txpool.globalslots _value_
Maximum number of executable transaction slots for all accounts (default: 4096)

---

### --txpool.accountqueue _value_
Maximum number of non-executable transaction slots permitted per account (default: 64)

---

### --txpool.globalqueue _value_
Maximum number of non-executable transaction slots for all accounts (default: 1024)

---

### --txpool.lifetime _value_
Maximum amount of time non-executable transaction are queued (default: 3h0m0s)

---

### --apothem
XDC Apothem Network

---

### --enable-0x-prefix
Address use 0x-prefix (default = false)

---

### --rewound _value_
Rewound blocks (default: 0)

---

### --announce-txs
Always commit transactions

---

### --store-reward
Store reward to file

---

### --rollback _value_
Rollback chain at hash

---

### --slave
Enable slave mode

---

### --shh
Enable Whisper

---

### --shh.maxmessagesize _value_
Max message size accepted (default: 1048576)

---

### --shh.pow _value_
Minimum POW accepted (default: 0.2)

---

### --help, -h
show help
  
---

<center><h1>APPENDIX A - docker-compose.yml</h1></center>

The "docker-compose.yml" file (contents shown below) is a configuration file written in YAML (YAML Ain't Markup Language) format used by Docker Compose. It defines the services, containers, and their configurations for the Dockerized implementation of the XDC Mainnet Client.

<center> ![docker-compose.yml](https://www.xdc.dev/uploads/articles/lthjqtocqcogos70etaq.png) </center>

Let's go through the contents of the file and their meanings:

- **version: "3.4":** Specifies the version of the Docker Compose syntax being used.

- **services:** Defines the list of services (containers) that will be created and managed by Docker Compose.

- **xinfinnetwork:** The name of the service or container defined within the Docker Compose file.

- **image: xinfinorg/xinfinnetwork:v1.4.6:** Specifies the Docker image to be used for the "xinfinnetwork" service. In this case, it is using the "xinfinorg/xinfinnetwork" image with version "v1.4.6". This image contains the XDC Mainnet Client software.

- **volumes:** Defines the volumes to be mounted within the container, allowing data to be shared between the host machine and the container. The paths before the colon represent the files/directories on the host machine, while the paths after the colon represent the corresponding locations within the container.

- **restart: "always":** Specifies that the container should always be restarted if it stops or crashes.

- **env_file: .env:** Specifies an environment file (".env") that contains environment variables to be set within the container.

- **ports:** Defines the port mappings between the host machine and the container.

- **"30303:30303":** Maps port 30303 on the host machine to port 30303 within the container. This port is used for RLPx(TCP)/UDP peer-to-peer communications allowing node discovery and connection to peers.

- **"8989:8545":** Maps port 8989 on the host machine to port 8545 within the container. This port is used for the HTTP JSON-RPC API.

- **"8888:8546":** Maps port 8888 on the host machine to port 8546 within the container. This port is used for the Websocket-RPC interface.

---

In case of any technical queries on XDC Network, feel free to drop your queries on [XDC.Dev](https://www.xdc.dev/) forum.

**Quick links:**

[XinFin.org](https://xinfin.org/)
[XDC Chain Network Tools and Documents](https://xinfin.org/xdc-chain-network-tools-and-documents)
[XDC Network Explorer](https://xdc.network/)
[XDC Dev Forum](https://www.xdc.dev/)
[Beta — XDC Web Wallet](https://betawallet.xinfin.network/)
[XDC faucet](https://faucet.apothem.network/)
[XDC faucet - Blocksscan](https://faucet.blocksscan.io/)

**XinFin — XDC Social Links:**

[Twitter](https://twitter.com/XinFin_Official)
[GitHub](https://github.com/XinFinorg)
[Telegram](https://t.me/xinfin)
[Facebook](https://www.facebook.com/XinFinHybridBlockchain/)
[LinkedIn](https://www.linkedin.com/company/xinfin/)
[YouTube](https://www.youtube.com/channel/UCQaL6FixEQ80RJC0B2egX6g)

---
