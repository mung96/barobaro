## 프로젝트 실행 순서

### 1. 아키텍쳐
![아키텍처](img/architecture.png)

--- 

### 2. 사용 도구
- 이슈 관리 : Jira
- 형상 관리 : GitLab
- 커뮤니케이션 : Notion, MatterMost
- 디자인 : Figma
- CI/CD : Jenkins

### 3. 개발 도구
| IDE |
| --- |
| Intellij IDEA Ultimate |
| Visual Studio Code |
| MoBaXterm |

---

### 4. 개발 환경

#### Frontend

| 사용 기술 | 버전 |
|-------| --- |
| Node  | v20.15.0|
| Next  |14.2.7 |
| react |18.2.0 |

기타 정보는 `/frontend/package.json` 확인

#### Backend

| 사용 기술 | 버전     |
| --- |--------|
| Java | 21     |
| Spring Boot | 3.3.4  |
| Gradle | 8.10.1 |
기타 정보는 `/backend/baro/baro/build.gradle` 확인

#### Infra

| 사용 기술         | 버전      |
|---------------|---------|
| AWS           |         |
| PostgreSQL    | 16.4    |
| PostGIS       |3.4|
| Elasticsearch | 8.15.2  |
| Redis         | 7.4.1   |
| Nginx         | 1.18.0  |
| Ubuntu        | 20.04.6 |
| Jenkins       | 2.475   |
| Docker        | 27.2.1 |

### 4. 환경변수

#### Backend

- `application.yml`

```yaml
spring:
  application:
    name: baro

  profiles:
    active: ${PROFILE}

  data:
    redis:
      host: ${REDIS_HOST}
      port: 6379

  jpa:
    properties:
      hibernate:
        jdbc:
          batch_size: 20
        order_inserts: true

  elasticsearch:
    username: ${ELASTIC_USER}
    password: ${ELASTIC_PASSWORD}
    uris: ${ELASTIC_URI}

  security:
    oauth2:
      client:
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id
          naver:
            authorization-uri: https://nid.naver.com/oauth2.0/authorize
            token-uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user-name-attribute: response
          google:
            authorization-uri: https://accounts.google.com/o/oauth2/auth
            token-uri: https://oauth2.googleapis.com/token
            user-info-uri: https://openidconnect.googleapis.com/v1/userinfo
            user-name-attribute: sub
        registration:
          kakao:
            client-id: ${KAKAO_ID}
            client-secret: ${KAKAO_SECRET}
            client-authentication-method: client_secret_post
            redirect-uri: ${KAKAO_REDIRECT}
            authorization-grant-type: authorization_code
            client-name: kakao
            scope:
              - profile_nickname
              - profile_image
              - account_email
          naver:
            client-id: ${NAVER_ID}
            client-secret: ${NAVER_SECRET}
            redirect-uri: ${NAVER_REDIRECT}
            client-name: Naver
            authorization-grant-type: authorization_code
            scope:
              - email
              - profile_image
              - name
          google:
            client-id: ${GOOGLE_ID}
            client-secret: ${GOOGLE_SECRET}
            redirect-uri: ${GOOGLE_REDIRECT}
            authorization-grant-type: authorization_code
            client-name: google
            scope:
              - email
              - profile

jwt:
  secret: ${JWT_SECRET_KEY}
  access:
    expiration: ${ACCESS_TOKEN_EXPIRED}
  refresh:
    expiration: ${REFRESH_TOKEN_EXPIRED}

cloud:
  aws:
    s3:
      bucket: ${S3_BUCKET}
    stack:
      auto: false
    region:
      static: ap-northeast-2
    credentials:
      accessKey: ${S3_ACCESSKEY}
      secretKey: ${S3_SECRETKEY}

server:
  tomcat:
    max-http-form-post-size: 30MB
```

