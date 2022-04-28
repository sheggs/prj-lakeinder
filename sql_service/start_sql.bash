#!/bin/bash
echo "Lakeinder: Start SQL Script"
if [ -x "$(command -v docker)" ]; then
    $(docker ps | grep -q postgres)
    if [ $? -eq 0 ]; then
        echo "Postgres is already running. Please close postgres using the close_sql.bash"
    else
         echo "Starting progress"
        "$((cd .. && docker-compose up db) &)"
    fi
else
    echo "Install docker."
fi
