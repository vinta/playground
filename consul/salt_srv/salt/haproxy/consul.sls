include:
  - consul.client

haproxy-consul-service-file:
  file.managed:
    - template: jinja
    - name: /etc/consul.d/haproxy.json
    - source: salt://haproxy/haproxy.json
