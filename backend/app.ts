import express from 'express';
import cors from 'cors';
import path from 'path';
import { json } from 'body-parser';

//port number
const port = 3000;
const app = express();

//cors middleware
app.use(cors());
//body-parser middleware
app.use(json());

app.use(express.static(path.join(__dirname, '/public/main')));

app.use('/static', express.static('/public/pathfinding-visualizer/static'));

app.get('/*', (req, res, next) => {
  // console.log();
  console.log(req.url);
  next();
});

app.get('/pathfinding-visualizer', (req, res) => {
  console.log('in here');
  res.sendFile(path.join(__dirname, '/public/pathfinding-visualizer/index.html'));
});
// app.get('/static', (req, res) => {
//   console.log('in here');
//   res.sendFile(path.join(__dirname, '/public/pathfinding-visualizer/index.html'));
// });
//Index route
app.get('/*', (req, res) => {
  // console.log();
  res.sendFile(path.join(__dirname, '/public/main/index.html'));
});

//Start server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

// import express from 'express';

// const app = express();
// const port = 3000;

// app.listen(port, () => {
//   console.log(`Timezones by location application is running on port ${port}.`);
// });
