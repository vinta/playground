consul-execution:
  pkg.installed:
    - name: unzip
  archive.extracted:
    - name: /usr/local/bin/
    - source: https://dl.bintray.com/mitchellh/consul/0.5.0_linux_amd64.zip
    - source_hash: sha256=161f2a8803e31550bd92a00e95a3a517aa949714c19d3124c46e56cfdc97b088
    - archive_format: zip
    - if_missing: /usr/local/bin/consul

/etc/consul.d/:
  file.directory:
    - makedirs: True
