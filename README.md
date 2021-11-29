# dcgrants-subgraph
Subgraph for Decentralized Grants

## Install Dependencies
`$ yarn`

To install dev dependencies

`$ yarn install -D`

## Deploy to matic/rinkeby
1) Update any contract details in `config/*` and prepare the `subgraph.yaml`
`$ yarn prepare:[matic|matic-staging|rinkeby]`
2) Generate the types
`$ yarn codegen && yarn build`
4) Authenticate with TheGraph if you have not already
`$ yarn graph auth --product hosted-service [access token]`
4) Deploy the subgraph to public graph node on the appropriate network
 If this is the first time that this subgraph has been deployed, you must create it on thegraph.com under the hosted service ensuring that it is within the DCGTC account
`$ yarn deploy:[matic|matic-staging|rinkeby]`


## Run Local Environment
- `git clone https://github.com/graphprotocol/graph-node/`
- `cd graph-node/docker`
- set the correct `network` and `rpc` endpoint in the `evironment` section of `./docker-compose.yml`
- `./setup.sh`
- `docker-compose up`

## Build and Deploy Locally
1) Update any contract details in `config/*` and prepare the `subgraph.yaml`
`$ yarn prepare:[matic|matic-staging|rinkeby]`
2) Generate the types
`$ yarn codegen && yarn build`
3) Allocate the subgraph name in the Graph Node
`$ yarn create-local`
4) Deploy the subgraph to local graph node
`$ yarn deploy-local`



