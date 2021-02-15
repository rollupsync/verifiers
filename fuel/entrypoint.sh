#!/bin/sh

set -e

if [ -z $WALLET_SECRET_NAME ]
then
  WALLET_SECRET_NAME=wallet_password
fi

fuel_v1_default_password="$(cat /var/run/secrets/$WALLET_SECRET_NAME)" \
  exec node /src/packages/client/src $@
