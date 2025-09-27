# 1단계: 빌드
FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app/frontend
COPY . .

WORKDIR /app/frontend/packages/admin

# RUN npm config set registry https://registry.npmmirror.com/

RUN npm install
RUN npm run build

# 2단계: 런타임
FROM node:20-alpine

WORKDIR /app/frontend/packages/admin

# 빌드 결과만 복사
COPY --from=builder /app/frontend/packages/admin/dist ./dist
COPY --from=builder /app/frontend/packages/admin/package.json ./package.json
COPY --from=builder /app/frontend/package-lock.json ./package-lock.json

RUN npm install

# 실행 (개발 서버가 아니라 실제 production build를 서비스)
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --mode ${VITE_MODE}"]