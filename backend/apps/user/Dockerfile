# 1단계: 빌드
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app/farm2Pot
COPY . .

WORKDIR /app/farm2Pot/backend

# user 모듈만 빌드
RUN ./gradlew :apps:user:bootJar --no-daemon

# 2단계: 런타임
FROM eclipse-temurin:21-jdk

WORKDIR /app/farm2Pot
# 빌드 stage에서 생성된 jar만 복사
COPY --from=builder /app/farm2Pot/backend/apps/user/build/libs/*.jar farm2Pot-user.jar

ENTRYPOINT ["java", "-jar", "farm2Pot-user.jar"]