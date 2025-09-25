# 1단계: 빌드
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app/farm2Pot
COPY . .

WORKDIR /app/farm2Pot/backend

# subscription 모듈만 빌드
RUN ./gradlew :apps:subscription:bootJar --no-daemon

# 2단계: 런타임
FROM eclipse-temurin:21-jdk

WORKDIR /app/farm2Pot
# 빌드 stage에서 생성된 jar만 복사
COPY --from=builder /app/farm2Pot/backend/apps/subscription/build/libs/*.jar farm2Pot-subscription.jar

ENTRYPOINT ["java", "-jar", "farm2Pot-subscription.jar"]