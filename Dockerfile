FROM node:slim as builder
WORKDIR /builder
COPY . /builder
RUN npm install && npm run-script build

FROM node:slim
WORKDIR /app
COPY --from=builder builder/dist /app/dist
COPY --from=builder builder/node_modules /app
ENV NODE_ENV=prod
RUN cd /app && npm install
CMD npm run-script serve
EXPOSE 3000