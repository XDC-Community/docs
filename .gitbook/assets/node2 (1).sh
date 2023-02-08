#!/bin/bash
_interupt() { 
    echo "Shutdown $child_proc"
    kill -TERM $child_proc
    exit
}

trap _interupt INT TERM

touch .pwd
export $(cat .env | xargs)
Bin_NAME=gxdc
WORK_DIR=$PWD
PROJECT_DIR="${HOME}/go/src/github.com/ethereum/go-ethereum"
cd $PROJECT_DIR && make $Bin_NAME
cd $WORK_DIR

wallet2=$(${PROJECT_DIR}/build/bin/$Bin_NAME account list --datadir ./nodes/2 | head -n 1 | awk -v FS="({|})" '{print $2}')

VERBOSITY=4
GASPRICE="1"

echo Starting the bootnode ...
${PROJECT_DIR}/build/bin/bootnode -nodekey ./bootnode.key &
child_proc=$! 

echo Starting the nodes ...
${PROJECT_DIR}/build/bin/$Bin_NAME --bootnodes "enode://7d8ffe6d28f738d8b7c32f11fb6daa6204abae990a842025b0a969aabdda702aca95a821746332c2e618a92736538761b1660aa9defb099bc46b16db28992bc9@127.0.0.1:30301" --syncmode "full" --datadir ./nodes/2 --networkid 89 --port 30304 --rpc --rpccorsdomain "*" --rpcaddr 0.0.0.0 --rpcport 8546 --rpcvhosts "*" --unlock "${wallet2}" --password ./.pwd --mine --gasprice "${GASPRICE}" --targetgaslimit "420000000" --verbosity ${VERBOSITY} &
child_proc="$child_proc $!"
tail -f ./genesis/$Bin_NAMEchain.json
