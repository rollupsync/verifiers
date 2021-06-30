FROM alpine:latest as buildstage
MAINTAINER Chance Hudson

ARG BRANCH=misc-fixes

RUN apk add nodejs-npm git && \
  npm i -g yarn

RUN git clone \
  -c advice.detachedHead=false \
  --depth 1 \
  --branch $BRANCH \
  https://github.com/zkopru-network/zkopru.git /src
WORKDIR /src

RUN yarn && yarn build

FROM alpine:latest

RUN apk add --no-cache nodejs-npm

COPY --from=buildstage /src /src

ENTRYPOINT ["node", "/src/packages/cli/dist/apps/coordinator/cli"]