- `application-prod.yml`
```
spring:
  config:
    activate:
      on-profile: prod

  datasource:
    driver-class-name: org.postgresql.Driver
    url: ${DB_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}

  data:
    mongodb:
      uri: ${MONGODB_URL}
      username: ${MONGODB_USERNAME}
      password: ${MONGODB_PASSWORD}

  jpa:
    database-platform: org.hibernate.spatial.dialect.postgis.PostgisPG95Dialect
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
        show_sql: true
    defer-datasource-initialization: true

  sql:
    init:
      mode: always
      data-locations: classpath:sql/data.sql
```

- `application.properties`
```

# PostgreSQL
DB_URL = jdbc:postgresql://j11a401.p.ssafy.io:5432/baro
DB_USERNAME = ssafy
DB_PASSWORD = ssafya401

JWT_SECRET_KEY = SpRwS]nw|oiA=lH;*58n.LkGt;D4m#

FRONT_URL = https://j11a401.p.ssafy.io/
BASE_URL = https://j11a401.p.ssafy.io

REDIS_HOST = j11a401.p.ssafy.io

KAKAO_ID = cdc2a781b265ff393e76a6847ef97f7a
KAKAO_SECRET = qcSTsIRQ0zhwalwn8mZuM0T0icQhVz8h
KAKAO_REDIRECT = https://j11a401.p.ssafy.io/api/members/oauth2/code/kakao

NAVER_ID = KAQUWhAqmgKFM2dmGMqg
NAVER_SECRET = lsdjSf6Vnn
NAVER_REDIRECT = https://j11a401.p.ssafy.io/api/members/oauth2/code/naver

GOOGLE_ID = 972888791693-tu2bukb06q190p2up26oba6nb8vv9c6v.apps.googleusercontent.com
GOOGLE_SECRET = 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
GOOGLE_REDIRECT = https://j11a401.p.ssafy.io/api/members/oauth2/code/google

MONGODB_URL = mongodb+srv://S11P23A401:DrUqa0pun2@ssafy.ngivl.mongodb.net/S11P23A401?authSource=admin
MONGODB_USERNAME = S11P23A401
MONGODB_PASSWORD = DrUqa0pun2

S3_BUCKET = barobaro
S3_ACCESSKEY = AKIA3FLD54S7EPWZ7CXX
S3_SECRETKEY = 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
BUCKET_URL = https://barobaro.s3.ap-northeast-2.amazonaws.com

ACCESS_TOKEN_EXPIRED = 3000000
REFRESH_TOKEN_EXPIRED = 3000000

BANK_API_KEY = 1b281ef74e70484c901f2efb160d0bb2
ACCOUNT_TYPE_UNIQUE_NO = 999-1-b8f33ab9807d4e
USER_KEY_SSAFY123 = 11c0ea65-fd6c-4ac0-8566-9dc855f13d25

ELASTIC_USER = ssafy
ELASTIC_PASSWORD = ssafya401
ELASTIC_URI = http://j11a401.p.ssafy.io:9200

PORT_ONE_KEY = 0832270670576380
PORT_ONE_SECRET = VZKJA8lc4aLTATS0RoaMu8jqhjJK4dI5lCj1fBwdaP5JbqExFH2FhP2XcbVSn5KPC9y7QR4tQesgk6rM
```

#### Frontend

- `.env`

```env
NEXT_PUBLIC_KAKAO_CLIENT_ID=190a7563c6b29f3d492bd7138f45d1cb
NEXT_PUBLIC_KAKAO_REST_API_KEY=9918512088108d3f2128447703bbf266
NEXT_PUBLIC_BASE_URL=https://j11a401.p.ssafy.io/api/
NEXT_PUBLIC_SERVER_URL=https://j11a401.p.ssafy.io/api/
NEXT_PUBLIC_FRONT_URL=https://j11a401.p.ssafy.io/
NEXT_PUBLIC_AUTH_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc0NlcnRpZmljYXRlZCI6ZmFsc2UsInN1YiI6IjE2MDRiNzcyLWFkYzAtNDIxMi04YTkwLTgxMTg2YzU3ZjU5OCIsImlzcyI6Ind3dy5zYW1zdW5nLmNvbSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3MzEyNzAxMDl9.izpT5rUftxkSm-fu467p4SjkVdAWJlnk4FvjMF-4eZ7PvMMco4foiujqcUb7LDtT9hw6udA4V0ZJZOkaysBgzA
NEXT_PUBLIC_IMP_CODE=imp43481803
```

