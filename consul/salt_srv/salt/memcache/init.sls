memcache-server-packages:
  pkg.installed:
    - name: memcached

memcached:
  service.running:
    - enable: True
