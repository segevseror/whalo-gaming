FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --workspace=player.ms


CMD ["npm", "start", "--workspace=player.ms"]