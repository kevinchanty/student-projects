FROM node:lts
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN npm install --production
COPY . .
EXPOSE 3100
CMD npm run reset &&\
    npm start