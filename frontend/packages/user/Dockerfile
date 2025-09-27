# 1단계: Builder
FROM node:20-bullseye AS builder

WORKDIR /app/frontend/packages/user 

# npm registry 설정 (타임아웃 방지)
RUN npm config set registry https://registry.npmmirror.com/ \
    && npm config set fetch-timeout 60000

# package.json, tsconfig 먼저 복사
#COPY ../../package*.json ./
COPY package*.json ./
COPY tsconfig*.json ./
COPY ../../tsconfig.base.json ../../tsconfig.base.json

# 의존성 설치
RUN npm install

# 소스 복사 후 빌드
COPY ./packages/user/src ./src
COPY ./packages/user/public ./public

# RUN npm run build

# 2단계: Runtime
FROM node:20-bullseye

WORKDIR /app/frontend/packages/user 

COPY package*.json ./
RUN npm install --omit=dev

#COPY --from=builder /app/frontend/packages/user/dist ./dist
#COPY --from=builder /app/frontend/packages/user/public ./public

ENV PORT=4000  
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --mode ${VITE_MODE}"]
#CMD ["sh", "-c", "sleep infinity"]
