base:
  '*':
    - common

  'master':
    - salt.consul

  'play1':
    - haproxy
    - haproxy.consul
    - consul.web_ui

  'play2':
    - nginx
    - nginx.consul

  'play3':
    - nginx
    - nginx.consul
