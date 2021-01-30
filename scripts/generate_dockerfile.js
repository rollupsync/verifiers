const path = require('path')
const { promises: fs, constants: { R_OK } } = require('fs')

const [,,NETWORK, _WALLET_PATH, _PASSWORD_PATH] = process.argv
const composeHeader = `version: "3"
services:`

function secretsBlock(passwordFilePath) {
  return `
secrets:
  wallet_password:
    file: ${passwordFilePath}`
}

function fuelBlock(network, walletPath) {
  const dbDir = `.fueldb-${network}`
  return `
  fuel:
    image: rollupsync/fuel:v1.0.1
    command: "--produce -e --proxy=false -n ${network} -r https://${network}.rollupsync.com"
    volumes:
      - type: bind
        source: ${walletPath}
        target: /src/.fuel-wallet.json
      - type: bind
        source: ${path.join(process.cwd(), 'data', dbDir)}
        target: /${dbDir}
    secrets:
      - wallet_password`
}

;(async () => {
  try {
    const WALLET_PATH = makePathAbsolute(_WALLET_PATH)
    const PASSWORD_PATH = makePathAbsolute(_PASSWORD_PATH)
    if (!(await fileExists(WALLET_PATH))) {
      console.log(`Error: Wallet file not found at path "${WALLET_PATH}"`)
      process.exit(1)
    }
    if (!(await fileExists(PASSWORD_PATH))) {
      console.log(`Error: Password file not found at path "${PASSWORD_PATH}"`)
      process.exit(1)
    }
    if (NETWORK !== 'mainnet' && NETWORK !== 'rinkeby' && NETWORK !== 'goerli') {
      console.log(`Error: Invalid network supplied "${NETWORK}"`)
      process.exit(1)
    }
    const composePath = path.join(process.cwd(), 'docker-compose.yaml')
    if ((await fileExists(composePath))) {
      console.log('Error: docker-compose.yaml already exists in directory')
      process.exit(1)
    }
    const composeFile = `${composeHeader}
${fuelBlock(NETWORK, WALLET_PATH)}
${secretsBlock(PASSWORD_PATH)}`

    await fs.writeFile(composePath, composeFile)
    console.log('Done!')
  } catch (err) {
    console.log(err)
    console.log('Uncaught error')
    process.exit(1)
  }
})()

function makePathAbsolute(filepath) {
  if (path.isAbsolute(filepath)) return filepath
  return path.join(process.cwd(), filepath)
}

async function fileExists(filepath) {
  try {
    await fs.access(filepath, R_OK)
    return true
  } catch (_) {
    return false
  }
}
