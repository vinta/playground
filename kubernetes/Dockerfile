FROM python:3.6.4-alpine3.6

ARG PIP_DISABLE_PIP_VERSION_CHECK=on

WORKDIR /usr/src/app/

# RUN apk add --no-cache --virtual .build-deps \
#         openssl-dev \
#         zlib-dev

COPY . .

RUN pip install --user -r requirements.txt && \
    find $(python -m site --user-base) -type f -name "*.pyc" -delete && \
    find $(python -m site --user-base) -type f -name "*.pyo" -delete && \
    find $(python -m site --user-base) -type d -name "__pycache__" -delete && \
    find $(python -m site --user-base) -type d -name "tests" -exec rm -rf '{}' +

ENV FLASK_APP=app.py
ENV FLASK_DEBUG=1

EXPOSE 5000

CMD python -m flask run -h 0.0.0.0 -p 5000
