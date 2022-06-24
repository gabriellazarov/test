FROM node:16.13.2-alpine3.14

ARG PORT=${PORT:-'3080'}

RUN mkdir -p /usr/src/test

WORKDIR /usr/src/test

COPY . /usr/src/test

RUN npm install

RUN npm run lint

RUN npm run build

EXPOSE $PORT

CMD [ "sh", "-c", "npm run start" ]
