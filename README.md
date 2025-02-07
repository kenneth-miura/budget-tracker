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

Then visit localhost:3000 to see the app running.

Once you're done, run the following:

    docker-compose down

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
