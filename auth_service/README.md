## Backend Microservice ##

# How to Run without docker-compose #
backend/settings.py set the postgres info 
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': 5433
    }
}
```
# To build run
```
sudo docker build -t backend .
sudo docker run -dp 8000:8000 backend
```

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