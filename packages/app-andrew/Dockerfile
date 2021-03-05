FROM node:14-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

COPY . .

RUN yarn

# Building app
RUN yarn workspace @gtms/app-andrew build

# Running the app
CMD [ "yarn", "workspace", "@gtms/app-andrew", "start" ]
