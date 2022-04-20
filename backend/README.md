## Backend Microservice ##

# How to Run without docker-compose #
cd into this directory
sudo docker build -t backend .
sudo docker run -dp 8000:8000 backend


## File Structure ##
````
backend/
├── backend ``` Default Django Configuration folder ```
├── config ``` Keep all configuration/error codes inside this folder ```
├── db.sqlite3
├── Dockerfile ``` DockerFile to compose container ```
├── manage.py
├── README.md 
├── requirements.txt ``` All Python Packages used by this microservice ```
└── users
    ├── auth ``` Keep all Authentication Routes in this folder```
    ├── __init__.py
    ├── migrations
    ├── models.py
    ├── __pycache__
    ├── serializer.py
    ├── tests.py
    ├── urls.py
    ├── views ``` Keep all views inside this folder ```
    └── views.py
````

## How to preform Authentication using JWT ##

```
        from users.auth.helper_functions import decodeAuthToken
        # Authentication
        payload = decodeAuthToken(request.META.get('HTTP_AUTHORIZATION'))
        if payload == None:
            err = LAKE_ERROR("TOKEN_ERROR")
            return Response({"message": err.getMessage()}, status=err.getStatus())
```