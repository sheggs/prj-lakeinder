
# File Structure
````
.
├── backend ``` All Backend code ```

├── docker-compose.yml
└── README.md
````

# Error Fixes

```
Cannot commit due to permission error on /sql_service/db?

cd sql_service && sudo chmod 777 ./db
remember to add sql_service/db/* to .gitignore

```