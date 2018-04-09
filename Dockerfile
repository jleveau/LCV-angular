FROM node:slim as builder
WORKDIR /builder
COPY . /builder
RUN npm install && npm run-script build

FROM node:slim
WORKDIR /app
COPY --from=builder builder/dist /app/dist
COPY --from=builder builder/server /app/server
ENV NODE_ENV=prod
RUN cd /app/server && npm install
CMD cd /app/server && npm run-script start-prod
EXPOSE 3000
EXPOSE 443