## Usage

```console
$ docker run -p 5672:5672 --rm rabbitmq:3.7.18
$ docker run -p 6379:6379 --rm redis:5.0.5-alpine

$ pipenv install

$ pipenv shell
$ celery worker --app=hello_world.celery --loglevel=debug --concurrency=16

$ pipenv shell
$ python main.py
```
