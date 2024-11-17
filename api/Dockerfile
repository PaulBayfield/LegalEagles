FROM python:3.10.14-slim

ENV PYTHONPATH = $PATH/app/api/src:/app\
    SSL_CERT_FILE=\etc\ssl\certs\ca-certificates.crt\
    REQUESTS_CA_BUNDLE=\etc\ssl\certs\ca-certificates.crt\
    EXPOSE 8081
WORKDIR /app/api/src
RUN echo 'Acquire::ForceIPv4 "true";' > /etc/apt/apt.conf.d/99force-ipv4
RUN apt-get update -y \
    && apt-get install -y \
    bash\
    gcc\
    git\
    locales\
    #dos2unis\
    build-essential\
    libreoffice\
    curl\
    iputils-ping\
    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
    && locale-gen \
    && apt-get autoremove -y \
    && apt-get clean  \
    && echo "$TLS_DS_DEVUAT" \
    && echo "$TLS_DS_DEVUAT" > /usr/local/share/ca-certificates/ca-certificates.crt \
    && update-ca-certificates \
    &&pip install --upgrade pip \
    && mkdir -p /app/api/tmp

COPY requirements.txt \
    /app/api


RUN git config --global http.sslVerify false \
    && pip install -r /app/api/requirements.txt \
    && mkdir -p /app/api/tmp \
    && rm -rf /var/lib/apt/lists/* 


COPY . /app/api/src/

RUN chmod -R 777 /app 


