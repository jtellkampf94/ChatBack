FROM node:18-alpine3.14

ENV NODE_OPTIONS=--max_old_space_size=4096

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
USER node