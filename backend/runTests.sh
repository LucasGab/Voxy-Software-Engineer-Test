#!/bin/sh
export $(grep -v '^#' .env.dev.test | xargs -0)

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python3 voxyback/manage.py test words

