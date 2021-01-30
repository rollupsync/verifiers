const { generateKeystore } = require('ethereum-keystore')
const { promises: fs, existsSync } = require('fs')
const path = require('path')
const readline = require('readline')
const { Writable } = require('stream')
const crypto = require('crypto')

const walletPath = path.join(process.cwd(), 'wallet.enc.json')
const passwordPath = path.join(process.cwd(), 'wallet_password.secret')

;(async () => {
  try {
    await createWallet()
  } catch (err) {
    console.log(err)
    console.log('Uncaught error')
    process.exit(1)
  }
})()

async function createWallet() {
  if (existsSync(walletPath)) {
    console.log('Wallet detected, aborting...')
    process.exit(0)
  }
  const _password = await readPassword('Creating wallet, enter a password (leave blank to auto-generate):')
  if (_password) {
    const confirm = await readPassword('Confirm password:')
    if (_password !== confirm) {
      console.log('Password mismatch, aborting')
      process.exit(1)
    }
  }
  const password = _password || (await randomString())
  const wallet = await generateKeystore(null, password)
  await fs.writeFile(walletPath, JSON.stringify(wallet))
  await fs.writeFile(passwordPath, password)
  // https://nodejs.org/api/fs.html#fs_file_modes
  await fs.chmod(passwordPath, 0o400)
  // TODO chown it
}

async function randomString(bits = 256) {
  return await new Promise((rs, rj) => {
    crypto.randomBytes(bits, (err, buf) => {
      if (err) return rj(err)
      rs(buf.toString('hex'))
    })
  })
}

async function readPassword(prompt = 'Password: ') {
  let muted = false
  const mutableStdout = new Writable({
    write: function(chunk, encoding, callback) {
      if (!muted)
        process.stdout.write(chunk, encoding)
      callback()
    }
  })
  const rl = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true,
  })
  const promise = new Promise(rs => {
    rl.question(prompt, (password) => {
      rs(password)
      rl.close()
    })
  })
  muted = true
  return await promise
}
