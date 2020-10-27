FROM node:14-alpine

WORKDIR /apps

COPY package.json /apps
COPY package-lock.json /apps

RUN npm install && npm cache clean --force

COPY . ./apps

CMD ["npm", "run", "dev"]