FROM node:slim as builder
WORKDIR /builder
COPY . /builder
RUN npm install && npm run-script build

FROM node:slim
WORKDIR /app
COPY --from=builder builder/dist /app/dist
COPY --from=builder builder/server.js /app
COPY --from=builder builder/package.json /app
ENV NODE_ENV=prod
RUN cd /app && npm install
CMD node server
EXPOSE 3000