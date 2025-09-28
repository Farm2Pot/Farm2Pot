FROM node:20-bullseye AS builder

WORKDIR /app/frontend

# npm registry 설정 (타임아웃 방지)
RUN npm config set registry https://registry.npmmirror.com/ \
    && npm config set fetch-timeout 60000

#root 패키지 의존성 복사
COPY package*.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund --progress=false

# user 패키지 의존성 복사
COPY ./packages/user/package*.json ./packages/user/
COPY ./packages/user/tsconfig*.json ./packages/user/

WORKDIR /app/frontend/packages/user

# 의존성 설치 (빠르고 안전하게)
RUN npm ci --legacy-peer-deps --no-audit --no-fund --progress=false

# 소스 코드 복사 (이 시점 이후 변경된 경우만 rebuild)
COPY ./packages/user ./ 

ENV PORT=4000

CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --mode ${VITE_MODE}"]
#CMD ["sh", "-c", "sleep infinity"]
