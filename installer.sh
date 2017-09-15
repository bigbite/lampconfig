#!/bin/bash
set -e;
echo ">>> Installing App"

#Node
curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh > /dev/null 2>&1
sudo bash nodesource_setup.sh > /dev/null 2>&1
sudo apt-get -qq install nodejs > /dev/null 2>&1
sudo apt-get -qq install build-essential > /dev/null 2>&1

#App
npm install -g bigbitecreative/lampconfig > /dev/null 2>&1