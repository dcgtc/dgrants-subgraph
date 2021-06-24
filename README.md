# dcgrants-subgraph
Subgraph for Decentralized Grants

## Install Dependencies
`$ yarn`

## Run Local Environment
git clone https://github.com/graphprotocol/graph-node/
cd graph-node/docker
./setup.sh
docker-compose up

## Build and Deploy Locally
1) Determine the contract address and update it in `subgraph.yaml`
2) Generate the types
`$ yarn codegen`
3) Allocate the subgraph name in the Graph Node
`$ yarn create-local`
4) Deploy the subgraph to local graph node
`$ yarn deploy-local`
