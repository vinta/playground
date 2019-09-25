include:
  - consul-template.common

haproxy-consul-template-config:
  file.managed:
    - name: /etc/consul-template/haproxy.conf
    - source: salt://haproxy/consul-template/consult-template.conf
    - template: jinja
    - makedirs: True
    - mode: 755

haproxy-consul-template-template:
  file.managed:
    - name: /etc/consul-template/haproxy.cfg.ctmpl
    - source: salt://haproxy/consul-template/haproxy.cfg.ctmpl
    - makedirs: True
    - mode: 755

haproxy-consul-template-upstart:
  file.managed:
    - template: jinja
    - name: /etc/init/haproxy-consul-template.conf
    - source: salt://haproxy/consul-template/upstart.conf

haproxy-consul-template-log-dir:
  file.directory:
    - name: /var/log/consul-template/

haproxy-consul-template-service:
  service.running:
    - name: haproxy-consul-template
    - enable: True
    - reload: True
    - require:
      - file: haproxy-consul-template-config
      - file: haproxy-consul-template-template
    - watch:
      - file: haproxy-consul-template-upstart
