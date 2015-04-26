include:
  - consul.common

redis-consul-service-file:
  file.managed:
    - name: /etc/consul.d/redis.json
    - source: salt://redis/redis.json
