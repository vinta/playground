consul-template-execution:
  archive.extracted:
    - name: /tmp/
    - source: https://github.com/hashicorp/consul-template/releases/download/v0.8.0/consul-template_0.8.0_linux_amd64.tar.gz
    - source_hash: sha256=5a65c8df7ecfe2fbdedcac71743732a1c4e810987e294e7d733f2da39c2ebf17
    - archive_format: tar
    - if_missing: /usr/local/bin/consul-template
  cmd.run:
    - name: cp /tmp/consul-template_0.8.0_linux_amd64/consul-template /usr/local/bin/
    - unless: which consul-template
