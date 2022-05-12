FROM node:16.10-alpine as client

# Working directory be app
WORKDIR /usr/app/client/

COPY client/package*.json ./

# Install dependencies
RUN npm i

# copy local files to app folder
COPY client/ ./
RUN ls

RUN npm run build && npm run export

# Stage 2 : Build Server

FROM node:16.10-alpine

WORKDIR /usr/src/app/
COPY --from=client /usr/app/client/out/ ./client/build/
RUN ls

WORKDIR /usr/src/app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 443

EXPOSE 443

CMD ["npm", "start"]