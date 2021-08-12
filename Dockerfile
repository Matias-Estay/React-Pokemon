FROM node:16.6.2
WORKDIR /
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm","start"]
