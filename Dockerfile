FROM node:8
WORKDIR /usr/src
COPY client ./client
COPY server ./server
WORKDIR /usr/src/client
RUN npm install
RUN npm run build
WORKDIR /usr/src/server
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]