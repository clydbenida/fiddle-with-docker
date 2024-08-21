# Learning Docker and Docker Compose
To run this project, try to run it first on your local machine.

## Making it work on your local machine.
### Install Redis
I used a docker image running redis on my machine.
```
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```
This command is from the npm page of Node-Redis.
### Running the sample project
Run `npm install` to install the projects dependencies. Once its done, run `npm run dev` to run the project.

Go to `localhost:8081` and you should see the page up and running.

## Fiddling with Docker
To test if the Dockerfile is working properly, you can run the command
```
docker build -t {your_username}/{desired_image_name} .
```
This command will build your docker image. To run the created docker image:
```
docker run -it -p {local_port}:{docker_port} {your_username}/{image_name}
```
After running this command, you should see the message `"Listening on port 8081"`. 
However, if you try to visit the app in your web browser, nothing will happen. 
This is because the Redis instance running on your local machine can't be detected by the docker container.

To make the project work, we need to make use of Docker Compose.

## Applying Docker Compose
As you can see in the `docker-compose.yml` file, there are two entries in our `services` field. These fields are the redis-server and the node-app. 
If you want to learn more about docker compose, please see [this documentation](https://docs.docker.com/compose/).

### Running the project with `docker-compose`
To run the project using the copnfigurations from the `docker-compose.yml` file:
```
docker-compose up --build
```
This will build and run the 2 images or services specified in the `docker-compose.yml` file. If you want the processes to run in the background, add the `-d` flag.
```
docker-compose up --build -d
```
If the build is successful, you can check the `localhost:8081` again. The visit counter app should be working properly.

## Additional info: Killing the processes
To kill the processes created by the docker compose build, you can run `docker ps` to get the container ids and run `docker stop` individually on each container id. 
For a better way to stop the processes, you can just run:
```
docker-compose down
```
Take note that you should run this where your `docker-compose.yml` is located.
