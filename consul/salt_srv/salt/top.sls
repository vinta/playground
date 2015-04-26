base:
  '*':
    - common

  'salt-master':
    - salt.consul

  'play1':
    - haproxy
    - haproxy.consul
    - haproxy.consul-template
    - consul.web_ui

  'play2':
    - nginx
    - nginx.consul

  'play3':
    - nginx
    - nginx.consul
