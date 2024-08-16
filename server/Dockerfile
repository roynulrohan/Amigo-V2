# Stage 1 : Build Server

FROM node:18-alpine

WORKDIR /usr/src/app/server/
COPY package*.json ./
RUN npm install -qy
COPY ./ ./

CMD ["npm", "start"]