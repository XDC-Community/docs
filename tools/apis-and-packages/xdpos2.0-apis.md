# XDPoS 2.0 API

- [Get V2 Block By Number](#xdpos_getv2blockbynumber)
- [Get V2 Block By Hash](#xdpos_getv2blockbyhash)
- [Get Masternodes By Number](#xdpos_getmasternodesbynumber)
- [Get Latest Pool Status](#xdpos_getlatestpoolstatus)


Provide `curl` command as exmaple

## XDPoS_getV2BlockByNumber

Parameter can be `number` or reserved words like `latest`, `committed`

Example 1: By latest block
```
curl --location 'https://xdc.rpc.node' \
--header 'Content-Type: application/json' \
--data '{"jsonrpc":"2.0","method":"XDPoS_getV2BlockByNumber","params":["latest"],"id":1}'
```

```
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "Hash": "0x6867eadf2bb4ecabd020f00f178664144090d08575bc73037d5fa1846c2362a5",
        "Round": 597698,
        "Number": 597682,
        "ParentHash": "0xd3db9d9620c6e99992072cf22b91a4dd666e20891e61fa2064b902f6687c5373",
        "Committed": false,
        "EncodedRLP": "xxx",
        "Error": ""
    }
}
```

Example 2: By latest committed block

```
curl --location 'https://devnetstats.apothem.network/subnet' \
--header 'Content-Type: application/json' \
--data '{"jsonrpc":"2.0","method":"XDPoS_getV2BlockByNumber","params":["committed"],"id":1}'
```

```
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "Hash": "0x3e906c03503a17c55a2fcc8553e8b08b8c591586152a3df8043af3c235a6612c",
        "Round": 598787,
        "Number": 598771,
        "ParentHash": "0x05f05c393e08743bd0979cf1cf3125e81b6c14422055cb9b4a802b2ee8f50ad9",
        "Committed": true,
        "EncodedRLP": "xxx",
        "Error": ""
    }
}
```


Example 3: By number

Note: You need to convert block number into **Hexadecimal**
```
curl --location 'https://xdc.rpc.node' \
--header 'Content-Type: application/json' \
--data '{"jsonrpc":"2.0","method":"XDPoS_getV2BlockByNumber","params":["0x91EB2"],"id":1}'
```

```
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "Hash": "0x6867eadf2bb4ecabd020f00f178664144090d08575bc73037d5fa1846c2362a5",
        "Round": 597698,
        "Number": 597682,
        "ParentHash": "0xd3db9d9620c6e99992072cf22b91a4dd666e20891e61fa2064b902f6687c5373",
        "Committed": true,
        "EncodedRLP": "xxx",
        "Error": ""
    }
}
```

## XDPoS_getV2BlockByHash

Parameter is `Block Hash`

Example:
```
curl --location 'https://xdc.rpc.node' \
--header 'Content-Type: application/json' \
--data '{"jsonrpc":"2.0","method":"XDPoS_getV2BlockByHash","params":["0x6867eadf2bb4ecabd020f00f178664144090d08575bc73037d5fa1846c2362a5"],"id":1}'
```

```
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "Hash": "0x6867eadf2bb4ecabd020f00f178664144090d08575bc73037d5fa1846c2362a5",
        "Round": 597698,
        "Number": 597682,
        "ParentHash": "0xd3db9d9620c6e99992072cf22b91a4dd666e20891e61fa2064b902f6687c5373",
        "Committed": true,
        "EncodedRLP": "xxx",
        "Error": ""
    }
}
```

## XDPoS_getMasternodesByNumber

This API is mainly for debugging propose and check masternode selection process is fine. Get the current masternode or query by number.

Parameter: `none` or `Block Number`

Example 1: latest selection
```
curl --location 'https://xdc.rpc.node' \
--header 'Content-Type: application/json' \
--data '{"jsonrpc":"2.0","method":"XDPoS_getMasternodesByNumber","params":[],"id":1}'
```

```
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "Number": 598597,
        "Round": 598613,
        "MasternodesLen": 3,
        "Masternodes": [
            "xdcefea93e384a6ccaaf28e33790a2d1b2625bf964d",
            "xdc888c073313b36cf03cf1f739f39443551ff12bbe",
            "xdc5058dfe24ef6b537b5bc47116a45f0428da182fa"
        ],
        "PenaltyLen": 0,
        "Penalty": [],
        "Error": null
    }
}
```

Example 2: By Block Number

```
curl --location 'https://xdc.rpc.node' \
--header 'Content-Type: application/json' \
--data '{"jsonrpc":"2.0","method":"XDPoS_getMasternodesByNumber","params":["0x91EB2"],"id":1}'
```

```
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "Number": 597682,
        "Round": 597698,
        "MasternodesLen": 3,
        "Masternodes": [
            "xdcefea93e384a6ccaaf28e33790a2d1b2625bf964d",
            "xdc888c073313b36cf03cf1f739f39443551ff12bbe",
            "xdc5058dfe24ef6b537b5bc47116a45f0428da182fa"
        ],
        "PenaltyLen": 0,
        "Penalty": [],
        "Error": null
    }
}
```

## XDPoS_getLatestPoolStatus

This API is for mainly for debugging purpose, it will show current voting and timeout pool status. Any good for if block gets stuck and we can check which signer it is waiting for. Fast ping point which master node is having issue.

```
curl --location 'https://xdc.rpc.node' \
--header 'Content-Type: application/json' \
--data '{"jsonrpc":"2.0","method":"XDPoS_getLatestPoolStatus","params":[],"id":1}'
```

```
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "timeout": {},
        "vote": {
            "598031:596250:598015:0x8784d1fbb9b4e9718b2ccad3e14a2148b79a534494c7be60c20857f04b5a6374": { // CurrentRound:GapBlockNumber:ProposedBlockNumber:ProposedBlockHash
                "CurrentNumber": 3,
                "CurrentSigners": [
                    "xdc5058dfe24ef6b537b5bc47116a45f0428da182fa",
                    "xdcefea93e384a6ccaaf28e33790a2d1b2625bf964d",
                    "xdc888c073313b36cf03cf1f739f39443551ff12bbe"
                ],
                "MissingSigners": []
            },
            "598049:596250:598033:0xe50ea51a36a391b2e453e34ec10b7f86ebb459d621240c05efe53bb0cfca148f": {
                "CurrentNumber": 2,
                "CurrentSigners": [
                    "xdc5058dfe24ef6b537b5bc47116a45f0428da182fa",
                    "xdc888c073313b36cf03cf1f739f39443551ff12bbe"
                ],
                "MissingSigners": [
                    "xdcefea93e384a6ccaaf28e33790a2d1b2625bf964d"
                ]
            }
        }
    }
}
```

