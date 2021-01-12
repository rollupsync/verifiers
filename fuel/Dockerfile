FROM alpine:latest as buildstage
MAINTAINER Chance Hudson

RUN apk add nodejs-npm git python3 make g++

RUN git clone \
  -c advice.detachedHead=false \
  --depth 1 \
  --branch v1.0.1-beta \
  https://github.com/FuelLabs/fuel-js.git /src
WORKDIR /src

RUN npm ci && \
  npm run bootstrap

FROM alpine:latest

RUN apk add --no-cache nodejs-npm

COPY --from=buildstage /src /src
COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT ["sh", "/entrypoint.sh"]
