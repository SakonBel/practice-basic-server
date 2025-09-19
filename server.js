const app = require('./app');
const PORT = 8000;

app.listen((port = PORT), (err) => {
  console.log(`Listening on port ${PORT}`);
});
