base:
  '*':
    - common

  'master':
    - consul.server

  'play1':
    - consul.client

  'play2':
    - consul.client

  'play3':
    - consul.client
