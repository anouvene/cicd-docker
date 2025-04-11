FROM node:lts-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

# Ajouter ARG pour NODE_ENV
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Installer les dépendances dynamiquement
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm install --omit=dev; \
    else \
      npm install; \
    fi

COPY . .

ENV PORT=80
EXPOSE 80

CMD [ "node", "index.js" ]