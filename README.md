# Build

```
docker compose up -d
```

# Refresh

For example when changing your .env passwords

```
docker-compose up --build
```

(Once it says "Server listening on port 3000", abort it and refer to the first command)

# Get docker list

```
docker ps
```

# Delete a container

```
docker stop <container ID>
docker rm <container ID>
```