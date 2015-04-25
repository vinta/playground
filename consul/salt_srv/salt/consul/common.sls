consul-packages:
  pkg.installed:
    - name: unzip
  archive.extracted:
    - name: /tmp/consul_linux_amd64/
    - source: https://dl.bintray.com/mitchellh/consul/0.5.0_linux_amd64.zip
    - source_hash: sha256=161f2a8803e31550bd92a00e95a3a517aa949714c19d3124c46e56cfdc97b088
    - archive_format: zip
  cmd.run:
    - name: mv /tmp/consul_linux_amd64/consul /usr/local/bin/consul && chmod u+x /usr/local/bin/consul
