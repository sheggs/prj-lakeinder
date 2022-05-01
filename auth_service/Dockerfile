# syntax=docker/dockerfile:1
FROM python:3

WORKDIR /code

RUN apt-get update
RUN apt-get install -y postgresql-client

COPY wait-for-it.sh .

RUN chmod +x wait-for-it.sh

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
# # RUN ./wait-for-it.sh postgres python manage.py makemigrations
# # RUN ./wait-for-it.sh postgres python manage.py migrate
# cmd ["python", "manage.py", "makemigrations"]
# cmd ["python", "manage.py", "migrate"]
# cmd ["python", "manage.py", "runserver", "0.0.0.0:8000"]