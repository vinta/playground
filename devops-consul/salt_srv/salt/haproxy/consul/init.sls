include:
  - consul.common

haproxy-consul-service-file:
  file.managed:
    - template: jinja
    - name: /etc/consul.d/haproxy.json
    - source: salt://haproxy/consul/haproxy.json
