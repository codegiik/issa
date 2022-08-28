FROM node:current-slim 

RUN npm i -g pnpm

WORKDIR /app
COPY . .

RUN pnpm install
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
