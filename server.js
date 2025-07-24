const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../../db.json')); // adjust if needed
const middlewares = jsonServer.defaults();

const port = 3001;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
