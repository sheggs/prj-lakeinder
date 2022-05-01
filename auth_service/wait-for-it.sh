#!/bin/bash

### WAITING POSTGRES START ###
RETRIES=7
while [ "$RETRIES" -gt 0 ]
do
  echo "Waiting for postgres server, $((RETRIES--)) remaining attempts..."
  PG_STATUS="$(pg_isready -h $host -U postgres)"
  PG_EXIT=$(echo $?)
  echo "Postgres Status: $PG_EXIT - $PG_STATUS"
  if [ "$PG_EXIT" = "0" ];
    then
      RETRIES=0
  fi
  sleep 5  # timeout for new loop
done

### DJANGO MANAGE COMMANDS ###
python manage.py makemigrations && 
python manage.py migrate && 
python manage.py runserver