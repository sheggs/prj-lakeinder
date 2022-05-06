#!/bin/bash

echo "Startup script"
echo "please be cd into the ./prj-lakeinder folder"

sed -i -e 's/\r$//' auth_service/wait-for-it.sh
sed -i -e 's/\r$//' lakeinder-core/wait-for-it.sh
sed -i -e 's/\r$//' lakeinder-notify/wait-for-it.sh

