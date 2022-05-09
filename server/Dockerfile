FROM node:18-alpine3.14

ENV NODE_OPTIONS=--max_old_space_size=4096

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]
USER node