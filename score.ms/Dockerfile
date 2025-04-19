FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --workspace=score.ms


CMD ["npm", "start", "--workspace=score.ms"]