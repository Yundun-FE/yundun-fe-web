FROM node:8.9.4

COPY . /app/
WORKDIR /app

RUN yarn install

EXPOSE 7701
CMD ["npm", "run", "release"]
