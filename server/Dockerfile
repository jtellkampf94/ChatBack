FROM node:16

ENV NODE_OPTIONS=--max_old_space_size=2048
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 8080

CMD ["node", "dist/index.js"]
USER node