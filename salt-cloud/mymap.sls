digitalocean_ubuntu_2gb:
  - salt-master:
      make_master: True
      grains:
        cluster: mycluster

digitalocean_ubuntu_1gb:
  - minion1:
      grains:
        cluster: mycluster
  - minion2:
      grains:
        cluster: mycluster
