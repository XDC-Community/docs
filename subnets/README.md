---
description: >-
  subnets allow for applications to run local versions of their application for
  privacy or compliance needs while also maintaining an internal means of
  decentralization, and high availability.
---

# Subnets

### XinFin DPoS

#### Build a XDC01 DPoS Based BlockChain network in few steps...!

Here’s how you built a XDC01 blockchain network, in this repository you will get a step-by-step guidance on setting up a hassle free XDC01 blockchain without knowing blockchain knowledge.

## Description

XDC subnets allow for private applications to run locally along side the public main network

This allows for Developers to store data privately off chain on thier own local networks to manage user data privately









**Prerequisite**

**Operating System**: Ubuntu 16.04 64-bit or higher

**Hardware**:

| Hardware     | Minimum | Desired |
| ------------ | ------- | ------- |
| **CPU's**:   | 2       | 4       |
| **Memory**:  | 4 GB    | 16 GB   |
| **Storage**: | 100 GB  | 500 GB  |

### Network Ports

Following network ports need to be open for the nodes to communicate

|     Port     |   Type  | Definition |
| :----------: | :-----: | ---------- |
| 30301-3030\* | TCP/UDP | XDC Enode  |
|  8545-854\*  |   TCP   | RPC        |
|  9545-954\*  |   TCP   | WebSocket  |

**Delete Old Data**

```
    bash reset.sh
```

## Set up script

For managing a multi server node set up you will need to modify Local\_DPoS\_Stup/run.sh file to allow for the encode bootkey provided by each othe bootnodes and list them in order separated by a comma consisting of these attributes&#x20;

&#x20;1\.  local the run.sh script to modify deployment details

```bash
cd Local_DPoS_Stup/run.sh
```

2. add each Enode bootkey broadcasting on port: 3030\* each on a different port acending from port 30301
3. assign the modifires to the suffix of the command&#x20;

```bash
${PROJECT_DIR}/build/bin/$Bin_NAME --bootnodes 
"snode://"
 --syncmode "full" 
 --datadir ./nodes/1 
 --networkid "${networkid}" 
 --port 30303 
 --rpc 
 --rpccorsdomain "*" 
 --ws 
 --wsaddr="0.0.0.0" 
 --wsorigins "*" 
 --wsport 8555 
 --rpcaddr 0.0.0.0 
 --rpcport 8545 
 --rpcvhosts "*" 
 --unlock "${wallet1}" 
 --password ./.pwd 
 --mine 
 --gasprice "${GASPRICE}" 
 --targetgaslimit "420000000" 
 --verbosity ${VERBOSITY} 
 --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,XDPoS 
 --ethstats "XinFin-MasterNode-01:xinfin_xdpos_hybrid_network_stats@stats.xinfin.network:3000" &

```

## Full command

{% code overflow="wrap" %}
```bash
${PROJECT_DIR}/build/bin/$Bin_NAME --bootnodes "enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@78.129.229.96:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@5.152.223.199:30301,enode://d757f1a21828c9c426e26df39176053302209e3dd05e7a6c0e0eae57739e233c0fa970c9b98e010cee4817e6233c3ad3eef461cef3e731c485ed4bc08de7d0ac@37.58.56.228:30303 --syncmode "full" --datadir ./nodes/1 --networkid "${networkid}" --port 30303 --rpc --rpccorsdomain "*" --ws --wsaddr="0.0.0.0" --wsorigins "*" --wsport 8555 --rpcaddr 0.0.0.0 --rpcport 8545 --rpcvhosts "*" --unlock "${wallet1}" --password ./.pwd --mine --gasprice "${GASPRICE}" --targetgaslimit "420000000" --verbosity ${VERBOSITY} --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,XDPoS --ethstats "XinFin-MasterNode-01:xinfin_xdpos_hybrid_network_stats@stats.xinfin.network:3000" &
```
{% endcode %}

## run.sh

