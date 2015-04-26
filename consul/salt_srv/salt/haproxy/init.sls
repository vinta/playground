include:
  - common.apt

haproxy-ppa:
  pkgrepo.managed:
    - ppa: vbernat/haproxy-1.5
    - refresh_db: true
    - require:
      - pkg: apt-packages

haproxy-packages:
  pkg.installed:
    - names:
      - haproxy
    - require:
      - pkgrepo: haproxy-ppa

haproxy-config:
  file.managed:
    - template: jinja
    - name: /etc/haproxy/haproxy.cfg
    - source: salt://haproxy/haproxy.cfg
    - require:
      - pkg: haproxy-packages

haproxy-service:
  service.running:
    - name: haproxy
    - enable: True
    - reload: True
    - watch:
      - file: haproxy-config
