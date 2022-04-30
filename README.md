# How to run
```
Please remember to run all python installation and npm installtion
"npm install" inside every node folder eg cd frontend && npm install
1. Run SQL_Service (bash ./start_sql.bash)
2. Run auth_service (python manage.py runserver)
3. Run fileservice (node server.js)
4. Run lakeinder-core (node server.js)
5. Run frontend (npm start)
```

# JWT Token
```
For production change keys.json
Change every reference to these keys inside auth_service, lakeinder-core, lakeinder-notify
```
# Microservices Explanation
````
auth_service : User Authentication + Profile data
lakeinder-core: All matching + chat services
sql_service: Postgres database
frontend: UI
fileservice: Lakeinder's own file hosting service

````

# Error Fixes

```
Cannot commit due to permission error on /sql_service/db?

cd sql_service && sudo chmod 777 ./db
remember to add sql_service/db/* to .gitignore

```