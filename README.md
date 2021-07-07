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

  5. Add self-signed cert to enable https
  
  ```
  openssl req -x509 -keyout ./config/ssl/community.test.key -out ./config/ssl/community.test.crt \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=community.test' -extensions EXT -config <( \
   printf "[dn]\nCN=community.test\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:community.test\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
  
  ```
  
* Rename file `.env.example`  to `.env` in `./project` folder. Edit parameters.
  
  1. Need to edit next parameters
  
  ```
  INSTAGRAM_CLIENT_ID=
  INSTAGRAM_CLIENT_SECRET=
  INSTAGRAM_REDIRECT_URI=https://community.test/auth/instagram/callback
  
  GITHUB_CLIENT_ID=
  GITHUB_CLIENT_SECRET=
  GITHUB_REDIRECT_URI=https://community.test/auth/github/callback
  ```
  
  2. Need to open container cli
  
  `docker-compose exec php bash`
  
  3. Install dependencies
     
     `composer install`

  4. Need to create database schema:
  
  `php artisan migrate`
   
    - optional make user
    
    `php artisan users:create user@example.com 12345678`
  
  5. Install passport service

  `php artisan passport:install`

  * To run tests

  `php artisan test`

* Site will be available by next urls:

`http[s]://localhost:80[443]`
`http[s]://community.test:[80][443]`

* OpenApi documentation url https://community.test/api/documentation

