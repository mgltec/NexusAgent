# syntax=docker/dockerfile:1
# NexusAgent (Angular 22) -> agent.softwaredemocr.com
FROM node:22 AS build
WORKDIR /src
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . ./
RUN npm run build

FROM caddy:2-alpine
COPY --from=build /src/dist/NgAgentSite/browser /srv
COPY <<'EOF' /etc/caddy/Caddyfile
:80 {
	root * /srv
	try_files {path} /index.html
	file_server
}
EOF
EXPOSE 80
