# Monorepo Docker Scaffold
Includes:
- Frontend: React + Vite (served by nginx in container)
- Backend: Node + Express (connects to MongoDB)
- MongoDB: official image
- Docker Compose to orchestrate services
- Restart policy set to `unless-stopped` so Docker restarts containers (similar to PM2)

## Quick start
1. Build & up:
```bash
docker compose up -d --build
```
2. Frontend: http://localhost:5173
   Backend: http://localhost:4000/api
3. Stop:
```bash
docker compose down
```
