#!/bin/bash

DOCKER_COMPOSE='docker-compose'

echo "Using docker-compose command: $DOCKER_COMPOSE"

$DOCKER_COMPOSE down
$DOCKER_COMPOSE rm -v --force
docker volume rm george_el_mysql_volume
$DOCKER_COMPOSE pull
$DOCKER_COMPOSE build
$DOCKER_COMPOSE up -d --force-recreate --remove-orphans
$DOCKER_COMPOSE stop