{% code lineNumbers="true" %}
```bash
// Local_DPoS_Stup/run.sh
#!/bin/bash
_interupt() { 
    echo "Shutdown $child_proc"
    kill -TERM $child_proc
    exit
}

trap _interupt INT TERM

touch .pwd
export $(cat .env | xargs)
Bin_NAME=XDC

WORK_DIR=$PWD
PROJECT_DIR="/root/XinFin/XDPoSChain"
cd $PROJECT_DIR && make XDC
cd $WORK_DIR

if [ ! -d ./nodes/1/$Bin_NAME/chaindata ]
then
  wallet1=$(${PROJECT_DIR}/build/bin/$Bin_NAME account import --password .pwd --datadir ./nodes/1 <(echo ${PRIVATE_KEY_1}) | awk -v FS="({|})" '{print $2}')
  wallet2=$(${PROJECT_DIR}/build/bin/$Bin_NAME account import --password .pwd --datadir ./nodes/2 <(echo ${PRIVATE_KEY_2}) | awk -v FS="({|})" '{print $2}')
  wallet3=$(${PROJECT_DIR}/build/bin/$Bin_NAME account import --password .pwd --datadir ./nodes/3 <(echo ${PRIVATE_KEY_3}) | awk -v FS="({|})" '{print $2}')
  ${PROJECT_DIR}/build/bin/$Bin_NAME --datadir ./nodes/1 init ./genesis/genesis.json
  ${PROJECT_DIR}/build/bin/$Bin_NAME --datadir ./nodes/2 init ./genesis/genesis.json
  ${PROJECT_DIR}/build/bin/$Bin_NAME --datadir ./nodes/3 init ./genesis/genesis.json
else
  wallet1=$(${PROJECT_DIR}/build/bin/$Bin_NAME account list --datadir ./nodes/1 | head -n 1 | awk -v FS="({|})" '{print $2}')
  wallet2=$(${PROJECT_DIR}/build/bin/$Bin_NAME account list --datadir ./nodes/2 | head -n 1 | awk -v FS="({|})" '{print $2}')
  wallet3=$(${PROJECT_DIR}/build/bin/$Bin_NAME account list --datadir ./nodes/3 | head -n 1 | awk -v FS="({|})" '{print $2}')
fi

VERBOSITY=3
GASPRICE="1"
networkid=50


echo Starting the bootnode ...
${PROJECT_DIR}/build/bin/bootnode -nodekey ./bootnode.key --addr 0.0.0.0:30301 &
child_proc=$! 

echo Starting the nodes ...
${PROJECT_DIR}/build/bin/$Bin_NAME --bootnodes "enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@78.129.229.96:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@5.152.223.199:30301,enode://d757f1a21828c9c426e26df39176053302209e3dd05e7a6c0e0eae57739e233c0fa970c9b98e010cee4817e6233c3ad3eef461cef3e731c485ed4bc08de7d0ac@37.58.56.228:30303,enode://d757f1a21828c9c426e26df39176053302209e3dd05e7a6c0e0eae57739e233c0fa970c9b98e010cee4817e6233c3ad3eef461cef3e731c485ed4bc08de7d0ac@37.58.56.228:30304,enode://ef4d512152b875de3fc3990e3e124ae55adea35c49c5df40d0c4bea9327116fcfba70b920a7c164e08f425876025cbcf2519ad5238e57c10ea205e7897926a35@45.76.113.250:30303,enode://bcda483330dc0845f521ad611bcdc8cb147a7a8008c022dba20da2ab52ae46fd6d04f3cb9b7da4e94cf81d2c61065e008a13b5f05f3b69795b0dbdd2a14bb48d@209.222.30.63:30303,enode://2edc16258f6f2e18b105362df5af89889b5dbb7b098f266c39ba1b6200e9dfa76b8fd3bc0cdefce089d9e285772ae69d549e6807b23341ac975d0c085b936f1b@139.180.131.100:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@149.28.135.114:30303,enode://5fcb6aa25e9e4184f278f842581507e4180851e861a59e1a02cf62f2927ee073ba921b5cba10301043f41ed494860f0ccc7508f1058c25f8ebcd56e9f8da018b@149.28.140.203:30303,enode://3a792327abf09be1b78db697c33de653d21bb702eaf6e292899c31a59f0b9535753a34d41f088416bc3f90d25c35ecd6b79d0015c36cf10f9a27c89ecd1f7fa4@149.28.140.232:30303,enode://26def7887241597a30314a77b1a32f156bdcc92eee198b086ae7c4dc26b986a9be6d078b09e93a1f963b083885020e1edfbf6b053dcebbdd090f6dfb289b59f0@149.28.142.223:30303,enode://f35e4ff8bfca2b37297dae0524146c2e4ef20c5d95be48cabe0072334bcf77a9385bad27b9630ee5ba4de451076c2123ad06113f21e3f78387a0e6fde7ec1b0b@45.77.183.160:30303,enode://44f8256e0285d1a94a73187116772522dcf53ef3affcac171cf01ffb00ec613ba1960f1309cc9353207a8f1211e645016c6e30b9669190aac8386c78545b84b1@198.13.34.190:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@139.180.218.68:30303,enode://5701cfd1d03a04a3a17076e50983397ff634ff7f00693f62f6d4d94107796b74b8e10b8ad6efbf1499ae0c6263e84594d30986c79242a37b1c9d27cddb57cdc5@207.148.71.42:30303,enode://b0bd514f1b0892ab26c1d8be59510406f7d700c74cd3cd03d3f8d0fc21b784bb2fb7bde3afacf435928ca9506decf73bd15af5a64bd5dd113b26fc91605ce397@45.77.181.79:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@139.180.135.153:30303,enode://297167bcccf50a94fd2b9a1f1a372228526a95066030295ee8842e0bcaf798da751974a8b08caa9fb9764d2b2d50e64ec5a90a8b942a2a9d6b1db9d5995de3ff@139.180.143.152:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@45.77.244.187:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@45.76.153.161:30303,enode://3a914391c6f6ff0af000b5e614df1074c2a2db2575d6c4d02c3d96bc00ed52ba4281df45b065cbc253c2a02d0bc34272520e772ee9880b28ef107e91b86166d8@109.169.55.28:30303,enode://2953c5ea2a2829a242123e14538b137be858602da1e68beb8c7f7ec797d9d42cf4f0c76b62e98c4d5578e0eeefa42a501fdfec7079e8db206d89d037a09cde3a@109.169.55.28:30304,enode://80dee88ded07fcb0ed1f4a9db4c60c0bd0592d44656571822b479047653b0c30d84e68c83057db048d2120cd7d504fd6a70a89161c31aaf98e65cfba4a77a528@109.169.55.28:30305,enode://7e495d7e1be1fc47d62f8510249435fb3b6f279880704896cbd78e05027298ed133979a388cc0ecf51fb014a8c68438b45e4a2d82ab1ed9cf86a31e87fed32c5@78.129.229.96:30303,enode://02c155fe4b34293b50d70a10889a57d9f2434fefdf142c6d24d73df9ccff19994cb243b55e87a9349a8f87d827363f74b0b40f44d96925aaaedadb456e38c0c0@78.129.229.96:30304,enode://bc2a722d080b008132ef395763d87f491fb6adc34b5d34b698cfeeadced2d4468ee5dc09f39956b4686c88af9bf26e39bc050feb52c0976238645a0343e6049f@78.129.229.96:30305,enode://560113969268e30a430991e36fcb1a6ea8a2bc16f23bc1dabffd6f8c17649237d58d8cf554e9ce882184abdc9b3a607230123e2bcf819d4ed01ec02acee1c4c2@78.159.100.155:30303,enode://a86d3268c060323572bfeb6df76081e4668ec44cc60ff028c1685a9a683c5d6497c987b5dfade81323d08875066218a1877484396e11f400ce1c2c9bd343c935@78.159.100.155:30304,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@127.0.0.1:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@78.129.229.96:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@5.152.223.199:30301" --syncmode "full" --datadir ./nodes/1 --networkid "${networkid}" --port 30303 --rpc --rpccorsdomain "*" --ws --wsaddr="0.0.0.0" --wsorigins "*" --wsport 8555 --rpcaddr 0.0.0.0 --rpcport 8545 --rpcvhosts "*" --unlock "${wallet1}" --password ./.pwd --mine --gasprice "${GASPRICE}" --targetgaslimit "420000000" --verbosity ${VERBOSITY} --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,XDPoS --ethstats "XinFin-MasterNode-01:xinfin_xdpos_hybrid_network_stats@stats.xinfin.network:3000" &
child_proc="$child_proc $!"
${PROJECT_DIR}/build/bin/$Bin_NAME --bootnodes "enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@78.129.229.96:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@5.152.223.199:30301,enode://d757f1a21828c9c426e26df39176053302209e3dd05e7a6c0e0eae57739e233c0fa970c9b98e010cee4817e6233c3ad3eef461cef3e731c485ed4bc08de7d0ac@37.58.56.228:30303,enode://d757f1a21828c9c426e26df39176053302209e3dd05e7a6c0e0eae57739e233c0fa970c9b98e010cee4817e6233c3ad3eef461cef3e731c485ed4bc08de7d0ac@37.58.56.228:30304,enode://ef4d512152b875de3fc3990e3e124ae55adea35c49c5df40d0c4bea9327116fcfba70b920a7c164e08f425876025cbcf2519ad5238e57c10ea205e7897926a35@45.76.113.250:30303,enode://bcda483330dc0845f521ad611bcdc8cb147a7a8008c022dba20da2ab52ae46fd6d04f3cb9b7da4e94cf81d2c61065e008a13b5f05f3b69795b0dbdd2a14bb48d@209.222.30.63:30303,enode://2edc16258f6f2e18b105362df5af89889b5dbb7b098f266c39ba1b6200e9dfa76b8fd3bc0cdefce089d9e285772ae69d549e6807b23341ac975d0c085b936f1b@139.180.131.100:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@149.28.135.114:30303,enode://5fcb6aa25e9e4184f278f842581507e4180851e861a59e1a02cf62f2927ee073ba921b5cba10301043f41ed494860f0ccc7508f1058c25f8ebcd56e9f8da018b@149.28.140.203:30303,enode://3a792327abf09be1b78db697c33de653d21bb702eaf6e292899c31a59f0b9535753a34d41f088416bc3f90d25c35ecd6b79d0015c36cf10f9a27c89ecd1f7fa4@149.28.140.232:30303,enode://26def7887241597a30314a77b1a32f156bdcc92eee198b086ae7c4dc26b986a9be6d078b09e93a1f963b083885020e1edfbf6b053dcebbdd090f6dfb289b59f0@149.28.142.223:30303,enode://f35e4ff8bfca2b37297dae0524146c2e4ef20c5d95be48cabe0072334bcf77a9385bad27b9630ee5ba4de451076c2123ad06113f21e3f78387a0e6fde7ec1b0b@45.77.183.160:30303,enode://44f8256e0285d1a94a73187116772522dcf53ef3affcac171cf01ffb00ec613ba1960f1309cc9353207a8f1211e645016c6e30b9669190aac8386c78545b84b1@198.13.34.190:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@139.180.218.68:30303,enode://5701cfd1d03a04a3a17076e50983397ff634ff7f00693f62f6d4d94107796b74b8e10b8ad6efbf1499ae0c6263e84594d30986c79242a37b1c9d27cddb57cdc5@207.148.71.42:30303,enode://b0bd514f1b0892ab26c1d8be59510406f7d700c74cd3cd03d3f8d0fc21b784bb2fb7bde3afacf435928ca9506decf73bd15af5a64bd5dd113b26fc91605ce397@45.77.181.79:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@139.180.135.153:30303,enode://297167bcccf50a94fd2b9a1f1a372228526a95066030295ee8842e0bcaf798da751974a8b08caa9fb9764d2b2d50e64ec5a90a8b942a2a9d6b1db9d5995de3ff@139.180.143.152:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@45.77.244.187:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@45.76.153.161:30303,enode://3a914391c6f6ff0af000b5e614df1074c2a2db2575d6c4d02c3d96bc00ed52ba4281df45b065cbc253c2a02d0bc34272520e772ee9880b28ef107e91b86166d8@109.169.55.28:30303,enode://2953c5ea2a2829a242123e14538b137be858602da1e68beb8c7f7ec797d9d42cf4f0c76b62e98c4d5578e0eeefa42a501fdfec7079e8db206d89d037a09cde3a@109.169.55.28:30304,enode://80dee88ded07fcb0ed1f4a9db4c60c0bd0592d44656571822b479047653b0c30d84e68c83057db048d2120cd7d504fd6a70a89161c31aaf98e65cfba4a77a528@109.169.55.28:30305,enode://7e495d7e1be1fc47d62f8510249435fb3b6f279880704896cbd78e05027298ed133979a388cc0ecf51fb014a8c68438b45e4a2d82ab1ed9cf86a31e87fed32c5@78.129.229.96:30303,enode://02c155fe4b34293b50d70a10889a57d9f2434fefdf142c6d24d73df9ccff19994cb243b55e87a9349a8f87d827363f74b0b40f44d96925aaaedadb456e38c0c0@78.129.229.96:30304,enode://bc2a722d080b008132ef395763d87f491fb6adc34b5d34b698cfeeadced2d4468ee5dc09f39956b4686c88af9bf26e39bc050feb52c0976238645a0343e6049f@78.129.229.96:30305,enode://560113969268e30a430991e36fcb1a6ea8a2bc16f23bc1dabffd6f8c17649237d58d8cf554e9ce882184abdc9b3a607230123e2bcf819d4ed01ec02acee1c4c2@78.159.100.155:30303,enode://a86d3268c060323572bfeb6df76081e4668ec44cc60ff028c1685a9a683c5d6497c987b5dfade81323d08875066218a1877484396e11f400ce1c2c9bd343c935@78.159.100.155:30304,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@127.0.0.1:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@78.129.229.96:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@5.152.223.199:30301" --syncmode "full" --datadir ./nodes/2 --networkid "${networkid}" --port 30304 --rpc --rpccorsdomain "*" --ws --wsaddr="0.0.0.0" --wsorigins "*" --wsport 8556 --rpcaddr 0.0.0.0 --rpcport 8546 --rpcvhosts "*" --unlock "${wallet2}" --password ./.pwd --mine --gasprice "${GASPRICE}" --targetgaslimit "420000000" --verbosity ${VERBOSITY} --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,XDPoS --ethstats "XinFin-MasterNode-02:xinfin_xdpos_hybrid_network_stats@stats.xinfin.network:3000" &
child_proc="$child_proc $!"
${PROJECT_DIR}/build/bin/$Bin_NAME --bootnodes "enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@78.129.229.96:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@5.152.223.199:30301,enode://d757f1a21828c9c426e26df39176053302209e3dd05e7a6c0e0eae57739e233c0fa970c9b98e010cee4817e6233c3ad3eef461cef3e731c485ed4bc08de7d0ac@37.58.56.228:30303,enode://d757f1a21828c9c426e26df39176053302209e3dd05e7a6c0e0eae57739e233c0fa970c9b98e010cee4817e6233c3ad3eef461cef3e731c485ed4bc08de7d0ac@37.58.56.228:30304,enode://ef4d512152b875de3fc3990e3e124ae55adea35c49c5df40d0c4bea9327116fcfba70b920a7c164e08f425876025cbcf2519ad5238e57c10ea205e7897926a35@45.76.113.250:30303,enode://bcda483330dc0845f521ad611bcdc8cb147a7a8008c022dba20da2ab52ae46fd6d04f3cb9b7da4e94cf81d2c61065e008a13b5f05f3b69795b0dbdd2a14bb48d@209.222.30.63:30303,enode://2edc16258f6f2e18b105362df5af89889b5dbb7b098f266c39ba1b6200e9dfa76b8fd3bc0cdefce089d9e285772ae69d549e6807b23341ac975d0c085b936f1b@139.180.131.100:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@149.28.135.114:30303,enode://5fcb6aa25e9e4184f278f842581507e4180851e861a59e1a02cf62f2927ee073ba921b5cba10301043f41ed494860f0ccc7508f1058c25f8ebcd56e9f8da018b@149.28.140.203:30303,enode://3a792327abf09be1b78db697c33de653d21bb702eaf6e292899c31a59f0b9535753a34d41f088416bc3f90d25c35ecd6b79d0015c36cf10f9a27c89ecd1f7fa4@149.28.140.232:30303,enode://26def7887241597a30314a77b1a32f156bdcc92eee198b086ae7c4dc26b986a9be6d078b09e93a1f963b083885020e1edfbf6b053dcebbdd090f6dfb289b59f0@149.28.142.223:30303,enode://f35e4ff8bfca2b37297dae0524146c2e4ef20c5d95be48cabe0072334bcf77a9385bad27b9630ee5ba4de451076c2123ad06113f21e3f78387a0e6fde7ec1b0b@45.77.183.160:30303,enode://44f8256e0285d1a94a73187116772522dcf53ef3affcac171cf01ffb00ec613ba1960f1309cc9353207a8f1211e645016c6e30b9669190aac8386c78545b84b1@198.13.34.190:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@139.180.218.68:30303,enode://5701cfd1d03a04a3a17076e50983397ff634ff7f00693f62f6d4d94107796b74b8e10b8ad6efbf1499ae0c6263e84594d30986c79242a37b1c9d27cddb57cdc5@207.148.71.42:30303,enode://b0bd514f1b0892ab26c1d8be59510406f7d700c74cd3cd03d3f8d0fc21b784bb2fb7bde3afacf435928ca9506decf73bd15af5a64bd5dd113b26fc91605ce397@45.77.181.79:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@139.180.135.153:30303,enode://297167bcccf50a94fd2b9a1f1a372228526a95066030295ee8842e0bcaf798da751974a8b08caa9fb9764d2b2d50e64ec5a90a8b942a2a9d6b1db9d5995de3ff@139.180.143.152:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@45.77.244.187:30303,enode://95fc2505216570bce1f75de47289d5cdcd35eba61a3e2d89fe1690dbdc60e22d8a12fe12c54c77d87f7b56035aa9ef2021387906ac3f5b3814cd90267b64f02e@45.76.153.161:30303,enode://3a914391c6f6ff0af000b5e614df1074c2a2db2575d6c4d02c3d96bc00ed52ba4281df45b065cbc253c2a02d0bc34272520e772ee9880b28ef107e91b86166d8@109.169.55.28:30303,enode://2953c5ea2a2829a242123e14538b137be858602da1e68beb8c7f7ec797d9d42cf4f0c76b62e98c4d5578e0eeefa42a501fdfec7079e8db206d89d037a09cde3a@109.169.55.28:30304,enode://80dee88ded07fcb0ed1f4a9db4c60c0bd0592d44656571822b479047653b0c30d84e68c83057db048d2120cd7d504fd6a70a89161c31aaf98e65cfba4a77a528@109.169.55.28:30305,enode://7e495d7e1be1fc47d62f8510249435fb3b6f279880704896cbd78e05027298ed133979a388cc0ecf51fb014a8c68438b45e4a2d82ab1ed9cf86a31e87fed32c5@78.129.229.96:30303,enode://02c155fe4b34293b50d70a10889a57d9f2434fefdf142c6d24d73df9ccff19994cb243b55e87a9349a8f87d827363f74b0b40f44d96925aaaedadb456e38c0c0@78.129.229.96:30304,enode://bc2a722d080b008132ef395763d87f491fb6adc34b5d34b698cfeeadced2d4468ee5dc09f39956b4686c88af9bf26e39bc050feb52c0976238645a0343e6049f@78.129.229.96:30305,enode://560113969268e30a430991e36fcb1a6ea8a2bc16f23bc1dabffd6f8c17649237d58d8cf554e9ce882184abdc9b3a607230123e2bcf819d4ed01ec02acee1c4c2@78.159.100.155:30303,enode://a86d3268c060323572bfeb6df76081e4668ec44cc60ff028c1685a9a683c5d6497c987b5dfade81323d08875066218a1877484396e11f400ce1c2c9bd343c935@78.159.100.155:30304,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@127.0.0.1:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@78.129.229.96:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@5.152.223.199:30301" --syncmode "full" --datadir ./nodes/3 --networkid "${networkid}" --port 30305 --rpc --rpccorsdomain "*" --ws --wsaddr="0.0.0.0" --wsorigins "*" --wsport 8557 --rpcaddr 0.0.0.0 --rpcport 8547 --rpcvhosts "*" --unlock "${wallet3}" --password ./.pwd --mine --gasprice "${GASPRICE}" --targetgaslimit "420000000" --verbosity ${VERBOSITY} --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,XDPoS --ethstats "XinFin-MasterNode-03:xinfin_xdpos_hybrid_network_stats@stats.xinfin.network:3000" 
```
{% endcode %}



**Launch the setup script**

```
    bash run.sh
```









