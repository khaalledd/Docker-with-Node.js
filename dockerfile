FROM node:20
# At the build time
WORKDIR /app
COPY package*.json ./
# RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV"="development" ];\
        then npm install;\
        else npm install --only=production;\
        fi

COPY . .
# ENV PORT 3000
# EXPOSE $PORT
EXPOSE 4000
# at the runtime of the container 
CMD [ "npm", "run", "dev" ]

