#!/bin/sh
export $(grep -v '^#' .env | xargs -0)

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z localhost $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python3 voxyback/manage.py makemigrations words
