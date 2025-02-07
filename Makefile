setup:
	./setup.sh

start:
	./start.sh

stop:
	docker-compose down

create-db:
	cd packages/backend && npx mikro-orm migration:fresh --seed
