include:
  - consul.common

nginx-consul-service-file:
  file.managed:
    - template: jinja
    - name: /etc/consul.d/nginx.json
    - source: salt://nginx/nginx.json
