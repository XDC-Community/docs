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
PROJECT_DIR="/root/XinFin/XDPoS-TestNet-Apothem"
cd $PROJECT_DIR && make all
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

echo Starting the bootnode ...
${PROJECT_DIR}/build/bin/bootnode -nodekey ./bootnode.key --addr 0.0.0.0:30301 &
child_proc=$! 

echo Starting the nodes ...
${PROJECT_DIR}/build/bin/$Bin_NAME --bootnodes "enode://ec569f5d52cefee5c5405a0c5db720dc7061f3085e0682dd8321413430ddda6a177b85db75b0daf83d2e68760ba3f5beb4ba9e333e7d52072fba4d39b05a0451@109.169.40.129:30301,enode://ec569f5d52cefee5c5405a0c5db720dc7061f3085e0682dd8321413430ddda6a177b85db75b0daf83d2e68760ba3f5beb4ba9e333e7d52072fba4d39b05a0451@5.152.223.199:30303,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@62.233.65.7:30301,enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@127.0.0.1:30301" --syncmode "full" --datadir ./nodes/1 --networkid "${networkid}" --port 30303 --rpc --rpccorsdomain "*" --ws --wsaddr="0.0.0.0" --wsorigins "*" --wsport 8555 --rpcaddr 0.0.0.0 --rpcport 8545 --rpcvhosts "*" --unlock "${wallet1}" --password ./.pwd --mine --gasprice "${GASPRICE}" --targetgaslimit "420000000" --verbosity ${VERBOSITY} --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,XDPoS --ethstats "XinFin-MasterNode-01:xinfin_test_network_stats@stats_testnet.xinfin.network:3000"
# child_proc="$child_proc $!"
# ${PROJECT_DIR}/build/bin/$Bin_NAME --bootnodes "enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@127.0.0.1:30301" --syncmode "full" --datadir ./nodes/2 --networkid 853 --port 30304 --rpc --rpccorsdomain "*" --ws --wsaddr="0.0.0.0" --wsorigins "*" --wsport 8556 --rpcaddr 0.0.0.0 --rpcport 8546 --rpcvhosts "*" --unlock "${wallet2}" --password ./.pwd --mine --gasprice "${GASPRICE}" --targetgaslimit "420000000" --verbosity ${VERBOSITY} --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,XDPoS --ethstats "XinFin-MasterNode-02:xinfin_network_stats@stats.testnet.xinfin.network:3000" &
# child_proc="$child_proc $!"
# ${PROJECT_DIR}/build/bin/$Bin_NAME --bootnodes "enode://1c20e6b46ce608c1fe739e78611225b94e663535b74a1545b1667eac8ff75ed43216306d123306c10e043f228e42cc53cb2728655019292380313393eaaf6e23@127.0.0.1:30301" --syncmode "full" --datadir ./nodes/3 --networkid 853 --port 30305 --rpc --rpccorsdomain "*" --ws --wsaddr="0.0.0.0" --wsorigins "*" --wsport 8557 --rpcaddr 0.0.0.0 --rpcport 8547 --rpcvhosts "*" --unlock "${wallet3}" --password ./.pwd --mine --gasprice "${GASPRICE}" --targetgaslimit "420000000" --verbosity ${VERBOSITY} --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,XDPoS --ethstats "XinFin-MasterNode-03:xinfin_network_stats@stats.testnet.xinfin.network:3000" 
