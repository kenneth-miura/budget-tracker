# With Docker

This examples shows how to use Docker with Next.js based on the [deployment documentation](https://nextjs.org/docs/deployment#docker-image). Additionally, it contains instructions for deploying to Google Cloud Run. However, you can use any container-based deployment host.


## Building the Web App on it's own
```bash
docker build -t nextjs-docker .
docker run -p 3000:3000 nextjs-docker
```
## Usage

Clone the repo and run the following commands:

    pnpm install
    docker-compose up -d # if you want to run without rebuilding
    docker-compose up -d --build # if you want to run without rebuilding

Then visit localhost:3000 to see the app running. This should also hot reload (but you will have to reload the page on your own).

Once you're done, run the following:

    docker-compose down

## Prod Running
```bash
docker compose -f "docker-compose.prod.yml" up -d --build
```
