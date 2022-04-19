FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .

ENV NODE_ENV production

EXPOSE 8080

CMD ["node", "dist/index.js"]
USER node