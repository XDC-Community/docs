# XDPoS 2.0 Migration Steps

- [To Master Owner](#to-master-owner)
- [To Protocol Team and Private Network Owner](#to-protocol-team-and-private-network-owner)
- [Verification](#verification)

## To Master Owner
Upgrading the consensus engine from XDPoS1.0 to XDC2.0 only takes a 3 simple steps.

1. All master node owners confirm their participation by deploying the latest code version.

2. The protocol team will create a code branch that specifies a future block height as the consensus switch point, and build a docker image accordingly.

3. Master node owners restart their nodes using this docker image. This step must be done before the network has reached the switch block, and this is why we want to ensure everyone is on the same page via step-1.

## To Protocol Team and Private Network Owner

More generically, to upgrade a XDC devnet/testnet/private network that you own:

1. Configure a switch block number: Check your current block height and decide on a future block number as the switch block point. The block height should allow enough time for you to complete all the steps below. Once decided, configure it here: https://github.com/XinFinOrg/XDPoSChain/blob/dev-upgrade/common/constants.go#L39

sample:
```
var TIPV2SwitchBlock = big.NewInt(73737373)
```

2. Configure a voting quorum threshold: The maximum reasonable value is 2/3, giving your network the highest level of Byzantine fault tolerance of 1/3. The threshold can be set here: https://github.com/XinFinOrg/XDPoSChain/blob/dev-upgrade/params/config.go#L72.

sample:
```
		Default: {
			SwitchRound:          0,
			CertThreshold:        73, // based on masternode is 108
			TimeoutSyncThreshold: 3,
			TimeoutPeriod:        60,
			MinePeriod:           10,
		}
```

3. Redeploy. Rebuild the node binary based on your changes above, and then deploy the binary on all your masternodes.

## Verification
To verify whether the switch was successful:
* Monitor the block height by attach into web3 portal
* From the dashboard and wait until the switch block is passed.
* Query web3 api, to see v2 block specific information

```
curl --location 'http://Yournode.RPC.Endpoint' \
--header 'Content-Type: application/json' \
--data '{"jsonrpc":"2.0","method":"XDPoS_getV2BlockByNumber","params":["latest"],"id":1}'
```

```
{
    "result": {
        "Hash": "0x123",
        "Round": 10,
        "Number": 10   // This number is bigger then 0
    }
}
```