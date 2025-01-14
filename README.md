
# ScoutingDatabase2025
![CI](https://github.com/FlyingToasters3641/ScoutingDatabase2025/actions/workflows/docker-image.yml/badge.svg)

## Introduction
This repository contains the ScoutingDatabase2025 laptop application. This guide will help you set up and run the application.

## Prerequisites
- Docker installed on your machine. You can download it from [here](https://www.docker.com/products/docker-desktop).

- Node.js installed on your machine (if not using Docker or Codespaces).  You can download if from [here](https://nodejs.org/).
- VS Code installed on your maching (if not using Codespaces). You can download if from [here](https://code.visualstudio.com/).


## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ScoutingDatabase2025.git
cd ScoutingDatabase2025
```

### 2. Build the Docker Image
```bash
docker build -t scoutingdatabase2025 .
```

### 3. Run the Docker Container
```bash
docker run -d -p 8000:8000 scoutingdatabase2025
```

### 4. Access the Application
Open your web browser and navigate to `http://localhost:8000` to access the ScoutingDatabase2025 application.

## Stopping the Application
To stop the running Docker container, use the following command:
```bash
docker ps
docker stop <container_id>
```

Replace `<container_id>` with the actual container ID from the `docker ps` command output.

## Additional Information
For more details on using Docker, refer to the [Docker documentation](https://docs.docker.com/).

## Contributing
Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

