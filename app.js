const express = require('express')
const app = express()
const port = 3000
const router = require("./routes")

app.use(router);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
    });

app.listen(port, () => {
  console.log(`server running on http://localhost:` + port)
})
