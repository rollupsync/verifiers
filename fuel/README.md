## Usage

This docker image enters the fuel executable.

```sh
$ docker run -it --rm rollupsync/fuel --help

 ⚡ fuel [options]

 Options:

   -n, --network         the ethereum network "mainnet"; default "mainnet"
   -r, --rpc             a standard Ethereum RPC provider (i.e. local go-ethereum)
   -i, --infura          an Infura service API key (--network must also be specified)
   -es, --etherscan      an Etherscan service API key (--network must also be specified)
   -e, --environment     use the environment variables to specify node paramaters
   -w, --wallet          path to a pbkdf2 encrypted Ethers wallet JSON file; default ".fuel-wallet.json"
   -c, --clear           clears the leveldb store
   -s, --serve           starts a local Fuel RPC server on http://localhost:3000; default false
   -p, --port            specify the Fuel RPC server port; default 3000
   -cr, --cors           cors domain for the Fuel RPC server; default http://localhost:1234
   -o, --oracle          start a price feed oracle for stablecoins and ether
   -f, --faucet          start a test network faucet

 Examples:

   $ fuel --network="rinkeby" --rpc="http://localhost:8545"
```

### Relevant ENV variables

```
fuel_v1_default_password - wallet password
```

### Mounts

A JSON wallet file should be mounted to `/src/.fuel-wallet.json` to be automatically loaded.

### Sample docker-compose

```yaml
version: "3"
services:
  fuel:
    image: rollupsync/fuel:latest
    env_file:
      - fuel.env # put the wallet password in here
    environment:
      - fuel_v1_default_password: password
    ports:

```
