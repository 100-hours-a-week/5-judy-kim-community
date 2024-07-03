# Build stage
FROM openjdk:17-slim as builder
WORKDIR /app
COPY . .
ARG USERNAME
ARG TOKEN
ENV USERNAME=$USERNAME
ENV TOKEN=$TOKEN
RUN ./gradlew build -x test --info

# Run stage
FROM openjdk:17-slim
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
