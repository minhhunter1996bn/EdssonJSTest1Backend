const http = require("http");

(async () => {
  const app = await require('./server')();
  const server = http.createServer(app);
  server.listen(3001, () => console.log('Running'));
})();