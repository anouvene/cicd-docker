FROM node:lts-bullseye
WORKDIR /usr/src/app

COPY package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; then \
      npm install --omit=dev; \
    else \
      npm install; \
    fi

COPY . .

RUN npm rebuild bcrypt --build-from-source

ENV PORT=80
EXPOSE 80

CMD ["node", "index.js"]