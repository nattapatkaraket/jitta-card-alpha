FROM --platform=linux/amd64 node:18
# FROM node:18

ENV TZ=Asia/Bangkok

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# RUN useradd -ms /bin/bash medusr

# USER medusr

CMD [ "npm", "run", "start" ]

# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
#   CMD curl -f http://localhost:3122/ || exit 1