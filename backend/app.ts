// import express from 'express';
import * as express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import path from 'path';
import { json } from 'body-parser';

//port number
const port = 5000;
const app = express();

//cors middleware
app.use(cors());
//body-parser middleware
app.use(json());

app.use(express.static(path.join(__dirname, '/client/angular')));

//Index route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/angular/index.html'));
});

//Start server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
