FROM node:12.16.3-alpine3.10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

COPY . .

RUN yarn

# Building app
RUN yarn workspace @gtms/app-andrew build

# Running the app
CMD [ "yarn", "workspace", "@gtms/app-andrew", "start" ]
