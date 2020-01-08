const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 4001

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, 
  () => console.log(`Example app listening on port ${PORT}!`)
);
