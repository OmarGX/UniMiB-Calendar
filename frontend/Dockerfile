FROM node:12.16.1-alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g

COPY . .
RUN npm run build

# ------------------------------------------------------
# Webpack server
# ------------------------------------------------------
EXPOSE 3000
CMD ["npm", "start"]

# ------------------------------------------------------
# Production server
# ------------------------------------------------------
#FROM nginx:1.16.0-alpine
#COPY --from=builder /app/build /usr/share/nginx/html
#RUN rm /etc/nginx/conf.d/default.conf
#COPY ./nginx.conf /etc/nginx/conf.d
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
