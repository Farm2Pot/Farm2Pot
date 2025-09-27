# 1단계: Builder
FROM node:20-bullseye AS builder

WORKDIR /app/frontend

# npm registry 설정 (타임아웃 방지)
RUN npm config set registry https://registry.npmmirror.com/ \
    && npm config set fetch-timeout 60000

# package.json, package-lock.json, tsconfig 복사 후 의존성 설치
COPY packages/user/package*.json ./packages/user/
COPY packages/user/tsconfig*.json ./packages/user/
COPY tsconfig.base.json ./ 
COPY packages/core ./packages/core

WORKDIR /app/frontend/packages/user
RUN npm install

# 소스 복사 후 빌드
COPY packages/user/src ./src
COPY packages/user/public ./public


RUN npm run build

# 2단계: Runtime
FROM node:20-bullseye

WORKDIR /app/frontend/packages/user

# production 의존성만 설치
COPY packages/user/package*.json ./
RUN npm install --omit=dev

# 빌드 산출물 복사
COPY --from=builder /app/frontend/packages/user/dist ./dist
COPY --from=builder /app/frontend/packages/user/public ./public

ENV PORT=2000

#CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --mode ${VITE_MODE}"]
CMD ["sh", "-c", "sleep infinity"]
