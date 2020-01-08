const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const morgan = require('morgan');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');

const PORT = process.env.PORT || 4001

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/strips', (req, res, next) => {
  const strip = req.body.strip;
  
  db.run(`INSERT INTO Strip (head, body, bubble_type, background, bubble_text,caption)
          VALUES ($head, $body, $bubbleType, $background, $bubbleText, $caption)`,
    {
      $head: strip.head,
      $body: strip.body,
      $bubbleType: strip.bubbleType,
      $background: strip.background,
      $bubbleText: strip.bubbleText,
      $caption: strip.caption,
    }, (err) => {
      if (err) {
        return res.sendStatus(500);
      }
    });
});


app.listen(PORT, 
  () => console.log(`Example app listening on port ${PORT}!`)
);

module.exports = app;