const http = require('http');
const port = 3000;
const delay = 1000;
const limit = 5000;
let userConnect = 0;
const server = http.createServer((req, res) => {
  if ((req.method === 'GET') && (req.url === '/')) {
    userConnect++;
    if (userConnect === 1) {
      let repeat = setInterval(() =>
        console.log(new Date()), delay);

      setTimeout(() => {
        clearInterval(repeat);
        console.log('stop: ' + new Date());
      }, limit);

      res.end('Homework #2');
    } else {
      return;
    }
  }
})

server.listen(port, () => {
  console.log("Server start on " + port + ' port');
})