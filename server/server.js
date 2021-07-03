const express = require('express');
const app = express();
const router = require('./routes/toDoRouter');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use('/list', router);

const PORT = 5000;
app.listen(5000, () => {
    console.log('Node/express server listening on port,', PORT);
  });

