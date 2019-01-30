FROM node:10.8.0

COPY . /app/
WORKDIR /app

RUN yarn install

CMD ["npm", "run", "build"]
