digitalocean-ubuntu-1gb:
  - play1:
      grains:
        cluster: mycluster
      minion:
        master: 10.134.250.33
  - play2:
      grains:
        cluster: mycluster
      minion:
        master: 10.134.250.33
  - play3:
      grains:
        cluster: mycluster
      minion:
        master: 10.134.250.33
