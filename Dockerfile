FROM ghcr.io/puppeteer/puppeteer:19.7.0
WORKDIR /app
COPY --chown=pptruser yarn.lock .
RUN yarn install --frozen-lockfile

FROM ghcr.io/puppeteer/puppeteer:19.7.0
WORKDIR /app
COPY --from=0 /app/node_modules .
COPY --chown=pptruser . .
RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]
