# coding: utf-8

import datetime
import platform

from flask import Flask


app = Flask(__name__)


@app.route('/')
def index():
    hostname = platform.node()
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    return f'You hit "{hostname}" at {now}'


@app.route('/hello')
def hello():
    return 'Hello, World'
