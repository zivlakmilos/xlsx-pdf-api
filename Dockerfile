FROM node:18-alpine

RUN apk add libreoffice msttcorefonts-installer icu-data-full
WORKDIR  /home/node/app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

CMD ["npm", "start"]
