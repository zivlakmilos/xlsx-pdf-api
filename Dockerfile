FROM node:18-alpine

RUN apk add libreoffice
WORKDIR  /home/node/app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

CMD ["npm", "start"]
