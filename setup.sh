#!/bin/bash

DOCKER_COMPOSE='docker-compose'

echo "Using docker-compose command: $DOCKER_COMPOSE"

$DOCKER_COMPOSE down
$DOCKER_COMPOSE rm -v --force
docker volume rm george_el_mysql_volume
$DOCKER_COMPOSE pull
$DOCKER_COMPOSE build
$DOCKER_COMPOSE up -d --force-recreate --remove-orphans
docker exec george_devel_backend npm install
docker exec george_devel_frontend npm install
$DOCKER_COMPOSE stop