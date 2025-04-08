FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-only

FROM nginx:stable-alpine
COPY --from=build /app/dist /var/www/html/anouvene/cicd-docker
COPY nginx.conf /etc/nginx/conf.d/cicd-docker.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]