const express = require('express'),
  next = require('next'),
  dev = process.env.NODE_ENV !== 'production'
  port = process.env.PORT || 8082,
  app = next({ dev }),
  handle = app.getRequestHandler()
app.prepare()
  .then(() => {
    const server = express();
    server.get('*', (req, res) => {
      return handle(req, res);
    })
    server.listen(port, (err) => {
      if (err) throw err;
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });