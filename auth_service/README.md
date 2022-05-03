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

config.config.py
```
## Should be kept in an .env file, but for rapid development we will keep secrets here.
REFRESH_SECRET = 'A&`}k&Tn]1+3|s50<^yD?WA@RB#<{9'
SECRET = '$2lC7Mn`46+giA:BW[KYr<XQ]}KeuC'


# DO NOT END WITH A /
FILE_SERVER = "http://localhost:3500"
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