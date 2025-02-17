setup:
	./setup.sh

start:
	./start.sh

stop:
	docker-compose down

create-db:
	cd packages/backend && npx mikro-orm migration:fresh --seed

start-api-dev:
	docker exec -ti george_devel_backend yarn backend:start:dev

start-fe-dev:
	docker exec -ti george_devel_frontend yarn frontend:start:dev