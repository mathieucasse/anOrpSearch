# docker build . -t anorpsearch-docker-service -f Dockerfile
# docker run --rm -d -p 4202:80 anorpsearch-docker-service:latest

#Step 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#Step 2

# Create image based on the official Node 6 image from dockerhub
FROM nginx:alpine
COPY --from=node /app/dist/anOrpSearch /usr/share/nginx/html
