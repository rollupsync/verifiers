## Verifiers

[![](https://img.shields.io/circleci/build/github/rollupsync/verifiers/main)](https://app.circleci.com/pipelines/github/rollupsync/verifiers?branch=main) [![](https://img.shields.io/docker/image-size/rollupsync/fuel/latest?label=rollupsync%2Ffuel)](https://hub.docker.com/r/rollupsync/fuel/tags?page=1&ordering=last_updated)

Docker images for optimistic rollups.

### Usage

Use `npm run wallet` to create a wallet. The wallet will be stored in `wallet.enc.json` and the password in `wallet_password.secret`.

These will be passed to docker using the secrets functionality. The same wallet will be used for all verifiers.

#### Running

The following commands should be used to start, stop, and view logs of verifiers.

To start the verifier daemons: `npm run start mainnet`

To stop them: `npm run stop mainnet`

To view logs: `npm run logs mainnet`

`mainnet` may be replaced with any supported network name, currently `mainnet` and `rinkeby` are supported.
