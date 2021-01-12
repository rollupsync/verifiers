#!/bin/sh

set -e

WALLET_SECRET_NAME=wallet_password

fuel_v1_default_password="$(cat /var/run/secrets/$WALLET_SECRET_NAME)" \
  exec node /src/packages/client/src $@