### 5. CI/CD 구축
1. Docker 설치
2. Jenkins 컨테이너 생성
    - 도커 소켓 마운트 필수
3. Nginx 설치
4. Postgres 컨테이너 생성
   - 내부 접속하여 PostGIS 설치 필수
5. Redis 컨테이너 생성
6. ElasticSearch 컨테이너 생성
   - 내부에 nori 라이브러리 설치 후, esProduct, esKeyword 생성하기
   ```
   curl -X PUT "localhost:9200/esproduct" -H "Content-Type: application/json" -d "{\"settings\":{\"analysis\":{\"tokenizer\":{\"nori_tokenizer\":{\"type\":\"nori_tokenizer\"}},\"analyzer\":{\"korean_analyzer\":{\"type\":\"custom\",\"tokenizer\":\"nori_tokenizer\",\"filter\":[\"lowercase\"]}}}}}"
   curl -X PUT "localhost:9200/eskeyword" -H "Content-Type: application/json" -d "{\"settings\":{\"analysis\":{\"tokenizer\":{\"nori_tokenizer\":{\"type\":\"nori_tokenizer\"}},\"analyzer\":{\"korean_analyzer\":{\"type\":\"custom\",\"tokenizer\":\"nori_tokenizer\",\"filter\":[\"lowercase\"]}}}}}"
   ```

