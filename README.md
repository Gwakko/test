# docker-image

~~~~
manage-hosts.sh
~~~~
* Need to set read & write permissions for Linux user under windows for a file: 
`C:\Windows\System32\drivers\etc\hosts`
  
* Change projects path if need `projectsPath="/home/$currentUser/projects"`
  
* Change hosts file path if need `projectHostsFile="$projectsPath/hosts"`
  
  File `hosts` should looks like:
  ~~~
  test.dev
  sub.test.dev
  me.com
  ~~~
  
* On default all folders in path for projects would be loaded as domains.

* Drop cached images: `docker system prune -a`

* Close `redis` port for outside.

## SSL certs
[Github Acme.sh](https://github.com/acmesh-official/acme.sh)

[Russian guide tutorial](https://codex.so/wildcard-ssl)

# Docker autostart

If your docker.service enabled on system startup

`sudo systemctl enable docker`

and your services in your `docker-compose.yml` has

`restart: always`

all of the services run when you reboot your system if you run below command only once

`docker-compose up -d`


# MySQL

* Login in database service `mysql` 

`docker-compose exec mysql bash`

* Authenticate as `root` user. Password from `.env`

`mysql -u root -p`

* Check if database exists:

`show databases;`

otherwise create database:

`CREATE DATABASE shop;`

* Create database user and give grant access to database:

`CREATE USER 'shop'@'%' IDENTIFIED BY 'wP9V2vMpmU1Kc8SMJw2U';`

`GRANT ALL PRIVILEGES ON shop.* TO 'shop'@'%';`

* Apply changes

`FLUSH PRIVILEGES;`

* `exit` and `exit` to quite mysql bash






