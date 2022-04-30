# syntax=docker/dockerfile:1
FROM python:3

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
cmd ["python", "manage.py", "makemigrations"]
cmd ["python", "manage.py", "migrate"]
cmd ["python", "manage.py", "runserver", "0.0.0.0:8000"]