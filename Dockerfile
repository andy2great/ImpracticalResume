# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:13.12.0-alpine as build-stage
WORKDIR /resumeApp
COPY package*.json /resumeApp/
RUN npm install
COPY ./ /resumeApp/
RUN npm run build
EXPOSE 3000
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /resumeApp/build/ /usr/share/nginx/html