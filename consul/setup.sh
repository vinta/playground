#!/bin/bash

ln -sf `pwd`/salt_config/cloud.profiles.d /etc/salt/
ln -sf `pwd`/salt_config/cloud.providers.d /etc/salt/
ln -sf `pwd`/salt_srv/salt /srv/salt
