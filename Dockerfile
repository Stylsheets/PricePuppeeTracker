FROM node:16-alpine

WORKDIR /app
COPY yarn.lock .
RUN yarn install --frozen-lockfile

FROM node:16-alpine
WORKDIR /app
COPY --from=0 /app/node_modules .
COPY . .

CMD ["yarn", "start"]
