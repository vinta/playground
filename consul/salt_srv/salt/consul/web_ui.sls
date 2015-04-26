consul-web-ui-packages:
  pkg.installed:
    - name: unzip
  archive.extracted:
    - name: /root/consul_web_ui
    - source: https://dl.bintray.com/mitchellh/consul/0.5.0_web_ui.zip
    - source_hash: sha256=0081d08be9c0b1172939e92af5a7cf9ba4f90e54fae24a353299503b24bb8be9
    - archive_format: zip
    - if_missing: /root/consul_web_ui/dist
