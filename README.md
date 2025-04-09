# CI/CD avec Docker et Kubernetes
## Application organisatiion
.
├── frontend/
│   ├── Dockerfile        👈 Just builds & serves app
│   └── cypress/          👈 test files
├── node-api/
|   └── Dockerfile
├── Dockerfile.cypress    👈 NEW: builds Cypress test image
├── docker-compose.yml
└── .github/workflows/cicd_docker.yml

[![codecov](https://codecov.io/gh/anouvene/cicd-docker/graph/badge.svg?token=9J57TG0A75)](https://codecov.io/gh/anouvene/cicd-docker)