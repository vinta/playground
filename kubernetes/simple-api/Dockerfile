FROM python:3.6.4-alpine3.7 AS builder

ENV PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /usr/src/app/

RUN apk add --no-cache --virtual .build-deps \
        openssl-dev \
        zlib-dev

COPY requirements.txt requirements.txt

RUN pip install --user -r requirements.txt && \
    find $(python -m site --user-base) -type f -name "*.pyc" -delete && \
    find $(python -m site --user-base) -type f -name "*.pyo" -delete && \
    find $(python -m site --user-base) -type d -name "__pycache__" -delete && \
    find $(python -m site --user-base) -type d -name "tests" -exec rm -rf '{}' +

###

FROM python:3.6.4-alpine3.7

ENV FLASK_APP=app.py

WORKDIR /usr/src/app/

RUN apk add --no-cache --virtual .run-deps \
    ca-certificates \
    curl \
    openssl \
    zlib

COPY --from=builder /root/.local/ /root/.local/
COPY . .

EXPOSE 8000

CMD python -m flask run -h 0.0.0.0 -p 8000
