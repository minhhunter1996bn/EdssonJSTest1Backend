const http = require("http");

(async () => {
  const app = await require('./server')();
  const server = http.createServer(app);
  server.listen(3000, () => console.log('Running'));
})();