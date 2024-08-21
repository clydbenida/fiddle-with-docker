FROM node:alpine

COPY ./package.json .
RUN npm install
COPY . .

RUN npm run build
COPY ./dist .

CMD ["node", "./dist/index.js"]
