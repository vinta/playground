include:
  - consul.common

salt-master-consul-service-file:
  file.managed:
    - name: /etc/consul.d/salt-master.json
    - source: salt://salt/salt-master.json
