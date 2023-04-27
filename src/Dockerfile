   
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm install passport-google-oauth20
CMD ["npm", "start"]
EXPOSE 3000