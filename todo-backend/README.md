# todo-backend

## docker-compose로 실행하기

로컬에서 실행을 위해 todo-backend의 루트에 다음처럼 .env 파일을 생성해주세요.

```
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=root
DB_NAME=postgres
OAUTH_GOOGLE_CLIENT_ID=<google-client-id>
OAUTH_GOOGLE_SECRET=<google-secret>
AUTH_REDIRECT_URL=http://localhost:3000/auth
```
