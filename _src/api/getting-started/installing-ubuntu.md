---
title: Installing API on Ubuntu
---

# Introduction

This document provides a simple step by step guide to installation on Ubuntu [14.04.1 LTS](http://releases.ubuntu.com/14.04.1/).

This guide assumes a single server holding both the database and the API.

## Node.js 6.x

```
$ sudo apt-get -y update
$ sudo apt-get -y upgrade
$ sudo apt-get install gcc make build-essential python-software-properties
$ sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install nodejs
```

## MongoDB

```
$ sudo apt-get -y install mongodb
```

For the tests to run you will need stand alone `mongod`s running at localhost:27017 and localhost:27018. To do this you need to define a new mongod on 27108:

```
$ sudo mkdir -p data/db1 data/log1
$ sudo mongod --dbpath ~/data/db1 --logpath ~/data/log1/log --port 27018 --fork
```

## DADI API

Install GCC to provide the latest build of the c++ bson extension (not required, but improves performance):

```
sudo apt-get install gcc make build-essential
```
