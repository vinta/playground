redis-server-packages:
  pkg.installed:
    - names:
      - redis-server

redis-server-service:
  service.running:
    - name: redis-server
    - enable: True
    - require:
      - pkg: redis-server-packages
