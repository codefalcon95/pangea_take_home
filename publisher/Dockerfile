FROM node:12  as base

WORKDIR /usr/publisher/
COPY package.json \
    ./
RUN yarn --production
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune

# lint and formatting configs are commented out
# uncomment if you want to add them into the build process

FROM base AS dev
COPY nest-cli.json \
    tsconfig.* \ 
    *env \
    #  .eslintrc.js \
    #  .eslintrc.js \
    #  .prettierrc \
    ./
# bring in src from context
COPY ./src/ ./src
RUN npm install

# RUN yarn lint
RUN npm run build

# use one of the smallest images possible
FROM node:12-alpine as production
# get package.json from base
COPY --from=base /usr/publisher/ ./
# get the dist back
COPY --from=dev /usr/publisher/dist/ ./dist/
COPY --from=dev /usr/publisher/.env ./.env
# get the node_modules from the intial cache
COPY --from=base /usr/publisher/node_modules/ ./node_modules/

# expose application port 

EXPOSE 8000
# start
CMD node dist/main.js;

