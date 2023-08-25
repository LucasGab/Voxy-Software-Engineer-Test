#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# Password: password123
python voxyback/manage.py flush --no-input
python3 voxyback/manage.py createsuperuser --no-input --email admin@example.com --username admin
python3 voxyback/manage.py migrate

exec "$@"