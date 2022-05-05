FROM python:3.8.3-slim

WORKDIR /code

COPY wait-for-it.sh /code
COPY wait-for-it.sh ../
COPY wait-for-it.sh ./

RUN apt-get update
RUN apt-get install -y postgresql-client

RUN apt-get install -y libpq-dev gcc
RUN apt-get install -y bash
RUN pip install psycopg2

RUN chmod +x wait-for-it.sh

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
# cmd ["./wait-for-it.sh", "db", "python", "manage.py", "makemigrations"]
# cmd ["./wait-for-it.sh", "db", "python", "manage.py", "migrate"]
# cmd ["./wait-for-it.sh", "db", "python", "manage.py", "runserver", "0.0.0.0:8000"]
# # RUN ./wait-for-it.sh postgres python manage.py makemigrations
# # RUN ./wait-for-it.sh postgres python manage.py migrate
# cmd ["python", "manage.py", "makemigrations"]
# cmd ["python", "manage.py", "migrate"]
# cmd ["python", "manage.py", "runserver", "0.0.0.0:8000"]