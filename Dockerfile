# docker build . -t anorpsearch-docker-service -f Dockerfile
# docker run --rm -d -p 80:4200 anorpsearch-docker-service:latest

### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder
COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run ng build -- --prod --output-path=dist


### STAGE 2: Setup ###
FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

##Step 1
#FROM node:12.2.0 as node
#WORKDIR /app
#COPY . .
#RUN npm install
#RUN npm audit fix
#RUN npm run build --prod
#
##Step 2
#
## Create image based on the official Node 6 image from dockerhub
#FROM nginx:alpine
#COPY --from=node /app/dist/anOrpSearch /usr/share/nginx/html

## base image
#FROM node:12.2.0
#
## install chrome for protractor tests
##RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
##RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
##RUN apt-get update && apt-get install -yq google-chrome-stable
#
## set working directory
#WORKDIR /app
#
## add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH
#
## install and cache app dependencies
#COPY package.json /app/package.json
#RUN npm install
#RUN npm install -g @angular/cli@8.2.2
#
## add app
#COPY . /app
#
#RUN npm run build --prod
#
## start app
#CMD ng serve
