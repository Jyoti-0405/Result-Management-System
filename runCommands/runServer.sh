#!/bin/sh
export RESULT_DB_HOST=localhost
export RESULT_DB_SCHEMA="result"
export RESULT_DB_USERNAME="root"
export RESULT_DB_PASSWORD="root"
export RESULT_CLIENT_HOST="http://localhost"
export JWT_SIGNING_KEY=A#@$BnJ
export MYSQL_ROOT_PASSWORD=root
export SERVER_HOST=localhost
export SERVER_PROTOCOL=http
export SERVER_PORT=3001
export CLIENT_PORT=4200
export NODE_ENV='development'
export DIALECT='mysql'
export ISSUER='result.in'
export MODEL_SYNC=false
export RESULT_DB_PORT=3306
export RESULT_CORS_URL="http://localhost:4200"
cd ../
nodemon bin/www