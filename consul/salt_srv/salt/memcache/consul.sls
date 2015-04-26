include:
  - consul.client

memcache-consul-service-file:
  file.managed:
    - name: /etc/consul.d/memcache.json
    - source: salt://memcache/memcache.json
