#!/bin/sh

if [ -z $1 -o $1 == 'help' -o $1 == '--help' ]
then
  echo "Usage: npm run start <mainnet|rinkeby>"
  echo ""
  exit
fi

if [ $1 == 'mainnet' -o $1 == 'rinkeby' ]
then
  exec docker-compose -f ./configs/docker-compose.${1}.yaml -p ${1}_verifiers up -d
else
  echo "Invalid network provided!"
fi
