FROM node:8.9.4

COPY . /app/
WORKDIR /app

RUN yarn install

CMD ["npm", "run", "build"]
