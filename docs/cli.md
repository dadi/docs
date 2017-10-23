---
title: CLI
order: 5
---

# Overview

DADI CLI is a command-line tool to help with the installation and customisation of the various products of the DADI platform.

## Automatic updates

To ensure CLI works with the latest versions of the various DADI products, which are released quite often, we built an auto-update system. CLI will periodically check if there's an update available and, if so, will get it automatically.

In the rare event that an update can't be installed automatically, we'll ask you to update CLI manually.

```sh
ERROR: DADI CLI needs a manual update.

Please run npm update @dadi/cli -g to update it.
```

## Programmatic vs. interactive mode

Each command requires its own set of parameters – for example, a command for installing a new version of DADI Web will need to know which template engines to install, whereas creating a new API client requires a client ID and a secret.

To provide an optimal experience for both programmatic uses, where a command is executed as part of an automated script, and for actual people running commands in their terminal, CLI applies this principle to every command: there is a flag accepted by the command for every parameter required, which when absent will be prompted to the user using an interactive mode.

# Installation

DADI CLI is installed with npm, as a global module.

```sh
npm install @dadi/cli -g
```

Depending on how your npm installation is configured, you might require super-user permissions to install a global module. This means that your regular user does not have permissions to write to the directories that npm uses to store global packages and commands. You can fix this by following the instructions on the [npm documentation pages](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If you don't mind using the super-user to install global npm modules, you need to install DADI CLI using the `--unsafe-perm` flag.

```sh
npm install @dadi/cli -g --unsafe-perm
```

# Usage

Running `dadi help` displays a usage summary:

```sh

  ▓▓▓▓▓  ▓▓▓▓▓▓▓
              ▓▓▓▓
     ▓▓▓▓▓▓▓    ▓▓▓▓
              ▓▓▓▓
          ▓▓▓▓▓▓▓


> API
dadi api clients:add        Creates a new client
dadi api new                Creates a new instance of DADI
                            API


> CDN
dadi cdn new                Creates a new instance of DADI
                            CDN
dadi cdn setup              Launches an interactive setup
                            wizard


> Web
dadi web routes:list        Lists initialised routes
dadi web new                Creates a new instance of DADI
                            Web

--

Type dadi help <command> to learn more about a specific command.
```

Commands begin with the name of the DADI application they apply to. For example, `dadi api new` will install a new instance of API, whilst its CDN counterpart is `dadi cdn new`.

## API commands

Running `dadi help api` will show a list of all the API-related commands:

```sh

  ▓▓▓▓▓  ▓▓▓▓▓▓▓
              ▓▓▓▓
     ▓▓▓▓▓▓▓    ▓▓▓▓
              ▓▓▓▓
          ▓▓▓▓▓▓▓


$ dadi api <command>


Available commands:

clients:add                 Creates a new client
new                         Creates a new instance of DADI
                            API

--

Type dadi help api <command> to learn more about a specific command.
```

### `api clients:add` command

Running `dadi help api clients:add` will show the following details for the command:

```sh

  ▓▓▓▓▓  ▓▓▓▓▓▓▓
              ▓▓▓▓
     ▓▓▓▓▓▓▓    ▓▓▓▓
              ▓▓▓▓
          ▓▓▓▓▓▓▓


$ dadi api clients:add --id --secret

Creates a new client

Available parameters:

id                          the client ID
secret                      the client secret

```

This command will create a new oAuth client. It requires two parameters: the client ID and secret, which can be passed using the `--id` and `--secret` flags or using the interactive mode.

### `api new` command

Running `dadi help api new` will show the following details for the command:

```sh

  ▓▓▓▓▓  ▓▓▓▓▓▓▓
              ▓▓▓▓
     ▓▓▓▓▓▓▓    ▓▓▓▓
              ▓▓▓▓
          ▓▓▓▓▓▓▓


$ dadi api new <name> --version

Creates a new instance of DADI API

Available parameters:

name                        the name of the DADI API
                            instance
version                     the version of API to install
                            (defaults to latest)


```

This command will create a new instance of DADI API. If a `name` parameter is supplied, API will be installed in a subdirectory of the current directory, using the value supplied for `name`. If a `name` parameter is not supplied, API will be installed in the current directory.

In both cases, a warning will be shown when trying to install API on a non-empty directory.

```sh
? The target directory (/Users/johndoe/existing-directory) is not empty. Would you like to proceed? (y/N)
```

If the `version` parameter is supplied, its value defines the version of CDN that will be installed. If not, the latest available version is used. An error is shown when the value of `version` doesn’t match a valid version of CDN.

```sh
✖ 8.3 is not a valid version. Available versions: 1.5.x, 2.2.x
```

## CDN commands

Running `dadi help api` will show a list of all the API-related commands:

```sh

  ▓▓▓▓▓  ▓▓▓▓▓▓▓
              ▓▓▓▓
     ▓▓▓▓▓▓▓    ▓▓▓▓
              ▓▓▓▓
          ▓▓▓▓▓▓▓


$ dadi cdn <command>


Available commands:

new                         Creates a new instance of DADI
                            CDN
setup                       Launches an interactive setup
                            wizard

--

Type dadi help cdn <command> to learn more about a specific command.

```

### `cdn new` command

Running `dadi help cdn new` will show the following details for the command:

```sh

  ▓▓▓▓▓  ▓▓▓▓▓▓▓
              ▓▓▓▓
     ▓▓▓▓▓▓▓    ▓▓▓▓
              ▓▓▓▓
          ▓▓▓▓▓▓▓


$ dadi cdn new <name> --skip-setup --version

Creates a new instance of DADI CDN

Available parameters:

name                        the name of the DADI CDN
                            instance
skip-setup                  skips the interactive setup
                            guide
version                     the version of CDN to install
                            (defaults to latest)

```

This command will create a new instance of DADI CDN. If a `name` parameter is supplied, CDN will be installed in a subdirectory of the current directory, using the value supplied for `name`. If a `name` parameter is not supplied, CDN will be installed in the current directory.

In both cases, a warning will be shown when trying to install CDN in a non-empty directory.

```sh
? The target directory (/Users/johndoe/existing-directory) is not empty. Would you like to proceed? (y/N)
```

If the `version` parameter is supplied, its value defines the version of CDN that will be installed. If not, the latest available version is used. An error is shown when the value of `version` doesn’t match a valid version of CDN.

By default, this command is succeeded by an interactive setup wizard, where the user is guided through a series of questions used to generate a configuration file. This step can be skipped by appending the `--skip-setup` parameter to the command.

### `cdn setup` command

This command will launch an interactive setup wizard, which guides users through a series of questions to form a configuration file.

It must be executed from a directory where an instance of DADI CDN is installed.

```sh

  ▓▓▓▓▓  ▓▓▓▓▓▓▓
              ▓▓▓▓
     ▓▓▓▓▓▓▓    ▓▓▓▓
              ▓▓▓▓
          ▓▓▓▓▓▓▓


    DADI CDN setup

Let's start by configuring the web server that DADI CDN will run on. (0% complete)

? What is the name of this CDN instance? My new CDN
? What protocol should this CDN instance run on? HTTP (insecure)
? What is the IP address the application should run on? 0.0.0.0
? What is the port number the application should run on? 8080

Time to configure the sources that CDN will use to retrieve images. (18% complete)

? Would you like to load images from the local filesystem? (y/N)

```

## Web commands

Running `dadi help web` will show a list of all the API-related commands:

```sh

  ▓▓▓▓▓  ▓▓▓▓▓▓▓
              ▓▓▓▓
     ▓▓▓▓▓▓▓    ▓▓▓▓
              ▓▓▓▓
          ▓▓▓▓▓▓▓


$ dadi web <command>


Available commands:

new                         Creates a new instance of DADI
                            Web

--

Type dadi help web <command> to learn more about a specific command.

```

### `web new` command

Running `dadi help web new` will show the following details for the command:

```sh

  ▓▓▓▓▓  ▓▓▓▓▓▓▓
              ▓▓▓▓
     ▓▓▓▓▓▓▓    ▓▓▓▓
              ▓▓▓▓
          ▓▓▓▓▓▓▓


$ dadi web new <name> --engine --version

Creates a new instance of DADI Web

Available parameters:

name                        the name of the DADI Web
                            instance
engine                      name of a template engine
                            interface NPM module (for
                            versions >= 3.x)
version                     the version of Web to install
                            (defaults to latest)

```

This command will create a new instance of DADI Web. If a `name` parameter is supplied, Web will be installed in a subdirectory of the current directory, using the value supplied for `name`. If a `name` parameter is not supplied, Web will be installed in the current directory.

In both cases, a warning will be shown when trying to install Web in a non-empty directory.

```sh
? The target directory (/Users/johndoe/existing-directory) is not empty. Would you like to proceed? (y/N)
```

If the `version` parameter is supplied, its value defines the version of Web that will be installed. If not, the latest available version is used. An error is shown when the value of `version` doesn’t match a valid version of Web.

This command also allows users to choose which template engines they’d like to use with their instance of Web. The `--engine` parameter accepts a list of npm modules to use as engines.

The following command installs the latest version of Web on a subdirectory called `my-new-website` and installs the Dust.js and Pug.js template engines:

```sh
$ dadi web new my-new-website --engine=@dadi/web-dustjs --engine=@dadi/web-pugjs
```

If this parameter is not supplied, CLI will go into interactive mode and ask the user to choose which engines to install from a list of available engines, pulled from NPM.