7. Backend 파이프라인
```
pipeline {
    agent any

    tools {
        gradle 'Default Gradle'
    }

    environment {
        GIT_CREDENTIALS_ID = 'gitlab_access_token_credentials'
        GITLAB_REPO_URL = 'https://lab.ssafy.com/s11-fintech-finance-sub1/S11P21A401.git'
        DOCKER_IMAGE_NAME = 'springboot'
        WORKSPACE = pwd()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'develop-be', url: "${GITLAB_REPO_URL}", credentialsId: "${GIT_CREDENTIALS_ID}"
                }
            }
        }

        stage('Set Environment Variables') {
            steps {
                script {
                    sh """sed -i 's/\${PROFILE}/prod/g' ${WORKSPACE}/backend/baro/baro/src/main/resources/application.yml"""
                    sh """sed -i 's;\$serverUrl;${serverUrl};g' ${WORKSPACE}/backend/baro/baro/build.gradle"""
                    
                    def propertiesContent = """
                        # PostgreSQL
                        DB_URL = ${DB_URL}
                        DB_USERNAME = ${DB_USERNAME}
                        DB_PASSWORD = ${DB_PASSWORD}
                        
                        JWT_SECRET_KEY = ${JWT_SECRET_KEY}

                        FRONT_URL = ${FRONT_URL}
                        BASE_URL = ${BASE_URL}
                        
                        REDIS_HOST = ${REDIS_HOST}
                        
                        KAKAO_ID = ${KAKAO_ID}
                        KAKAO_SECRET = ${KAKAO_SECRET}
                        KAKAO_REDIRECT = ${KAKAO_REDIRECT}
                        
                        NAVER_ID = ${NAVER_ID}
                        NAVER_SECRET = ${NAVER_SECRET}
                        NAVER_REDIRECT = ${NAVER_REDIRECT}
                        
                        GOOGLE_ID = ${GOOGLE_ID}
                        GOOGLE_SECRET = ${GOOGLE_SECRET}
                        GOOGLE_REDIRECT = ${GOOGLE_REDIRECT}
                        
                        MONGODB_URL = ${MONGODB_URL}
                        MONGODB_USERNAME = ${MONGODB_USERNAME}
                        MONGODB_PASSWORD = ${MONGODB_PASSWORD}
                        
                        S3_BUCKET = ${S3_BUCKET}
                        S3_ACCESSKEY = ${S3_ACCESSKEY}
                        S3_SECRETKEY = ${S3_SECRETKEY}
                        BUCKET_URL = ${BUCKET_URL}
                        
                        ACCESS_TOKEN_EXPIRED = ${ACCESS_TOKEN_EXPIRED}
                        REFRESH_TOKEN_EXPIRED = ${REFRESH_TOKEN_EXPIRED}
                        
                        BANK_API_KEY = ${BANK_API_KEY}
                        ACCOUNT_TYPE_UNIQUE_NO = ${ACCOUNT_TYPE_UNIQUE_NO}
                        USER_KEY_SSAFY123 = ${USER_KEY_SSAFY123}
                        
                        ELASTIC_USER = ${ELASTIC_USER}
                        ELASTIC_PASSWORD = ${ELASTIC_PASSWORD}
                        ELASTIC_URI = ${ELASTIC_URI}
                        
                        PORT_ONE_KEY = ${PORT_ONE_KEY}
                        PORT_ONE_SECRET = ${PORT_ONE_SECRET}
                    """.stripIndent()
                    
                    writeFile file: "${WORKSPACE}/backend/baro/baro/src/main/resources/application.properties", text: propertiesContent
                }
            }
        }

        stage('Build') {
            steps {
                dir('backend/baro/baro') {
                    sh 'if [ ! -f gradlew ]; then echo "Gradle Wrapper not found"; exit 1; fi'
                    sh 'chmod +x gradlew'
                    echo 'Building Spring Boot application...'
                    sh './gradlew clean bootBuildImage'
                }
            }
        }

        stage('Create Docker Compose File') {
            steps {
                script {
                    def dockerComposeContent = """
                    version: '3.8'  # Compose 파일 버전

                    services:
                        springboot:
                            image: baro:0.0.1-SNAPSHOT
                            container_name: springboot
                            user: "1000:1000"
                            ports:
                                - "8080:8080"
                            environment:
                                SPRING_REDIS_HOST: ${REDIS_HOST}  # Redis 호스트
                                SPRING_REDIS_PORT: 6379
                                TZ: "Asia/Seoul"
                            networks:
                                - bridge_network
                            volumes:
                                - ./shared:/shared
                              
                    networks:
                        bridge_network:
                            driver: bridge
                    """.stripIndent()

                    // Docker Compose 파일 작성
                    writeFile file: "${WORKSPACE}/backend/baro/baro/docker-compose.yml", text: dockerComposeContent
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('backend/baro/baro') {
                    script {
                        echo "Deploying Docker containers using Docker Compose..."
                        try {
                            // 기존 컨테이너를 중지하고 삭제
                            sh "docker compose down -v"
                        } catch (Exception e) {
                            echo "Error stopping containers: ${e.message}"
                        }
                        // 새 컨테이너 시작
                        sh "docker compose up -d"
                    }
                }
            }
        }
        
        stage('Clean up Docker') {
            steps {
                script {
                    sh 'docker system prune -a -f'
                }
            }
        }
    }

    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend(color: 'good',
                    message: "빌드 성공🤗💨💨: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                    endpoint: 'https://meeting.ssafy.com/hooks/rasiujc4upr65c63r7hmqkum1e',
                    channel: 'barobaro'
                )
            }
        }

        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend(color: 'danger',
                    message: "빌드 실패👀💦: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                    endpoint: 'https://meeting.ssafy.com/hooks/rasiujc4upr65c63r7hmqkum1e',
                    channel: 'barobaro'
                )
            }
        }
    }
}

```
8. FrontEnd 파이프라인
```
pipeline {
    agent any
    
    tools {
        nodejs 'nodejs' // Jenkins Global Tool Configuration에서 설정한 NodeJs 설치 이름
    }

    environment {
        GIT_CREDENTIALS_ID = 'gitlab_access_token_credentials' // Jenkins의 자격 증명 ID
        GITLAB_REPO_URL = 'https://lab.ssafy.com/s11-fintech-finance-sub1/S11P21A401.git' // GitLab 프로젝트 URL
        DOCKER_IMAGE_NAME = 'nextjs' // Docker Image 이름
        WORKSPACE = pwd()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // GitLab 리포지토리를 클론하고 develop-be 브랜치로 체크아웃
                    git branch: 'develop-fe', url: "${GITLAB_REPO_URL}", credentialsId: "${GIT_CREDENTIALS_ID}"
                }
            }
        }
        
        stage('Set Environment Variables') {
            steps {
                script {
                    def propertiesContent = """
                        NEXT_PUBLIC_KAKAO_CLIENT_ID=${NEXT_PUBLIC_KAKAO_CLIENT_ID}
                        NEXT_PUBLIC_KAKAO_REST_API_KEY=${NEXT_PUBLIC_KAKAO_REST_API_KEY}
                        NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
                        NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
                        NEXT_PUBLIC_FRONT_URL=${NEXT_PUBLIC_FRONT_URL}
                        NEXT_PUBLIC_AUTH_TOKEN=${NEXT_PUBLIC_AUTH_TOKEN}
                        NEXT_PUBLIC_IMP_CODE=${NEXT_PUBLIC_IMP_CODE}
                    """.stripIndent()
                    
                    writeFile file: "${WORKSPACE}/frontend/.env", text: propertiesContent
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Create DockerFile'){
            steps{
                script{
                    def dockerfile = """
                    FROM node:lts
                    WORKDIR /usr/src/app
                    COPY ./package*.json ./
                    RUN npm i

                    COPY ./ ./
                    CMD ["npm", "build"]
                    EXPOSE 3000
                    """.stripIndent()
                    writeFile file: "${WORKSPACE}/frontend/Dockerfile", text: dockerfile
                }
            }
        }
        
        stage('Create Docker Compose File') {
            steps {
                script {
                    def dockerComposeContent = """
                    services:
                      node-app:
                        build: .
                        ports:
                          - "3000:3000"
                        command: "npm run start"
                        env_file:
                          - .env
                    networks:
                        bridge_network:
                            driver: bridge
                    """.stripIndent()

                    writeFile file: "${WORKSPACE}/frontend/docker-compose.yml", text: dockerComposeContent
                }
            }
        }
        
        stage('Deploy') {
            steps {
                dir('frontend') {
                    script {
                        echo "Deploying Docker containers using Docker Compose..."
                        // 기존 컨테이너가 있다면 삭제
                        try {
                            sh "docker compose down -v"
                        } catch (Exception e) {
                            echo "Error stopping containers: ${e.message}"
                        }
                        
                        // 도커 이미지 빌드
                        sh "docker compose build"
                        
                        // Docker Compose로 컨테이너 실행
                        sh "docker compose up -d"
                        
                        // Nginx 서버 리로드 -> host상의 nginx를 reload해야하는데 불가. 추후 개선선
                        // sh "sudo service nginx reload"
                    }
                }
            }
        }
        
        stage('Clean up Docker') {
            steps {
                script {
                    sh 'docker system prune -a -f'
                }
            }
        }
    }
    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend(color: 'good',
                    message: "빌드 성공🤗💨💨: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                    endpoint: 'https://meeting.ssafy.com/hooks/rasiujc4upr65c63r7hmqkum1e',
                    channel: 'barobaro'
                )
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend(color: 'danger',
                    message: "빌드 실패👀💦: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                    endpoint: 'https://meeting.ssafy.com/hooks/rasiujc4upr65c63r7hmqkum1e',
                    channel: 'barobaro'
                )
            }
        }
    }
}
```

### 5. 외부 서비스 사용
- 싸피 내부 금융망 API
- 본인인증을 위한 포트원 API
- KAKAO, NAVER, GOOGLE OAUTH 로그인
- 네이버 검색어 교정 API
- 이미지/PDF 업로드를 위한 AWS S3
