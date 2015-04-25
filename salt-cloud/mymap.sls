# digitalocean-ubuntu-2gb:
#   - salt-master:
#       make_master: True
#       grains:
#         cluster: mycluster

# digitalocean-ubuntu-1gb:
#   - minion1:
#       grains:
#         cluster: mycluster
#   - minion2:
#       grains:
#         cluster: mycluster

qingcloud-ubuntu-c1m1:
  - minion1:
      grains:
        cluster: mycluster
  - minion2:
      grains:
        cluster: mycluster
