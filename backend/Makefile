.PHONY: help up down restart logs build ps shell-backend shell-db migrate seed status

help:
	@echo "Uso: make <target>"
	@echo ""
	@echo "Targets disponibles:"
	@echo "  up         Construye y levanta los contenedores en segundo plano"
	@echo "  down       Detiene y elimina los contenedores (conserva volúmenes)"
	@echo "  restart    Reinicia los contenedores"
	@echo "  logs       Muestra los logs en tiempo real del backend"
	@echo "  build      Construye las imágenes sin levantar"
	@echo "  ps         Muestra el estado de los contenedores"
	@echo "  shell-backend  Abre una shell en el contenedor del backend"
	@echo "  shell-db   Abre psql en el contenedor de PostgreSQL"
	@echo "  migrate    Ejecuta las migraciones de Prisma manualmente"
	@echo "  seed       Ejecuta el seed de la base de datos"
	@echo "  status     Muestra el estado de salud de los servicios"

up:
	docker compose up -d --build
	@echo ""
	@echo "Servicios disponibles:"
	@echo "  Backend:    http://localhost:3001"
	@echo "  PostgreSQL: localhost:5432"

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f backend

build:
	docker compose build --no-cache

ps:
	docker compose ps

shell-backend:
	docker compose exec backend sh

shell-db:
	docker compose exec postgres psql -U $${POSTGRES_USER:-postgres} -d $${POSTGRES_DB:-csvmanager}

migrate:
	docker compose exec backend ./node_modules/.bin/prisma migrate deploy

seed:
	docker compose exec backend ./node_modules/.bin/prisma db seed

status:
	@echo "=== Estado de los contenedores ==="
	@docker compose ps
	@echo ""
	@echo "=== Health check del backend ==="
	@curl -s http://localhost:3001/api/health || echo "Backend no responde"
