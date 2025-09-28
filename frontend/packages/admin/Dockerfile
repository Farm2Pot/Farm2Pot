FROM node:20-bullseye AS builder

WORKDIR /app/frontend

RUN npm config set registry https://registry.npmmirror.com/ \
    && npm config set fetch-timeout 60000 \
    && npm set audit false \
    && npm set fund false

# root + user package.json, lock 파일만 복사
COPY package*.json ./
COPY ./packages/user/package*.json ./packages/user/
COPY package-lock.json ./

# 의존성 설치 (cache mount 활용)
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps --progress=false

# 나머지 소스 복사
COPY . .

WORKDIR /app/frontend/packages/user

ENV PORT=4000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--mode", "${VITE_MODE}"]
