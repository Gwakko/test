# docker-image

# Install

* Rename file `.env.example`  to `.env` in root folder. Docker environment file contains database settings.
* Then need:
  1. Run to start container `docker-compose up -d` , to terminate `docker-compose down`
  2. Setup database

  * Login in database service `mysql`
  
  `docker-compose exec mysql bash`
  
  * Authenticate as `root` user. Password from `.env`
  
  `mysql -u root -p`
  
  * Check if database exists:
  
  `show databases;`
  
  otherwise create database:
  
  `CREATE DATABASE community;`
  
  * Create database user and give grant access to database:
  
  `CREATE USER 'community'@'%' IDENTIFIED BY '123456';`
  
  `GRANT ALL PRIVILEGES ON community.* TO 'community'@'%';`
  
  * Apply changes
  
  `FLUSH PRIVILEGES;`
  
  * `exit` and `exit` to quite mysql bash
  
  4. Edit hosts (Linux: `/etc/hosts`, Windows: `c:\windows\system32\drivers\etc\hosts`) file on host machine and add next record
  
  `127.0.0.1 community.test`
  
* Rename file `.env.example`  to `.env` in `./project` folder. Edit parameters.
  
  1. If need edit next parameters
  
  ```
  INSTAGRAM_CLIENT_ID=1297899593945384
  INSTAGRAM_CLIENT_SECRET=6d29bc5bcc74b0d5665142548cf4a5dc
  INSTAGRAM_REDIRECT_URI=https://community.test/auth/instagram/callback
  
  GITHUB_CLIENT_ID=7f5f70ed1150b951fc0b
  GITHUB_CLIENT_SECRET=54d175d3f590f855ff76f87d9e940f4115ccc6ba
  GITHUB_REDIRECT_URI=https://community.test/auth/github/callback
  ```
  
  2. Need to create database schema:
  
  `docker-compose exec php bash`
  
  `php artisan migrate`
   
    - optional make user
    
    `php artisan users:create user@example.com 123456`
  
  3. Install passport service

  `php artisan passport:install`

  * To run tests

  `php artisan test`

* Site will be available by next urls:

`http[s]://localhost:80[443]`
`http[s]://community.test:[80][443]`

* OpenApi documentation url https://community.test/api/documentation

