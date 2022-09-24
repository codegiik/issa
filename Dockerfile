FROM node:current-slim 

RUN npm i -g pnpm

WORKDIR /app
COPY . .

RUN pnpm install --prefer-frozen-lockfile

ARG NEXT_PUBLIC_STRAPI_BASE_URL
ARG NEXT_PUBLIC_STRAPI_TOKEN 

RUN echo "NEXT_PUBLIC_STRAPI_BASE_URL=$NEXT_PUBLIC_STRAPI_BASE_URL" > .env.local
RUN echo "NEXT_PUBLIC_STRAPI_TOKEN=$NEXT_PUBLIC_STRAPI_TOKEN" >> .env.local

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
