FROM oven/bun

WORKDIR /app

COPY package.json ./

RUN bun install

COPY . .

RUN bun run build

ENTRYPOINT [ "bun", "run", "start" ]
