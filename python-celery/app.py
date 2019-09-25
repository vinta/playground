# coding: utf-8
from concurrent.futures import ThreadPoolExecutor

from celery import Celery
from redis.client import Redis


app = Celery('app', broker='amqp://guest:guest@127.0.0.1//')
redis = Redis(host='127.0.0.1', port=6379)


@app.task
def my_task(*args, **kwargs):
    print(f'Run my_task: {kwargs}')
    return True


@app.task(rate_limit='10/m')
def my_task_rate_limit(*args, **kwargs):
    print(f'Run my_task_rate_limit: {kwargs}')
    return True


def main():
    print('Start')

    def submit_task(*args, **kwargs):
        my_task_rate_limit.apply_async(kwargs=kwargs)

    with ThreadPoolExecutor(max_workers=16) as executor:
        for i in range(100):
            executor.submit(submit_task, i=i)


if __name__ == '__main__':
    main()
