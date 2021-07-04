ARG IMAGE

FROM $IMAGE

# ARGS
ARG GID
ARG UID

# Copy composer.lock and composer.json
#COPY ./app-shop/composer.lock ./app-shop/composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Switch to ROOT user to FIX: E: List directory /var/lib/apt/lists/partial is missing. - Acquire (13: Permission denied)
USER root

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    libzip-dev \
    zip \
    jpegoptim optipng pngquant gifsicle \
    nano \
    unzip \
    git \
    curl \
    libsqlite3-dev \
    sqlite3 \
    libxml2-dev \
    libonig-dev \
    libcurl4-openssl-dev \
    zlib1g-dev \
    libpng-dev \
    libwebp-dev \
    libxpm-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install mbstring pdo_mysql zip exif pcntl mysqli pdo_sqlite xml dom tokenizer curl intl && pecl install -o -f redis \
                                                                                                          &&  rm -rf /tmp/pear \
                                                                                                          &&  docker-php-ext-enable redis
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-xpm --with-webp
RUN docker-php-ext-install gd
#RUN docker-php-ext-enable mbstring pdo_mysql zip exif pcntl mysqli pdo_sqlite xml dom tokenizer curl gd intl

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
#RUN groupadd -g 1000 www-app
#RUN useradd -u 1000 -ms /bin/bash -g www-app www-app
#RUN getent group www-app || groupadd -g $GID www-app
#RUN id -u www-app & > /dev/null || useradd -u $UID -ms /bin/bash -g www-app www-app
RUN groupadd -g $GID www-app
RUN useradd -u $UID -ms /bin/bash -g www-app www-app

# Copy existing application directory contents
COPY ./project /var/www

# Copy existing application directory permissions
COPY --chown=www-app:www-app ./project /var/www

# Change current user to www
USER www-app
