digitalocean-ubuntu-512mb:
  - play1:
      grains:
        cluster: mycluster
      minion:
        master: 10.134.249.144
  - play2:
      grains:
        cluster: mycluster
      minion:
        master: 10.134.249.144
  - play3:
      grains:
        cluster: mycluster
      minion:
        master: 10.134.249.144
  - play4:
      grains:
        cluster: mycluster
      minion:
        master: 10.134.249.144
  - play5:
      grains:
        cluster: mycluster
      minion:
        master: 10.134.249.144
