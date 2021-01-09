FROM alpine:latest
MAINTAINER Chance Hudson

RUN apk add nodejs-npm git python3 make g++

RUN git clone \
  -c advice.detachedHead=false \
  --depth 1 \
  --branch v1.0.1-beta \
  https://github.com/FuelLabs/fuel-js.git /src
WORKDIR /src

RUN npm ci && npm run bootstrap

ENTRYPOINT ["node", "/src/packages/client/src"]
