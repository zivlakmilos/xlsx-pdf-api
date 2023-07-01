FROM node:18-alpine

WORKDIR  /home/node/app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

CMD ["npm", "start"]
