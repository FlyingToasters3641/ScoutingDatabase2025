

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

# Setting up scouting database in codespaces

### 1. Open and prepare codespaces

Press , on your keyboard to open codespaces. If you don't already have a codespaces that your working on, press create new codespace.

### 2. Prepare and open the app/code

Make sure you are in TERMINAL, if you are, the first thing you see should be /workspaces/ScoutingDatabase2025 (*your branch*) $. 
Just after this line type, npm install. 
```bash
/workspaces/ScoutingDatabase2025 (*your branch*) $ npm install
```
After it finishes loading type, cd client.
```bash
/workspaces/ScoutingDatabase2025 (*your branch*) $ cd client
```
In the line that pulls up, type npm install.
```bash
/workspaces/ScoutingDatabase2025/client (*your branch*) $ npm install
```
Next type cd .. this gets you back to the main terminal, insted of the client one. 
```bash
/workspaces/ScoutingDatabase2025/client (*your branch*) $ cd .. 
```
Repeat this process for server.
```bash
/workspaces/ScoutingDatabase2025 (*your branch*) $ cd server
/workspaces/ScoutingDatabase2025/server (*your branch*) $ npm install
-
/workspaces/ScoutingDatabase2025/server (*your branch*) $ cd ..
```
finally, type npm start to start the program.
```bash
/workspaces/ScoutingDatabase2025 (*your branch*) $ npm start
```
Congrats, you just set up the website, from here, it should open a seperate tab with the frontend dispaly on it.

### 3. Insure the website is updating corectly.

go to PORTS and look a visibiliy, change the visiblity for 3001 to Public.

While you're in PORTS, copy the url for 3001 by holding your mouse over it and clicking the first icon. 

On the sidebar, open client > src > components > Home.js

Use // to edit out the localhost url and deleate the // over the url below it.

In the lower url paste your copyed url up to the slash and type api/v1 between the two slashes that show up.
```bash
//axios.get('http://localhost:3001/events')
axios.get('[*copyed url*]/api/v1/users')
```
Example:
```bash
//axios.get('http://localhost:3001/events')
axios.get('https://fuzzy-telegram-5ggxpqj4xjw5c4q56-3001.app.github.dev/api/v1/users')
```

### 4. Insure you have the proper extentions installed
Click Extentions on the farthest sidebar and look up rest client

Install rest client.

## !* This may not work at all while at school, insted use a strategy laptop or home computer *!


# 