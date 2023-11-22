const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
// const apiRouter = require('./routes/api.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api', apiRouter);



if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
  // statically serve everything in the build folder on the route '/dist'
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  // serve index.html on the route '/'
  app.get('/*', (req, res) => {
    console.log('dev request')
    return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
  });
}
else {
  console.log('entered prod path')
  app.use('/', express.static(path.join(__dirname, '../dist')));

  app.get('/*', (req, res) => {
    console.log('catch all');
    return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });
}



app.listen(3000, ()=> { console.log("Server started on port 3000")});