FROM node:22 AS development

WORKDIR /srv/node/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 3000
ENV NODE_ENV=development
ENV IS_DEV_ENV=true

CMD ["npm", "run", "dev"]
