include:
  - common.apt

nginx-repo:
  pkgrepo.managed:
    - ppa: nginx/stable
    - refresh_db: true
    - require:
      - pkg: apt-packages

nginx-packages:
  pkg.installed:
    - names:
      - nginx-full
    - require:
      - pkgrepo: nginx-repo

nginx-service-streetvoice:
  service.running:
    - name: nginx
    - enable: True
    - reload: True
    - require:
      - pkg: nginx-packages
