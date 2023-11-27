FROM node:14

WORKDIR /usr/src/app

COPY /Backend/package*.json ./

RUN npm install

COPY . .

EXPOSE 300

CMD ["node", "app.js"]