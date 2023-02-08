#!/bin/bash
export $(cat .env | xargs)
Bin_NAME=gxdc
WORK_DIR=$PWD
PROJECT_DIR="${HOME}/go/src/github.com/ethereum/go-ethereum"
cd $PROJECT_DIR && make $Bin_NAME
cd $WORK_DIR

if [ ! -d ./nodes/6/$Bin_NAME/chaindata ]
then
  wallet6=$(${PROJECT_DIR}/build/bin/$Bin_NAME account import --password .pwd --datadir ./nodes/6 <(echo ${PRIVATE_KEY_6}) | awk -v FS="({|})" '{print $2}')
  ${PROJECT_DIR}/build/bin/$Bin_NAME --datadir ./nodes/6 init ./genesis/genesis.json
else
  wallet6=$(${PROJECT_DIR}/build/bin/$Bin_NAME account list --datadir ./nodes/6 | head -n 1 | awk -v FS="({|})" '{print $2}')
fi

VERBOSITY=3
GASPRICE="1"

echo Starting the nodes ...
${PROJECT_DIR}/build/bin/$Bin_NAME --bootnodes "enode://7d8ffe6d28f738d8b7c32f11fb6daa6204abae990a842025b0a969aabdda702aca95a821746332c2e618a92736538761b1660aa9defb099bc46b16db28992bc9@127.0.0.1:30301" --syncmode 'full' --datadir ./nodes/6 --networkid 89 --port 30308 --rpc --rpccorsdomain "*" --rpcaddr 0.0.0.0 --rpcport 8550 --rpcvhosts "*" --unlock "${wallet6}" --password ./.pwd --mine --gasprice "${GASPRICE}" --targetgaslimit "420000000" --verbosity ${VERBOSITY}
