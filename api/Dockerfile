FROM python:3.10.14-slim

WORKDIR /app/api/src

COPY requirements.txt \
    /app/api


RUN pip install -r /app/api/requirements.txt \
    && mkdir -p /app/api/tmp


COPY . /app/api/src/

EXPOSE 8081

RUN chmod -R 777 /app 
