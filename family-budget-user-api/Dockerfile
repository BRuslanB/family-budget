# Stage 1: Build the application
FROM openjdk:17 AS builder

WORKDIR /app
COPY build/libs/*.jar /app/app.jar

# Stage 2: Create the final runtime image
FROM openjdk:17-alpine

WORKDIR /app
COPY --from=builder /app/app.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]